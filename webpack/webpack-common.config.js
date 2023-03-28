const WebpackBar = require('webpackbar');
const path = require("path");

const isProduction = process.env.NODE_ENV == 'production';

const SRC = path.resolve(__dirname, '../src')
const DIST = path.resolve(__dirname, '../dist')

const config = {
    output: {
        path: DIST
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                include: [SRC],
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            "targets": "defaults"
                        }],
                        '@babel/preset-react'
                    ]
                }
            },
        ],
    },
    plugins: [
        new WebpackBar(),
    ],
};

const getConfig = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.devtool = 'source-map';
        config.mode = 'development';
    }
    return config;
};

module.exports = getConfig()
