let userModel = require('../model/usersModel');
let jwt = require('jsonwebtoken');
let secret = 'MYSECRETKEY';

async function authUser(req,res) {
    let body = req.body;
    userModel.findUser(body.username ,body.password)
        .then((users)=>{
            console.log(users);
            if(users.rowCount == 1) {
                res.status(200).json({token:
                    jwt.sign({
                        user_name:users.rows[0].user_name,
                        password:users.rows[0].password
                    }, secret),
                    admin: users.rows[0].admin
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
                                password: body.password
                            }, secret)
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


async function validateToken(token, secret) {
    try {
        const result  = jwt.verify(token, secret);
      
        return {
            "name": result.name,
            "role": result.role,
        }
    }
    catch(ex){
        return null;
    }
   
  
}

module.exports = {
    authUser: authUser,
    register: register
}