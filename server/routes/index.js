import koaRouter from 'koa-router';
import redis from '../serverConf/redis';
import moment from 'moment';

let router = new koaRouter();

let key = 'TEST_contact';

if (process.env.NODE_ENV !== 'production') {
    key = 'TEST_contact'
}

router.get('/contact', async (ctx, next) => {
    let ret = await redis.lrangeAsync(key, 0, -1);
    ctx.body = ret;
});

router.post('/contact', async (ctx, next) => {
    let content = ctx.request.body;
    content.time = moment();
    await redis.rpushAsync(key, JSON.stringify(content));
    ctx.body = null;
});

export default router;
