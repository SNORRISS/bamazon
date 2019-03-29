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