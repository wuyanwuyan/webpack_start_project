'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderHbs = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

let renderHbs = exports.renderHbs = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (hbsName, data = {}) {
        data = (0, _extends3.default)({}, DEFAULT_STATE, data);
        var source = yield readFileThunk(hbsName);
        var template = _handlebars2.default.compile(source);
        return template(data);
    });

    return function renderHbs(_x) {
        return _ref.apply(this, arguments);
    };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DEFAULT_STATE = {
    url_prefix: false ? '' : '/tempapi'
};

const readFileThunk = function (hbsName) {
    let filename = _path2.default.join(process.cwd(), `/server/views/${hbsName}`);
    return new _promise2.default((resolve, reject) => {
        _fs2.default.readFile(filename, 'utf8', function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
};