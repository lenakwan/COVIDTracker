const express = require("express");
const { Client } = require('pg');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 



const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  
module.exports={
    query: function(text, values, cb) {
        client.connect(function(err, pgclient, done) {
          pgclient.query(text, values, function(err, result) {
            done();
            cb(err, result);
          })
        });
     }
}