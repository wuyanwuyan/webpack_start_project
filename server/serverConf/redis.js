import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(require('./password.json'));

client.on("error", function (err) {
    console.log("redis Error " + err);
});

if (process.env.NODE_ENV !== 'production') {
    client.monitor(function (err, res) {
        console.log("Entering monitoring mode.");
    });

    client.on("monitor", function (time, args, raw_reply) {
        console.log(args);
    });
};

export default client;