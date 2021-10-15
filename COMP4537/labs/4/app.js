let http = require('http');
let url = require('url');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "comp4537"
});

const server = http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    console.log(q.query);
    if (req.method === "GET") {
        let word = q.query["word"];
        res.writeHead(200, {
            'Content-type' : 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        con.connect(function(err) {
            if (err) throw err;
            console.log("connected");
            // get word name from request
            let sql = `SELECT wordName FROM words WHERE wordName = ${word}`;// sql satement
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });

    } else if (req.method === "POST") {
        res.writeHead(200, {
            'Content-type' : 'text/html',
            'Access-Control-Allow-Origin': '*'
        });

        let word = q.query["word"];
        let wordDef = q.query["definition"];

        con.connect(function(err) {
            if (err) throw err;
            console.log("connected");
            // get wordname and get word definition
            let sql = `INSERT INTO words (wordName, wordDef) values (${word}, ${wordDef})`;// sql satement
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
        res.end(``);
    }
    

});

server.listen(9000);

console.log('listening....');