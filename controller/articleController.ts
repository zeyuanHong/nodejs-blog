import { Express, Request, Response } from "express";
import { Article } from "../tool/varType";
import { saveData } from "../model/article";
const fs = require("fs");
// 添加评论
export default function(app:Express){
  app.post("/api/saveArticle",async function(req:Request,res:Response){
    console.log(req.body)
    const article:Article = req.body
    console.log(article)
    //article.uid = (req as any).uid; // 从req里面取出token解析出来的用户id
    const { success, data } = await saveData(article)
    if(!success){
      res.json({success: false, message:data.message})
      return;
    }
    res.json({success:true, message: "添加成功"})
  })
}