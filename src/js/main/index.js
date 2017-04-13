require("css/reset.css");
require("css/common.css");
require("css/style.css");

$(document).ready(function() {
   
});

$(".icon-bar").click(function (event) {
    event.preventDefault();
    $('#main-nav').toggleClass('is-visible');
    $("html").css('overflow','hidden')
})

$('.cd-close-menu').on('click', function(event){
    event.preventDefault();
    $('#main-nav').toggleClass('is-visible');
    $("html").removeAttr("style");
});

$("#main-nav").on('click',"li",function (event) {
    $(".cd-close-menu").click();
    var id = $(event.currentTarget).data('id');
    var offset = $("#"+id).offset();
    var scrollTo = offset.top - $('header').height(); // minus fixed header height
    var body = $("html, body");
    body.stop().animate({scrollTop:scrollTo}, '500', 'swing');
})

$("#contact-way-icon").click(function (event) {
    event.stopPropagation();
    $(".real-contact-content").addClass('is-visible');

})
// ipad 点击事件无效？
$(document).on('click touchstart',function(){
    $(".real-contact-content").removeClass('is-visible');
})

$(window).scroll(function(e) {
    throttle(onScroll);
});

function onScroll() {
    var top = $("#contact").offset().top;
    var wh = $(this).height();
    var scrollTop = $(this).scrollTop();
    if(top - scrollTop - wh <= -20) {
        $("#contact-way-icon").addClass('is-visible');
        $(window).off('scroll');
    }
}
// 防止scroll 触发太频繁
function throttle(method, context) {
    if(method.tId) return;
    method.tId = setTimeout(function(){
        method.call(context);
        method.tId = undefined;
    }, 100);
}