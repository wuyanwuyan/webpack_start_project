require("css/reset.css");
require("js/libs/fullPage/jquery.fullPage.css");
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
$('body').on('click',function(){
    $(".real-contact-content").removeClass('is-visible');
})