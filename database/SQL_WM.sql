DROP DATABASE db_wm;
CREATE DATABASE db_wm;
USE db_wm;

create table users(
id int auto_increment,
name varchar(256),
phone varchar(256),
email varchar(256) unique,
pass varchar(256),
autDebit boolean,
status boolean,
PRIMARY KEY (id)
);

create table plans(
id int auto_increment,
name varchar(256),
price decimal(10,2),
days varchar(3),
status boolean,
primary key(id)
);

create table adresses(
id int auto_increment,
zip varchar(10),
city varchar(256),
street varchar(256),
number varchar(256),
distric varchar(256),
state varchar(256),
primary key(id)
);

create table orderStatus(
id int auto_increment,
name varchar(256),
primary key(id)
);

create table cards(
id int auto_increment,
name varchar(256),
number varchar(256),
year varchar(4),
month varchar(2),
cvv varchar(4),
cpf varchar(17),
bithdate date,
status boolean,
IDuser int not null,
primary key(id),
foreign key (IDuser) references users(id)
);

create table establishments(
id int auto_increment,
ISopen boolean,
banner varchar(256),
logo varchar(256),
instagram varchar(256),
color varchar(7),
name varchar(256),
deliveryMin decimal(10,2),
withdrawalMin decimal(10,2),
KMprice decimal(10,2),
description varchar(1000),
phone varchar(20),
status boolean,
IDuser int not null,
IDaddress int not null,
primary key(id),
foreign key (IDuser) references users(id),
foreign key (IDaddress) references adresses(id)
);

create table categories(
id int auto_increment,
name varchar(256),
IDestablishment int not null,
primary key(id),
foreign key (IDestablishment) references establishments(id)
);

create table customers(
id int auto_increment,
name varchar(256),
phone varchar(20),
IDaddress int not null,
primary key(id),
foreign key (IDaddress) references adresses(id)
);

create table cupons(
id int auto_increment,
code varchar(256),
price decimal(10,2),
percentage decimal(3,2),
IDestablishment int not null,
primary key(id),
foreign key (IDestablishment) references establishments(id)
);

create table subscriptions(
id int auto_increment,
startDate datetime,
status boolean,
IDplan int not null,
IDuser int not null,
primary key(id),
foreign key (IDplan) references users(id),
foreign key (IDuser) references plans(id)
);

create table districtPrices(
id int auto_increment,
city varchar(256),
district varchar(256),
price decimal(10,2),
IDestablishment int not null,
primary key(id),
foreign key (IDestablishment) references establishments(id)
);

create table products(
id int auto_increment,
image varchar(256),
name varchar(256),
price decimal(10,2),
description varchar(1000),
ISpizza boolean,
status boolean,
IDestablishment int not null,
IDcategory int not null,
primary key(id),
foreign key (IDestablishment) references establishments(id),
foreign key (IDcategory) references categories(id)
);

create table promotions(
id int auto_increment,
price decimal(10,2),
percentage decimal(3,2),
status boolean,
IDproduct int not null,
primary key(id),
foreign key (IDproduct) references products(id)
);

create table choices(
id int auto_increment,
name varchar(256),
maxSelect varchar(6),
ISmandatory boolean,
IDproduct int not null,
primary key(id),
foreign key (IDproduct) references products(id)
);

create table additionals(
id int auto_increment,
image varchar(256),
name varchar(256),
price decimal(10,2),
description varchar(1000),
status boolean,
IDchoice int not null,
primary key(id),
foreign key (IDchoice) references choices(id)
);

create table orders(
id int auto_increment,
amount decimal,
price decimal(10,2),
IDadditional int,
IDproduct int not null,
primary key(id),
foreign key (IDadditional) references additionals(id),
foreign key (IDproduct) references products(id)
);

