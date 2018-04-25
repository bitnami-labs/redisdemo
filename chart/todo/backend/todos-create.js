'use strict';

const uuid = require('uuid');
const redis = require('redis');

const host = process.env.REDIS_HOST;
const pass = process.env.REDIS_PASSWORD;

module.exports = {
  create: (event, context) => new Promise((resolve, reject) => {
    const client = redis.createClient({
      host,
      password: pass,
    });
    const data = event.data;
    data.id = uuid.v1();
    data.updatedAt = new Date().getTime();
    client.on('error', function (err) {
      reject('Error ' + err);
    });
    client.on('ready', () => {
      client.hset('todos', data.id, JSON.stringify(data), (err, reply) => {
        client.quit();
        if (err !== null) {
          reject(err);
        } else {
          resolve(JSON.stringify(data));
        }
      })
    })
  }),
};
