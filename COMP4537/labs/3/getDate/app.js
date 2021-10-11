let http = require('http');
let url = require('url');

const math = require('./modules/math');
const time = require('./modules/time');

console.log(`Hello INYOUNG and FRANCIS.`);
console.log(`1 + 2 = ${math.add(1, 2)}`);
console.log(`10 - 4 = ${math.subtract(10, 4)}`);

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    console.log(q.query);
    res.writeHead(200, {'Content-type' : 'text/html'});

    res.end('<h2 style="color:blue">  Hello ' + q.query["name"] + ` What a beautiful day. Server current date and time is ${time.getCurrent()} </h2>`);

}).listen(8000);

//http://localhost:8000/?name=Peter
console.log('listening....');



