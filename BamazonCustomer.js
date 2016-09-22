var inquirer = require('inquirer');
var connection = require('./connection.js');

// Populate menu Array and Object to be used for menu listing on command line as well as validating existing menu numbers
var populateItemTable = function(cb) {
    var menuItem = {};
    var menuTable = [];
    connection.query('SELECT * FROM Products', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            menuItem[res[i].ItemID] = res[i].ProductName;
            menuTable.push(res[i].ItemID);
        }
        cb(menuItem, menuTable);
    });
}

// Ask customer for Product ID choice and quantity and process request accordingly
var order = function(menuItem, menuTable) {
    for (var item in menuItem) {
        console.log(item + ': ' + menuItem[item]);
    }
    inquirer.prompt([
        {
            // Ask for Product ID choice number
            type: "input",
            message: "Please enter product ID number to purchase",
            name: 'item',
            // Validate against populated menu Array list
            validate: function(value) {
                choice = parseInt(value);
                if (menuTable.indexOf(choice) === -1) {
                    console.log("\nPlease enter a valid menu item.");
                    for (var item in menuItem) {
                        console.log(item + ': ' + menuItem[item]);
                    }
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            // Ask for quantity of items to purchase
            type: "input",
            message: "Please enter quantity to purchase.",
            name: 'quantity',
            // Validate to be sure value is a numeric value
            validate: function(value) {
                if (isNaN(value) === false && parseInt(value)) {
                    return true;
                } else {
                    console.log("\nPlease enter a valid numeric quantity.");
                    return false;
                }
            }
        }
        ]).then(function(data) {
            // Query databaes for quantity of items
            connection.query('SELECT * FROM Products WHERE ?',[{itemID:data.item}], function(err, res) {
                if (err) throw err;
                // Process order if sufficient quantity available
                if (res[0].StockQuantity >= data.quantity) {
                    console.log("Sufficient Quantity");
                    var newQuantity = res[0].StockQuantity - data.quantity;
                    var cost = data.quantity * res[0].Price;
                    var item = res[0].ProductName;
                    // Update Database with new quantity for item being ordered
                    connection.query('UPDATE Products SET ? WHERE ?',[{StockQuantity:newQuantity},{ItemID:res[0].ItemID}], function(err, res) {
                        if (err) throw err;
                        console.log('Inventory updated.');
                        console.log("Items left in stock: " + newQuantity);
                        console.log("Your Cost for " + data.quantity + " " + item + ": " + cost + " dollars.");
                        // Ask whether customer would like to buy another item
                        inquirer.prompt([
                        {
                            type: "list",
                            message: "Would you like to buy another item?",
                            choices: ["yes", "no"],
                            name: "answer"
                        }
                        ]).then(function(answer) {
                            // If yes, call whole function again to start process all over again
                            if (answer.answer === "yes") {
                                populateItemTable(order);
                            } else {
                                // If no, log goodbye message and close database connection
                                console.log("Thank you for your business!  Please come back soon.");
                                connection.end();
                            }
                        });
                    });
                } else {
                    // Sufficient quantity not available - output log and call whole function again to start process all over
                    console.log("Insufficient Quantity.");
                    populateItemTable(order);
                }
            });
        });
}

// Initial call of function to start buy process
// Include callback to asynchronous function so that the resulting data can be used in another function
populateItemTable(order);
