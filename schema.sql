CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products (
    ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(50),
    DepartmentName VARCHAR(50),
    Price DECIMAL(10,2) NULL,
    StockQuantity INTEGER(3) NULL,
    PRIMARY KEY (ItemID)
);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("bar-b-que", "outdoor", 100.00, 10);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("flashlight", "outdoor", 10.00, 20);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("lamp", "furniture", 25.00, 15);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("power-drill", "tool", 55.00, 5);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("stove", "kitchen", 500.00, 5);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("television", "entertainment", 750.00, 5);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("laptop", "computer", 450.00, 10);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("blueray-player", "entertainment", 150.00 ,15 );
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("vacuum", "household", 225.00, 10);
INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity) VALUES ("recliner", "furniture", 550.00, 5);

SELECT * FROM Products;
