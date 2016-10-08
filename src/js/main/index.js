/**
 * Created by Administrator on 2016/9/18.
 */
// entry.js
require("css/normalize.css") // 载入 style.css
// require("../libs/bootstrap/css/bootstrap.css") // 载入 style.css
require("js/libs/zTree/css/zTreeStyle/zTreeStyle.css") // 载入 style.css
// require("js/libs/My97DatePicker/skin/WdatePicker.css") // 载入 style.css
require("css/index.css") // 载入 style.css

document.write('It works111.' + $)
document.write(require('./module.js')) // 添加模块

console.log('new 333---333----333-----------------------------------------------');
console.log(window.$);
console.log($);
console.log(jQuery);
console.log(window.jQuery)
console.log('end -3333-----333-----------------------------------3333333-------------');

$("#btn_test_modal").click(function (e) {
    $('#myModal').modal('show');
    $(this).text(Math.random() * 1000);
})

var setting = {	};

var zNodes =[
    { name:"这是父节点 - 展33开end stat大法师魔法", open:true,
        children: [
            { name:"3333父节点11 - 折叠",
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

