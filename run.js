'use strict';
var config = require('./config');
var qumblr = require('qumblr.js');
var logger = require('brickflow-logger')({
  logstash: {
    port: config.get('LOGSTASH_PORT'),
    nodeName: config.get('LOGSTASH_APP_NAME'),
    host: config.get('private:LOGSTASH_HOST')
  },
  amqp: config.get('private:RABBITMQ_CREDENTIALS'),
});

qumblr({ logger: logger }).listen({
  amqpCredentials: config.get('private:RABBITMQ_CREDENTIALS'),
  queueName: 'tumblr-queue',
  successQueueName: 'tumblr-queue-success',
  tumblrCredentials: {
    consumer_key: config.get('private:TUMBLR_APP_KEY'),
    consumer_secret: config.get('private:TUMBLR_APP_SECRET'),
    logger: logger
  }
});
