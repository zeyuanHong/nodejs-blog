"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ejs = require('ejs');
const pageController_1 = __importDefault(require("./controller/pageController"));
let app = (0, express_1.default)();
// 1. 设置模板引擎
app.set('views', __dirname + '/views'); // 设置视图文件所在的目录，目录文件存在views目录
app.engine('html', ejs.__express); // 设置模板引擎为html，html里面可以嵌入ejs语法
// 2. 设置静态资源目录
app.use('/static', express_1.default.static(__dirname + '/static'));
// 调用控制器方法
(0, pageController_1.default)(app);
app.listen(3000, function () {
    console.log("server start");
});
