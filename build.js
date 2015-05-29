'use strict';

// external dependencies
let fs = require('fs');
let sh = require('shelljs');
let browserify = require('browserify');
let jade = require('jade');
let postcss = require('postcss');
let chokidar = require('chokidar');

// internal dependencies
let config = require('./config');


/* Call the build steps one after the other
*****************************************************************************/
clean()
  .then(js)
  .then(html)
  .then(css)
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
      config.htmlIn, 
      {
        cache: false,
        pretty: !config.min
      }
    );
    fs.writeFile(config.htmlOut, fn(config));
    console.log('html compiled');
    resolve();
  });
}

/* process css with postcss
*****************************************************************************/
function css() {
  return new Promise(function (resolve, reject) {
    let processor = postcss([
      require('postcss-import')({path: []}),
      require('autoprefixer')('> 1%')
    ]);
    let src = fs.readFileSync(config.cssIn, "utf8");
    let out = processor.process(src, {
      from: config.cssIn,
      to: config.cssOut
    });
    fs.writeFileSync(config.cssOut, out.css);
    console.log('css compiled');
    resolve();
  });
}

/* watch files and re run build functions
*****************************************************************************/
function watch() {
  function redo(fn) {
    return function (path, stat) {
      console.info(`file '${path}' changed ${stat.size} bytes`);
      setTimeout(fn, 5000);
    };
  }
  return new Promise(function (resolve, reject) {
    chokidar.watch(config.jsWatch)
      .on('change', redo(js));
    chokidar.watch(config.htmlWatch)
      .on('change', redo(html));
    chokidar.watch(config.cssWatch)
      .on('change', redo(html));
    console.log('watchers initialized');
    resolve();
  });
}
