"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSqlParam = exports.doSql = void 0;
const sqlPool_1 = __importDefault(require("../mysql/sqlPool"));
// 封装sql语句的执行
function doSql(sqlStr, connection) {
    // 返回promise对象执行的结果，可以解决回调地狱
    return new Promise(function (resolve, reject) {
        connection.query(sqlStr, function (err, results, fields) {
            if (err) {
                reject(err); // 如果有错误调用reject
            }
            else {
                resolve(results); // 如果执行成功返回resolve
            }
        });
    }).then((result) => ({ success: true, data: result }))
        .catch((err) => ({ success: false, data: err }));
}
exports.doSql = doSql;
function doSqlParam(sqlStr, param) {
    // 返回promise对象执行的结果，可以解决回调地狱
    return new Promise(function (resolve, reject) {
        /**
         * err 获取连接池对象出错
         * conn 成功获取的数据库链接对象
         */
        sqlPool_1.default
            .getConnection(function (err, conn) {
            conn.query(sqlStr, param, function (err, results, fields) {
                if (err) {
                    console.log(err);
                    reject(err); // 如果有错误调用reject
                }
                else {
                    resolve(results); // 如果执行成功返回resolve
                }
                conn.release(); // sql执行完成后，需要把数据库链接对象释放，返回到连接池。
            });
        });
    }).then((result) => ({ success: true, data: result }))
        .catch((err) => ({ success: false, data: err }));
}
exports.doSqlParam = doSqlParam;
