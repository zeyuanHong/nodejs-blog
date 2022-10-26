"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require('body-parser'); // 解析post请求
const ejs = require('ejs');
const multer = require('multer'); // 解析文件上传
const middleArea_1 = __importDefault(require("./middleArea"));
const pageController_1 = __importDefault(require("./controller/pageController"));
const usersController_1 = __importDefault(require("./controller/usersController"));
const blogController_1 = __importDefault(require("./controller/blogController"));
const articleController_1 = __importDefault(require("./controller/articleController"));
let app = (0, express_1.default)();
// 1. 设置模板引擎
app.set('views', __dirname + '/views'); // 设置视图文件所在的目录，目录文件存在views目录
app.engine('html', ejs.__express); // 设置模板引擎为html，html里面可以嵌入ejs语法
// 2. 设置静态资源目录
app.use('/static', express_1.default.static(__dirname + '/static'));
app.use("/admin", express_1.default.static(__dirname + "/build")); // 设置后台管理系统静态资源目录
// 3. 解析post数据
app.use(bodyParser.json({ limit: '50mb' })); // 解析json数据,limit限制上传文件大小
// 4. 设置文件上传
app.use(multer({ dest: "/tmp" }).array("file"));
// 调用控制器方法
(0, middleArea_1.default)(app);
(0, pageController_1.default)(app);
(0, usersController_1.default)(app);
(0, blogController_1.default)(app, __dirname); // __dirname 获取当前文件运行目录传入博客控制器，方便上传文件设置存放路径
(0, articleController_1.default)(app);
app.listen(3080, function () {
    console.log("server start at port 3080");
});
