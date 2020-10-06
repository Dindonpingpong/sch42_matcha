const express = require('express');
const config = require('config');

const PORT = config.get('port');

const app = express();

app.use(express.json());
app.use('/api/user', require('./routes/user.routes'));

app.listen(PORT, () => console.log('App on ' + PORT));
