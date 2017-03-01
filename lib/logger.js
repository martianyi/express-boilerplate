"use strict";

const winston = require('winston');
const logLevel = require('../config/config')['log_level'];
const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue'
    }
};

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: logLevel.toLowerCase(),
            levels: logLevels.levels,
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: function() {
                return new Date().toISOString();
            },
            formatter: function(options) {
                // Return string will be passed to logger.
                return options.timestamp() +' '
                    + winston.config.colorize(options.level,options.level.toUpperCase()) +' '
                    + (options.message ? options.message : '')
                    + (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        })
    ],
    exitOnError: false
});

winston.addColors(logLevels.colors);

module.exports = logger;
