require("css/reset.css");
require("css/common.css");
require("css/style.css");
var utils = require('../util/Utils');


var key = 'utm_source';
var search = window.location.search;
if (search && search.indexOf(key) === -1) {
    var newSearch = search + '&' + key + '=SEM';
    var $href = $('#logo_href');
    var newlocation = $href.attr('href') + newSearch;
    $href.attr('href', newlocation);
}

$('form').submit(function (e) {
    e.preventDefault();

    if (!document.forms[0].checkValidity()) {
        alert('表格信息填写不正确')
        return;
    }

    if (!$('#wechat').val() && !$('#qq').val()) {
        alert('微信和QQ必须至少填一个');
        return
    }

    var data = utils.form2Json(this);
    if (window.location.search) {
        data.search = window.location.search;
    }

    let referrer = document.referrer.indexOf(window.location.origin) === 0 ? '' : document.referrer;

    var a = document.createElement('a');
    a.href = referrer;
    if (referrer && a.host && a.host !== window.location.host) {
        referrer = a.hostname;
    }

    if (referrer) {
        data.referrer = referrer;
    }

    var that = this;
    $.ajax({
        type: 'POST',
        url: '/tempapi/contact',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        datatype: 'json',
        success: function () {
            alert('提交成功');
            that.reset();
        },
        error: function () {
            alert('提交失败');
        }
    });
})

$(".banner_btn").click(function () {
    $('html, body').animate({
        scrollTop: $("#gift").offset().top - 20
    }, 600);
});