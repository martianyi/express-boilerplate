"use strict";

const gulp = require('gulp');
const del = require('del');
const path = require('path');
const conf = require('./conf');

gulp.task('clean', function () {
    return del([
        conf.paths.jsDist,
        conf.paths.cssDist
    ]);
});