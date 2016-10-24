"use strict";

var gulp = require('gulp');
var del = require('del');
var path = require('path');
var conf = require('./conf');

gulp.task('clean', function () {
    return del([
        conf.paths.jsDist,
        conf.paths.cssDist
    ]);
});