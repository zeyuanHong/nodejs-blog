import  { doSqlParam } from "../tool/sqlTool";
import { Article } from "../tool/varType";

// 添加数据
export function saveData(data:Article){
  return doSqlParam('insert into articles(uid,blog_id,content,create_time) values(?,?,?,now())',[data.uid,data.blog_id,data.content]);
}

// 获取评论列表
export function getDataList(page:number,blog_id:string){
  return doSqlParam(`select * from articles where blog_id=? order by id DESC limit ${(page-1)*3},3`,[blog_id]);
}

// 查询数据总条数
export function getDataTotal(blog_id:string){
  return doSqlParam(`select count(*) as total from articles where blog_id=?`,[blog_id]);
}