create table invoices(
id int auto_increment,
cpf varchar(17),
price decimal(10,2),
changefor decimal(10,2),
changes decimal(10,2),
IDcupom int,
status int not null,
IDorder int not null,
idCustomer int not null,
primary key(id),
foreign key (IDcupom) references cupons(id),
foreign key (status) references orderStatus(id),
foreign key (IDorder) references orders(id),
foreign key (idCustomer) references customers(id)
);

insert into orderStatus(name) value ('Pedido em Preparo/Separação');
insert into orderStatus(name) value ('Pedido em Entrega');
insert into orderStatus(name) value ('Pedido em Enviado');

insert into plans (name,price,days,status) value ('Plano Free','0.00','7',true);
insert into plans (name,price,days,status) value ('Plano Business','80.00','30',true);
insert into plans (name,price,days,status) value ('Plano Business Plus','199.00','90',true);
insert into plans (name,price,days,status) value ('Plano Enterprise','499.00','180',true);
insert into plans (name,price,days,status) value ('Plano Enterprise Plus','899.00','365',true);
insert into plans (name,price,days,status) value ('Plano Enterprise Master Plus','1999.00','900',false);

------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into users (name,phone,email,pass,autdebit,status) value ('Katryel Menezes Vieira','139200-08514','katryelmenezesvieira14@gmail.com','40028922@Kk',false,true);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('KATRYEL M VIEIRA','5482271644624754','2030','12','295','85747763008','2001-02-15',1,true);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('LUCAS A D ALEXANDRE','4744550386831645','2031','08','215','49992797037','2001-02-15',1,true);
insert into adresses(zip,city,street,number,distric,state) value ('11046-100','Santos','Rua Seringueira','14','Docas','São Paulo');
insert into establishments(ISopen,banner,logo,instagram,color,name,deliveryMin,withdrawalMin,KMprice,description,phone,status,IDuser,IDaddress) value (true,'https://image.shutterstock.com/z/stock-vector-pizzeria-vector-emblem-on-blackboard-pizza-logo-template-vector-emblem-for-cafe-restaurant-or-635547866.jpg','https://images.unsplash.com/photo-1507090960745-b32f65d3113a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','@abalopizza','#658794','PIZZA ABALO','10.00','10.00','2.00','A melhor pizza de santos','1338227096',true,1,1);
insert into subscriptions (startDate, status, IDplan, IDuser) values ('2022-02-16', true, 1, 1);
insert into categories (name, IDestablishment) values ('Pizzas',1);
insert into categories (name, IDestablishment) values ('Esfihas',1);
insert into categories (name, IDestablishment) values ('Bebidas',1);
------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into users (name,phone,email,pass,autdebit,status) value ('Thiago Henrique Leão','139286-06505','thiago.dev@gmail.com','123456789',false,true);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('THIAGO H LEAO','4916378013476549','2029','03','085','87291973090','2001-02-15',2,true);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('CASEMIRO M SANTOS','4929447141239932','2032','05','205','57524465033','2001-02-15',2,false);
insert into adresses(zip,city,street,number,distric,state) value ('12345-100','Santos','Rua Mandi','20','Gonzaga','São Paulo');
insert into establishments(ISopen,banner,logo,instagram,color,name,deliveryMin,withdrawalMin,KMprice,description,phone,status,IDuser,IDaddress) value (true,'https://seeklogo.com/images/Z/zitta-cafe-logo-AC4A5824B4-seeklogo.com.png','https://images.unsplash.com/photo-1507090960745-b32f65d3113a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80g','@cafemanialg','#065466','CAFE MANIA','10.00','10.00','2.00','Fazer café é nossa mania','1138841227',true,2,2);
insert into subscriptions (startDate, status, IDplan, IDuser) values ('2020-02-16', false, 2, 2);
insert into categories (name, IDestablishment) values ('Cafés',2);
insert into categories (name, IDestablishment) values ('Outras Bebidas',2);
insert into categories (name, IDestablishment) values ('Alcoólicas',2);
insert into categories (name, IDestablishment) values ('Salgados',2);
------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into users (name,phone,email,pass,autdebit,status) value ('Henrique de Ferraz','139950-80525','henrique.dev@gmail.com','123456789',false,true);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('HENRIQUE D FERRAZ','4929038734368913','2025','04','665','96926396060','2001-02-15',3,true);
insert into adresses(zip,city,street,number,distric,state) value ('13044-200','Santos','Travessa Terceira','235','embaré','São Paulo');
insert into establishments(ISopen,banner,logo,instagram,color,name,deliveryMin,withdrawalMin,KMprice,description,phone,status,IDuser,IDaddress) value (false,'https://seeklogo.com/images/A/agua-mineral-santa-clara-logo-DD3F4486DB-seeklogo.com.png','https://images.unsplash.com/photo-1507090960745-b32f65d3113a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','@aguaviva_drinks','#752395','AGUA DRINKS','20.00','10.00','1.00','Todos os tipos de águas e drinks','1635083674',true,3,3);
insert into subscriptions (startDate, status, IDplan, IDuser) values ('2022-02-16', true, 3, 3);
insert into categories (name, IDestablishment) values ('Água',3);
insert into categories (name, IDestablishment) values ('Energetico',3);
insert into categories (name, IDestablishment) values ('Alcoólicas',3);
------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into users (name,phone,email,pass,autdebit,status) value ('Vitor Berto de Santos','139688-32456','vitor.mino@gmail.com','123456789',false,false);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('VITOR M S BEZZERA','5407396498488592','2023','05','455','97807025042','2001-02-15',4,true);
insert into adresses(zip,city,street,number,distric,state) value ('14142-100','Santos','Avenida Maria Letícia Leite Pereira','95','Gonzaga','São Paulo');
insert into establishments(ISopen,banner,logo,instagram,color,name,deliveryMin,withdrawalMin,KMprice,description,phone,status,IDuser,IDaddress) value (true,'https://seeklogo.com/images/C/chilli-beans-logo-F8555DC468-seeklogo.com.png','https://images.unsplash.com/photo-1507090960745-b32f65d3113a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','@telebeans','#415949','TELE BEANS','10.00','0.00','0.80','Vendemos óculos por telesinése','1123117162',true,4,4);
insert into subscriptions (startDate, status, IDplan, IDuser) values ('2022-02-16', true, 4, 4);
insert into categories (name, IDestablishment) values ('Óculos',4);
insert into categories (name, IDestablishment) values ('Relógios',4);
insert into categories (name, IDestablishment) values ('Outros Acessórios',4);
------------------------------------------------------------------------------------------------------------------------------------------------------------------
insert into users (name,phone,email,pass,autdebit,status) value ('Bruno Brazzer','139932-98514','bruno.brazzer@gmail.com','123456789',false,false);
insert into cards(name,number,year,month,cvv,cpf,bithdate,IDuser,status) value ('BRUNO P BRAZZER','5520343936718893','2028','09','525','95107396003','2001-02-15',5,true);
insert into adresses(zip,city,street,number,distric,state) value ('18440-200','Santos','Rua João Ebert','65','Jabaquara José Menino','São Paulo');
insert into establishments(ISopen,banner,logo,instagram,color,name,deliveryMin,withdrawalMin,KMprice,description,phone,status,IDuser,IDaddress) value (false,'https://image.shutterstock.com/image-vector/baby-shop-logo-vector-symbol-600w-1079836013.jpg','https://images.unsplash.com/photo-1507090960745-b32f65d3113a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80','@marisaroupas','#648789','MARISA ROUPAS','10.00','10.00','5.00','Roupas femininas e outros','1327179868',true,5,5);
insert into subscriptions (startDate, status, IDplan, IDuser) values ('2022-02-16', true, 5, 5);
insert into categories (name, IDestablishment) values ('Blusa',5);
insert into categories (name, IDestablishment) values ('jeans',5);
insert into categories (name, IDestablishment) values ('infantil',5);
------------------------------------------------------------------------------------------------------------------------------------------------------------------