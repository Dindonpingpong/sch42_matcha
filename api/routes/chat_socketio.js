
const { setStatus, addLog } = require('../models/user');

module.exports = function (io) {
    const mySpace = io.of('/socks');
    let users = new Object();

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    mySpace.on('connection', (socket) => {

        socket.on('log_in', (nickname) => {
            users[nickname] = socket.id;
            setStatus(["Online", nickname])
                .then()
                .catch();
        });

        socket.on('send_message', (data) => {
            mySpace.emit(`new_message_${data.nick}_${data.nickto}`, data);
            mySpace.emit(`new_message_${data.nickto}_${data.nick}`, data);
        });

        socket.on('notification', (data) => {
            if (data.newStatus === 'connect') {
                let tmp = data;
                [tmp.me, tmp.you] = [tmp.you, tmp.me];
                mySpace.emit('new_notification', tmp);
            }
            mySpace.emit('new_notification', data);
        })

        socket.on('disconnect', () => {
            const nickname = getKeyByValue(users, socket.id);

            if (users && nickname)
                setStatus(["Offline", nickname])
                    .then()
                    .catch();
        })
    })

}