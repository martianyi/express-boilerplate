"use strict";

const nconf = require('nconf');
const path = require('path');
const fs = require('fs');

//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. config.json
//   4. default configs

nconf.argv()
    .env({
        lowerCase: true
    });

nconf.file({
    file: path.join(__dirname, '../config.json'),
    format: require('nconf-json')
});

// 默认配置
nconf.defaults({
    port: 3000, // port to serve.
    enable_https: false
});

module.exports = nconf.get();
