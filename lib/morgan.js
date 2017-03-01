"use strict";

const morgan = require('morgan');
const logger = require('./logger');

morgan.format('rooms', `Error :msg Method :method Response code :status Request url :url`);

morgan.token('msg', function (req, res) {
    return res.statusMessage;
});

module.exports = morgan('rooms', {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: {
        write: function (message, encoding) {
            logger.warn(message.slice(0, -1));
        }
    }
});