var express = require('express');
var app = express();
const path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

// Database

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "qrcodes",
    port: '8889'
})
con.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connection done');
    }
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'index.html'));
    var sql = 'SELECT * FROM ?? ORDER BY id DESC';
    var inserts = ['links'];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.status(200).json({
            result : result
        });

    });
})

app.get('/connect/:code', (req, res) => {
    var code = req.params.code;
    var sql = 'UPDATE ?? SET good = 1 WHERE code = ?';
    var inserts = ['links', code];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        if (err) {
            res.sendFile(path.join(__dirname, 'error.html'));
        }
        res.sendFile(path.join(__dirname, 'index.html'));
    });
})

app.get('/json/:code', (req, res) => {
    var code = req.params.code;
    var sql = 'SELECT * FROM ?? WHERE code = ? ORDER BY id DESC LIMIT 1';
    var inserts = ['links', code];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        if (err) {
            res.status(200).json({
                'error': 'Error during the request'
            });
        }
        res.status(200).json({
            result: result
        });
    });
})

app.post('/createCode', (req, res) => {
    var code = Math.round(Math.random() * Math.pow(10,20));
    var link = req.body.link;
    var sql = 'INSERT INTO ?? (??, ??) VALUES(?, ?)';
    var inserts = ['links', 'code', 'link', code, link];
    sql = mysql.format(sql, inserts);
    con.query(sql, function (err, result) {
        if (err) {
            res.status(200).json({
                'error': 'Error during the request : ' + err
            });
        }
        res.status(200).json({
            success: true,
            code : code
        });
    });
})


// Error 404
app.use(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        'error': 'Url not found'
    });
});


app.listen('3000');