DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;



USE bamazon;

CREATE TABLE  products(

item_id int(11) NOT NULL,
product_name varchar(30),
department_name varchar(30),
price decimal(18,2),
stock_quantity int(11),
PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DOOM", "Games", 60.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Quake", "Games", 59.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CS:GO", "Games", 10.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("POE", "Games", 40.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DOTA", "Games", 1.00, 50);