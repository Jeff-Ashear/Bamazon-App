const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "6tgKLIO94837",
    database: "bamazon"
});

let itemID = 0;
let desiredQuantity = 0;
let itemPrice = 0;
let orderTotal = 0;

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);
        // console.log("result length: ", result.length)
       
        function userInput1() {
            inquirer
                .prompt([{
                    type: "number",
                    name: "itemID",
                    message: "Please enter the Item ID of the product you wish to purchase: "
                }])
                .then (response => {
                    // console.log("response: ", response)
                    // console.log("response value: ", response.itemID)
                    itemID = response.itemID;
                    // console.log("itemID: ", itemID);
                    if (itemID > result.length) {
                        console.log("Sorry, no such Item ID exists...");
                        userInput1();
                    } else {
                        connection.query("SELECT * FROM products WHERE item_id =" + itemID, function (err, results){
                            if (err) throw err;
                            console.log("The item you've chosen is: ")
                            console.table(results);
                            userInput2();
                        });
                    }
                })
        }
        function userInput2() {
            inquirer
                .prompt([{
                    type: "number",
                    name: "itemQuantity",
                    message: "Please enter the quantity of this item you would like to purchase: "
                }])
                .then (response => {
                    // console.log("response: ", response)
                    desiredQuantity = response.itemQuantity;
                    // console.log("desiredQuantity: ", desiredQuantity)
                    // console.log("item id: ", itemID)
                    connection.query("SELECT stock_quantity FROM products WHERE item_id =" + itemID, function (err, results) {
                        if (err) throw err;
                        console.log("quantity results: ", results)
                        availableQuantity = results[0].stock_quantity;
                        console.log("available quantity: ", availableQuantity)

                        //check to see if quantity is available. If so calculate a total price:
                        if (desiredQuantity > availableQuantity) {
                            console.log("Sorry, insuficient quantity of this product to complete this sale.");
                        } else {
                            console.log("Here's the details of your order...")
                            connection.query("SELECT price FROM products WHERE item_id =" + itemID, function (err, results) {
                                if (err) throw err;
                                // console.log("Price results: ", results)
                                itemPrice = results[0].price;
                                // console.log("Item price: ", itemPrice)
                                orderTotal = itemPrice * desiredQuantity;
                                console.log("Order total: ", orderTotal);
                                console.log("Thank you very much for your buisness.")
                                availableQuantity = availableQuantity - desiredQuantity;
                                // console.log("New available quantity: ", availableQuantity)

                                //update database:
                                connection.query("UPDATE products SET stock_quantity=" + availableQuantity + " WHERE item_id=" + itemID, function (err, results){
                                    if (err) throw err;
                                    console.log("Update results: ", results);
                                });
                                //double check the database to verify code functionality:
                                // connection.query("SELECT * FROM products", function(err, results) {
                                //     if (err) throw err;
                                //     console.table(results);
                                // })
                                connection.end();
                            });

                        }
                    })
                })
        }
        userInput1();


    });

    // connection.end();
});

