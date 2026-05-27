import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ socket: null, connected: false });

export const useSocket = () => useContext(SocketContext);

const WS_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface SocketProviderProps {
  children: React.ReactNode;
}

/**
 * Provides a single Socket.IO connection for the entire app.
 * Automatically connects when a JWT token is available and disconnects on logout.
 */
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // No token — don't connect
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setConnected(false);
      }
      return;
    }

    // Create socket connection with JWT auth
    const socket = io(WS_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log('[WS] Connected to live telemetry gateway');
      setConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log(`[WS] Disconnected: ${reason}`);
      setConnected(false);
    });

    socket.on('error', (err) => {
      console.error('[WS] Error:', err);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
