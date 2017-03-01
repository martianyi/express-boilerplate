"use strict";

const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
requireDir('./gulp', {
    recurse: true
});

gulp.task('build', function () {
    runSequence(
        'clean',
        ['rollup', 'styles']
    )
});

gulp.task('dev', function () {
    runSequence(
        'clean',
        ['rollup', 'styles'],
        ['nodemon', 'watch']
    )
});

gulp.task('default', ['dev']);