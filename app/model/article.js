"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = void 0;
const sqlTool_1 = require("../tool/sqlTool");
// 添加数据
function saveData(data) {
    return (0, sqlTool_1.doSqlParam)('insert into articles(uid,blog_id,content,create_time) values(?,?,?,now())', [data.uid, data.blog_id, data.content]);
}
exports.saveData = saveData;
