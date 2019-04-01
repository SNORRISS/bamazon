var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var productList;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  mainMenu();
}

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Buy", "Exit"]
      }
    ])
    .then(function(user) {
      if (user.choice == "Buy") {
        getProducts();
      } else if (user.choice == "Exit") {
        connection.end();
      }
    });
}

function buyMenu() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "product",
        message: "What would you like to buy?",

        validate: function(input) {
          var done = this.async();

          setTimeout(function() {
            if (!productList.includes(input)) {
              // Pass the return value in the done callback

              done("Please enter a valid product name");

              return;
            }

            done(null, true);
          }, 100);
        }
      },
      {
        type: "input",
        name: "amount",
        message: "How many would you like to buy?",
        validate: function(input) {
          var done = this.async();

          setTimeout(function() {
            if (isNaN(input)) {
              // Pass the return value in the done callback

              done("You need to provide a number");

              return;
            }

            done(null, true);
          }, 100);
        }
      }
    ])
    .then(function(user) {
      buyProducts(user.product, user.amount);
    });
}

function getProducts() {
  connection.query("SELECT * FROM products;", function(err, res) {
    var items = [];
    console.log("----------------------------------");

    for (var i = 0; i < res.length; i++) {
      console.log(
        chalk.red(res[i].product_name) +
          "  $" +
          chalk.green(res[i].price) +
          "  Stock Remaining: " +
          chalk.blue(res[i].stock_quantity)
      );
      items.push(res[i].product_name);
    }
    console.log("----------------------------------");

    productList = items;
    buyMenu();
  });
}

function buyProducts(item, amount) {
  connection.query(
    "SELECT * FROM products WHERE product_name = '" + item + "';",
    function(err, res) {
      if (res[0].stock_quantity >= amount) {
        var newQuant = res[0].stock_quantity - amount;
        var total = amount * res[0].price;
        console.log("----------------------------------");
        console.log(
          chalk.green("Purchase Successful! You were charged $" + total)
        );
        console.log("----------------------------------");
      } else {
        console.log("----------------------------------");
        console.log(chalk.bgRed("NOT ENOUGH STOCK"));
        console.log("----------------------------------");
      }
      mainMenu();
    }
  );
}
