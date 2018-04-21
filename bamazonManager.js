var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: '',
     database: "Bamazon"
});

connection.connect(function(err) {
     if (err) throw err;
     console.log("connected as Manager " + connection.threadId);
});

function showInventory() {
     connection.query('SELECT * FROM products', function(err, inventory) {
          if (err) throw err;
          console.log("Bamazon's Inventory");
          for(var i = 0; i < inventory.length; i++) {
          console.log("Item ID: " + inventory[i].item_id +  | Department: " + inventory[i].department_name + " $ Price: " +  inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
          } 
     }); 
}

inquirer.prompt([
	
	{
		type: "list",
		message: "Select an option from below",
		choices: ["View All Inventory", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "selection"
	}

// Once we are done with all the questions... "then" we do stuff with the answers
// In this case, we store all of the answers into a "user" object that inquirer makes for us.
     ]).then(function () {
          switch(user.selection) {
               case "View All Inventory":
               showInventory();
               break;



               case "View Low Inventory":
               connection.query('SELECT * FROM products WHERE StockQuantity < 5', function(err, inventory) {
                    if (err) throw err;
                    console.log("Bamazon's Inventory");
                    for(var i = 0; i < inventory.length; i++) {
                    console.log("Item ID: " + inventory[i].id + " | Product: " + inventory[i].product_name + " | Department: " + inventory[i].department_name + " $ Price: " +  inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
                    }
               }); 
               break;



               case "Add to Inventory":
               inquirer.prompt([
               	// 
               	{
               		type: "input",
               		message: "Enter item id to be added?",
               		name: "itemId"
               	},
                    {
               		type: "input",
               		message: "What is the quantity of item being added?",
               		name: "quantity"
               	}
               // 
               // 
          ]).then(function (request) {
                    connection.query('SELECT * FROM products WHERE id=' + request.itemId, function(err, selectedItem) {
                    	if (err) throw err;
                         if (selectedItem[0].stock_quantity - quantity >= 0) {
                              console.log("Added + request.amount + " + selectedItem[0].product_name + " to inventory.");
                              connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [selectedItem[0].stock_quantity + Number(request.amount), request.itemId],
                              function(err, inventory) {
                              	if (err) throw err;
                                   // Runs the prompt again, so the user can keep shopping.
                                   showInventory();
                              });  // Ends the code to add item to the inventory.
                    });
               }); 
               break;

               case "Add New Product":
               inquirer.prompt([
                  
                    {
                         type: "input",
                         message: "Enter name of new product being  added",
                         name: "product_name"
                    },
                    {
                         type: "input",
                         message: "Enter department name for this item",
                         name: "department_name"
                    },
                    {
                         type: "input",
                         message: "What is the price of the item?",
                         name: "price"
                    },
                    {
                         type: "input",
                         message: "What is the quantity of items being added?",
                         name: "stock_quantity"
                    }
               // Once we are done with all the questions... "then" we do stuff with the answers
               // In this case, we store all of the answers into a "user" object that inquirer makes for us.
          ]).then(function (newItem) {

               connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",[newItem.product_name, newItem.department_name, newItem.price, newItem.stock_quantity],
               function(err, inventory) {
                    if (err) throw err;
                    // Runs the prompt again, so the user can keep shopping.
                    console.log("Item successfully added!");
                    showInventory();
               });  // Ends the code to remove item from inventory.


               }); 
          } 

});  