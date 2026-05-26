import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Trash2, 
  RefreshCw, 
  Search, 
  Terminal, 
  Clock, 
  Info,
  SlidersHorizontal,
  ChevronRight,
  Database,
  Wifi
} from 'lucide-react';
import { mqttDebugApi } from '../../services/api';

interface MqttMessage {
  id: string;
  topic: string;
  payload: string;
  timestamp: string;
}

const MqttDebugger: React.FC = () => {
  const [messages, setMessages] = useState<MqttMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<MqttMessage | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Poll interval reference
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  const fetchMessages = async () => {
    try {
      const response = await mqttDebugApi.getMessages();
      setMessages(response.data);
    } catch (err: any) {
      console.error('Failed to fetch MQTT debug messages:', err);
      setError('Failed to connect to backend logs. Verify authentication and server status.');
    }
  };

  const clearMessages = async () => {
    if (!window.confirm('Are you sure you want to clear all in-memory debug logs?')) return;
    try {
      setLoading(true);
      await mqttDebugApi.clearMessages();
      setMessages([]);
      setSelectedMessage(null);
      setError(null);
    } catch (err) {
      console.error('Failed to clear MQTT debug messages:', err);
      setError('Failed to clear logs.');
    } finally {
      setLoading(false);
    }
  };

  // Poll for messages when live is active
  useEffect(() => {
    fetchMessages(); // Initial fetch

    if (isLive) {
      pollingInterval.current = setInterval(() => {
        fetchMessages();
      }, 2000);
    }

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [isLive]);

  // Topic classification helper
  const getTopicBadgeColor = (topic: string) => {
    if (topic.includes('/telemetry')) return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20';
    if (topic.includes('/status')) return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
    if (topic.includes('/current')) return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
    if (topic.includes('/provisioning')) return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
    return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
  };

  const getTopicType = (topic: string) => {
    if (topic.includes('/telemetry')) return 'Telemetry';
    if (topic.includes('/status')) return 'Status';
    if (topic.includes('/current')) return 'Energy Current';
    if (topic.includes('/provisioning')) return 'Provisioning';
    return 'Other';
  };

  // Filtering messages
  const filteredMessages = messages.filter((msg) => {
    // Topic category filter
    if (topicFilter === 'telemetry' && !msg.topic.includes('/telemetry') && !msg.topic.includes('/current')) return false;
    if (topicFilter === 'status' && !msg.topic.includes('/status')) return false;
    if (topicFilter === 'provisioning' && !msg.topic.includes('/provisioning')) return false;
    
    // Search query search (topic or payload string match)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return msg.topic.toLowerCase().includes(query) || msg.payload.toLowerCase().includes(query);
    }

    return true;
  });

  const tryFormatJson = (payload: string) => {
    try {
      const parsed = JSON.parse(payload);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return payload; // Fallback to raw string
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Terminal className="w-7 h-7 text-blue-500" />
            MQTT Communication Debugger
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Development Sandbox: Monitor and analyze raw messages received from ESP32 edge nodes.
          </p>
        </div>

        {/* Live Broker Connection Badge */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {isLive ? 'Live Capturing (2s)' : 'Capture Paused'}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5" /> Wildcard: bems/#
          </span>
        </div>
      </div>

      {/* Warning Notice Banner */}
      <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/25 p-4 rounded-xl flex gap-3 text-amber-800 dark:text-amber-300 items-start">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm">
          <span className="font-semibold">Developer Notice:</span> This utility captures all MQTT traffic sent under the `bems/#` namespace in-memory (max 200 items). It is strictly for debugging communication during development. Before pushing to production, review the removal guide in <code className="bg-amber-100 dark:bg-amber-950/50 px-1 py-0.5 rounded font-mono text-xs">docs/future_enhancements.md</code>.
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/25 p-4 rounded-xl text-rose-800 dark:text-rose-400 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Side: Message Stream (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm h-[650px]">
          
          {/* Stream Toolbar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              
              {/* Query Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by topic or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    isLive 
                      ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400'
                  }`}
                  title={isLive ? 'Pause auto-polling' : 'Resume auto-polling'}
                >
                  {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isLive ? 'Pause Feed' : 'Resume Feed'}
                </button>

                <button
                  onClick={fetchMessages}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  title="Manual refresh"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>

                <button
                  onClick={clearMessages}
                  disabled={loading || messages.length === 0}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold border border-rose-200 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Logs
                </button>
              </div>
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-400 font-medium mr-1.5 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Category:
              </span>
              {[
                { id: 'all', label: 'All Messages' },
                { id: 'telemetry', label: 'Telemetry & Energy' },
                { id: 'status', label: 'Device Status' },
                { id: 'provisioning', label: 'Provisioning' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTopicFilter(tab.id)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                    topicFilter === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Stream Content */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <Database className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
                <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                  {messages.length === 0 ? 'No MQTT messages recorded yet' : 'No messages match your active filters'}
                </p>
                <p className="text-sm text-slate-400 max-w-sm mt-1">
                  {messages.length === 0 
                    ? 'Publish a test payload from your ESP32 or simulated device on topic structure `bems/` to view real-time data.' 
                    : 'Adjust your search queries or topic categories above.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                      selectedMessage?.id === msg.id 
                        ? 'bg-blue-50/50 border-l-4 border-blue-500 dark:bg-blue-500/5' 
                        : 'border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getTopicBadgeColor(msg.topic)}`}>
                          {getTopicType(msg.topic)}
                        </span>
                        <code className="text-xs font-mono text-slate-800 dark:text-slate-200 font-bold truncate block">
                          {msg.topic}
                        </code>
                      </div>
                      
                      {/* Short summary of the payload */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-xl">
                        {msg.payload}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer count indicator */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-400">
            <span>
              Showing {filteredMessages.length} of {messages.length} buffered messages.
            </span>
            {messages.length > 0 && (
              <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                Limit: 200 items
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Message Inspector (1/3 width) */}
        <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm h-[650px]">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-950 dark:text-slate-100 flex items-center gap-2">
              <Terminal className="w-4.5 h-4.5 text-blue-500" />
              Inspector Dashboard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Inspect details of the selected message below.
            </p>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-slate-950 text-slate-200 font-mono text-xs flex flex-col justify-start">
            {selectedMessage ? (
              <div className="space-y-4 h-full flex flex-col">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                    MQTT TOPIC
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-blue-400 select-all font-semibold break-all">
                    {selectedMessage.topic}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                      CLASSIFICATION
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800 text-slate-300 font-medium">
                      {getTopicType(selectedMessage.topic)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                      TIMESTAMP
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800 text-slate-300">
                      {new Date(selectedMessage.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                    MESSAGE PAYLOAD (FORMATTED JSON)
                  </div>
                  <pre className="bg-slate-900 p-3.5 rounded border border-slate-800 text-emerald-400 select-all overflow-auto flex-1 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                    {tryFormatJson(selectedMessage.payload)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto text-slate-500">
                <Terminal className="w-10 h-10 mb-2.5 text-slate-800" />
                <div className="font-semibold text-slate-400 mb-1">Inspector Idle</div>
                <div className="text-xs text-slate-600 max-w-[200px] leading-relaxed">
                  Click on an active message in the stream to open its formatted payload details here.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MqttDebugger;
