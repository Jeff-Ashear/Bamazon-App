DROP TABLE IF EXISTS bamazon;

CREATE DATABASE bamazon;

CREATE TABLE products (

item_id INT AUTO_INCREMENT,

product_name VARCHAR(120),

department_name VARCHAR(50),

price DECIMAL,

stock_quantity INT,

PRIMARY KEY(item_id)

);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('16gb RAM', 'Hardware', '59.99', '19');


-- VALUES ('nvme SSD', 'Hardware', '249.99', '3'),
