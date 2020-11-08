
module.exports = function (io) {
    const chatSpace = io.of('/chat');
    const notifSpace = io.of('/notification');

    chatSpace.on('connection', (socket) => {
        console.log('new connect!', socket.id);

        socket.on('new_message', function (data) {
            chatSpace.emit(`chat_message`, data);
        });
        
    })

    notifSpace.on('connection', (socket) => {
        console.log('connect to notif', socket.id);

    })
}