var config = require('./helpers/config/app-config');
var apiRouter = require('./controllers');
var serviceRouter = require('./services/server-service');
var express = require('express');
var server = express();

server.use('/api', apiRouter);
server.use('/', serviceRouter);

server.listen(config.port, config.host, function () {
  console.log('Stock index list is serving on port: ' + config.port);
});

module.exports = server;