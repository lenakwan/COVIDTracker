const locationModel = require('../model/locationModel');

validLocationData= async (req,res) => {
    console.log('inside controller');
    locationModel.findAllLocations()
    .then( (data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

validLocationEntry = (req,res)=>{
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

deleteUserLocation = (req,res) =>{
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

validUserLocations= async (req,res) => {
    let user_id = req.params.user_id;
    console.log('inside controller');
    locationModel.getUserLocations(user_id)
    .then( (data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

module.exports = {
    validLocationData,
    validLocationEntry,
    deleteUserLocation,
    validUserLocations
}
