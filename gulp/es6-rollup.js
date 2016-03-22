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

var includePathOptions = {
    paths: ['clients/es6']
};

var entries = []; //put entries here

// Compiling ES6 to ES5
gulp.task("es6-rollup", function () {
    return entries.forEach(function (e) {
        rollupJS(e)
    })
});

function rollupJS(entries) {
    var output = entries.split('/').pop();
    output = output.split('.').shift();
    output += '.min.js';
    return rollup({
        entry: entries,
        plugins: [
            rollupIncludePaths(includePathOptions),
            babel(),
            uglify()
        ]
    }).then(function (bundle) {
        return bundle
            .write({
                dest: path.join(conf.paths.jsDist, output),
                format: 'iife',
                sourceMap: true
            });
    });

}

