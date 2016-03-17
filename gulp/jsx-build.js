"use strict";

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');

//Loading all gulp plugins
var $ = require('gulp-load-plugins')();

// Browserify traversed your dependency tree, starting with  index.jsx
// Transpiled source files to ES5
// Bundled them all together into one file
// Sent it on its merry way to the dist  directory

gulp.task("jsx-build", function () {
    return browserify({
        entries: path.join(conf.paths.jsxSrc, 'index.jsx'),
        extensions: ['.jsx'],
        debug: true
    })
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .on('error', conf.errorHandler)
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.sourcemaps.write("."))
        .pipe(gulp.dest(conf.paths.jsDist));
});
