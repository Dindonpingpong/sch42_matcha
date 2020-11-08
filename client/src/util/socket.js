import io from "socket.io-client";

export let socket = io('http://localhost:3001/jane', {
  'multiplex': false, transports: ['websocket'], forceNew: true
})
