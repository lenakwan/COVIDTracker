let db = require('../database');

async function findUser(username,password) {
    return await db.pool.query(`Select * from user_info where user_name='${username}' and password='${password}'`);
}
function getUserId(username) {
    return db.pool.query("Select user_id from user_info where user_name ='" +username +"'");
}
async function registerUser(username, password) {
    return await db.pool.query(`INSERT INTO user_info(user_id, admin, user_name, covid, flight_id, flight_date, password) VALUES (nextval('user_info_user_id_seq'), false, '${username}', false, '123', '2020-11-27', '${password}')`);
}


module.exports = {
    findUser: findUser,
   getUserId: getUserId,
   registerUser: registerUser
}

