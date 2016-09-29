/**
 * Created by Administrator on 2016/9/18.
 */
// entry.js
require("../css/normalize.css") // 载入 style.css
// require("../libs/bootstrap/css/bootstrap.css") // 载入 style.css
require("../css/style.css") // 载入 style.css

document.write('It works111.' + $)
document.write(require('./module.js')) // 添加模块

console.log('new ------------------------------------------------------');
console.log(window.$);
console.log($);
console.log(jQuery);
console.log(window.jQuery)
console.log('end ------------------------------------------------------');

$("#btn_test_modal").click(function (e) {
    $('#myModal').modal('show');
    $(this).text(Math.random() * 1000);
})

