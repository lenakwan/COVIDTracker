let http = require('http');
let url = require('url');
let dt = require('./myModule');

http.createServer(function (req, response){
    let q= url.parse(req.url, true);
    response.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": '*'});
    console.log('Hello ' + q.query['name'] + ' the current time is ' + dt.myDateTime());
    response.end('Hello ' + q.query['name'] + ', the current server time is ' + dt.myDateTime());
}).listen(8080);

console.log('Server is running and listening...');