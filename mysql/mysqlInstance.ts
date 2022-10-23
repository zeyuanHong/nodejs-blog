const mysql = require("mysql");// 引入mysql操作的库

export default function createSqlIns() { //每次都会产生一个新的数据库连接对象
  return mysql.createConnection({
    host: "localhost", // 数据库服务器地址
    user: "root", // 数据库用户名
    password: "123456", // 数据库密码
    database: "blog_data" // 数据库名
  });// createConnection()会返回一个数据库链接对象，数据库链接对象可以执行各类mysql语句
}



