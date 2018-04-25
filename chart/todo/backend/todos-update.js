'use strict';

const _ = require('lodash');
const redis = require('redis');
const uuid = require('uuid');

const host = process.env.REDIS_HOST;
const pass = process.env.REDIS_PASSWORD;

module.exports = {
  update: (event, context) => new Promise((resolve, reject) => {
    const data = event.data;
    const client = redis.createClient({
      host,
      password: pass,
    });
    client.on('error', function (err) {
      reject('Error ' + err);
    });
    client.on('ready', () => {
      client.hget('todos', event.extensions.request.query.id, (err, rep) => {
        if (err) {
          reject(err);
        } else {
          const entry = JSON.parse(rep);
          const newEntry = _.cloneDeep(entry);
          _.assign(newEntry, data, { id: uuid.v1(), updatedAt: new Date().getTime() });
          client.hset('todos', newEntry.id, JSON.stringify(newEntry), (err, reply) => {
            if (err) {
              reject(err);
            } else {
              client.hdel('todos', event.extensions.request.query.id, (err, rep) => {
                client.quit();
                if (err) {
                  reject(err);
                } else {
                  resolve(JSON.stringify(newEntry));
                }
              });
            }
          })
        }
      });
    });
  }),
};
