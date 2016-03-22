"use strict";

var gulp = require('gulp');
var del = require('del');
var path = require('path');
var conf = require('./conf');

gulp.task('clean:css', function () {
    return del([
        path.join(conf.paths.cssDist)
    ]);
});