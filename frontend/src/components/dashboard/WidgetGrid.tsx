import React from 'react';
import { GridLayout, ResponsiveGridLayout, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Widget } from '../../types/dashboard';
import StatCardWidget from './widgets/StatCardWidget';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

interface WidgetGridProps {
  deviceId: string;
  isEditMode: boolean;
  onEditWidget: (widget: Widget, index: number) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ deviceId, isEditMode, onEditWidget }) => {
  const { draftWidgets, removeWidget, reorderWidgets } = useDashboardStore();

  const getLayout = (): Layout[] => {
    return draftWidgets.map((widget, i) => {
      let w = 2, h = 2;
      if (widget.size === 'small') { w = 2; h = 2; }
      else if (widget.size === 'medium') { w = 4; h = 2; }
      else if (widget.size === 'large') { w = 4; h = 4; }
      
      // Calculate x, y based on position if needed, or rely on RGL's auto-packing
      // For simplicity, we just stack them and let RGL auto-pack
      const cols = 6;
      const x = (i * 2) % cols;
      const y = Math.floor((i * 2) / cols) * 2;

      return {
        i: i.toString(),
        x,
        y,
        w,
        h,
        minW: 2,
        minH: 2,
      };
    });
  };

  const handleLayoutChange = (layout: Layout[]) => {
    if (isEditMode) {
      reorderWidgets(layout);
    }
  };

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
    <div className="relative">
      {/* Overrides for react-grid-layout placeholder style */}
      <style>{`
        .react-grid-item.react-grid-placeholder {
          background: #3b82f6 !important;
          opacity: 0.2 !important;
          border-radius: 0.75rem;
        }
      `}</style>
      
      <GridLayout
        className="layout"
        layout={getLayout()}
        cols={6}
        rowHeight={80}
        width={1200} // This should ideally be responsive, using WidthProvider. For now fixed or handle in CSS.
        isDraggable={isEditMode}
        isResizable={isEditMode}
        onLayoutChange={handleLayoutChange}
        margin={[16, 16]}
      >
        {draftWidgets.map((widget, index) => (
          <div key={index.toString()} className="relative group">
            {isEditMode && (
              <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEditWidget(widget, index)}
                  className="p-1.5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => removeWidget(index)}
                  className="p-1.5 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {widget.type === 'card' && (
              <StatCardWidget widget={widget} deviceId={deviceId} />
            )}
            {/* Future widget types here */}
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

// Using the named export which has WidthProvider built-in for ESM builds

const ResponsiveWidgetGrid: React.FC<WidgetGridProps> = (props) => {
  const { draftWidgets, removeWidget, reorderWidgets } = useDashboardStore();

  const getLayout = (): Layout[] => {
    return draftWidgets.map((widget, i) => {
      let w = 2, h = 2;
      if (widget.size === 'small') { w = 2; h = 2; }
      else if (widget.size === 'medium') { w = 4; h = 2; }
      else if (widget.size === 'large') { w = 4; h = 4; }
      
      const cols = 6;
      const x = (i * 2) % cols;
      const y = Math.floor((i * 2) / cols) * 2;

      return {
        i: i.toString(),
        x,
        y,
        w,
        h,
        minW: 2,
        minH: 2,
      };
    });
  };

  return (
    <div className="relative">
      <style>{`
        .react-grid-item.react-grid-placeholder {
          background: #3b82f6 !important;
          opacity: 0.2 !important;
          border-radius: 0.75rem;
        }
      `}</style>
      <ResponsiveGridLayout
        className="layout -mx-4"
        layouts={{ lg: getLayout(), md: getLayout(), sm: getLayout(), xs: getLayout(), xxs: getLayout() }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        isDraggable={props.isEditMode}
        isResizable={props.isEditMode}
        onLayoutChange={(l) => props.isEditMode && reorderWidgets(l)}
        margin={[16, 16]}
      >
        {draftWidgets.map((widget, index) => (
          <div key={index.toString()} className={`relative group ${props.isEditMode ? 'cursor-move ring-2 ring-transparent hover:ring-blue-500/50 rounded-xl transition-all' : ''}`}>
            {props.isEditMode && (
              <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onMouseDown={(e) => { e.stopPropagation(); props.onEditWidget(widget, index); }}
                  className="p-1.5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onMouseDown={(e) => { e.stopPropagation(); removeWidget(index); }}
                  className="p-1.5 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
            
            <div className={`h-full w-full pointer-events-${props.isEditMode ? 'none' : 'auto'}`}>
              {widget.type === 'card' && (
                <StatCardWidget widget={widget} deviceId={props.deviceId} />
              )}
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default ResponsiveWidgetGrid;
