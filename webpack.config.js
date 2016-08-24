const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');
const merge = require('webpack-merge');

const env = process.env.NODE_ENV || 'dev';
const sandbox = process.env.NODE_ENV_SANDBOX || 'false';

let config = {
    entry: {
        root: ['babel-polyfill', './src/root.js'],
        vendor: Object.keys(package.dependencies)
    },
    output: {
        filename: '[name].[hash].file.js',
        chunkFilename: '[id].[chunkhash].chunk.js',
        path: path.resolve('./build'),
        pathinfo: true,
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!less'
            },
            {
                test: /\.css$/,
                include: /(normalize\.css)/,
                loader: 'style!css'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: 'url?limit=1'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new CleanWebpackPlugin(['release']),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), 'root.html'),
            filename: 'index.html',
            inject: false
        })
    ]
};

if (env === 'production') {
    config = merge(config, {
        output: {
            path: path.resolve(process.cwd(), './release'),
            publicPath: sandbox === 'true' ? '/' : '/'
        },
        plugins: [
            new ExtractTextPlugin('[name].[chunkhash].css'),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false}
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    });

    config.module.loaders = [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.js$/,
            include: /routes/,
            loader: 'express-hot'
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        },
        {
            test: /\.css$/,
            include: /(normalize\.css)/,
            loader: ExtractTextPlugin.extract('style', 'css')
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            loader: 'url?limit=1'
        }
    ];
}
else if (env === 'test') {
    config = merge(config, {
        output: {
            path: './release',
            publicPath: '/'
        }
    });
}
else {
    config = merge(config, {
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'eslint',
                    include: /\bsrc\b|\bweb_modules\b/
                }
            ]
        },
        eslint: {
            emitError: true,
            failOnError: false
        },
        devtool: 'cheap-module-eval-source-map'
    });
}

module.exports = config;