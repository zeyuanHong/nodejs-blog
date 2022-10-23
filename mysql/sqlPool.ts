const mysql = require("mysql");// 引入mysql操作的库
import { mysqlConfig } from '../config/config'
const mysqlPool = mysql.createPool({ // 创建数据库连接池，返回一个数据库连接池对象，有很多数据库链接对象的集合。
  ...mysqlConfig,
})
export default mysqlPool;