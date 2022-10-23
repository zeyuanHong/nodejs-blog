import { Express, Request, Response } from "express"
import { Blog } from "../tool/varType"
import { saveData, getDataList, getDataTotal, delData, getDataOne, updateData,getBlogDataByOrder } from "../model/blog"

const fs = require('fs')

// 添加博客
export default function (app: Express, direname: string) {
    app.post("/api/saveBlog", async function (req: Request, res: Response) {
        const blog: Blog = req.body
        // console.log(blog)
        blog.uid = (req as any).uid; // 从req里面取出token解析出来的用户id
        const { success, data } = await saveData(blog)
        if (!success) {
            res.json({ success: false, message: data.message })
            return;
        }
        res.json({ success: true, message: "添加成功" })
    })

    // 读取博客列表
    app.post("/api/getBlogs", async function (req: Request, res: Response) {
        const { page } = req.body;// req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        let result: any = await getDataList(Number(page) || 1)
        if (!result.success) {
            res.json({ success: false, message: result.data.message })
            return;
        }
        let resultTotal: any = await getDataTotal()
        if (!resultTotal.success) {
            res.json({ success: false, message: result.data.message })
            return;
        }
        res.json({ success: true, data: { data: result.data, total: resultTotal.data[0].total }, })
    })

    // 读取博客详情
    app.get("/api/getDetail", async function (req: Request, res: Response) {
        const { id } = req.query// req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        const { success, data } = await getDataOne(String(id))
        if (!success) {
            res.json({ success: false, message: data.message })
            return;
        }
        res.json({ success: true, data })

    })

    // 更新博客
    app.post("/api/updateBlog", async function (req: Request, res: Response) {
        const blog: Blog = req.body
        const { success, data } = await updateData(blog)
        if (!success) {
            res.json({ success: false, message: data.message })
            return;
        }
        res.json({ success: true, message: "博客更新成功" })
    })

    // 删除博客
    app.post("/api/delBlog", async function (req: Request, res: Response) {
        const id: string = (req.body as any).id;// req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        const { success, data } = await delData(id)
        if (!success) {
            res.json({ success: false, message: data.message })
            return;
        }
        res.json({ success: true, message: "删除成功" })
    })


    //文件上传接口
    app.post("/api/adddetailimg", function (req: Request, res: Response) {
        let name = (req as any).files[0].originalname; // 获取上传文件名称
        let path = direname + "/static/upload/" + name; // 设置文件上传的路径
        fs.readFile((req as any).files[0].path, (err: Error, data: any) => {
            if (err) {
                res.json({ success: "false", message: "上传失败" + err.message, "errno": 1 })
                return;
            }
            // 把读取的图片流数据写入path路径
            fs.writeFile(path, data, function (err: Error) {
                if (err) {
                    res.json({ success: "false", message: "上传失败" + err.message, "errno": 1 })
                    return;
                }
                res.json({ //符合wangEditor的返回格式
                    success: true,
                    "errno": 0, // 注意：值是数字，不能是字符串
                    "data": {
                        "url": "/static/upload/" + name, // 图片 src ，必须
                        "alt": "哲理源的博客", // 图片描述文字，非必须
                        "href": "" // 图片的链接，非必须
                    }
                })
            })
        })
    })

    // 删除文件
    app.post("/api/deldetailimg", function (req: Request, res: Response) {
        const { file } = req.body;
        file.forEach(function (item: string) {
            // 拼接删除文件的路径
            item = direname + item;
            fs.unlink(item, function (err: Error) {
                if (err) {
                    console.log(err);
                }
            })
        })
        res.json({ success: true, message: "删除成功" })
    })

    // 根据博客分类和页码返回博客数据
    app.get("/api/getDataByType", async function (req: Request, res: Response) {
        const { blog_type, page } = req.query// req.query获取查询参数
        // page是字符串 Number(page)转number如果为NaN则默认取第1页数据
        const { success, data } = await getBlogDataByOrder("id", String(blog_type), Number(page), 2)
        if (!success) {
            res.json({ success: false, message: data.message })
            return;
        }
        res.json({ success: true, data })
    })
}



