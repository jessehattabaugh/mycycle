'use strict';

let path = require('path');

let config = exports; // alias

config.www = path.join(__dirname, 'www');
config.src = path.join(__dirname, 'src');
config.jsIn = path.join(config.src, 'main.js');
config.jsOut = path.join(config.www, 'index.js');
config.jadeIn = path.join(config.src, 'main.jade');
config.jadeOut = path.join(config.www, 'index.html');
config.jsWatch = path.join(config.src, '**/*.js');
config.htmlWatch = path.join(config.src, '**/*.jade');

config.min = false; // whether or not to minify
config.port = parseInt(process.env.PORT, 10) || 3000;