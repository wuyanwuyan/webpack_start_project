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

let key = 'TEST_contact';

if (false) {
    key = 'TEST_contact';
}

router.get('/contact', (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (ctx, next) {
        let ret = yield _redis2.default.lrangeAsync(key, 0, -1);
        ctx.body = ret;
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());

router.post('/contact', (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (ctx, next) {
        let content = ctx.request.body;
        content.time = (0, _moment2.default)();
        yield _redis2.default.rpushAsync(key, (0, _stringify2.default)(content));
        ctx.body = null;
    });

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
})());

exports.default = router;