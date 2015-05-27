'use strict';

let fs = require('fs');
let path = require('path');
let sh = require('shelljs');
let browserify = require('browserify');

let www = path.join(__dirname, 'www');
let src = path.join(__dirname, 'src');

clean()
  .then(js)
  .then(html)
  .then(css)
  .catch(function (err) {
    console.error(err);
  });

function clean() {
  return new Promise(function (resolve, reject) {
    sh.rm('-rf', www);
    sh.mkdir(www);
    console.log('removed old build products');
    resolve();
  });
}

function js() {
  return new Promise(function (resolve, reject) {
    let b = browserify();
    b.add(path.join(src, 'main.js'));
    b.transform('babelify');
    // todo: minify
    var dest = fs.createWriteStream(path.join(www, 'index.js'));
    b.bundle().pipe(dest);
    console.log('bundled javascript');
    resolve();
  });
}

function html() {
  return new Promise(function (resolve, reject) {
    console.log('html');
    resolve();
  });
}

function css() {
  return new Promise(function (resolve, reject) {
    console.log('css');
    resolve();
  });
}