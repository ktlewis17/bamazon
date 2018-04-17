var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",
    password: "",
    database: "bamazon"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    queryAllProducts();
});

function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name+ " | " + res[i].price);
      }
      console.log("-----------------------------------");
    });
  }


inquirer.prompt ([
    { name: "Product ID",
     message: "What is the product ID you're searching for?",
   },
   {
     name: "Number of units",
     message:"How many units of the products would you like to purchase?"
   }
   ])
 
   .then(function(inquirerResponse) {
     // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
     if (inquirerResponse.confirm) {
       console.log("Your selections have been received");
     }
     else {
       console.log("Unavailable" + inquirerResponse)
     }
    })

  