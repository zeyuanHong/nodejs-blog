"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataTotal = exports.getDataList = exports.saveData = void 0;
const sqlTool_1 = require("../tool/sqlTool");
// 添加数据
function saveData(data) {
    return (0, sqlTool_1.doSqlParam)('insert into articles(uid,blog_id,content,create_time) values(?,?,?,now())', [data.uid, data.blog_id, data.content]);
}
exports.saveData = saveData;
// 获取评论列表
function getDataList(page, blog_id) {
    return (0, sqlTool_1.doSqlParam)(`select * from articles where blog_id=? order by id DESC limit ${(page - 1) * 3},3`, [blog_id]);
}
exports.getDataList = getDataList;
// 查询数据总条数
function getDataTotal(blog_id) {
    return (0, sqlTool_1.doSqlParam)(`select count(*) as total from articles where blog_id=?`, [blog_id]);
}
exports.getDataTotal = getDataTotal;
