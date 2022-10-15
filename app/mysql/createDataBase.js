"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlTool_1 = require("../tool/sqlTool");
const mysql = require("mysql"); // 引入mysql操作的库
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456", // 数据库密码
}); // createConnection()会返回一个数据库链接对象，数据库链接对象可以执行各类mysql语句
connection.connect(); //创建数据库链接
/**
 * query方法执行一条sql语句
 * err是 执行语句是否有错误
 * results对象  返回执行语句的结果
 * fields 对象 sql语句相关的字段，如果有才返回
 */
// 创建数据库
async function handleFun() {
    // 1. 创建数据库
    let data = await (0, sqlTool_1.doSql)(`create database if not exists blog_data`, connection);
    if (!data.success) {
        console.log(data.data.message);
        connection.destroy(); //  关闭链接
        return;
    }
    // 2. 使用 blog_data 数据库
    data = await (0, sqlTool_1.doSql)(`use blog_data`, connection);
    if (!data.success) {
        console.log(data.data.message);
        connection.destroy(); //  关闭链接
        return;
    }
    // 3.  创建users数据库表
    data = await (0, sqlTool_1.doSql)(`create table if not exists users(
    id bigint primary key auto_increment,
    email varchar(100) not null,
    password varchar(20) not null,
    nick varchar(10) not null,
    avatar varchar(255),
    score int default 0,
    introduction varchar(500)
  )`, connection);
    if (!data.success) {
        console.log("user:" + data.data.message);
        connection.destroy(); //  关闭链接
        return;
    }
    // 插入一个默认用户
    data = await (0, sqlTool_1.doSql)(`insert into users(email,password,nick) values('hzy@gmail.com','test1','123')`, connection);
    if (!data.success) {
        console.log("user:" + data.data.message);
        connection.destroy(); //  关闭链接
        return;
    }
    // 4.  创建博客数据库表
    data = await (0, sqlTool_1.doSql)(`create table if not exists blogs(
    id bigint primary key auto_increment,
    uid int not null,
    title varchar(100) not null,
    introduction varchar(500) not null,
    img varchar(255),
    content longtext,
    blog_type varchar(10),
    read_ int,
    create_time timestamp
  )`, connection);
    if (!data.success) {
        console.log("blogs:" + data.data.message);
        connection.destroy(); //  关闭链接
        return;
    }
    // 5.  创建评论数据库表
    data = await (0, sqlTool_1.doSql)(`create table if not exists articles(
    id bigint primary key auto_increment,
    uid int not null,
    blog_id varchar(100) not null,
    content varchar(255),
    create_time timestamp
  )`, connection);
    if (!data.success) {
        console.log("articles:" + data.data.message);
        connection.destroy(); //  关闭链接
        return;
    }
    // 所有mysql语句执行完成，需要关闭链接
    console.log("mysql 语句执行完成");
    connection.destroy();
}
handleFun();
