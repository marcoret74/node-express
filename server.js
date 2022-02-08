// Create express app
var express = require('express');
var app = express();
var db = require("./database");

var HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
});

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": rows });
    });
});

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?";
    var params = [req.params.id];
    db.get(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.use(function (req, res) {
    res.status(404);
});