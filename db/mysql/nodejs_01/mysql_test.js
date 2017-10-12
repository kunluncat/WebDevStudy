/**
 * 
 *  Basic test of using mysql in node.js
 *  
 *  Make sure MySQL is installed and the server instance is running
 *  Make sure a username/password is correctly set in MySQL
 *  Make sure sql driver package is installed by npm
 *  
 *  Examples from https://www.w3schools.com/nodejs/nodejs_mysql.asp
 */

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "ken",
  password: "kenny78",
  multipleStatements: true
});

con.connect(function(err) { if (err) { console.log("Couldn't connect :(    Error: " + err); } });

console.log("Connected!");

var sql;

// Drop database mydb
sql = "DROP DATABASE IF EXISTS mydb";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Table mydb dropped");
});

// Create database
sql = "CREATE DATABASE mydb";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Database mydb created");
});

// User databse
sql = "USE mydb";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("User mydb");
});

// Create table
sql = "CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(255))";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Table products created");
});

sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), favorite_product INT, FOREIGN KEY (favorite_product) REFERENCES products(id))";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Table users created");
});

// Check database
sql = "SHOW TABLES";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Show tables:");
	console.log(result);
});

sql = "EXPLAIN products";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Explain products:");
	console.log(result);
});

sql = "EXPLAIN users";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Explain users:");
	console.log(result);
});

// Insert Rows
sql = "INSERT INTO products SET id = 154, name =	'Chocolate Heaven'; ";
sql += "INSERT INTO products SET id = 155, name = 'Tasty Lemons'; ";
sql += "INSERT INTO products SET id = 156, name = 'Vanilla Dreams'; ";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Insert rows into products:");
});

sql = "INSERT INTO users SET name = 'John', favorite_product = 154;";
sql += "INSERT INTO users SET name = 'Peter', favorite_product = 154;";
sql += "INSERT INTO users SET name = 'Amy', favorite_product = 155;";
sql += "INSERT INTO users SET name = 'Hannah';";
sql += "INSERT INTO users SET name = 'Michael';";
sql += "INSERT INTO users SET name = 'Tom';";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Insert rows into users:");
});

// Select Rows
sql = "SELECT * FROM products;";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Select rows in prodcuts:");
	console.log(result);
});

sql = "SELECT * FROM users;";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Select rows in users:");
	console.log(result);
});

// Update Rows
sql = "UPDATE users SET favorite_product = 156 WHERE name = 'Tom';";
sql += "SELECT * FROM users;";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Updated rows in users:");
	console.log(result);
});

// Delete Rows
sql = "DELETE FROM users WHERE name = 'tom';"
	sql += "SELECT * FROM users;";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Deleted rows in users:");
	console.log(result);
});

// Join
sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Join:");
	console.log(result);
});

// Left Join
sql = "SELECT users.name AS user, products.name AS favorite FROM users LEFT JOIN products ON users.favorite_product = products.id";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Left join:");
	console.log(result);
});

// Right Join
sql = "SELECT users.name AS user, products.name AS favorite FROM users RIGHT JOIN products ON users.favorite_product = products.id";
con.query(sql, function(err, result) {
	if (err)
		throw err;
	console.log("Right join:");
	console.log(result);
});


con.end();
console.log("Disconnected!");