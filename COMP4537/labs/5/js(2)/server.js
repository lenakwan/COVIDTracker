const express = require("express");
const { Client } = require('pg');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser'); 



const client = new Client({
    connectionString: 'postgres://tugjcevljpwyrz:24d2d08e09be41a7b763f56f3a2e9fd183169df6b4e4db978f8c83152926f958@ec2-3-233-236-188.compute-1.amazonaws.com:5432/daga8h5n112nup',
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();


app.get("/getdef/:word", (req,res) =>{
    const word = req.params.word;
    console.log(word);
    client.query("SELECT * FROM definitions", (err, result) =>{
        if (err) throw err;
        console.log(result.rows);

    for (resultword of result.rows) {
        if (resultword.word === word) {
            res.json(resultword.definition);
            console.log('matches word');
            return resultword.definition;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Word not found');
    })
})

app.get("/getall", (req,res) =>{
    client.query("SELECT * FROM definitions", (err, result) =>{
        if (err) throw err;
        console.log(result.rows);
        res.json(result.rows);
        return result.rows;
    })
})

app.use(bodyParser.json()); 
app.post("/definition", (req,res) => {
    let word = req.body.word;
    let def = req.body.definition;
    console.log("word = " +word+ "definition" +def);
    client.query({
        text: "INSERT INTO definitions (word, definition) VALUES($1, $2);",
        values: [word, def]
    });
})


app.listen(port, (err) => {
    if(err){
        throw err;
    }
    console.log("Listening to Port", port);
});