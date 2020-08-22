const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        chunkFilename: '[contentHash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ filename: 'www/index.html', template: 'src/public/index.html' }),
    ],
    module: {
        rules: [
        {
            test: /\.(scss)$/,
            exclude: '/node_modules',
            use: [
            {
                // Adds CSS to the DOM by injecting a `<style>` tag
                loader: 'style-loader'
            },
            {
                // Interprets `@import` and `url()` like `import/require()` and will resolve them
                loader: 'css-loader'
            },
            {
                // Loader for webpack to process CSS with PostCSS
                loader: 'postcss-loader',
                options: {
                plugins: function () {
                    return [
                    require('autoprefixer')
                    ];
                }
                }
            },
            {
                // Loads a SASS/SCSS file and compiles it to CSS
                loader: 'sass-loader'
            }
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'file-loader',
            options: {
                name: 'assets/img/[name].[ext]',
            },
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/www'),
        compress: true,
        port: 8080
    }
};