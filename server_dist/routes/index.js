'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _redis = require('../serverConf/redis');

var _redis2 = _interopRequireDefault(_redis);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = new _koaRouter2.default();

let key = 'contact';

if (false) {
    key = 'TESTcontact';
}

router.get('/contact', (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (ctx, next) {
        if (ctx.query.token !== 'chuangqikey') {
            ctx.body = null;
            return;
        }
        let ret = yield _redis2.default.lrangeAsync(key, 0, -1);
        let mapStr = ret.map(function (v, i) {
            let one = JSON.parse(v);
            return `
        <tr>
            <th>${one.contact}</th>
            <th>${one.appName}</th>
            <th>${one.phone}</th>
            <th>${one.qq}</th>
            <th>${(0, _moment2.default)(one.time).format('YYYY-MM-DD HH:mm:ss')}</th>
            <th>${one.ip}</th>
        </tr>
        `;
        });
        ctx.body = `
        <html>
            <head>
            </head>
            <body>
            <table border="1">
            <thead>
            <tr>
              <th>联系人</th>
              <th>app名称</th>
              <th>电话</th>
              <th>QQ</th>
              <th>提交时间</th>
              <th>ip地址</th>
            </tr>
            </thead>
            ${mapStr.join('')}
            </table>
            </body>
        </html>
`;
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());

router.post('/contact', (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (ctx, next) {
        if (ctx.request.type.indexOf('json') === -1) {
            ctx.status = 400;
            return;
        }
        let content = ctx.request.body;
        content.time = (0, _moment2.default)();
        // content.ip = ctx.headers['x-real-ip'];
        content.ip = ctx.headers['x-forwarded-for'].split(',')[0];
        yield _redis2.default.lpushAsync(key, (0, _stringify2.default)(content));
        ctx.body = null;
    });

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})());

exports.default = router;