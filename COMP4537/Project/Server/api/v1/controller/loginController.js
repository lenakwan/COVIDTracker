let userModel = require('../model/usersModel');
let jwt = require('jsonwebtoken');

async function authUser(req,res) {
    let body = req.body;
    userModel.findUser(body.username ,body.password)
        .then((users)=>{
            if(users.rowCount == 1) {
                res.status(200).json({token:
                    jwt.sign({
                        user_name:users.rows[0].user_name,
                        password:users.rows[0].password
                    },'MYSECRETKEY'),
                    admin: users.rows[0].admin,
                    flight_id: users.rows[0].flight_id,
                    flight_date: users.rows[0].flight_date,
                    covid: users.rows[0].covid,
                    user_id: users.rows[0].user_id

                });
                console.log("Log in!");
            } else {
                res.status(401).json({message: 'No such user'})
            }
        });
}
async function register(req,res) {
    let body = req.body;
    try{
        //check if user exist
        userModel.getUserId(body.username)
        .then((result)=>{
            if(result.rowCount == 0) {
                console.log('No such user. Lets go');

                userModel.registerUser(body.username ,body.password)
                    .then(() => {
                        console.log("User created: " + body.username);
                        res.status(200).json({token:
                            jwt.sign({
                                user_name: body.username,
                                password: body.password
                            },'MYSECRETKEY')
                    });                    
                })
            } else {
                res.status(401).json({message: 'Username already exists'});
            }
        });

    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    authUser: authUser,
    register: register
}