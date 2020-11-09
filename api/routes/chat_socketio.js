
const { setStatus } = require('../models/user');

module.exports = function (io) {
    const mySpace = io.of('/socks');
    let users = new Object();
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    mySpace.on('connection', (socket) => {

        socket.on('log_in', (nickname) => {
            users[nickname] = socket.id;
            setStatus(["Online", nickname]);
        });

        socket.on('send_message', (data) => {
            mySpace.emit(`new_message_${data.nick}`, data);
            mySpace.emit(`new_message_${data.nickTo}`, data);
        });

        socket.on('disconnect', () => {
            const nickname = getKeyByValue(users, socket.id);

            if (users && nickname)
                setStatus(["Offline", nickname]);
        })
    })

}