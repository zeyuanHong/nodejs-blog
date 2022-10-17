"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = exports.readLoginData = void 0;
const sqlTool_1 = require("../tool/sqlTool");
function readLoginData(user) {
    return (0, sqlTool_1.doSqlParam)(`select * from users where email=? and password=?`, [user.email, user.password]);
}
exports.readLoginData = readLoginData;
function saveData(user) {
    return (0, sqlTool_1.doSqlParam)('insert into users(email,password,nick,introduction) values(?,?,?,?)', [user.email, user.password, user.nick, user.introduction]);
}
exports.saveData = saveData;
