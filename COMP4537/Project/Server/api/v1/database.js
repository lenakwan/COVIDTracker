const express = require("express");
const { Pool } = require('pg');
const port = process.env.PORT || 3000;



const pool = new Pool({
    connectionString: 'postgres://aikjuhrslzfqdy:1eff92bd85c4d2a83815f6a4c9a798e1936618bd992cae4f9487b0e873d09cf7@ec2-3-91-139-25.compute-1.amazonaws.com:5432/degs61trjel83u',
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })



    // console.log(data);
    

  
module.exports.pool = pool;
