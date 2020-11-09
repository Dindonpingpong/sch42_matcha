
const { setStatus } = require('../models/user');

module.exports = function (io) {
    const mySpace = io.of('/socks');
    let users = new Object();
    
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    mySpace.on('connection', (socket) => {
        console.log(users);

        socket.on('log_in', (nickname) => {
            users[nickname] = socket.id;
            setStatus(["Online", nickname]);
            console.log(users);
        });

        socket.on('send_message', (data) => {
            mySpace.emit(`new_message_${data.nick}_${data.nickto}`, data);
            mySpace.emit(`new_message_${data.nickto}_${data.nick}`, data);
            console.log(users);
        });

        socket.on('disconnect', () => {
            console.log(users);
            const nickname = getKeyByValue(users, socket.id);
            if (users && nickname)
                setStatus(["Offline", nickname]);
        })
    })

}