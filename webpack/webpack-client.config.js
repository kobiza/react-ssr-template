const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const SRC = path.resolve(__dirname, '../src')

module.exports = merge(webpackCommon, {
    name: 'client',
    target: ["web", "es5"],
    entry: {
        'client': path.join(SRC, 'client.js'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "index.html", to: "index.html" },
            ],
        }),
    ],
});
