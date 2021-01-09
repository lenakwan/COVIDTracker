const locationModel = require('../model/locationModel');
let jwt = require('jsonwebtoken');
const secret = 'MYSECRETKEY';

validLocationData= async (req,res) => {
    let user;
    if (req.headers && req.headers.authorization){
        user = await validateToken(req.headers.authorization);
    }
    if (!user){
        res.status(402).json('Unauthorized user');
    } else {
        console.log('inside controller');
        locationModel.findAllLocations()
        .then( (data) => {
            res.status(200).json(data.rows);
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}

validLocationEntry = async (req,res)=>{
    let user;
    if (req.headers && req.headers.authorization){
        user = await validateToken(req.headers.authorization);
    }
    if (!user){
        res.status(402).json('Unauthorized user');
    } else {
        let body = req.body;

        let location_name = body.location_name;
        let covid = body.covid;
        let user_id = body.user_id;
        let date = body.date;
        locationModel.addLocation(location_name, covid, user_id, date).then( (data) => {
            res.status(200).json('New entry made in database.');
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}

deleteUserLocation = async (req,res) =>{

    let user;
    if (req.headers && req.headers.authorization){
        user = await validateToken(req.headers.authorization);
    }
    if (!user){
        res.status(402).json('Unauthorized user');
    } else {
        let body = req.body;
            console.log(body);
        let location_name = body.location_name;
        let user_id = body.user_id;
        let date = body.date;
        locationModel.deleteLocation(location_name, user_id, date).then( (data) => {
            res.status(200).json('Deleted entry in database.');
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}

validUserLocations= async (req,res) => {
    let user;
    if (req.headers && req.headers.authorization){
        user = await validateToken(req.headers.authorization);
    }
    if (!user){
        res.status(402).json('Unauthorized user');
    } else {
        let user_id = req.params.user_id;
        console.log('inside controller');
        locationModel.getUserLocations(user_id)
        .then( (data) => {
            res.status(200).json(data.rows);
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}

async function validateToken(token) {
    try {
        let user;
        const result  = jwt.verify(token, secret, (err, decode) => {
            if(err) {
                console.log(err);
                return null;
            }
            else {
                user = decode;
                console.log(user);
            }
        });
        return user;
    }
    catch(ex){
        console.log(ex);
        return null;
    }
}

module.exports = {
    validLocationData,
    validLocationEntry,
    deleteUserLocation,
    validUserLocations
}
