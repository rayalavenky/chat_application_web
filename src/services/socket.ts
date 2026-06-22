type SocketMessageHandler = (data: any) => void;

let socket: WebSocket | null = null;
let currentUserId: string | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
const handlers = new Set<SocketMessageHandler>();

/**
 * Subscribe to parsed socket messages. Handlers are kept at the module level,
 * so they survive reconnects (a new underlying WebSocket reuses them).
 * Returns an unsubscribe function for cleanup.
 */
export const onSocketMessage = (handler: SocketMessageHandler) => {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
};

export const connectSocket = (userId: string) => {
  if (!userId) return socket;

  // Already connected (or connecting) for this user — reuse the socket.
  if (
    socket &&
    currentUserId === userId &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket;
  }

  // Switching users or stale socket — tear the old one down first.
  if (socket) {
    socket.onclose = null;
    socket.close();
  }

  currentUserId = userId;

  socket = new WebSocket(`ws://localhost:8080/ws?userId=${userId}`);

  socket.onopen = () => {
    console.log("Socket Connected");
  };

  socket.onmessage = (event) => {
    let data: any;
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }
    handlers.forEach((handler) => handler(data));
  };

  socket.onclose = () => {
    console.log("Socket Closed");
    // Auto-reconnect while we still have a logged-in user.
    if (currentUserId && !reconnectTimer) {
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        if (currentUserId) connectSocket(currentUserId);
      }, 2000);
    }
  };

  return socket;
};

export const disconnectSocket = () => {
  currentUserId = null;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (socket) {
    socket.onclose = null;
    socket.close();
    socket = null;
  }
};

export const getSocket = () => socket;
