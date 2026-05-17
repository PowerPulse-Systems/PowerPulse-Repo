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
  updateWidget: (index: number, updates: Partial<Widget>) => void;
  removeWidget: (index: number) => void;
  reorderWidgets: (newLayout: any[]) => void;
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
      set({ 
        dashboard: res.data,
        draftWidgets: JSON.parse(JSON.stringify(res.data.widgets)), // Deep copy
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
    try {
      const res = await api.post(`/dashboard/${deviceId}`, { widgets: draftWidgets });
      set({ 
        dashboard: res.data,
        draftWidgets: JSON.parse(JSON.stringify(res.data.widgets)),
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
    set({ draftWidgets: [...draftWidgets, { ...widget, position: draftWidgets.length }] });
  },

  updateWidget: (index: number, updates: Partial<Widget>) => {
    const { draftWidgets } = get();
    const newWidgets = [...draftWidgets];
    newWidgets[index] = { ...newWidgets[index], ...updates };
    set({ draftWidgets: newWidgets });
  },

  removeWidget: (index: number) => {
    const { draftWidgets } = get();
    const newWidgets = draftWidgets.filter((_, i) => i !== index);
    // Update positions
    newWidgets.forEach((w, i) => w.position = i);
    set({ draftWidgets: newWidgets });
  },

  reorderWidgets: (newLayout: any[]) => {
    const { draftWidgets } = get();
    // Sort draftWidgets based on the new layout positions
    const newWidgets = [...draftWidgets];
    newLayout.forEach((layoutItem) => {
      const widgetIndex = parseInt(layoutItem.i);
      if (!isNaN(widgetIndex) && newWidgets[widgetIndex]) {
        // Find position based on y and x (row-major order)
        // Note: react-grid-layout handles actual visual positioning, we just store order
      }
    });
    
    // For simplicity in a 1D array, just re-sort based on Y then X
    newLayout.sort((a, b) => {
      if (a.y === b.y) return a.x - b.x;
      return a.y - b.y;
    });

    const reorderedWidgets = newLayout.map((layoutItem) => {
      const index = parseInt(layoutItem.i);
      return draftWidgets[index];
    }).filter(Boolean);

    // Update positions
    reorderedWidgets.forEach((w, i) => w.position = i);

    set({ draftWidgets: reorderedWidgets });
  }
}));
