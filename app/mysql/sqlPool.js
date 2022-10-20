"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql"); // 引入mysql操作的库
const config_1 = require("../config/config");
const mysqlPool = mysql.createPool(Object.assign({}, config_1.mysqlConfig));
exports.default = mysqlPool;
