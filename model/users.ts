import { doSqlParam } from "../tool/sqlTool";
import { Users } from "../tool/varType";

export function readLoginData(user: Users) { //登录接口,查询数据库
  return doSqlParam(`select * from users where email=? and password=?`,[user.email,user.password]);
}


export function saveData(user:Users){ //注册接口，插入数据库
  return doSqlParam(`insert into users(email,password,nick,introduction) values(?,?,?,?)`,[user.email,user.password,user.nick,user.introduction]);
}

export function getDataList(page:number){ //获取用户列表
  return doSqlParam(`select * from users order by id DESC limit ${(page-1)*10},10 `,[]);
}

// 查询用户总数
export function getUserTotal() {
  return doSqlParam(`select count(*) as total from users`, []);
}

export function delData(id:string){ //删除用户
  return doSqlParam(`delete from users where id=?`,[id]);
}

// 更新数据
export function updateData(user:Users){
  return doSqlParam('update users set email=?,password=?,nick=?,introduction=? where id=?',[user.email,user.password,user.nick,user.introduction,user.id]);
}




