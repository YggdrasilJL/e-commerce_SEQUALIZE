drop database if exists ecommerce_db;
create database ecommerce_db;

use ecommerce_db;

drop table if exists Category, Product, Tag, ProductTag;

create table Category (
    id int not null auto_increment primary key,
    category_name varchar(30) not null
);

create table Product (
   id int not null auto_increment primary key,
   product_name varchar(30) not null,
   price decimal not null,
   stock int not null default 10,
   category_id int,
   foreign key (category_id) references Category(id)
);

create table Tag (
    id int not null auto_increment primary key,
    tag_name varchar(30)
);

create table ProductTag (
    id int not null auto_increment primary key,
    product_id int,
    foreign key (product_id) references Product(id),
    tag_id int,
    foreign key (tag_id) references Tag(id)
);

