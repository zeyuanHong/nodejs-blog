import { Express, Request, Response } from "express";
import { Article } from "../tool/varType";
import { saveData, getDataList, getDataTotal } from "../model/article";
const fs = require("fs");
// 添加评论
export default function (app: Express) {
  app.post("/api/saveArticle", async function (req: Request, res: Response) {
    const article: Article = req.body
    const { success, data } = await saveData(article)
    if (!success) {
      res.json({ success: false, message: data.message })
      return;
    }
    res.json({ success: true, message: "添加成功" })
  })

  // 根据博客id获取评论分页数据
  app.get("/api/getArticle", async function (req: Request, res: Response) {
    const { blog_id,page } = req.query
    // 获取博客分页数据
    const {success,data} = await getDataList(Number(page),String(blog_id))
    // 获取博客的总评论数量
    const result = await getDataTotal(String(blog_id));
    if(!success){
      res.json({success: false, message:data.message})
      return;
    }
    res.json({success:true, data: {data, total: result.data[0].total}})
  })
}