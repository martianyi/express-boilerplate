"use strict";

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var precss = require('precss');
var reporter = require("postcss-reporter");
var scss = require("postcss-scss");
var stylelint = require("stylelint");
var path = require('path');
var conf = require('./conf');

// Loading all plugins
var $ = require('gulp-load-plugins')();

// Compile LESS to CSS
gulp.task('styles', ['clean:css'], function () {
    return buildStyles('app.scss')
});

function buildStyles(file) {
    var processors = [
        stylelint(),
        precss({
            import: {
                extension: 'scss'
            }
        }),
        autoprefixer,
        cssnano,
        reporter({ clearMessages: true })
    ];

    return gulp.src(path.join(conf.paths.sassSrc, file))
        .pipe($.sourcemaps.init())
        .pipe($.postcss(processors, {syntax: scss}))
        .on('error', conf.errorHandler('PostCSS'))
        .pipe($.rename({
            suffix: '.min',
            extname: ".css"
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(conf.paths.cssDist)))
}
