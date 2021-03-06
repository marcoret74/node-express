var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    } else {
        db.run(`CREATE TABLE user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            CONSTRAINT email_unique UNIQUE(email)
            );
        )`,
            (err) => {
                if (err) {
                    // table already created
                    console.log("error!!!");
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?);';
                    db.run(insert, ["admin", "admin@example.com", md5("admin12345")]);
                    db.run(insert, ["user", "user@example.com", md5("user12345")]);
                }
            });
    }
});

module.exports = db;