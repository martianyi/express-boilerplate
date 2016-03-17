"use strict";

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

//Loading all gulp plugins
var $ = require('gulp-load-plugins')();

// Compiling ES6 to ES5
gulp.task("es6-babel", function () {
    return gulp.src(path.join(conf.paths.es6Src, '**/*.js'))
        .pipe($.sourcemaps.init())
        .pipe($.babel())//babel相关配置详见.babelrc
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(conf.paths.jsDist));
});

