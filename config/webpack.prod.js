
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');

const { cpus } = require('os');

module.exports = {

    entry: join(__dirname, '../src/index.tsx'),

    output: {
        filename: '[name].[contenthash:10].js',
        path: join(__dirname, '../dist'),
        clean: true,
        chunkFilename: 'static/js/[name].[contenthash:10].chunk.js',
        assetModuleFilename: 'static/assets/[name][ext][query]'
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.less$/,
                        use: [
                            miniCssExtractPlugin.loader,
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

    resolve: {
        extensions: ['.less', '.json', '.css', '.js', '.jsx', '.ts', '.tsx'],

        alias: {
            '@': join(__dirname, '../src/')
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: join(__dirname, '../public/index.html')
        }),
        new miniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:10].css'
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: "public/**/*",
                    globOptions: {
                        dot: true,
                        ignore: ["**/file.*", "**/ignored-directory/**"],
                    },
                },
            ]
        })
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    filename: 'static/js/[name].chunk.js'
                },
                react: {
                    test: /[\\/]node_modules[\\/]react/,
                    priority: 20,
                    reuseExistingChunk: true,
                    filename: 'static/js/[name].chunk.js'
                }
            }
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
        minimize: true,
        minimizer: [
            // new ImageMinimizerPlugin({   依赖装不上
            //     minimizer: {
            //         implementation: ImageMinimizerPlugin.imageminMinify,
            //         options: {
            //             // Lossless optimization with custom option
            //             // Feel free to experiment with options for better result for you
            //             plugins: [
            //                 ["gifsicle", { interlaced: true }],
            //                 ["jpegtran", { progressive: true }],
            //                 ["optipng", { optimizationLevel: 5 }],
            //                 // Svgo configuration here https://github.com/svg/svgo#configuration
            //                 [
            //                     "svgo",
            //                     {
            //                         plugins: [
            //                             {
            //                                 name: "preset-default",
            //                                 params: {
            //                                     overrides: {
            //                                         removeViewBox: false,
            //                                         addAttributesToSVGElement: {
            //                                             params: {
            //                                                 attributes: [
            //                                                     { xmlns: "http://www.w3.org/2000/svg" },
            //                                                 ],
            //                                             },
            //                                         },
            //                                     },
            //                                 },
            //                             },
            //                         ],
            //                     },
            //                 ],
            //             ],
            //         },
            //     },
            // }),
            new cssMinimizerWebpackPlugin()
        ]
    },

    devtool: 'source-map',

    mode: 'production',

    performance: false

}