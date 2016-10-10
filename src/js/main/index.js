/**
 * Created by Administrator on 2016/9/18.
 */

require("../libs/bootstrap/css/bootstrap.css")
require("js/libs/zTree/css/zTreeStyle/zTreeStyle.css")
// require("js/libs/My97DatePicker/skin/WdatePicker.css")
require("css/common.css")
require("css/outerframe.css")

require("css/index.css") // 载入 style.css

// var logoImg = require("assets/logo1.png");
// document.getElementById('logo_img').src = logoImg;

$("#btn_test_modal").click(function (e) {
    $('#myModal').modal('show');
    $(this).text(Math.random() * 1000);
})
var setting = {

}
var zNodes =[
    { name:"这是父节点21 - 展开1111", open:true,
        children: [
            { name:"3333787父节点11 - 折叠",
                children: [
                    { name:"叶子节点111"},
                    { name:"叶子节33点112"},
                    { name:"叶子节点113"},
                    { name:"叶子节点114"}
                ]},
            { name:"父节点12 - 折叠",
                children: [
                    { name:"叶子节点122221"},
                    { name:"叶子节点122"},
                    { name:"叶子节点123"},
                    { name:"叶子节点124"}
                ]},
            { name:"父节点13 - 没有子节点", isParent:true}
        ]},
    { name:"父节点2 - 折叠",
        children: [
            { name:"父节333点21 - 展开", open:true,
                children: [
                    { name:"叶子节点211"},
                    { name:"叶子节点212"},
                    { name:"叶子节点213"},
                    { name:"叶子节点214"}
                ]},
            { name:"父节点22 - 折叠",
                children: [
                    { name:"叶子节点221"},
                    { name:"叶子节点222"},
                    { name:"叶子节点223"},
                    { name:"叶子节点224"}
                ]},
            { name:"父节点23 - 折叠",
                children: [
                    { name:"叶子节点231"},
                    { name:"叶子节点232"},
                    { name:"叶子节点233"},
                    { name:"叶子节点234"}
                ]}
        ]},
    { name:"父节点3 - 没有子节点", isParent:true}

];

$(document).ready(function(){
    $.fn.zTree.init($("#tree"), setting, zNodes);
});

window.onhashchange = changeMenu;

function changeMenu(){
    var url = window.location.href,
        index = url.indexOf('#');
    var hash = url.slice(index + 1);
    $('#headmenu li').removeClass('active');
    $('a[name="' + hash + '"]').parent().addClass('active');
}

window.onresize = function(){

}

window.onresize();


