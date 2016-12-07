"use strict";

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var debug = require('debug')('gulp:nodemon');

//Loading all gulp plugins
var $ = require('gulp-load-plugins')();

gulp.task('nodemon', function () {
    return $.nodemon({
            script: './bin/www',
            ext: 'js',
            ignore: [
                path.join(conf.paths.lessSrc, '**/*'),
                path.join(conf.paths.es6Src, '**/*'),
                path.join(conf.paths.es5Src, '**/*'),
                path.join('public', '**/*')
            ],
            tasks: []
        })
        .on('restart', function () {
            debug('server restarted!')
        })
});