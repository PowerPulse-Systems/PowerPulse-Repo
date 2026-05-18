import { create } from 'zustand';
import { Widget, Dashboard } from '../types/dashboard';
import api from '../services/api';

interface DashboardState {
  activeDeviceId: string | null;
  dashboard: Dashboard | null;
  draftWidgets: Widget[];
  isEditMode: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setActiveDevice: (id: string) => void;
  fetchDashboard: (deviceId: string) => Promise<void>;
  toggleEditMode: () => void;
  saveDashboard: (deviceId: string) => Promise<void>;
  cancelEdits: () => void;
  
  // Widget actions
  addWidget: (widget: Widget) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (oldIndex: number, newIndex: number) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeDeviceId: null,
  dashboard: null,
  draftWidgets: [],
  isEditMode: false,
  isLoading: false,
  error: null,

  setActiveDevice: (id: string) => {
    set({ activeDeviceId: id });
    get().fetchDashboard(id);
  },

  fetchDashboard: async (deviceId: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get(`/dashboard/${deviceId}`);
      const widgetsWithIds = res.data.widgets.map((w: any) => ({ ...w, id: w.id || `temp-${Math.random()}` }));
      set({ 
        dashboard: { ...res.data, widgets: widgetsWithIds },
        draftWidgets: JSON.parse(JSON.stringify(widgetsWithIds)), // Deep copy
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  toggleEditMode: () => {
    const { isEditMode, dashboard } = get();
    if (!isEditMode && dashboard) {
      // Entering edit mode, make a fresh copy of widgets
      set({ draftWidgets: JSON.parse(JSON.stringify(dashboard.widgets)), isEditMode: true });
    } else {
      set({ isEditMode: false });
    }
  },

  saveDashboard: async (deviceId: string) => {
    const { draftWidgets } = get();
    set({ isLoading: true });
    
    // Assign position based on current array order
    const widgetsToSave = draftWidgets.map((w, index) => ({
      ...w,
      position: index
    }));

    try {
      const res = await api.post(`/dashboard/${deviceId}`, { widgets: widgetsToSave });
      const widgetsWithIds = res.data.widgets.map((w: any) => ({ ...w, id: w.id || `temp-${Math.random()}` }));
      
      set({ 
        dashboard: { ...res.data, widgets: widgetsWithIds },
        draftWidgets: JSON.parse(JSON.stringify(widgetsWithIds)),
        isEditMode: false,
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  cancelEdits: () => {
    const { dashboard } = get();
    set({ 
      draftWidgets: dashboard ? JSON.parse(JSON.stringify(dashboard.widgets)) : [],
      isEditMode: false 
    });
  },

  addWidget: (widget: Widget) => {
    const { draftWidgets } = get();
    const newWidget = { 
      ...widget, 
      id: widget.id || `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      position: draftWidgets.length 
    };
    set({ draftWidgets: [...draftWidgets, newWidget] });
  },

  updateWidget: (id: string, updates: Partial<Widget>) => {
    const { draftWidgets } = get();
    set({ 
      draftWidgets: draftWidgets.map(w => w.id === id ? { ...w, ...updates } : w)
    });
  },

  removeWidget: (id: string) => {
    const { draftWidgets } = get();
    set({ draftWidgets: draftWidgets.filter(w => w.id !== id) });
  },

  reorderWidgets: (oldIndex: number, newIndex: number) => {
    const { draftWidgets } = get();
    const newWidgets = [...draftWidgets];
    const [movedItem] = newWidgets.splice(oldIndex, 1);
    newWidgets.splice(newIndex, 0, movedItem);
    
    // Update positions
    newWidgets.forEach((w, i) => w.position = i);
    set({ draftWidgets: newWidgets });
  }
}));
