let db = require('../database');

async function findUser(username,password) {
    return await db.pool.query(`Select * from user_info where user_name='${username}' and password='${password}'`);
}
function getUserId(username) {
    return db.pool.query("Select id from user_info where user_name ='" +username +"'");
}

module.exports = {
    findUser: findUser,
   getUserId: getUserId
}