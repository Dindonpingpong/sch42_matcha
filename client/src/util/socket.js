import io from "socket.io-client";

export const socket = io('http://localhost:3001/socks', {
    'multiplex': false, transports: ['websocket'], forceNew: true
  });
