"use strict";

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

//Loading all gulp plugins
var $ = require('gulp-load-plugins')();

// Uglify scripts
gulp.task("es5-uglify", function() {
    return gulp.src(path.join(conf.paths.es5Src, '**/*.js'))
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(conf.paths.jsDist));
});
