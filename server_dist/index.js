'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _koaGzip = require('koa-gzip');

var _koaGzip2 = _interopRequireDefault(_koaGzip);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

require('./serverConf/redis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
// error handle
app.use((() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (ctx, next) {
        try {
            yield next();
        } catch (e) {
            app.emit('error', e, ctx);
        }
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());

// if (process.env.NODE_ENV !== 'production') {
app.use(require('koa-cors')());
// }

app.use((0, _koaGzip2.default)());

// app.use(bodyParser());

app.use((0, _koaBody2.default)({ multipart: true }));

app.use(_routes2.default.routes());

const port = process.env.PORT || 8091;

var server = _http2.default.createServer(app.callback());

server.listen(port, function (err) {
    if (err) {
        return;
    }
});