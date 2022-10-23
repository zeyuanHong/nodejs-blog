import { Express, Request, Response } from "express";
import { getBlogDataByOrder, getBlogDataByOrderCount,getDataOneAndUser,getDataPreOrNext } from "../model/blog";
import { formatDate } from "../tool/util";

// 创建博客分类的枚举类型
enum BLOG_TYPE {
    "技术" = 1,
    "随笔",
    "笔记"
}

export default async function (app: Express) {

    // 首页
    let newData = await getBlogDataByOrder()
    // console.log(newData)
    let hotData = await getBlogDataByOrder("read_");
    // 热门技术博客
    let hotData1 = await getBlogDataByOrder("read_", '1');
    // console.log(hotData1)
    // 热门随笔博客
    let hotData2 = await getBlogDataByOrder("read_", '2');

    app.get('/', (req: Request, res: Response) => { // 首页
        res.render('index.html', {
            title: "前端博客-专业前端的个人博客",
            keywords: "前端博客,专业前端博客,前端技术博客,前端学习",
            description: "前端博客-专业前端的个人博客",
            newData: newData.data,
            hotData: hotData.data,
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            formatDate,
            active: "index",
            BLOG_TYPE
        })
    })


    app.get('/:typename/article.html', async (req: Request, res: Response) => { //列表页
        // id是动态路由参数，路由必须符合该格式。动态路由参数放在req.params对象里面
        const { typename } = req.params;
        // console.log(typename)
        // 热门技术博客
        let hotData1 = await getBlogDataByOrder("read_", "1");
        // 热门随笔博客
        let hotData2 = await getBlogDataByOrder("read_", "2");
        // 根据博客id读取对应博客分页数据
        const blogData = await getBlogDataByOrder("id", typename, 1, 2);
        // console.log(blogData)
        // 查询3个分类下面博客的数量
        let totalCount: any = {};
        totalCount[1] = await getBlogDataByOrderCount("1");
        totalCount[2] = await getBlogDataByOrderCount("2");
        totalCount[3] = await getBlogDataByOrderCount("3");

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
            formatDate,
            blogType: BLOG_TYPE[Number(typename)],
            BLOG_TYPE,
            typename
        })
    })

    app.get('/:typename/details.html', async (req: Request, res: Response) => { // 详情页
        const { typename } = req.params;
        // 热门技术博客
        let hotData1 = await getBlogDataByOrder("read_", "1");
        // 热门随笔博客
        let hotData2 = await getBlogDataByOrder("read_", "2");
        // 根据id查询博客的数据
        const blogData = await getDataOneAndUser(typename);
        // 上一条
        const preData = await getDataPreOrNext(typename, true);
        // 下一条数据
        const nextData = await getDataPreOrNext(typename)
        res.render('details.html', {
            title: "前端博客-专业前端的个人博客",
            keywords: "前端博客,专业前端博客,前端技术博客",
            description: "前端博客-专业前端的个人博客",
            active: "",
            hotData1: hotData1.data,
            hotData2: hotData2.data,
            BLOG_TYPE,
            formatDate,
            typename,
            blogData: blogData.data[0],
            preData: preData.data[0],
            nextData: nextData.data[0]
        })
    })

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