const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 9000;
const http = require('http');
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "lab",
    password: "ISATeamD5",
    database: "isa"
});

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();

});

app.get("/api/v1/scores" , (req,res) => {
    con.query("SELECT name, score FROM score", (err, result) => {
        if (err) throw err;
        let str = "";
        for (row of result) {
            str += `${row.name}:${row.score}\n`
        }
        res.send(JSON.stringify(result));
    });
});

app.post("/api/v1/scores" , function (req, res) {
    let nameq = req.query.name;
    let scoreq = req.query.score;

    let record = {
        "name": nameq,
        "score": scoreq,
        "success": "Record Successfully Added: " + "Name: " + nameq + " Score: " + scoreq
    };

    let sql = "INSERT INTO score (name, score) values (\'" + nameq + "\', " + scoreq + ")";
    con.query(sql, function (sqlErr, sqlRes) {
        //console.log(sqlRes.Message);
        if (sqlErr) {
            res.status(404).send("Error: " + sqlErr.message);
            throw err;
        } else {
        res.status(201).send(JSON.stringify(record));
        }
        console.log("1 record inserted");
    })
    
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening to port ", PORT);
})