const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 8888;
const http = require('http');
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "isa"
});

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();

});

app.get("/api/v1/" , (req,res) => {
    con.query("SELECT name, score FROM score", (err, result) => {
        if (err) throw err;
        let str = "";
        for (row of result) {
            str += `${row.name}:${row.score}\n`
        }
        res.send(JSON.stringify(result));
    });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port ", PORT);
})
// var server = http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type' : 'text/html',
//      'Access-Control-Allow-Origin' : "*"
//     });
//     con.connect(function(err) {
//         if(err) throw err;
//         console.log("connected");
//         let sql = "INSERT INTO score(name, score) values ('prancis', 41)"
//         con.query(sql, function (err,result) {
//             if (err) throw err;
//             console.log("inserted")
//         })

            

//         });
//     });

// server.listen(9000, () => console.log('server running on port 9000'));