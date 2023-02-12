const path = require('path');
const CopyPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production';

const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')

const config = {
    target: 'node',
    entry: {
        'client': path.join(SRC, 'client.js'),
        'server': path.join(SRC, 'server.js'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "index.html", to: "index.html" },
            ],
        }),
    ],
    output: {
        path: DIST,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/i,
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
    resolve: {
        extensions: ['', '.js', '.jsx', '.mjs'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.devtool = 'source-map';
        config.mode = 'development';
    }
    return config;
};
