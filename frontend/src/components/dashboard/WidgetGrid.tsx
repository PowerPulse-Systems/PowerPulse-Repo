import React, { useState } from 'react';
import { Widget } from '../../types/dashboard';
import StatCardWidget from './widgets/StatCardWidget';
import { Edit2, Trash2 } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface WidgetGridProps {
  deviceId: string;
  isEditMode: boolean;
  onEditWidget: (widget: Widget, id: string) => void;
}

// ----------------------------------------------------------------------
// SortableItem Wrapper Component
// ----------------------------------------------------------------------
interface SortableItemProps {
  widget: Widget;
  isEditMode: boolean;
  onEdit: () => void;
  onRemove: () => void;
  deviceId: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ widget, isEditMode, onEdit, onRemove, deviceId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: widget.id!,
    disabled: !isEditMode 
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.4 : 1,
  };

  // Map size to Tailwind col-span (based on a 12-column grid)
  let spanClass = 'col-span-12 md:col-span-4'; // small (1/3)
  if (widget.size === 'medium') spanClass = 'col-span-12 md:col-span-8'; // 2/3
  if (widget.size === 'large') spanClass = 'col-span-12'; // full

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${spanClass} ${isEditMode ? 'touch-none' : ''}`}
      {...attributes}
      {...listeners}
    >
      {isEditMode && (
        <div 
          className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          // Prevent drag from starting when clicking buttons
          onPointerDown={(e) => e.stopPropagation()} 
        >
          <button
            onClick={onEdit}
            className="p-1.5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 cursor-pointer pointer-events-auto"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600 cursor-pointer pointer-events-auto"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
      
      <div 
        className={`h-full w-full ${isEditMode ? 'cursor-grab active:cursor-grabbing ring-2 ring-transparent hover:ring-blue-500/50 rounded-xl transition-all pointer-events-none' : ''}`}
      >
        {widget.type === 'card' && (
          <StatCardWidget widget={widget} deviceId={deviceId} />
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Grid Component
// ----------------------------------------------------------------------
const ResponsiveWidgetGrid: React.FC<WidgetGridProps> = ({ deviceId, isEditMode, onEditWidget }) => {
  const { draftWidgets, removeWidget, reorderWidgets } = useDashboardStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement before drag starts (allows clicks on buttons to fire)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = draftWidgets.findIndex((w) => w.id === active.id);
      const newIndex = draftWidgets.findIndex((w) => w.id === over.id);
      reorderWidgets(oldIndex, newIndex);
    }
  };

  const activeWidget = activeId ? draftWidgets.find(w => w.id === activeId) : null;

  if (draftWidgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
        <div className="text-4xl mb-4">📊</div>
        <p>No widgets configured for this device.</p>
        {isEditMode && <p className="text-sm mt-2">Click "Add Widget" to get started.</p>}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-12 gap-4">
        <SortableContext 
          items={draftWidgets.map(w => w.id!)} 
          strategy={rectSortingStrategy}
        >
          {draftWidgets.map((widget) => (
            <SortableItem
              key={widget.id}
              widget={widget}
              isEditMode={isEditMode}
              deviceId={deviceId}
              onEdit={() => onEditWidget(widget, widget.id!)}
              onRemove={() => removeWidget(widget.id!)}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeWidget ? (
          <div className="opacity-90 shadow-2xl scale-105 transition-transform">
            {activeWidget.type === 'card' && (
              <StatCardWidget widget={activeWidget} deviceId={deviceId} />
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ResponsiveWidgetGrid;
