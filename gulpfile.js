"use strict";

var gulp = require('gulp');
var requireDir = require('require-dir');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
requireDir('./gulp', {
    recurse: true
});

gulp.task('build', ['es5-uglify', 'es6-rollup', 'styles']);

gulp.task('default', ['nodemon']);
