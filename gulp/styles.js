"use strict";

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

// Loading gulp plugins
var $ = require('gulp-load-plugins')();

// Loading postcss processors
var stylelint = require("stylelint");
var precss = require('precss');
var scss = require("postcss-scss");
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var reporter = require("postcss-reporter");
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
gulp.task('styles', function () {
    var tasks = conf.paths.sassEntries.map(file=>buildStyles(file));
    return Promise.all(tasks);
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