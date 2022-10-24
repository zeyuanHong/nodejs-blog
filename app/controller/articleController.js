"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../model/article");
const fs = require("fs");
// 添加评论
function default_1(app) {
    app.post("/api/saveArticle", async function (req, res) {
        const article = req.body;
        const { success, data } = await (0, article_1.saveData)(article);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, message: "添加成功" });
    });
    // 根据博客id获取评论分页数据
    app.get("/api/getArticle", async function (req, res) {
        const { blog_id, page } = req.query;
        // 获取博客分页数据
        const { success, data } = await (0, article_1.getDataList)(Number(page), String(blog_id));
        // 获取博客的总评论数量
        const result = await (0, article_1.getDataTotal)(String(blog_id));
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, data: { data, total: result.data[0].total } });
    });
}
exports.default = default_1;
