const db = require('../config/Connector');

const getPage = (id, location, offset) => {
    const sql = `SELECT nickName, firstName, lastName, rate FROM Users 
    WHERE id !=(SELECT idTo FROM ConnectionsWHERE idFrom=$1 AND status='ignore') 
    AND location[3]=$2 
    LIMIT 3 OFFSET $3`;

    db.any(sql, [id, location, offset]);
}

const getInfo = (login) => {
    const sql = 'SELECT id, location[3] FROM Users WHERE nickName=$1';

    return db.any(sql, [login]);
}

exports.getPage = getPage;
exports.getInfo = getInfo;