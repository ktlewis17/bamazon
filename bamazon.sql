
DROP TABLE IF EXISTS `products`;

CREATE DATABASE  BAMAZON;
USE BAMAZON;


CREATE TABLE 'products' (

	item_id INTEGER (10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR (50) NOT NULL,
	department_name VARCHAR (50) NOT NULL,
	price DECIMAL (10,2) NOT NULL,
	stock_quantity INTEGER (10) NULL,
    PRIMARY KEY (item_id)
	);


    INSERT INTO Products(product_name,department_name,Price, stock_quantity) VALUES('Prada Purse','Apparel',1834,266);
