import express ,{Express} from 'express'
const bodyParser = require('body-parser') // 解析post请求
const ejs = require('ejs')
const multer = require('multer') // 解析文件上传

import middleArea from "./middleArea"
import pageController from "./controller/pageController"
import usersController from "./controller/usersController"
import blogController from "./controller/blogController"
import articleController from "./controller/articleController"

let app:Express = express()

// 1. 设置模板引擎
app.set('views', __dirname+'/views');// 设置视图文件所在的目录，目录文件存在views目录
app.engine('html', ejs.__express); // 设置模板引擎为html，html里面可以嵌入ejs语法

// 2. 设置静态资源目录
app.use('/static',express.static(__dirname+'/static'))

// 3. 解析post数据
app.use(bodyParser.json({limit:'50mb'})) // 解析json数据,limit限制上传文件大小

// 4. 设置文件上传
app.use(multer({dest: "/tmp"}).array("file"))

// 调用控制器方法
middleArea(app)
pageController(app)
usersController(app)
blogController(app,__dirname) // __dirname 获取当前文件运行目录传入博客控制器，方便上传文件设置存放路径
articleController(app)
app.listen(3080,function(){ // 绑定端口，启动服务器
  console.log("server start at port 3080");
})