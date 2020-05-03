const mysql = require("mysql");
const readline = require("readline");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "6tgKLIO94837",
    database: "bamazon"
});

//capture user input during the program 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//go here to continue the above attempt:
//https://www.codecademy.com/articles/getting-user-input-in-node-js

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
    });


    connection.end();
});

