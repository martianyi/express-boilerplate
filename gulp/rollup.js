"use strict";

const gulp = require('gulp');
const rollup = require('rollup').rollup;
const path = require('path');
const conf = require('./conf');

//Loading rollup plugins
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

// Compiling ES6 to ES5
gulp.task("rollup", function () {
    const tasks = conf.paths.es6Entries.map((e) => rollupJS(e));
    return Promise.all(tasks);
});

function rollupJS(file) {
    return rollup({
        entry: file,
        plugins: [
            babel(),
            uglify()
        ]
    }).then((bundle) => {
        return bundle
            .write({
                dest: path.join(conf.paths.jsDist, rename(file)),
                format: 'iife',
                globals: {},
                sourceMap: true
            });
    });
}

function rename(input) {
    let output = input.split('/').pop();
    output = output.split('.').shift();
    output += '.min.js';
    return output;
}
