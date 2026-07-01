import { useEffect, useState, useCallback, useRef } from 'react';
import { useSocket } from '../context/SocketProvider';
import { LivePayload } from '../types/dashboard';

/**
 * React hook that subscribes to live telemetry data for specific device MAC addresses.
 * Returns a Map of MAC -> latest LivePayload, updated in real-time via WebSocket (~3s).
 * 
 * Usage:
 *   const liveData = useLiveTelemetry(['AABBCCDDEEFF', '112233445566']);
 *   const reading = liveData.get('AABBCCDDEEFF');
 */
export function useLiveTelemetry(macAddresses: string[]) {
  const { socket, connected } = useSocket();
  const [liveData, setLiveData] = useState<Map<string, LivePayload>>(new Map());
  const subscribedRef = useRef<string[]>([]);

  // Subscribe to device rooms when socket connects or mac list changes
  useEffect(() => {
    if (!socket || !connected || macAddresses.length === 0) return;

    // Only subscribe to MACs we haven't already subscribed to
    const newMacs = macAddresses.filter(m => !subscribedRef.current.includes(m));
    if (newMacs.length > 0) {
      socket.emit('subscribe', { macAddresses: newMacs });
      subscribedRef.current = [...subscribedRef.current, ...newMacs];
    }
  }, [socket, connected, macAddresses]);

  // Listen for live data events
  useEffect(() => {
    if (!socket) return;

    const handler = (data: LivePayload) => {
      if (!data.mac) return;
      setLiveData(prev => {
        const next = new Map(prev);
        next.set(data.mac, data);
        return next;
      });
    };

    socket.on('live:data', handler);

    return () => {
      socket.off('live:data', handler);
    };
  }, [socket]);

  /**
   * Extract aggregated power/voltage/current from live data for specific channel IDs.
   */
  const getAggregatedValue = useCallback((
    channelIds: number[],
    deviceMacs: string[],
    metric: 'power' | 'voltage' | 'current' | 'power_factor'
  ): number => {
    let totalPower = 0;
    let totalCurrent = 0;
    let voltageSum = 0;
    let voltageCount = 0;
    let pfSum = 0;
    let pfCount = 0;

    for (const mac of deviceMacs) {
      const payload = liveData.get(mac);
      if (!payload?.voltage_channels) continue;

      for (const vc of payload.voltage_channels) {
        if (!Array.isArray(vc.ct)) continue;
        for (const ct of vc.ct) {
          if (channelIds.length === 0 || channelIds.includes(ct.id)) {
            totalPower += ct.p;
            totalCurrent += ct.i;
            voltageSum += vc.v;
            voltageCount++;
            if (ct.pf !== undefined) {
              pfSum += ct.pf;
              pfCount++;
            }
          }
        }
      }
    }

    switch (metric) {
      case 'power': return totalPower;
      case 'current': return totalCurrent;
      case 'voltage': return voltageCount > 0 ? voltageSum / voltageCount : 0;
      case 'power_factor': return pfCount > 0 ? pfSum / pfCount : 1.0;
      default: return 0;
    }
  }, [liveData]);

  return { liveData, getAggregatedValue, connected };
}
