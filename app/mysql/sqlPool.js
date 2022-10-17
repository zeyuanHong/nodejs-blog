"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql"); // 引入mysql操作的库
const mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "blog_data" // 创建链接的时候默认选中的数据库
});
exports.default = mysqlPool;
