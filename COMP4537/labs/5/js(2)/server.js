const express = require("express");
const { Client } = require('pg');
const port = process.env.PORT || 3000;
const app = express();

const client = new Client({
    connectionString: 'postgres://tugjcevljpwyrz:24d2d08e09be41a7b763f56f3a2e9fd183169df6b4e4db978f8c83152926f958@ec2-3-233-236-188.compute-1.amazonaws.com:5432/daga8h5n112nup',
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

app.get("/createdb", (req, res) => {
    client.query("CREATE DATABASE IF NOT EXISTS definitions", (err, result)=>{
        if (err) throw err;
        console.log(result);
    })
});

app.get("/getdef", (req,res) =>{
    client.query("SELECT * FROM definitions", (err, result) =>{
        if (err) throw err;
        console.log(result.rows);
    })
})

app.get("/adddef", (req,res) => {
    client.query("INSERT INTO definitions (word, definition) VALUES ('testWord', 'testDefinition')", (err, result)=>{
        if (err) throw err;
        console.log(result);
    })
})


app.listen(port, (err) => {
    if(err){
        throw err;
    }
    console.log("Listening to Port", port);
});