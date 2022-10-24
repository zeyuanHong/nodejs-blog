let key = $("#key").text();
$(".card-title").each(function () {
    let title = $(this).text();
    // 给关键字加上高亮  
    title = title.replace(new RegExp(key, "gi"), `<span class="text-warning">${key}</span>`)
    $(this).html(title);
})