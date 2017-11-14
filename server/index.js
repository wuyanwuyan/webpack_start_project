import Koa from 'koa';
import koaBody from 'koa-body';
import indexRoute  from './routes';
import gzip from 'koa-gzip';
import http from 'http';
import './serverConf/redis';

const app = new Koa();
// error handle
app.use(async function (ctx, next) {
    try {
        await next();
    } catch (e) {
        app.emit('error', e, ctx);
    }
});

// if (process.env.NODE_ENV !== 'production') {
    app.use(require('koa-cors')());
// }


app.use(require('koa-static')(__dirname + '/static'));

app.use(gzip());

// app.use(bodyParser());

app.use(koaBody({multipart: true}));

app.use(indexRoute.routes());


const port = process.env.PORT || 8091;

var server = http.createServer(app.callback());

server.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('✅ Listening at http://localhost:%s \n------------------------------------------------------------', port);
});
