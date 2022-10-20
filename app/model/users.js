"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.delData = exports.getDataList = exports.saveData = exports.readLoginData = void 0;
const sqlTool_1 = require("../tool/sqlTool");
function readLoginData(user) {
    return (0, sqlTool_1.doSqlParam)(`select * from users where email=? and password=?`, [user.email, user.password]);
}
exports.readLoginData = readLoginData;
function saveData(user) {
    return (0, sqlTool_1.doSqlParam)(`insert into users(email,password,nick,introduction) values(?,?,?,?)`, [user.email, user.password, user.nick, user.introduction]);
}
exports.saveData = saveData;
function getDataList(page) {
    return (0, sqlTool_1.doSqlParam)(`select * from users order by id DESC limit ${(page - 1) * 10},10 `, []);
}
exports.getDataList = getDataList;
function delData(id) {
    return (0, sqlTool_1.doSqlParam)(`delete from users where id=?`, []);
}
exports.delData = delData;
// 更新数据
function updateData(user) {
    return (0, sqlTool_1.doSqlParam)('update users set email=?,password=?,nick=?,introduction=? where id=?', [user.email, user.password, user.nick, user.introduction, user.id]);
}
exports.updateData = updateData;
