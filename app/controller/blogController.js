"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../model/blog");
const fs = require('fs');
// 添加博客
function default_1(app, direname) {
    app.post("/api/saveBlog", async function (req, res) {
        const blog = req.body;
        // console.log(blog)
        blog.uid = req.uid; // 从req里面取出token解析出来的用户id
        const { success, data } = await (0, blog_1.saveData)(blog);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, message: "添加成功" });
    });
    // 读取博客列表
    app.post("/api/getBlogs", async function (req, res) {
        const { page } = req.body; // req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        let result = await (0, blog_1.getDataList)(Number(page) || 1);
        if (!result.success) {
            res.json({ success: false, message: result.data.message });
            return;
        }
        let resultTotal = await (0, blog_1.getDataTotal)();
        if (!resultTotal.success) {
            res.json({ success: false, message: result.data.message });
            return;
        }
        res.json({ success: true, data: { data: result.data, total: resultTotal.data[0].total }, });
    });
    // 读取博客详情
    app.get("/api/getDetail", async function (req, res) {
        const { id } = req.query; // req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        const { success, data } = await (0, blog_1.getDataOne)(String(id));
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, data });
    });
    // 更新博客
    app.post("/api/updateBlog", async function (req, res) {
        const blog = req.body;
        const { success, data } = await (0, blog_1.updateData)(blog);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, message: "博客更新成功" });
    });
    // 删除博客
    app.post("/api/delBlog", async function (req, res) {
        const id = req.body.id; // req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        const { success, data } = await (0, blog_1.delData)(id);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, message: "删除成功" });
    });
    //文件上传接口
    app.post("/api/adddetailimg", function (req, res) {
        let name = req.files[0].originalname; // 获取上传文件名称
        let path = direname + "/static/upload/" + name; // 设置文件上传的路径
        fs.readFile(req.files[0].path, (err, data) => {
            if (err) {
                res.json({ success: "false", message: "上传失败" + err.message, "errno": 1 });
                return;
            }
            // 把读取的图片流数据写入path路径
            fs.writeFile(path, data, function (err) {
                if (err) {
                    res.json({ success: "false", message: "上传失败" + err.message, "errno": 1 });
                    return;
                }
                res.json({
                    success: true,
                    "errno": 0,
                    "data": {
                        "url": "/static/upload/" + name,
                        "alt": "哲理源的博客",
                        "href": "" // 图片的链接，非必须
                    }
                });
            });
        });
    });
    // 删除文件
    app.post("/api/deldetailimg", function (req, res) {
        const { file } = req.body;
        file.forEach(function (item) {
            // 拼接删除文件的路径
            item = direname + item;
            fs.unlink(item, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        res.json({ success: true, message: "删除成功" });
    });
}
exports.default = default_1;
