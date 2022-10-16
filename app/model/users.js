"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readLoginData = void 0;
const mysqlInstance_1 = __importDefault(require("../mysql/mysqlInstance"));
const sqlTool_1 = require("../tool/sqlTool");
async function readLoginData(user, callBack) {
    let data = await (0, sqlTool_1.doSql)(`select * from users where email='${user.email}' and password='${user.password}'`, mysqlInstance_1.default);
    callBack(data);
}
exports.readLoginData = readLoginData;
