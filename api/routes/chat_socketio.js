
module.exports = function (io) {
    const chatRoom = io.of('api/io/chat');
    chatRoom.on('connection', (socket) => {
        console.log('new connect!', socket.id
        );
        socket.on('new_message',function (data){
            console.log('DATA IN SOCKET',data)

            chatRoom.emit(`msg_to_${data.idfrom}`,data);
            chatRoom.emit(`msg_to_${data.idto}`,data);
        })

    })
}