"use strict";

/**
 *  This file contains the constiables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    es6Src: [
        'app/clients/**/*.js'
    ],
    es6Entries: [],
    lessSrc: [
        'app/styles/**/*.less'
    ],
    lessEntries: [
        'app/styles/app.less'
    ],
    jsDist: 'public/js',
    cssDist: 'public/css'
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    'use strict';

    return function (err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};