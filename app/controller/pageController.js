"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../model/blog");
const util_1 = require("../tool/util");
async function default_1(app) {
    // 首页
    let newData = await (0, blog_1.getBlogDataByOrder)();
    // console.log(newData)
    let hotData = await (0, blog_1.getBlogDataByOrder)("read_");
    // 热门技术博客
    let hotData1 = await (0, blog_1.getBlogDataByOrder)("read_", "技术");
    // console.log(hotData1)
    // 热门随笔博客
    let hotData2 = await (0, blog_1.getBlogDataByOrder)("read_", "随笔");
    app.get('/', (req, res) => {
        res.render('index.html', {
            title: "前端博客-专业前端的个人博客",
            keywords: "前端博客,专业前端博客,前端技术博客,前端学习",
            description: "前端博客-专业前端的个人博客",
            newData: newData.data,
            hotData: hotData.data,
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            formatDate: util_1.formatDate,
            active: "index"
        });
    });
    app.get('/:typename/article.html', async (req, res) => {
        // id是动态路由参数，路由必须符合该格式。动态路由参数放在req.params对象里面
        const { typename } = req.params;
        // console.log(typename)
        // 热门技术博客
        let hotData1 = await (0, blog_1.getBlogDataByOrder)("read_", "技术");
        // 热门随笔博客
        let hotData2 = await (0, blog_1.getBlogDataByOrder)("read_", "随笔");
        // 根据博客id读取对应博客分页数据
        const blogData = await (0, blog_1.getBlogDataByOrder)("id", typename, 1, 3);
        // console.log(blogData)
        // 查询3个分类下面博客的数量
        const count1 = await (0, blog_1.getBlogDataByOrderCount)("'技术'");
        const count2 = await (0, blog_1.getBlogDataByOrderCount)("'随笔'");
        const count3 = await (0, blog_1.getBlogDataByOrderCount)("'笔记'");
        res.render('article.html', {
            title: "前端博客-专业前端的个人博客",
            keywords: "前端博客,专业前端博客,前端技术博客",
            description: "前端博客-专业前端的个人博客",
            active: `article${typename}`,
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            blogData: blogData.data,
            total1: count1.data[0].total,
            total2: count2.data[0].total,
            total3: count3.data[0].total,
            formatDate: util_1.formatDate,
            blogType: typename
        });
    });
    app.get('/details.html', (req, res) => {
        res.render('details.html');
    });
    /*  app.get('/notes.html', (req: Request, res: Response) => {
         res.render('notes.html')
     })
 
     app.get('/words.html', (req: Request, res: Response) => {
         res.render('words.html')
     })
 
     app.get('/tag.html', (req: Request, res: Response) => {
         res.render('tag.html')
     })
 
     app.get('/about.html', (req: Request, res: Response) => {
         res.render('about.html')
     }) */
}
exports.default = default_1;
