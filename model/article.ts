import  { doSqlParam } from "../tool/sqlTool";
import { Article } from "../tool/varType";

// 添加数据
export function saveData(data:Article){
  return doSqlParam('insert into articles(uid,blog_id,content,create_time) values(?,?,?,now())',[data.uid,data.blog_id,data.content]);
}