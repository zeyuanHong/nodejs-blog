import mysqlPool from "../mysql/sqlPool";
// 封装sql语句的执行
export function doSql(sqlStr: string, connection: any): any {
  // 返回promise对象执行的结果，可以解决回调地狱
  return new Promise(function (resolve, reject) {
    connection.query(sqlStr, function (err: Error, results: any, fields: any) {
      if (err) {
        reject(err)// 如果有错误调用reject
      } else {
        resolve(results); // 如果执行成功返回resolve
      }
    })
  }).then((result: any) => ({ success: true, data: result }))
    .catch((err: Error) => ({ success: false, data: err }))
}


export function doSqlParam(sqlStr: string, param: Array<any>): any {
  // 返回promise对象执行的结果，可以解决回调地狱
  return new Promise(function (resolve, reject) {
    /**
     * err 获取连接池对象出错
     * conn 成功获取的数据库链接对象
     */
    mysqlPool
      .getConnection(function (err: Error, conn: any) {
        conn.query(
          sqlStr,
          param,
          function (err: Error, results: any, fields: any) {
            if (err) {
              console.log(err)
              reject(err); // 如果有错误调用reject
            } else {
              resolve(results); // 如果执行成功返回resolve
            }
            conn.release();// sql执行完成后，需要把数据库链接对象释放，返回到连接池。
          }
        )
      })
  }).then((result: any) => ({ success: true, data: result }))
    .catch((err: Error) => ({ success: false, data: err }))
}