const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpacksPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
console.log('IS DEV:', isDev)

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetWebpacksPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
} 

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    // entry: ['./scrypt/index.js'],
    entry: ['@babel/polyfill', './scrypt/index.js'],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new ESLintPlugin(),
        // new CleanWebpackPlugin([ // копирование статики 
        //     {
        //         from: '',
        //         to: ''
        //     }
        // ])
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //           loader: MiniCssExtractPlugin.loader,
            //           options: {
            //             publicPath: "/public/path/to/",
            //           },
            //         },
            //         "css-loader",
            //       ],
            // },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: "/public/path/to/",
                      },
                    },
                    "css-loader",
                    "sass-loader"
                  ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
