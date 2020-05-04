const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "6tgKLIO94837",
    database: "bamazon"
});

// let desriedItemId = process.argv[2];
// let desiredQuantity = process.argv[2];

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.table(result);
    });
    
    let desiredItemId = prompt("Enter the item_id of the product you'd like to purchase: ");
    let desiredItem = connection.query("SELECT * FROM products WHERE item_id =" + desiredItemID, function(err, result) {
        if (err) throw err;
        console.table(result);
    });
    console.log("you entered ", desiredItemId)

    connection.end();
});

