"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../model/blog");
const util_1 = require("../tool/util");
// 创建博客分类的枚举类型
var BLOG_TYPE;
(function (BLOG_TYPE) {
    BLOG_TYPE[BLOG_TYPE["\u6280\u672F"] = 1] = "\u6280\u672F";
    BLOG_TYPE[BLOG_TYPE["\u968F\u7B14"] = 2] = "\u968F\u7B14";
    BLOG_TYPE[BLOG_TYPE["\u7B14\u8BB0"] = 3] = "\u7B14\u8BB0";
})(BLOG_TYPE || (BLOG_TYPE = {}));
async function default_1(app) {
    // 首页
    let newData = await (0, blog_1.getBlogDataByOrder)();
    // console.log(newData)
    let hotData = await (0, blog_1.getBlogDataByOrder)("read_");
    // 热门技术博客
    let hotData1 = await (0, blog_1.getBlogDataByOrder)("read_", '1');
    // console.log(hotData1)
    // 热门随笔博客
    let hotData2 = await (0, blog_1.getBlogDataByOrder)("read_", '2');
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
            active: "index",
            BLOG_TYPE
        });
    });
    app.get('/:typename/article.html', async (req, res) => {
        // id是动态路由参数，路由必须符合该格式。动态路由参数放在req.params对象里面
        const { typename } = req.params;
        // console.log(typename)
        // 热门技术博客
        let hotData1 = await (0, blog_1.getBlogDataByOrder)("read_", "1");
        // 热门随笔博客
        let hotData2 = await (0, blog_1.getBlogDataByOrder)("read_", "2");
        // 根据博客id读取对应博客分页数据
        const blogData = await (0, blog_1.getBlogDataByOrder)("id", typename, 1, 2);
        // console.log(blogData)
        // 查询3个分类下面博客的数量
        let totalCount = {};
        totalCount[1] = await (0, blog_1.getBlogDataByOrderCount)("1");
        totalCount[2] = await (0, blog_1.getBlogDataByOrderCount)("2");
        totalCount[3] = await (0, blog_1.getBlogDataByOrderCount)("3");
        res.render('article.html', {
            title: "前端博客-专业前端的个人博客",
            keywords: "前端博客,专业前端博客,前端技术博客",
            description: "前端博客-专业前端的个人博客",
            active: `article${typename}`,
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            blogData: blogData.data,
            total1: totalCount[1].data[0].total,
            total2: totalCount[2].data[0].total,
            total3: totalCount[3].data[0].total,
            total: totalCount[typename].data[0].total,
            formatDate: util_1.formatDate,
            blogType: BLOG_TYPE[Number(typename)],
            BLOG_TYPE,
            typename
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
