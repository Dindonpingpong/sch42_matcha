import io from "socket.io-client";

export const socket = io('http://localhost:5001/socks', {
    'multiplex': false, transports: ['websocket'], forceNew: true
  });
