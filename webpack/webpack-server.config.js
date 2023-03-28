
const { merge } = require('webpack-merge');

const webpackCommon = require('./webpack-common.config');
const path = require("path");
const SRC = path.resolve(__dirname, '../src')

module.exports = merge(webpackCommon, {
    name: 'server',
    target: 'node',
    entry: {
        'server': path.join(SRC, 'server.js'),
    },
})
