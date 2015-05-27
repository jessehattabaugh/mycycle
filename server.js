'use strict';

let config = require('./config');
let server = require('node-static');
let www = new server.Server(config.www);

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    www.serve(request, response);
  }).resume();
}).listen(config.port);

console.log(`static server started on port ${config.port}`);