const http = require('http');
const mysql = require("mysql");


const db = mysql.createConnection({
  host: 'db5001067457.hosting-data.io',
  user: "dbu327788",
  password: "1q2w3e4rData!",
  database: "dbs918678",
  port: '3306'
});



var server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    db.connect(function (err) {
        if (err) {
          throw err;
        }
        let message = "Connected to MySQL\n",
            version = "NodeJS" + process.versions.node +'\n',
            response = [message, version].join('\n');
            res.end(response);
    })
});
server.listen;
