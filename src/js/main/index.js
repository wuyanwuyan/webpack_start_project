require("css/reset.css");
require("css/common.css");
require("css/style.css");
var utils = require('../util/Utils');


var key = 'utm_source';
var search = window.location.search;
if(search && search.indexOf(key) === -1){
    var newSearch = search + '&' + key + '=SEM';
    var $href = $('#logo_href');
    var newlocation = $href.attr('href') + newSearch;
    $href.attr('href',newlocation);
}

$('form').submit(function (e) {
    e.preventDefault();

    var data = utils.form2Json(this);
    var that = this;
    $.ajax({
        type: 'POST',
        url: '/tempapi/contact',
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        datatype:'json',
        success:function () {
            alert('提交成功');
            that.reset();
        },
        error:function () {
            alert('提交失败');
        }
    });
})

$(".banner_btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#gift").offset().top - 20
    }, 600);
});