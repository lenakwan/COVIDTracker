let http = require('http');
let url = require('url');
let dt = require('./myModule');

http.createServer(function (req, response){
    let q= url.parse(req.url, true);
    response.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": '*'});
response.end('hello ' + q.query['name'] + ' the current time is ' + dt.myDateTime());
}).listen(process.env.PORT || 3000);

console.log('Server is running and listening...');