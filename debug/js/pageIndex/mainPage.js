/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/9/18.
	 */
	
	__webpack_require__(5)
	__webpack_require__(13)
	__webpack_require__(19)
	__webpack_require__(22)
	
	__webpack_require__(42)
	
	// var logoImg = require("assets/logo1.png");
	// document.getElementById('logo_img').src = logoImg;
	
	var setting = {
	    callback: {
	        onClick: onClick
	    }
	};
	function onClick(event, treeId, treeNode, clickFlag) {
	    console.log(treeNode);
	}
	var zNodes = [
	    {
	        name: "这是父节点21 - 展开1111", open: true,
	        children: [
	            {
	                name: "3333787父节点11 - 折叠",
	                children: [
	                    {name: "叶子节点111"},
	                    {name: "叶子节33点112"},
	                    {name: "叶子节点113"},
	                    {name: "叶子节点114"}
	                ]
	            },
	            {
	                name: "父节点12 - 折叠",
	                children: [
	                    {name: "叶子节点122221"},
	                    {name: "叶子节点122"},
	                    {name: "叶子节点123"},
	                    {name: "叶子节点124"}
	                ]
	            },
	            {name: "父节点13 - 没有子节点", isParent: true}
	        ]
	    },
	    {
	        name: "父节点2 - 折叠",
	        children: [
	            {
	                name: "父节333点21 - 展开", open: true,
	                children: [
	                    {name: "叶子节点211"},
	                    {name: "叶子节点212"},
	                    {name: "叶子节点213"},
	                    {name: "叶子节点214"}
	                ]
	            },
	            {
	                name: "父节点22 - 折叠",
	                children: [
	                    {name: "叶子节点221"},
	                    {name: "叶子节点222"},
	                    {name: "叶子节点223"},
	                    {name: "叶子节点224"}
	                ]
	            },
	            {
	                name: "父节点23 - 折叠",
	                children: [
	                    {name: "叶子节点231"},
	                    {name: "叶子节点232"},
	                    {name: "叶子节点233"},
	                    {name: "叶子节点234"}
	                ]
	            }
	        ]
	    },
	    {name: "父节点3 - 没有子节点", isParent: true}
	
	];
	
	$(document).ready(function () {
	    $.fn.zTree.init($("#tree"), setting, zNodes);
	});
	
	window.onhashchange = changeMenu;
	
	function changeMenu() {
	    var url = window.location.href,
	        index = url.indexOf('#');
	    var hash = url.slice(index + 1);
	    $('#headmenu li').removeClass('active');
	    $('a[name="' + hash + '"]').parent().addClass('active');
	}
	
	var utils = __webpack_require__(44);
	utils.trace();
	
	//------------------测试jquery tmpl模板插件-----------------------
	var fakeData = [{
	    index: 1,
	    name: "测试名字",
	    type: "测试类型",
	    size: "测试规格",
	    model: "测试",
	    dest: "北京-海淀区",
	    date: "2016-06-25",
	    unit: "吨"
	}, {
	    index: 1,
	    name: "测试名字",
	    type: "测试类型",
	    size: "测试规格",
	    model: "测试",
	    dest: "上海-杨浦区",
	    date: "2016-06-25",
	    unit: "吨"
	},
	    {
	        index: 1,
	        name: "测试名字",
	        type: "测试类型",
	        size: "测试规格",
	        model: "测试",
	        dest: "福建-厦门-思明区",
	        date: "2014-06-21",
	        unit: "m2"
	    }];
	
	$("tbody").empty();
	
	$('#table_template').tmpl(fakeData).appendTo('#tbody');
	
	


/***/ },

/***/ 5:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 13:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 19:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 22:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 42:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 44:
/***/ function(module, exports) {

	/**
	 * Created by Administrator on 2016/9/27.
	 */
	
	var common = {};
	
	common.trace = function () {
	    console.log('test Require common trace');
	}
	
	module.exports = common;

/***/ }

/******/ });
//# sourceMappingURL=mainPage.js.map