"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogListByKey = exports.getDataPreOrNext = exports.getDataOneAndUser = exports.getBlogDataByOrderCount = exports.getBlogDataByOrder = exports.updateData = exports.getDataCount = exports.getDataOne = exports.getDataTotal = exports.getDataList = exports.delData = exports.saveData = void 0;
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
// 读取博客数量
function getDataCount() {
    return (0, sqlTool_1.doSqlParam)(`select count(*) as blogTotal from blogs`, []);
}
exports.getDataCount = getDataCount;
// 更新博客
function updateData(blog) {
    return (0, sqlTool_1.doSqlParam)(`update blogs set title=?,introduction=?,img=?,content=?,blog_type=? where id=?`, [blog.title, blog.introduction, blog.img, blog.content, blog.blog_type, blog.id]);
}
exports.updateData = updateData;
// 多条件读取博客分页数据
function getBlogDataByOrder(orderType = "id", blog_type = "", page = 1, pageSize = 5) {
    let whereStr = "";
    if (blog_type) {
        whereStr = `where blog_type=${blog_type}`;
    }
    return (0, sqlTool_1.doSqlParam)(`select id,title,blog_type,read_,introduction,img,create_time from blogs ${whereStr} order by ${orderType} DESC limit ${(page - 1) * pageSize},${pageSize}`, []);
}
exports.getBlogDataByOrder = getBlogDataByOrder;
// 查询博客的数量
function getBlogDataByOrderCount(blog_type = "") {
    let whereStr = "";
    if (blog_type) {
        whereStr = `where blog_type=${blog_type}`;
    }
    return (0, sqlTool_1.doSqlParam)(`select count(id) as total from blogs ${whereStr}`, []);
}
exports.getBlogDataByOrderCount = getBlogDataByOrderCount;
// 读取博客详情和用户相关信息
function getDataOneAndUser(id) {
    return (0, sqlTool_1.doSqlParam)(`select blogs.*,users.nick from blogs,users where blogs.uid=users.id and blogs.id=${id}`, []);
}
exports.getDataOneAndUser = getDataOneAndUser;
// 读取博客上一条或下一条的数据
function getDataPreOrNext(id, isPre = false) {
    // 上一篇或者下一篇是读取一条小于当前id或者大于当前id的数据
    let str = `select id,title from blogs where id>${id} limit 1`;
    if (isPre) { // 上一条数据
        str = `select id,title from blogs where id<${id} order by id desc limit 1`;
    }
    return (0, sqlTool_1.doSqlParam)(str, []);
}
exports.getDataPreOrNext = getDataPreOrNext;
// 根据关键词搜索博客数量
function getBlogListByKey(key = "") {
    return (0, sqlTool_1.doSqlParam)(`select id,title,read_,blog_type,introduction,img,create_time from blogs where title like ?`, [`%${key}%`]);
}
exports.getBlogListByKey = getBlogListByKey;
