import koaRouter from 'koa-router';
import redis from '../serverConf/redis';
import moment from 'moment';
import {renderHbs} from '../utils/serverRender';

let router = new koaRouter();

let key = 'contact';

if (process.env.NODE_ENV !== 'production') {
    key = 'contact'
}

router.get('/contact', async (ctx, next) => {
    if (ctx.query.token !== 'chuangqikey') {
        ctx.body = null;
        return;
    }
    let ret = await redis.lrangeAsync(key, 0, -1);
    let data = ret.map(v=>{
        let parseObj = JSON.parse(v);
        parseObj.time = moment(parseObj.time).format('YYYY-MM-DD <br/> HH:mm:ss');
        return parseObj;
    });
    ctx.body = await renderHbs('contact.hbs',{data});
});

router.post('/contact', async (ctx, next) => {
    if (ctx.request.type.indexOf('json') === -1) {
        ctx.status = 400;
        return;
    }
    let content = ctx.request.body;
    content.time = moment();
    // content.ip = ctx.headers['x-real-ip'];
    content.ip = ctx.headers['x-forwarded-for'].split(',')[0];
    content.userAgent = ctx.headers['user-agent'];
    await redis.lpushAsync(key, JSON.stringify(content));
    ctx.body = null;
});

export default router;
