"use strict";

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var debug = require('debug')('gulp:nodemon');

//Loading all gulp plugins
var $ = require('gulp-load-plugins')();

gulp.task('start', function () {
    return $.nodemon({
            script: './bin/www',
            ignore: [path.join(conf.paths.jsDist, '**/*.js'),path.join('styles', '**/*')],
            tasks: ['uglify']
        })
        .on('restart', function () {
            debug('server restarted!')
        })
});