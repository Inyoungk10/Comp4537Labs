let http = require('http');
let url = require('url');

const util = require('./labs/3/getDate/modules/utils');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    console.log(q.query);
    res.writeHead(200, {'Content-type' : 'text/html'});

    res.end('<h2 style="color:blue">  Hello ' + q.query["name"] + ` What a beautiful day. Server current date and time is ${util.getCurrent()} </h2>`);

}).listen(8000);

//http://localhost:8000/?name=Peter
console.log('listening....');