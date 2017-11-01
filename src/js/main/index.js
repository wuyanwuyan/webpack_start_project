require("css/reset.css");
require("css/common.css");
require("css/style.css");
var utils = require('../util/Utils');


$('form').submit(function (e) {
    e.preventDefault();

    var data = utils.form2Json(this);
    var that = this;
    $.ajax({
        type: 'POST',
        url: 'http://121.41.91.93:8091/contact',
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