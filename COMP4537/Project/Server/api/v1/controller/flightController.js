let flightModel = require("../model/flightModel");

validFlightData= async (req,res) => {
    console.log('inside controller');
    flightModel.findAllFlights()
    .then( (data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

validSingleFlightData= async (req,res) => {
    console.log('inside controller');
    let flight_id = req.params.flight_id;
    let flight_date = req.params.flight_date;
    console.log(flight_id + flight_date);
    let flightInfo = flightModel.findSingleFlight(flight_id, flight_date);
    console.log(flightInfo);
    flightInfo.then( ([data,meta]) => {
        res.status(200).json(data);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

validFlightCarrier= async (req,res) => {
    console.log('inside controller');
    let flight_company = req.params.flight_company;
    console.log(flight_company);
    flightModel.findAllCarriers(flight_company)
    .then( (data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

validArrival= async (req,res) => {
    console.log('inside controller');
    flightModel.findArrival().then( (data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

validDeparture= async (req,res) => {
    console.log('inside controller');
    flightModel.findDeparture().then( (data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

// flight_id, flight_date, to_city, from_city, flight_company all require '\'INPUT\'' to work
createFlight = (req,res)=>{
    let body = req.body;
    // console.log(body);
    let flight_id = body.flight_id;
    let flight_date = body.flight_date;
    let to_city = body.to_city;
    let from_city = body.from_city;
    let flight_company = body.flight_company;
    console.log("primary key = " +flight_id+ " & "+ flight_date);
    flightModel.createFlightEntry(flight_id, flight_date, to_city, from_city, flight_company).then( (data) => {
        res.status(200).json('New entry made in database.');
    }).
    catch(e => res.status(500).json({message:e.message}));
}

deleteFlight = (req,res) =>{
    let body = req.body;
    let flight_id = body.flight_id;
    let flight_date = body.flight_date;
    console.log("composite primary key = " +flight_id+ " & "+ flight_date);
    flightModel.deleteFlightEntry(flight_id, flight_date).then( (data) => {
        res.status(200).json('Deleted entry in database.');
    }).
    catch(e => res.status(500).json({message:e.message}));
}

module.exports={
    validFlightData:validFlightData,
    validSingleFlightData:validSingleFlightData,
    validFlightCarrier: validFlightCarrier,
    validArrival : validArrival,
    validDeparture : validDeparture,
    createFlight: createFlight,
    deleteFlight: deleteFlight 
}