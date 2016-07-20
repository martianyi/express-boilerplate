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
            ext: 'js jsx scss',
            ignore: [
                path.join(conf.paths.jsDist, '**/*'),
                path.join(conf.paths.cssDist, '**/*'),
                path.join('public', 'vendor')
            ],
            tasks: [
                'es5-uglify',
                'es6-rollup',
                'styles'
            ]
        })
        .on('restart', function () {
            debug('server restarted!')
        })
});