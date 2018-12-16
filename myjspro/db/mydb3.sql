#//////////////////////////
#//
#// mydb3.sql
#//
#///////////////////////////

CREATE DATABASE MYDB3;

USE MYDB3;

CREATE TABLE CLIENTS3 (
id int NOT NULL auto_increment,
name varchar (30) NOT NULL,
email varchar (99) NOT NULL,
tel varchar (30) NOT NULL,
date1 datetime NOT NULL default '0000/00/00 00:00:00',
date2 datetime NOT NULL default '0000/00/00 00:00:00',
date3 datetime NOT NULL default '0000/00/00 00:00:00',  
PRIMARY KEY (id)
);

GRANT ALL ON MYDB3.* to jspr3@localhost identified by 'jspr33';


