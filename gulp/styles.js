"use strict";

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');
var path = require('path');
var conf = require('./conf');

// Loading all plugins
var $ = require('gulp-load-plugins')();

gulp.task('clean', function () {
    return del([
        path.join(conf.paths.cssDist)
    ]);
});

// Compile LESS to CSS
gulp.task('styles', ['clean'], function () {
    return buildStyles('app.scss')
});

function buildStyles(file) {
    var processors = [
        autoprefixer,
        cssnano
    ];

    return gulp.src(path.join(conf.paths.sassSrc, file))
        .pipe($.sass())
        .on('error', conf.errorHandler('SASS'))
        .pipe($.sourcemaps.init())
        .pipe($.postcss(processors))
        .on('error', conf.errorHandler('PostCSS'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(conf.paths.cssDist)))
}
