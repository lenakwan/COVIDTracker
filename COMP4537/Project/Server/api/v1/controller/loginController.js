let userModel = require('../model/usersModel');
let jwt = require('jsonwebtoken');
const secret = 'MYSECRETKEY';

async function authUser(req,res) {
    let body = req.body;
    userModel.findUser(body.username ,body.password)
        .then((users)=>{
            if(users.rowCount == 1) {
                res.status(200).json({token:
                    jwt.sign({
                        user_name:users.rows[0].user_name,
                        password:users.rows[0].password,
                        admin: users.rows[0].admin,
                        flight_id: users.rows[0].flight_id,
                        flight_date: users.rows[0].flight_date,
                        covid: users.rows[0].covid
                    }, secret),
                    admin: users.rows[0].admin,
                    flight_id: users.rows[0].flight_id,
                    flight_date: users.rows[0].flight_date,
                    covid: users.rows[0].covid
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
                userModel.registerUser(body.username ,body.password, body.flight_id, body.flight_date)
                .then(() => {
                        console.log("User created: " + body.username);
                        res.status(200).json({token:
                            jwt.sign({
                                user_name: body.username,
                                password: body.password,
                                admin: users.rows[0].admin,
                                flight_id: users.rows[0].flight_id,
                                flight_date: users.rows[0].flight_date,
                                covid: users.rows[0].covid
                            },'MYSECRETKEY'),
                            admin: users.rows[0].admin,
                            flight_id: users.rows[0].flight_id,
                            flight_date: users.rows[0].flight_date,
                            covid: users.rows[0].covid
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


async function getToken(req,res) {
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

module.exports = {
    authUser: authUser,
    register: register
}