"use strict";

var gulp = require('gulp');
var rollup = require('rollup').rollup;
var path = require('path');
var conf = require('./conf');

//Loading rollup plugins
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

// Compiling ES6 to ES5
gulp.task("rollup", function () {
    var tasks = conf.paths.es6Entries.map((e)=>rollupJS(e));
    return Promise.all(tasks);
});

function rollupJS(file) {
    return rollup({
        entry: file,
        plugins: [
            babel(),
            uglify()
        ]
    }).then(function (bundle) {
        return bundle
            .write({
                dest: path.join(conf.paths.jsDist, rename(file)),
                format: 'iife',
                globals: {

                },
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
