"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../model/article");
const fs = require("fs");
// 添加评论
function default_1(app) {
    app.post("/api/saveArticle", async function (req, res) {
        console.log(req.body);
        const article = req.body;
        console.log(article);
        //article.uid = (req as any).uid; // 从req里面取出token解析出来的用户id
        const { success, data } = await (0, article_1.saveData)(article);
        if (!success) {
            res.json({ success: false, message: data.message });
            return;
        }
        res.json({ success: true, message: "添加成功" });
    });
}
exports.default = default_1;
