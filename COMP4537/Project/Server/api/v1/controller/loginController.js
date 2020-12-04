let userModel = require('../model/usersModel');
// const router = express.Router();
let jwt = require('jsonwebtoken');

async function authUser(req,res) {
    let body = req.body;
    userModel.findUser(body.username ,body.password)
        .then((users)=>{
            if(users.rowCount == 1) {
                console.log(users.rows[0]);
                res.status(200).json({"token":
                    jwt.sign({
                        user_name:users.rows[0].user_name,
                        password:users.rows[0].password
                    },'MYSECRETKEY')
                });
                console.log("Log in!");
            } else {
                res.status(401).json({message: 'No such user'})
            }
        });
}

module.exports = {
    authUser: authUser
}