'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

const client = _redis2.default.createClient({
    host: '115.159.127.88',
    password: 'chuangqi@123'
});

client.on("error", function (err) {});

if (false) {
    client.monitor(function (err, res) {});

    client.on("monitor", function (time, args, raw_reply) {});
};

exports.default = client;