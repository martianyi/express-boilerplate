"use strict";

var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

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
        ['uglify', 'rollup', 'styles']
    )
});

gulp.task('default', ['nodemon', 'watch']);
