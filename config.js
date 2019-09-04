var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');

db.serialize(function() {
	db.run("CREATE TABLE if not exists roster_info (name TEXT,address TEXT,email TEXT,phone TEXT,job TEXT,salary TEXT)");
});

module.exports =db;