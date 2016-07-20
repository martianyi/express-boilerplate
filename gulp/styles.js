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

// postcss processors
var processors = [
    stylelint(),
    precss({
        import: {
            extension: 'scss'
        }
    }),
    autoprefixer,
    cssnano,
    reporter({clearMessages: true})
];

// Compile SCSS to CSS
gulp.task('styles', ['clean:css'], function () {
    var arr = conf.paths.sassSrc.map((file)=> {
            return buildStyles(file);
});
    return Promise.all(arr);
});

function buildStyles(file) {
    return gulp.src(file)
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