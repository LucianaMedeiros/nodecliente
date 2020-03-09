mysql -u root -pcoti
create database BDRC;

use BDRC;

create table cliente (id int primary key auto_increment,
 nome varchar (50),
 email varchar (50) unique,
 idade int);

 insert into cliente values (null,'lu','lu@gmail.com',17);
 insert into cliente values (null,'jo','jo@gmail.com',20);
 insert into cliente values (null,'motoca','motoca@gmail.com',19);

 select * from cliente;


 #npm i