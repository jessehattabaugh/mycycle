'use strict';

let fs = require('fs');
let sh = require('shelljs');
let browserify = require('browserify');
let jade = require('jade');
let chokidar = require('chokidar');

let config = require('./config');


/* Call the build steps one after the other
*****************************************************************************/
clean()
  .then(js)
  .then(html)
  //.then(css)
  .then(watch)
  .catch(function (err) {
    console.error(err);
  });

/* delete old build products and set up directories
*****************************************************************************/
function clean() {
  return new Promise(function (resolve, reject) {
    sh.rm('-rf', config.www);
    sh.mkdir(config.www);
    console.log('removed old build products');
    resolve();
  });
}

/* bundle and transpile javascript
*****************************************************************************/
function js() {
  return new Promise(function (resolve, reject) {
    let b = browserify();
    b.add(config.jsIn);
    b.transform('babelify');
    // todo: minify
    var dest = fs.createWriteStream(config.jsOut);
    b.bundle().pipe(dest);
    console.log('bundled javascript');
    resolve();
  });
}

/* compile html from jade template
*****************************************************************************/
function html() {
  return new Promise(function (resolve, reject) {
    var fn = jade.compileFile(
      config.jadeIn, 
      {
        cache: false,
        pretty: config.min,
      }
    );
    fs.writeFile(config.jadeOut, fn(config));
    console.log('html compiled');
    resolve();
  });
}

/* watch files and re run build functions
*****************************************************************************/
function watch() {
  function redo(fn) {
    return function (path, stat) {
      console.info(`file '${path}' changed ${stat.size} bytes`);
      fn();
    };
  }
  return new Promise(function (resolve, reject) {
    chokidar.watch(config.jsWatch)
      .on('change', redo(js));
    chokidar.watch(config.htmlWatch)
      .on('change', redo(html));
    console.log('watchers initialized');
    resolve();
  });
}
