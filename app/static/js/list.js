// 列表分类展示
const total = Number($("#total").text());
const pageSize = 5; // 每页显示数据条数
const blog_type = $("#typename").text(); // 获取博客分类
const BLOG_TYPE = {
    1: "技术",
    2: "随笔",
    3: "笔记"
}

$('.box').pagination({
    pageCount: Math.ceil(total / pageSize), // 总页数
    totalData: total, // 数据总数
    callback(page) { // 点击分页的回调函数
        getBlogData(page.getCurrent());
    }
});

// ajax请求博客分页数据
function getBlogData(page) {
    $.get(`/api/getDataByType?page=${page}&blog_type=${blog_type}`, function (res) {
        // ajax局部刷新，需要把html原来的代码删除，在用js生成新的html
        console.log(res);
        // 清除main元素下面的所有后代元素，main元素保留。
        $("#main").empty();
        // 遍历后端返回的数据，生成新的html元素，放到main元素里面
        let htmlStr = ""; // 保存遍历生成的html标签
        // js里面用的formatDate,BLOG_TYPE是前端js的变量，不能调用后端仿佛。需要单独在前端创建对应的变量。
        res.data.forEach(function (item) {
            htmlStr += `<div class="card mb-3 p-2 shadow-sm mt-2">
            <div class="row g-0">
                <h5 class="card-title"><a href="./detail.html"
                        class="no-decoration link-dark fw700 fs-5">${item.title}</a>
                </h5>
                <div class="col-md-4 card-bgimg rounded d-none d-md-block min-height143">
                    <a href="#" style="background-image:url('${item.img}')"></a>
                </div>
                <div class="col-md-4 card-bgimg rounded p-3  d-md-none">
                    <a href="#"><img src="${item.img}" class="img-fluid rounded " alt="${item.title}"></a>
                </div>
                <div class="col-md-8">
                    <div class="card-body pt-0 pe-0">
                        <p class="card-text lin-4 mb-2">
                        ${item.introduction}
                        </p>
                        <p class="mb-2">
                            <a href="#" class="f-12 text-dark bg-light no-decoration fw-bold">${BLOG_TYPE[item.blog_type]}</a>
                        </p>
                        <p class="card-text">
                            <small class="text-danger d-inline-block">
                                <span class="iconfont icon-shizhong"></span>  ${formatDate(item.create_time)}
                            </small>
                            <small class="text-danger d-inline-block mleft-10">
                                <span class="iconfont icon-yanjing"></span>${item.read_}次
                            </small>
                            <button type="button" class="btn btn-success float-end">阅读全文</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>`
        })
        // 把遍历生成的html标签显示在main元素里面
        $("#main").html(htmlStr);
    })
}