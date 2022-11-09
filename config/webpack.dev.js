const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ResourceAnalysisWebpackPlugin = require('./plugins/resource-analysis-webpack-plugin');
const webpack = require('webpack')

const { cpus } = require('os');

module.exports = {

    entry: join(__dirname, '../src/index.tsx'),

    output: {
        filename: '[name].js',
        path: join(__dirname, 'dist'),
        chunkFilename: 'static/js/[name].chunk.js',
        assetModuleFilename: 'static/assets/[name][ext][query]'
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            [
                                                'postcss-preset-env'
                                            ],
                                        ],
                                    }
                                }
                            },
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.(svg|png|jpg|jpeg)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024 // 10kb
                            }
                        }
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        type: 'asset/resource',
                    },
                    {
                        test: /\.(ts|tsx)$/,
                        loader: 'ts-loader'
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'thread-loader',
                                options: {
                                    Worker: cpus().length
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, '../public/index.html')
        }),
        new EslintWebpackPlugin({
            failOnWarning: true,
            context: join(__dirname, '../src/**/*'),
            // cache: true,
            // cacheLocation: join(__dirname, '../node_modules/.cache/eslintCache'),
            threads: cpus().length
        }),
        new ReactRefreshWebpackPlugin(),
        new webpack.ProvidePlugin({
            'PROCESS': join(__dirname, `../.env.${process.env.NODE_ENV}.json`)
        }),
        new ResourceAnalysisWebpackPlugin()
    ],

    resolve: {
        extensions: ['.less', '.json', '.css', '.js', '.jsx', '.ts', '.tsx'],

        alias: {
            '@': join(__dirname, '../src/')
        }
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    devServer: {
        host: 'localhost',
        port: 1930,
        hot: true,
        historyApiFallback: true
    },

    devtool: 'cheap-module-source-map',

    mode: 'development'

}