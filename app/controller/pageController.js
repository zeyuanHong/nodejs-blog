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
    // 总博客数
    let blogTotal = await (0, blog_1.getDataCount)();
    // console.log(newData) data: [ RowDataPacket { blogTotal: 12 } ]
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
            BLOG_TYPE,
            blogTotal: blogTotal.data[0].blogTotal
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
        const blogData = await (0, blog_1.getBlogDataByOrder)("id", typename, 1, 5);
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
            typename,
            blogTotal: blogTotal.data[0].blogTotal
        });
    });
    app.get('/:id/details.html', async (req, res) => {
        const { id } = req.params;
        // 热门技术博客
        let hotData1 = await (0, blog_1.getBlogDataByOrder)("read_", "1");
        // 热门随笔博客
        let hotData2 = await (0, blog_1.getBlogDataByOrder)("read_", "2");
        // 根据id查询博客的数据
        const blogData = await (0, blog_1.getDataOneAndUser)(id);
        // 上一条
        const preData = await (0, blog_1.getDataPreOrNext)(id, true);
        // 下一条数据
        const nextData = await (0, blog_1.getDataPreOrNext)(id);
        res.render('details.html', {
            title: blogData.data[0].title,
            keywords: "前端博客,专业前端博客,前端技术博客",
            description: blogData.data[0].introduction,
            active: "",
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            BLOG_TYPE,
            formatDate: util_1.formatDate,
            id,
            blogData: blogData.data[0],
            preData: preData.data[0],
            nextData: nextData.data[0],
            blogTotal: blogTotal.data[0].blogTotal
        });
    });
    // 内容搜索
    app.get("/search.html", async function (req, res) {
        let { key } = req.query;
        // 热门技术博客
        let hotData1 = await (0, blog_1.getBlogDataByOrder)("read_", "1");
        // 热门随笔博客
        let hotData2 = await (0, blog_1.getBlogDataByOrder)("read_", "2");
        // 根据博客key关键词去查询博客，key值必须要有值
        let result = { data: [] };
        key = String(key);
        if (key && key.trim()) {
            result = await (0, blog_1.getBlogListByKey)(key);
        }
        // 查询3个分类下面博客的数量
        let totalCount = {};
        totalCount[1] = await (0, blog_1.getBlogDataByOrderCount)("1");
        totalCount[2] = await (0, blog_1.getBlogDataByOrderCount)("2");
        totalCount[3] = await (0, blog_1.getBlogDataByOrderCount)("3");
        res.render("search.html", {
            title: key + "搜索博客",
            keywords: `${key}前端博客,专业前端博客,前端技术博客`,
            description: "前端博客-专业前端的个人博客",
            active: "",
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            blogData: result.data,
            formatDate: util_1.formatDate,
            total1: totalCount[1].data[0].total,
            total2: totalCount[2].data[0].total,
            total3: totalCount[3].data[0].total,
            key,
            BLOG_TYPE,
            blogTotal: blogTotal.data[0].blogTotal
        });
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
