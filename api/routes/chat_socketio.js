
module.exports = function (io) {
    const chatRoom = io.of('/jane');
    chatRoom.on('connection', (socket) => {
        console.log('new connect!', socket.id);

        socket.on('new_message', function (data) {
            chatRoom.emit(`chat_message`, data);
        });

        
    })
}