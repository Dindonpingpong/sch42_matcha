const express = require('express');
const config = require('config');
const PORT = config.get('port');

const app = express();

app.use(express.json());

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/register', require('./routes/sign.routes'));
app.use('/api/image', require('./routes/image.routes'));
app.use('/api/remind', require('./routes/remind.routes'));
app.use('/api/chat', require('./routes/message.routes'));

app.listen(PORT, () => console.log('App on ' + PORT));
