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
  { console.log("connected as Manager" +  "\n"); }
  

inquirer.prompt([

                {
                 message: "Select an option from below",
                  choices: ["View All Inventory", "View Low Inventory", "Add to Inventory", "Add New Product"],
                  type: "list",
                  name: "selection"
                }
              
                  ]).then(function(manager) {
                      switch(manager.selection) {
                      case "View All Inventory":
                      break;

               case "View Low Inventory":
               connection.query('SELECT * FROM products WHERE stock_quantity < 10', function(err, inventory) {
                    if (err) throw err;
                    console.log("Bamazon's Inventory");
                    for(var i = 0; i < inventory.length; i++) {
                    console.log("Item ID: " + inventory[i].item_id + " | Product: " + inventory[i].product_name + " | Department: " + inventory[i].department_name + " |  Price: $" +  inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
                    }
               }); 
               break;


               case "Add to Inventory":
               inquirer.prompt([
               	
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
            
          ]).then(function (request) {

            var quantity = request.quantity;
             var itemId = request.id;

                    connection.query('SELECT * FROM products WHERE item_id=' + request.itemId, function(err, item) {
                        if (err) throw err;
                    
                         {
               
                             connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [item[0].stock_quantity + Number (request.quantity), request.itemId],
                              function(err, inventory) {
                             	if (err) throw err;
                                   showInventory();
                          });  

                          function showInventory() {
                            connection.query('SELECT * FROM products', function(err, res) {
                              var DisplayTable = new Table({
                                    head: ['item ID', 'Department', 'Product', 'Price', 'Stock Qty'],
                                    colWidths: [10, 20, 25, 10, 15]
                              });
                        
                              for (var i = 0; i < res.length; i++)  {
                              DisplayTable.push(
                                [res[i].item_id, res[i].department_name, res[i].product_name, "$" + res[i].price, res[i].stock_quantity]
                              );
                          }
                              console.log(DisplayTable.toString());
                          
                            
                            });
                          };
                          }});
                        
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
              
          ]).then(function (newItem) {

               connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",[newItem.product_name, newItem.department_name, newItem.price, newItem.stock_quantity],
               function(err, inventory) {
                    if (err) throw err;
                
                    console.log("Item successfully added!");
                    showInventory();
               }); 

               }); 
          } 

});  

})