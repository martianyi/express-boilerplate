"use strict";

const gulp = require('gulp');
const path = require('path');
const conf = require('./conf');

// Loading gulp plugins
const $ = require('gulp-load-plugins')();

// Loading postcss processors
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const reporter = require("postcss-reporter");
const processors = [
    autoprefixer,
    cssnano,
    reporter({clearMessages: true})
];

// Compile SCSS to CSS
gulp.task('styles', function () {
    const tasks = conf.paths.lessEntries.map(file=>buildStyles(file));
    return Promise.all(tasks);
});

function buildStyles(file) {
    return gulp.src(file)
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .on('error', conf.errorHandler('LESS'))
        .pipe($.postcss(processors))
        .on('error', conf.errorHandler('PostCSS'))
        .pipe($.rename({
            suffix: '.min',
            extname: ".css"
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(conf.paths.cssDist)))
}