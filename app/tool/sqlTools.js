"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSql = void 0;
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
