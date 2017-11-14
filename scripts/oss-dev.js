/* eslint-disable */
'use strict';

var co = require('co');
var OSS = require('ali-oss');
var fs = require('co-fs');
var _fs = require('fs');
var path = require('path');

const CONFIG = {
    "source": "./release",
    "dest": "/",
    "accessKeyId": "gh4Uwme1bYC2KmzO",
    "secretAccessKey": "7nvGxCf9jVYzUfC3TaRP2iVeIb29w5",
    "region": "oss-cn-hangzhou",
    "bucket": "cqaso-cdn"
};

const client = new OSS({
    region: CONFIG.region,
    accessKeyId: CONFIG.accessKeyId,
    accessKeySecret: CONFIG.secretAccessKey
});

const LOCAL_DIR = path.resolve(CONFIG.source);


co(function*() {
    client.useBucket(CONFIG.bucket);

    // 不需要删除，非覆盖式发布
    // const findResult = yield client.list();
    // const remoteFiles = findResult.objects;
    //
    // console.log('remoteFiles   ',remoteFiles);
    //
    // for (var i = 0; i < remoteFiles.length; i++) {
    //     const fileName = remoteFiles[i].name;
    //     yield client.delete(fileName);
    //     console.log('delete：' + fileName);
    // }

    // 上传
    const paths = yield fs.readdir(LOCAL_DIR);

    var htmlFiles = [];
    for (var i = 0; i < paths.length; i++) {
        let path = paths[i];
        let fileDir = LOCAL_DIR + '/' + path;
        const state = yield fs.stat(fileDir);
        if (state.isFile()) {
            if (/\.html/i.test(path)) {
                htmlFiles.push(path);
            } else {
                yield client.put(path, fileDir);
                console.log('put：' + fileDir);
            }
        }
    }

    // html 文件最后提交，设置不缓存头部
    for (var i = 0; i < htmlFiles.length; i++) {
        let path = htmlFiles[i];
        let fileDir = LOCAL_DIR + '/' + path;
        yield client.put(path, fileDir, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Expires': '0'
            }
        });
        console.log('put：' + fileDir);
    }

}).catch(function (err) {
    console.log(err);
});
