const express = require('express');
const config = require('config');
const PORT = config.get('port');
const cors = require('cors');
const app = express();

app.use(express.static('public'))
app.use(express.static('files'))
app.use('/static', express.static('public'))
app.use(cors())
app.use(express.json());

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/register', require('./routes/sign.routes'));
app.use('/api/image', require('./routes/image.routes'));
app.use('/api/remind', require('./routes/remind.routes'));
app.use('/api/chat', require('./routes/message.routes'));

let server = require('http').Server(app);
let io = require('socket.io')(server);
require('./routes/chat_socketio')(io);
app.listen(PORT, () => console.log('App on ' + PORT));
