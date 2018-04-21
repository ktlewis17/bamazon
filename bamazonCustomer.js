var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "",
    database: "bamazon"

});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as Customer" + connection.threadId + "\n");
AllProducts();
});

function AllProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
      var DisplayTable = new Table({
            head: ['item ID', 'Department', 'Product', 'Price $', 'Stock Qty'],
            colWidths: [10, 20, 25, 10, 15]
      });

      for (var i = 0; i < res.length; i++)  {
      DisplayTable.push(
        [res[i].item_id, res[i].department_name, res[i].product_name,  res[i].price, res[i].stock_quantity]
      );
  }
      console.log(DisplayTable.toString());
      yourOrder ();
    
    });
  }
  

function yourOrder () {
inquirer
.prompt([
    { 
     name: "ID",
     type: 'input',
     message: "What is the product ID you're searching for?"
   },
   {
     name: "Quantity",
     type: 'input',
     message: "How many units of the products would you like to purchase?"
   },
   ]).then(function(order) {
      // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
      var selQuantity = order.selQuantity;
      var itemID = order.ID;
      var totalPrice = response[0].Price * quantityNeeded;
        
    connection.query('SELECT * FROM products WHERE item_id = ' + itemID, function(err, selItem){
    if (err) {console.log(err) };

    if (selItem[0].stock_Quantity - selQuantity >= 0){
      var totalPrice = response[0].Price * quantityNeeded;
      console.log ("Selection successful");
      console.log("Your total cost for" + selQuantity + " " + res[0].product_name + " is $" + totalPrice + " " );

      connection.query('Update Products SET stock_quantity =? WHERE item_id=?', [selItem[0].stock_Quantity - selQuantity, itemID]);
    }
    else {
      console.log("Insufficient Quantity. Product is unavailable at this time");
      
    };
    AllProducts ();
  });
}) } 