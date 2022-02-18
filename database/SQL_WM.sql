DROP DATABASE db_wm;

CREATE DATABASE db_wm;

USE db_wm;

CREATE TABLE users
  (
     id       INT auto_increment,
     name     VARCHAR(256),
     phone    VARCHAR(256),
     email    VARCHAR(256) UNIQUE,
     pass     VARCHAR(256),
     autdebit BOOLEAN,
     status   BOOLEAN,
     PRIMARY KEY (id)
  );

CREATE TABLE plans
  (
     id     INT auto_increment,
     name   VARCHAR(256),
     price  DECIMAL(10, 2),
     days   VARCHAR(3),
     status BOOLEAN,
     PRIMARY KEY(id)
  );

CREATE TABLE adresses
  (
     id      INT auto_increment,
     zip     VARCHAR(10),
     city    VARCHAR(256),
     street  VARCHAR(256),
     number  VARCHAR(256),
     distric VARCHAR(256),
     state   VARCHAR(256),
     PRIMARY KEY(id)
  );

CREATE TABLE orderstatus
  (
     id   INT auto_increment,
     name VARCHAR(256),
     PRIMARY KEY(id)
  );

CREATE TABLE cards
  (
     id       INT auto_increment,
     name     VARCHAR(256),
     number   VARCHAR(256),
     year     VARCHAR(4),
     month    VARCHAR(2),
     cvv      VARCHAR(4),
     cpf      VARCHAR(17),
     bithdate DATE,
     status   BOOLEAN,
     iduser   INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (iduser) REFERENCES users(id)
  );

CREATE TABLE establishments
  (
     id            INT auto_increment,
     isopen        BOOLEAN,
     banner        VARCHAR(256),
     logo          VARCHAR(256),
     instagram     VARCHAR(256),
     color         VARCHAR(7),
     name          VARCHAR(256),
     deliverymin   DECIMAL(10, 2),
     withdrawalmin DECIMAL(10, 2),
     kmprice       DECIMAL(10, 2),
     description   VARCHAR(1000),
     phone         VARCHAR(20),
     status        BOOLEAN,
     iduser        INT NOT NULL,
     idaddress     INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (iduser) REFERENCES users(id),
     FOREIGN KEY (idaddress) REFERENCES adresses(id)
  );

CREATE TABLE categories
  (
     id              INT auto_increment,
     name            VARCHAR(256),
     idestablishment INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idestablishment) REFERENCES establishments(id)
  );

CREATE TABLE customers
  (
     id        INT auto_increment,
     name      VARCHAR(256),
     phone     VARCHAR(20),
     idaddress INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idaddress) REFERENCES adresses(id)
  );

CREATE TABLE cupons
  (
     id              INT auto_increment,
     code            VARCHAR(256),
     price           DECIMAL(10, 2),
     discount        INT,-- tive que alterar o tipo do atributo 
     idestablishment INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idestablishment) REFERENCES establishments(id)
  );

CREATE TABLE subscriptions
  (
     id        INT auto_increment,
     startdate DATETIME,
     status    BOOLEAN,
     idplan    INT NOT NULL,
     iduser    INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idplan) REFERENCES users(id),
     FOREIGN KEY (iduser) REFERENCES plans(id)
  );

CREATE TABLE districtprices
  (
     id              INT auto_increment,
     city            VARCHAR(256),
     district        VARCHAR(256),
     price           DECIMAL(10, 2),
     idestablishment INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idestablishment) REFERENCES establishments(id)
  );

CREATE TABLE products
  (
     id              INT auto_increment,
     image           VARCHAR(256),
     name            VARCHAR(256),
     price           DECIMAL(10, 2),
     description     VARCHAR(1000),
     ispizza         BOOLEAN,
     status          BOOLEAN,
     idestablishment INT NOT NULL,
     idcategory      INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idestablishment) REFERENCES establishments(id),
     FOREIGN KEY (idcategory) REFERENCES categories(id)
  );

CREATE TABLE promotions
  (
     id        INT auto_increment,
     price     DECIMAL(10, 2),
     discount  INT,
     status    BOOLEAN,
     idproduct INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idproduct) REFERENCES products(id)
  );

CREATE TABLE choices
  (
     id          INT auto_increment,
     name        VARCHAR(256),
     maxselect   VARCHAR(6),
     ismandatory BOOLEAN,
     idproduct   INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idproduct) REFERENCES products(id)
  );

CREATE TABLE additionals
  (
     id          INT auto_increment,
     image       VARCHAR(256),
     name        VARCHAR(256),
     price       DECIMAL(10, 2),
     description VARCHAR(1000),
     status      BOOLEAN,
     idchoice    INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idchoice) REFERENCES choices(id)
  );

CREATE TABLE orders
  (
     id           INT auto_increment,
     amount       DECIMAL,
     price        DECIMAL(10, 2),
     idadditional INT,
     idproduct    INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idadditional) REFERENCES additionals(id),
     FOREIGN KEY (idproduct) REFERENCES products(id)
  );

CREATE TABLE invoices
  (
     id         INT auto_increment,
     cpf        VARCHAR(17),
     price      DECIMAL(10, 2),
     changefor  DECIMAL(10, 2),
     changes    DECIMAL(10, 2),
     idcupom    INT,
     ic_status  INT NOT NULL,
     idorder    INT NOT NULL,
     idcustomer INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY (idcupom) REFERENCES cupons(id),
     FOREIGN KEY (ic_status) REFERENCES orderstatus(id),
     FOREIGN KEY (idorder) REFERENCES orders(id),
     FOREIGN KEY (idcustomer) REFERENCES customers(id)
  ); 
