"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql"); // 引入mysql操作的库
exports.default = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456", // 数据库密码
}); // createConnection()会返回一个数据库链接对象，数据库链接对象可以执行各类mysql语句
