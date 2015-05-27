"use strict";

let path = require('path');
let webpack = require('webpack');
let sh = require('shelljs');

let www = path.join(__dirname, 'www');

// delete old build products
sh.rm('-rf', www);

let bundle = webpack({
  context: path.join(__dirname, 'src'),
  entry: 'entry.js',
  output: {
    path: www,
    filename: 'bundle.js'
  }
}, function (err, stats) {
  //console.dir(arguments);
  if (err) {
    console.error(err);
  }
  console.info(`packing took ${stats.endTime - stats.startTime}ms`);
});
//console.dir(bundle);
console.info('packing...');