import io from "socket.io-client";
const socketChat = io('http://localhost:3001/chat', {
    'multiplex': false, transports: ['websocket'], forceNew: true
  });

const socketNotif = io('http://localhost:3001/notification', {
    'multiplex': false, transports: ['websocket'], forceNew: true
  });

export { socketChat, socketNotif };
