"use strict";

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

gulp.task('watch', function () {
    gulp.watch(path.join(conf.paths.lessSrc, '**/*.less'), ['styles']);
    gulp.watch(path.join(conf.paths.es6Src, '**/*.js'), ['rollup']);
    gulp.watch(path.join(conf.paths.es5Src, '**/*.js'), ['uglify']);
});

