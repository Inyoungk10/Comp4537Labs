let http = require('http');
const math = require('./modules/math');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type' : 'text/plain'});
    res.write("Response's coming from server... \n");

    console.log(`1 + 2 = ${math.add(1, 2)}`);
    console.log(`10 - 4 = ${math.subtract(10, 4)}`);

    res.end();
}).listen(8080);
console.log('listening....');



