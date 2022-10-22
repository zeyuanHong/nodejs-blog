// 发布评论
const content = $("#articleCon").val();
const blog_id = $("#blog_id").text();
$("#submit").click(function(){
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
    success(res){
      console.log(res);
    }
  })
})