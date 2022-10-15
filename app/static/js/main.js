let windowHeight = window.outerHeight // 获取窗口的高度。
function initAnimate() {
    // 右边动画
    $(".animate-right-card").each(function(){
      let scrollTop = $(window).scrollTop();// 获取窗口滚动条滚动的距离
      let top = $(this).offset().top; // 获取元素离页面顶部的距离
      if(scrollTop+windowHeight > top + 100) { //  元素进入可视区域的条件
             $(this).addClass("animate-right") 
            //  $(this).addClass(`animate-right-${$(this).index()+1}`)
             
      }
    })
    // 左边card添加动画
    $(".animate-left-card").each(function () {
        let scrollTop = $(window).scrollTop();// 获取窗口滚动条滚动的距离
        let top = $(this).offset().top; // 获取元素离页面顶部的距离
        if (scrollTop + windowHeight > top + 100) { //  元素进入可视区域的条件
            // console.log($(this).index(),`animation-left-${$(this).index()*100}`)
            $(this).addClass("animate-left")

        }
    })
}
initAnimate();
$(window).scroll(function () { // 窗口滚动事件,滚动条滚动的时候判断是否有元素出现在可视区域，如果有则给该元素添加动画类。
    initAnimate();
})

