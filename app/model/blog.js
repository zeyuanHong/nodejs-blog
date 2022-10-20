"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataOne = exports.getDataTotal = exports.getDataList = exports.delData = exports.saveData = void 0;
const sqlTool_1 = require("../tool/sqlTool");
// 添加数据
function saveData(blog) {
    return (0, sqlTool_1.doSqlParam)('insert into blogs(uid,title,introduction,img,content,blog_type,read_,create_time) values(?,?,?,?,?,?,?,now())', [blog.uid, blog.title, blog.introduction, blog.img, blog.content, blog.blog_type, Math.floor(Math.random() * 100)]);
}
exports.saveData = saveData;
// 删除数据
function delData(id) {
    return (0, sqlTool_1.doSqlParam)(`delete from blogs where id=?`, [id]);
}
exports.delData = delData;
// 读取分页数据
function getDataList(page) {
    return (0, sqlTool_1.doSqlParam)(`select blogs.*,users.nick from blogs,users where blogs.uid=users.id order by id DESC limit ${(page - 1) * 10},10`, []);
}
exports.getDataList = getDataList;
// 查询数据总条数
function getDataTotal() {
    return (0, sqlTool_1.doSqlParam)(`select count(*) as total from blogs`, []);
}
exports.getDataTotal = getDataTotal;
// 读取博客详情
function getDataOne(id) {
    return (0, sqlTool_1.doSqlParam)(`select * from blogs where id=${id}`, []);
}
exports.getDataOne = getDataOne;
