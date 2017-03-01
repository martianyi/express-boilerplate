"use strict";

const gulp = require('gulp');
const path = require('path');
const _ = require('lodash');
const conf = require('./conf');
const debug = require('debug')('gulp:nodemon');

//Loading all gulp plugins
const $ = require('gulp-load-plugins')();

gulp.task('nodemon', function () {
    const ignore = _.flattenDeep([
        conf.paths.lessSrc,
        conf.paths.es6Src,
        path.join('public', '**/*')
    ]);
    return $.nodemon({
        script: './bin/www',
        ext: 'js',
        ignore: ignore,
        tasks: []
    }).on('restart', function () {
        debug('server restarted!')
    })
});