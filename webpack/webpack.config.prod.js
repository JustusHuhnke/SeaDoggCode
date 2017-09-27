const fs = require('fs');
const resolve = require('path').resolve;
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const OfflinePlugin = require('offline-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const vendorStyles = require("./vendor.style").default;
const vendorScripts = require("./vendor.scripts").default;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Hashids = require('hashids');

const entry = process.env.TEMP_NAME ? {bundle: process.env.TEMP_NAME} : {
    bundle: './client/index.tsx',
    vendor: vendorScripts,
    style: './styles/index.ts',
};

const excludes_offline = ['/', 'style/style.css*', 'style.css*'];

fs.readdirSync(resolve(__dirname, "..", "styles")).forEach(file => {
    if (/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        entry[name] = resolve(__dirname, '../styles', name + '.scss');
        excludes_offline.push(name + ".*.js")
    }
});
entry['base'] = [entry['base'], ...vendorStyles];

const plugins = [
    new LodashModuleReplacementPlugin,
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        root: resolve(__dirname, '..')
    }),
    new webpack.DefinePlugin({
        'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('production'),
            WEB: JSON.stringify('production')
        }
    }),

    new ExtractTextPlugin("style/[name].[hash:4].css"),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        beautify: false,
        sourcemap: false,
        comments: false,
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        },
        output: {
            comments: false
        }
    }),
];

if (process.env.TEMP_NAME === undefined) {
    plugins.push(new CleanWebpackPlugin(['./dist/public/'], {
        root: resolve(__dirname, '..'),
        verbose: true,
    }));
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.[hash:4].js'
    }));
    plugins.push(new WebpackErrorNotificationPlugin());
    plugins.push(new BellOnBundlerErrorPlugin());
    plugins.push(new OfflinePlugin({
        excludes: excludes_offline,
        responseStrategy: 'network-first',
        caches: true,
        autoUpdate: true,
        ServiceWorker: {
            minify: true,
            events: true
        },
        AppCache: {
            events: true
        }
    }));
    plugins.push(new ManifestPlugin({
        fileName: "../server/manifest.json"
    }),);
    plugins.push(new SpriteLoaderPlugin());
}

module.exports = {
    devtool: false,
    target: 'web',
    entry: entry,
    output: {
        path: resolve(__dirname, '../dist/public'),
        publicPath: '/',
        libraryTarget: 'umd',
        filename: '[name].[hash:4].js',
        sourceMapFilename: '[name].js.map?v=[hash]',
        chunkFilename: '[name].[hash:4].js',
        jsonpFunction: '$'
    },

    context: resolve(__dirname, '../'),
    resolve: {
        modules: ['node_modules'],
        extensions: [".ts", ".tsx", ".js", '.scss', '.css'],
        descriptionFiles: ['package.json'],
        moduleExtensions: ['-loader'],
        alias: {
            "_actions": resolve(__dirname, '..', 'store/actions/index.ts'),
            "_blocks": resolve(__dirname, '..', 'view/block/index.ts'),
            "_config": resolve(__dirname, '..', 'server/config.ts'),
            '_components': resolve(__dirname, '..', 'view/components'),
            '_containers': resolve(__dirname, '..', 'view/containers'),
            "_reducers": resolve(__dirname, '..', 'store/reducers/index.ts'),
            "_reducer": resolve(__dirname, '..', 'store/reducers'),
            "_route": resolve(__dirname, '..', 'route/index.tsx'),
            "_store": resolve(__dirname, '..', 'store/index.ts'),
            "_static": resolve(__dirname, '..', 'static'),
            "_images": resolve(__dirname, '..', 'static/images'),
            "_stylesLoad": resolve(__dirname, '..', 'styles'),
            "_style": resolve(__dirname, '..', 'styles/index.ts'),
            "_socket": resolve(__dirname, '..', 'client/socket.ts'),
            "_utils": resolve(__dirname, '..', 'utils')
        }
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader", options: {
                            sourceMap: false,
                            minimize: true,
                            localIdentName: '[local]',
                            importLoaders: 1,
                        }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: false,
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: [
                                            'last 2 versions',
                                            '> 1%',
                                            'android 4',
                                            'iOS 9',
                                        ],
                                        cascade: false
                                    }),
                                    require('cssnano')({
                                        preset: 'advanced',
                                    })
                                ]
                            }
                        },
                    ]
                })
            },
            {
                test: /\.s[ac]ss$/,
                use:
                    ExtractTextPlugin.extract({
                        fallback: "style-loader?sourceMap=false",
                        use: [
                            {
                                loader: "css-loader", options: {
                                sourceMap: false,
                                modules: true,
                                importLoaders: 3,
                                minimize: true,
                                localIdentName: '[local]',
                                getLocalIdent: (context, localIdentName, localName) => {
                                    const hashids = new Hashids(localName);
                                    const lngt = localName.length;
                                    const name = hashids.encode(lngt, lngt, lngt).replace(/^\d/ig, "_" + hashids.encode(1));
                                    return name;
                                }
                            }
                            },
                            'group-css-media-queries-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: false,
                                    plugins: () => [require('autoprefixer')({
                                        browsers: [
                                            'last 2 versions',
                                            '> 1%',
                                            'android 4',
                                            'iOS 9',
                                        ],
                                        cascade: false
                                    })]
                                }
                            },
                            {
                                loader: "sass-loader", options: {
                                sourceMap: false,
                                // indentedSyntax: true,
                                modules: true,
                            }
                            },
                        ]
                    })

            },
            {
                test: /\.(woff|ttf|eot|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'base64-font-loader'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: false,
                            spriteFilename: 'sprite.svg'
                        }
                    }
                ],
                include: resolve('./static/icon')
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[sha512:hash:base64:7].[ext]',
                            publicPath: function (url) {
                                return url.replace('../public/images/', '/images/')
                            },
                            outputPath: '../public/images/'
                        }
                    }
                ]
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ],
                exclude: /node_modules/,
                include: [
                    resolve(__dirname, '..', 'client'),
                    resolve(__dirname, '..', 'utils'),
                    resolve(__dirname, '..', 'route'),
                    resolve(__dirname, '..', 'store'),
                    resolve(__dirname, '..', 'styles'),
                    resolve(__dirname, '..', 'view')
                ],
            }
        ]
    }
};