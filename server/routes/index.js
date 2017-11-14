import koaRouter from 'koa-router';
import redis from '../serverConf/redis';
import moment from 'moment';

let router = new koaRouter();

let key = 'contact';

if (process.env.NODE_ENV !== 'production') {
    key = 'TESTcontact'
}

router.get('/contact', async (ctx, next) => {
    if (ctx.query.token !== 'chuangqikey') {
        ctx.body = null;
        return;
    }
    let ret = await redis.lrangeAsync(key, 0, -1);
    let mapStr = ret.map((v, i) => {
        let one = JSON.parse(v);
        return `
        <tr>
            <th>${one.contact}</th>
            <th>${one.appName}</th>
            <th>${one.phone}</th>
            <th>${one.qq}</th>
            <th>${moment(one.time).format('YYYY-MM-DD HH:mm:ss')}</th>
            <th>${one.ip}</th>
        </tr>
        `
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

router.post('/contact', async (ctx, next) => {
    if(ctx.request.type.indexOf('json') === -1){
        ctx.status = 400;
        return;
    }
    let content = ctx.request.body;
    content.time = moment();
    // content.ip = ctx.headers['x-real-ip'];
    content.ip = ctx.headers['x-forwarded-for'].split(',')[0];
    await redis.lpushAsync(key, JSON.stringify(content));
    ctx.body = null;
});

export default router;
