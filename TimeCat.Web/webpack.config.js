const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../TimeCat.Client/frontend'),
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.css?$/,
                use:['style-loader','css-loader'],
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: true,
        }),
    ],
};