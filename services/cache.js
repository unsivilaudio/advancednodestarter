const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisURL = 'redis://localhost:6379';
const client = redis.createClient(redisURL);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
    const key = JSON.stringify(
        Object.assign({}, this.getFilter(), {
            collection: this.mongooseCollection.name,
        })
    );

    // See if we have a value for 'key' in redis
    const cacheValue = await client.get(key);

    // If we do, return that
    if (cacheValue) {
        const doc = JSON.parse(cacheValue);

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc);
    }

    // Otherwise issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));

    console.log('\n************* FROM MONGO **************\n');
    console.log(result);

    return result;
};
