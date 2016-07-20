"use strict";

var gulp = require('gulp');
var rollup = require('rollup').rollup;
var path = require('path');
var conf = require('./conf');

//Loading all gulp plugins
var $ = require('gulp-load-plugins')();

//Loading rollup plugins
var rollupIncludePaths = require('rollup-plugin-includepaths');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

// Compiling ES6 to ES5
gulp.task("es6-rollup", function () {
    var arr = conf.paths.es6Entries.map(function (e) {
        return rollupJS(e)
    });

    return Promise.all(arr);
});

function rollupJS(file) {
    return rollup({
        entry: file,
        plugins: [
            rollupIncludePaths({
                paths: conf.paths.es6Src
            }),
            babel(),
            uglify()
        ]
    }).then(function (bundle) {
        return bundle
            .write({
                dest: path.join(conf.paths.jsDist, rename(file)),
                format: 'iife',
                sourceMap: true
            });
    });
}

function rename(input) {
    var output = input.split('/').pop();
    output = output.split('.').shift();
    output += '.min.js';
    return output;
}
