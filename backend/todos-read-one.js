'use strict';

const redis = require('redis');

const host = process.env.REDIS_HOST;
const pass = process.env.REDIS_PASSWORD;

module.exports = {
  readOne: (event, context) => new Promise((resolve, reject) => {
    const client = redis.createClient({
      host,
      password: pass,
    });
    client.on('error', function (err) {
      reject('Error ' + err);
    });
    client.on('ready', () => {
      client.hget('todos', event.extensions.request.query.id, (err, rep) => {
        client.quit();
        if (err) {
          reject(err);
        } else {
          resolve(rep);
        }
      });
    });
  }),
};
