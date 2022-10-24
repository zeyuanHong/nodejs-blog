import { doSqlParam } from "../tool/sqlTool";
import { Blog } from "../tool/varType";

// 添加数据
export function saveData(blog: Blog) { //添加一篇博客
    return doSqlParam('insert into blogs(uid,title,introduction,img,content,blog_type,read_,create_time) values(?,?,?,?,?,?,?,now())',
        [blog.uid, blog.title, blog.introduction, blog.img, blog.content, blog.blog_type, Math.floor(Math.random() * 100)]);
}

// 删除数据
export function delData(id: string) {
    return doSqlParam(`delete from blogs where id=?`, [id]);
}

// 读取分页数据
export function getDataList(page: number) {
    return doSqlParam(`select blogs.*,users.nick from blogs,users where blogs.uid=users.id order by id DESC limit ${(page - 1) * 10},10`, []);
}

// 查询数据总条数
export function getDataTotal() {
    return doSqlParam(`select count(*) as total from blogs`, []);
}

// 读取博客详情
export function getDataOne(id: string) {
    return doSqlParam(`select * from blogs where id=${id}`, []);
}

// 读取博客数量
export function getDataCount() {
    return doSqlParam(`select count(*) as blogTotal from blogs`, []);
}

// 更新博客
export function updateData(blog: Blog) {
    return doSqlParam(`update blogs set title=?,introduction=?,img=?,content=?,blog_type=? where id=?`,
        [blog.title, blog.introduction, blog.img, blog.content, blog.blog_type, blog.id]);
}

// 多条件读取博客分页数据
export function getBlogDataByOrder(orderType: string = "id", blog_type: string = "", page: number = 1, pageSize: number = 5) {
    let whereStr = "";
    if (blog_type) {
        whereStr = `where blog_type=${blog_type}`
    }
    return doSqlParam(`select id,title,blog_type,read_,introduction,img,create_time from blogs ${whereStr} order by ${orderType} DESC limit ${(page - 1) * pageSize},${pageSize}`, []);
}

// 查询博客的数量
export function getBlogDataByOrderCount(blog_type: string = "") {
    let whereStr = "";
    if (blog_type) {
        whereStr = `where blog_type=${blog_type}`
    }
    return doSqlParam(`select count(id) as total from blogs ${whereStr}`, []);
}

// 读取博客详情和用户相关信息
export function getDataOneAndUser(id: string) {
    return doSqlParam(`select blogs.*,users.nick from blogs,users where blogs.uid=users.id and blogs.id=${id}`, []);
}

// 读取博客上一条或下一条的数据
export function getDataPreOrNext(id: string, isPre: boolean = false) {
    // 上一篇或者下一篇是读取一条小于当前id或者大于当前id的数据
    let str = `select id,title from blogs where id>${id} limit 1`;
    if (isPre) { // 上一条数据
        str = `select id,title from blogs where id<${id} order by id desc limit 1`
    }
    return doSqlParam(str, []);
}

// 根据关键词搜索博客数量
export function getBlogListByKey(key: string = "") {
    return doSqlParam(`select id,title,read_,blog_type,introduction,img,create_time from blogs where title like ?`, [`%${key}%`]);
}