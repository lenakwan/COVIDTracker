let flightModel = require("../model/flightModel");

async function validFlightData(req,res){
    console.log('inside controller');
    flightInfo = flightModel.findAllFlights();
    console.log(flightInfo);
    flightInfo.then( ([data,meta]) => {
        res.status(200).json(data);
    }).
    catch(e => res.status(500).json({message:e.message}))
}



module.exports={
    validFlightData:validFlightData
}