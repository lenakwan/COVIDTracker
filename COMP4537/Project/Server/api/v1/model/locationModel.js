const db = require('../database');

findAllLocations = async () => {
    return await db.pool.query('SELECT * from location_info');
  };

addLocation = async (location_name, covid, user_id, date)=>{
    return await db.pool.query({
        text: "INSERT INTO location_info (location_name, covid, user_id, date) VALUES($1, $2, $3, $4);",
        values: [location_name, covid, user_id, date]
    })
}

deleteLocation = async (location_name, user_id, date)=>{
    return await db.pool.query({
        text: "DELETE FROM location_info WHERE location_name = $1 AND user_id = $2 AND date = $3;",
        values: [location_name, user_id, date]
    });
}

getUserLocations = async (user_id) => {
    return await db.pool.query('SELECT * from location_info WHERE user_id =' +user_id);
  };


module.exports={
  findAllLocations, 
  addLocation,
  deleteLocation,
  getUserLocations
}