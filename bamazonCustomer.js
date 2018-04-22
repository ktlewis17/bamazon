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
  { console.log("connected as Customer" + connection.threadId + "\n"); }
AllProducts();
});

function AllProducts() {
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
      yourOrder ();
    
    });
  };
  

function yourOrder () {
inquirer
.prompt([
    { 
     name: "id",
     type: 'input',
     message: "What is the product ID you're searching for?"
   },
   {
     name: "quantity",
     type: 'input',
     message: "How many units of the products would you like to purchase?"
   },
   ]).then(function(order) {

    var quantity = order.quantity;
      var itemId = order.id;
    
      connection.query('SELECT * FROM products WHERE item_id=' + itemId, function(err, item ) {
        if (err) throw err;
           if (item[0].stock_quantity - quantity >= 0) {
                console.log("Quantity in Stock: " + item[0].stock_quantity + " Quantity Ordered: " + quantity);
                console.log("Your total $ " + (order.quantity * item[0].price));
                             
               connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [item[0].stock_quantity - quantity, itemId],
                function(err) {
                 if (err) throw err;
                     
                    AllProducts();
               });  

              }

           else {
                console.log("Insufficient quantity. Product Unavailable")
                AllProducts();
           }
      });
    })}