const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [

        new HTMLWebpackPlugin( {
            template: './src/index.html'
        }),
        new CSSExtractPlugin()
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },

            {
                test: /.css$/,
                exclude: /node_modules/,
                use: [CSSExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}