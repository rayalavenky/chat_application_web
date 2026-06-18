let socket: WebSocket | null = null;

export const connectSocket = (userId: string) => {

  socket = new WebSocket(
    `ws://localhost:8080/ws?userId=${userId}`
  );

  socket.onopen = () => {
    console.log("Socket Connected");
  };

  socket.onclose = () => {
    console.log("Socket Closed");
  };

  return socket;
};

export const getSocket = () => socket;