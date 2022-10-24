// 发布评论
const blog_id = $("#id").text();
let canSubmit = true;
$("#submit").click(function () {
  if(!canSubmit){
    alert('请勿频繁提交')
    return
  }
  canSubmit = false
  setTimeout(() => { // 10s后才能再次提交
    canSubmit = true
  },1000*10)
  const content = $("#articleCon").val();
  if (!content || content.trim() < 3) {
    alert('评论内容至少为三个字符')
    return
  }
  $.ajax({
    url: "/api/saveArticle",
    method: "post",
    data: JSON.stringify({
      blog_id,
      content,
      uid: "-1"
    }),
    headers: {
      "Content-Type": "application/json"
    },
    success(res) {
      $("#articleCon").val("");
      // 发布成功以后需要调用接口，获取最新数据
      getArticleData(1)
    }
  })
})

// 分页数据变量
let total = 0;
const pageSize = 3;
let isFirst = true
function getArticleData(page) {
  $.get(`/api/getArticle?blog_id=${blog_id}&page=${page}`, (res) => {
    total = res.data.total
    $("#nav-home").empty()
    let htmlStr = ''
    res.data.data.forEach(item => {
      htmlStr += `<p class="my-1"><span class="text-black-50">匿名用户 (${formatDate(item.create_time, "YYYY-MM-DD hh:mm")}):</span>${item.content}</p>`
    })
    $("#nav-home").html(htmlStr)
    if(isFirst && total > 3) {
      showPagination();
      isFirst = false
    }
  })
}
getArticleData(1) // 默认加载第一页


function showPagination() {
  $('#pagination').pagination({
    pageCount: Math.ceil(total / pageSize), // 总页数
    totalData: total, // 数据总数
    callback(page) { // 点击分页的回调函数
      getArticleData(page.getCurrent());
    }
  });
}
