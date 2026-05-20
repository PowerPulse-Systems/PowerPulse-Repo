import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '../../store/useDashboardStore';
import ResponsiveWidgetGrid from '../../components/dashboard/WidgetGrid';
import WidgetConfigModal from '../../components/dashboard/WidgetConfigModal';
import { Widget } from '../../types/dashboard';
import { telemetryApi } from '../../services/api';
import { Activity, Bolt, Clock, Save, X, Plus } from 'lucide-react';

interface SimpleTelemetryReading {
  deviceId: string;
  current: number;
  voltage: number;
  power: number;
  receivedAt: string;
}

const Dashboard: React.FC = () => {
  const { 
    activeDeviceId, 
    isEditMode, 
    toggleEditMode, 
    saveDashboard, 
    cancelEdits,
    addWidget,
    updateWidget
  } = useDashboardStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<{ widget: Widget; id: string } | undefined>();
  const [latestReading, setLatestReading] = useState<SimpleTelemetryReading | null>(null);
  const [telemetryError, setTelemetryError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchLatestReading = async () => {
      try {
        const res = await telemetryApi.getLatest();
        if (!active) return;
        setLatestReading(res.data.data);
        setTelemetryError('');
      } catch (err) {
        if (!active) return;
        console.error('Failed to fetch simple telemetry', err);
        setTelemetryError('Waiting for HTTP telemetry');
      }
    };

    fetchLatestReading();
    const timer = window.setInterval(fetchLatestReading, 5000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const handleAddWidget = (widget: Widget) => {
    addWidget(widget);
  };

  const handleUpdateWidget = (widget: Widget) => {
    if (editingWidget !== undefined) {
      updateWidget(editingWidget.id, widget);
    }
  };

  const openAddModal = () => {
    setEditingWidget(undefined);
    setModalOpen(true);
  };

  const openEditModal = (widget: Widget, id: string) => {
    setEditingWidget({ widget, id });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          Dashboard
          {isEditMode && <span className="text-xs bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full font-medium">EDIT MODE</span>}
        </h1>
        
        <div className="flex gap-3">
          {isEditMode ? (
            <>
              <button 
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Widget
              </button>
              <button 
                onClick={cancelEdits}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button 
                onClick={() => saveDashboard(activeDeviceId)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Save className="w-4 h-4" /> Save Layout
              </button>
            </>
          ) : (
            <button 
              onClick={toggleEditMode}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Edit Dashboard
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>HTTP Current</span>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {latestReading ? latestReading.current.toFixed(2) : '--'}
            <span className="ml-2 text-sm font-medium text-slate-500">A</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>HTTP Voltage</span>
            <Bolt className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {latestReading ? latestReading.voltage.toFixed(1) : '--'}
            <span className="ml-2 text-sm font-medium text-slate-500">V</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Last HTTP Packet</span>
            <Clock className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            {latestReading
              ? new Date(latestReading.receivedAt).toLocaleString()
              : telemetryError || 'No packet received yet'}
          </div>
          {latestReading && (
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {latestReading.deviceId} · {latestReading.power.toFixed(1)} W
            </div>
          )}
        </div>
      </div>

      {!activeDeviceId ? (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500">
          Please select a device from the topbar to view its editable dashboard widgets.
        </div>
      ) : (
        <>

          <ResponsiveWidgetGrid 
            deviceId={activeDeviceId} 
            isEditMode={isEditMode} 
            onEditWidget={openEditModal}
          />

          <WidgetConfigModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            initialWidget={editingWidget?.widget}
            onSave={editingWidget !== undefined ? handleUpdateWidget : handleAddWidget}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
