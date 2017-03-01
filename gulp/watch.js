"use strict";

const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');

gulp.task('watch', function () {
    gulp.watch(conf.paths.lessSrc, ['styles']);
    gulp.watch(conf.paths.es6Src, ['rollup']);
});

