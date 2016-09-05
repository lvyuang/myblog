const path = require('path');
const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
const package = require(path.resolve(process.cwd(), 'package.json'));
const client = redis.createClient(package.redis[env]);

module.exports = client;