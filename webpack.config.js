var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './app/index'],
    output: {
        filename: '../js/[name].js',
        path: path.join(__dirname, 'app'),
        publicPath: './app/'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
        ]
    }
    ,
    watch: true,
    watcherOptions: {
        aggregateTimeout: 100
    }
};