"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysqlInstance_1 = __importDefault(require("../mysql/mysqlInstance"));
const sqlTool_1 = require("../tool/sqlTool");
async function readData(email, password, callBack) {
    let data = (0, sqlTool_1.doSql)(`select * from users where email=${email} and password=password`, mysqlInstance_1.default);
    callBack(data);
}
