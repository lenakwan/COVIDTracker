let http = require('http');
let url = require('url');
http.createServer(function (req, response){
    let q= url.parse(req.url, true);
    response.write("Response's coming from the server...\n");
    console.log(q.query);
    response.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": '*'});
    response.end('hello ' + q.query['name']);
}).listen(8888);

console.log('Server is running and listening...');