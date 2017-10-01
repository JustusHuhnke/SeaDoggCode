const exec = require('child_process').exec;
const gulp = require('gulp');
const fs = require('fs');
const resolve = require('path').resolve;
const nodemon = require('gulp-nodemon');
const deletefile = require('gulp-delete-file');
const svgo = require('gulp-svgo');
const watch = require('gulp-watch');
const tinypng = require('gulp-tiny').default;
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackErrorNotificationPlugin = require('webpack-error-notification');
const cssnano = require('gulp-cssnano');

let style_js_remove = [];
let styles_entry = {};

fs.readdirSync(resolve(__dirname, "styles")).forEach(file => {
    if (/scss$/i.test(file)) {
        const name = file.replace(/\.scss$/i, '');
        style_js_remove.push(name);
        styles_entry[name] = (resolve(__dirname, 'styles', name + '.scss'));
    }
});

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

gulp.task('------Development------');

gulp.task('backend', () => {
    try {
        gulp.watch('./dist/public/*.svg', {ignoreInitial: false}, ['svgoDev']);

        return nodemon({
            script: './dist/server/index.js',
            ext: 'js',
            watch: ['./dist/server/'],
            env: {
                'NODE_ENV': 'development',
                'STATIC_PATH': 'dist/public'
            },
            ignore: [
                'node_modules/'
            ]
        });

    } catch (err) {
        console.error(err)
    }
});

gulp.task('watchImages', () => {
    gulp.start('prebuild');
    return watch('./static/original_images/**/*.{png,jpg,jpeg}', () => {
        gulp.start('prebuild');
    });
});

gulp.task('svgSprite', (callback) => {

    exec('./node_modules/.bin/svg-sprite-generate -d ./static/icon/ -o ./dist/public/sprite.svg', (err, stdout, stderr) => {
        if (err != null) {
            callback(err);
            console.error(err);
            return
        }
        console.info(stdout);
        console.error(stderr);
        callback(err);
    });
});

gulp.task('svgoSpr', ['svgSprite'], () => {

    return gulp.src('./dist/public/*.svg', {ignoreInitial: false})
        .pipe(svgo({
            plugins: [
                {removeAttrs: {attrs: ['class', 'viewBox']}},
                {removeUselessDefs: true},
                {removeDoctype: true},
                {removeStyleElement: true},
                {removeComments: true},
                {cleanupIDs: false},
                {removeViewBox: true},
                {removeRasterImages: true},
                {sortAttrs: true},
                {mergePaths: true},
                {removeTitle: true},
                {removeDesc: true},
                {removeScriptElement: true},
                {cleanupNumericValues: {floatPrecision: 4}},
                {addAttributesToSVGElement: {attribute: ['viewBox="0 0 24 24"']}}
            ]
        }))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('svgoDev', ['svgoSpr'], (cb) => {
    try {
        let spriteFile = fs.readFileSync(resolve("dist/public", "sprite.svg"));
        const svgs = fs.readdirSync(resolve("static/icon", "no_svgo"));
        let sprites = "";
        svgs.forEach((file) => {
            const _spriteFile = fs.readFileSync(resolve("static/icon", "no_svgo", file)).toString().replace(/[\n\r]/igm, "").replace(/\s+/igm, " ");
            sprites += _spriteFile;
        });
        fs.writeFileSync(resolve("dist/public", "sprite.svg"), sprites + spriteFile.toString());
        cb();
    } catch (err) {
        console.error(err);
        cb(err);
    }
});

gulp.task('autoTypedStyle', (callback) => {
    webpack({
        entry: styles_entry,
        output: {
            path: resolve(__dirname, '.gulp/style'),
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx', '.scss', '.css'],
            alias: {
                "_images": resolve(__dirname, 'static/images'),
            },
            descriptionFiles: ['package.json'],
            moduleExtensions: ['-loader'],
            alias: {
                "_actions": resolve(__dirname, 'store/actions/index.ts'),
                "_blocks": resolve(__dirname, 'view/block/index.ts'),
                "_config": resolve(__dirname, 'server/config.ts'),
                '_components': resolve(__dirname, 'view/components'),
                '_containers': resolve(__dirname, 'view/containers'),
                "_reducers": resolve(__dirname, 'store/reducers/index.ts'),
                "_reducer": resolve(__dirname, 'store/reducers'),
                "_route": resolve(__dirname, 'route/index.tsx'),
                "_store": resolve(__dirname, 'store/index.ts'),
                "_static": resolve(__dirname, 'static'),
                "_images": resolve(__dirname, 'static/images'),
                "_stylesLoad": resolve(__dirname, 'styles'),
                "_style": resolve(__dirname, 'styles/index.ts'),
                "_socket": resolve(__dirname, 'client/socket.ts'),
                "_utils": resolve(__dirname, 'utils')
            }
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use:
                        ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: [
                                {
                                    loader: "css-loader", options: {
                                    sourceMap: false,
                                    modules: true,
                                    importLoaders: 1,
                                    localIdentName: '[local]',
                                    minimize: true
                                }
                                },
                                {
                                    loader: "sass-loader", options: {
                                    sourceMap: false,
                                    // indentedSyntax: true,
                                    modules: true,
                                }
                                }
                            ]
                        })

                },
                {
                    test: /\.(woff|ttf|eot|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'base64-font-loader'
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                debug: true,
                options: {
                    public: true,
                    progress: true,
                    configuration: {
                        devtool: 'sourcemap'
                    }
                },
                root: resolve(__dirname)
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    BROWSER: JSON.stringify(true),
                    NODE_ENV: JSON.stringify('production')
                }
            }),

            new webpack.NamedModulesPlugin(),
            new WebpackErrorNotificationPlugin(),
            new ExtractTextPlugin("[name].css")
        ]
    }, function (err, stats) {
        try {
            (stats.compilation.errors || []).forEach((error) => {
                console.error(error);
            });
            let template = "";
            let valueStyles = [];
            style_js_remove.forEach((name) => {
                if (name === "base" || name === "font") return;
                const str = fs.readFileSync(resolve(__dirname, '.gulp/style', name + '.css'), 'utf8');
                const regex = /\.([a-zA-Z_][\w-_]*[^\.\s\{#:\,;])/gmi;
                let m;
                let clases = [];

                let _template = `export interface I${name[0].toUpperCase() + name.slice(1)} {\n`;
                while ((m = regex.exec(str)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    clases.push(m[1].replace(">", ""))
                }
                clases = (clases.filter(onlyUnique));
                if (clases.length) {
                    valueStyles = [...valueStyles, ...clases];
                    clases.forEach((name) => {
                        _template += `  readonly "${name}": string;\n`
                    });
                    _template += "}\n";
                    template += _template;
                }
            });
            const regexBlock = /^(([a-z0-9]+)(-|_){0,1})+([a-z0-9]+)/i;
            const regexElement = /__([a-z0-9]+(-|_|)[a-z0-9]+)/gi;
            const regexMod = /--([a-z0-9]+(-|_|)[a-z0-9]+)/gi;
            let m;
            let valueBlocks = [];
            let valueElements = [];
            let valueMods = [];

            valueStyles.forEach((str) => {
                if ((m = regexBlock.exec(str)) !== null) {
                    valueBlocks = [...valueBlocks, '"' + m[0] + '"'];
                }
                while ((m = regexElement.exec(str)) !== null) {
                    valueElements = [...valueElements, '"' + m[1] + '"'];
                }
                while ((m = regexMod.exec(str)) !== null) {
                    valueMods = [...valueMods, '"' + m[1] + '"'];
                }
            });
            valueBlocks = (valueBlocks.filter(onlyUnique));
            valueElements = (valueElements.filter(onlyUnique));
            valueMods = (valueMods.filter(onlyUnique));

            template += "/* tslint:disable:max-line-length */\n";
            template += "export type IValueBlocks = " + valueBlocks.join(" | ") + ";\n";
            template += "export type IValueElements = " + valueElements.join(" | ") + ";\n";
            template += "export type IValueMods = " + valueMods.join(" | ") + ";\n";
            template += "/* tslint:enable:max-line-length */\n";

            fs.writeFile(resolve('styles/interface.ts'), template, function (err) {
                if (err)
                    return console.log(err);

                callback();
            });
        } catch (error) {
            console.error(error);
        }
    });
});

gulp.task("routeGenerate", () => {
    const route = JSON.parse(fs.readFileSync(resolve("route/Route.json")));
    let importBackend = '';
    let routeBackend = '';
    let routeFrontend = '';
    let routeIndex = '';

    route.routes.forEach(({path, container, exact}) => {
        importBackend += 'import {' + container + '} from "_containers/' + container + '";\n';
        routeBackend += '       <Route' + (exact === true ? ' exact={true}' : '') + ' path="' + path + '" component={' + container + '}/>\n';

        routeFrontend += 'const ' + container + ' = LazyLoadComponent(() => System.import("_containers/' + container + '"), LoadingComponent, ErrorComponent);\n';

        routeIndex += '         <Route' + (exact === true ? ' exact={true}' : '') + ' path="' + path + '" component={require("_containers/' + container + '").' + container + '}/>\n';

    });

    const backendTemplate = importBackend +
        'import {IApp} from "_route";\n' +
        'import * as React from "react";\n' +
        'import {Route, StaticRouter, Switch} from "react-router";\n\n' +
        'const Routes = () => (\n' +
        '    <Switch>\n' +
        routeBackend +
        '   </Switch>);\n\n' +
        'const App: React.StatelessComponent<IApp> = (props) => {\n' +
        '    return React.createElement(\n' +
        '        StaticRouter,\n' +
        '        props,\n' +
        '        React.createElement(Routes, null),\n' +
        '    );\n' +
        '};\n' +
        'export const AppComponent = process.env.BROWSER ? App : App;\n' +
        'export default AppComponent;\n';

    const clientTemplate = 'import {ErrorComponent} from "_components/ErrorComponent";\n' +
        'import LazyLoadComponent from "_components/LazyLoadComponent";\n' +
        'import {LoadingComponent} from "_components/LoadingComponent";\n' +
        'import * as React from "react";\n' +
        'import {Route, Switch} from "react-router";\n' +
        'declare const System: { import: (path: string) => Promise<any>; };\n' +
        routeFrontend +
        'export const Routes = () => (\n' +
        '   <Switch>\n' +
        routeBackend +
        '   </Switch>);\n\n' +
        'export default Routes;\n';

    const indeTemplate = 'import * as React from "react";\n' +
        'import {Router} from "react-router-dom";\n' +
        'export interface IApp {\n' +
        '   action: any;\n' +
        '   listen: (location: any) => any;\n' +
        '   location: string;\n' +
        '   children?: React.ReactNode;\n' +
        '}\n' +
        'let AppComponent: any;\n' +
        'if (process.env.NODE_ENV === "production") {\n' +
        '    const App: React.StatelessComponent<IApp> = (props) => {\n' +
        '        return React.createElement(\n' +
        '            Router,\n' +
        '            props as any,\n' +
        '            React.createElement(require("./clientRoute").default, null),\n' +
        '        );\n' +
        '    };\n' +
        '    AppComponent = App;\n' +
        '} else {\n' +
        '    const {Route, Switch} = require("react-router");\n' +
        '    const Routes = () => (\n' +
        '        <Switch>\n' +
        routeIndex +
        '        </Switch>\n' +
        '    );\n' +
        '    const App: React.StatelessComponent<IApp> = (props) => {\n' +
        '        return React.createElement(\n' +
        '            Router,\n' +
        '            props as any,\n' +
        '            React.createElement(Routes, null),\n' +
        '        );\n' +
        '    };\n' +
        '    AppComponent = App;\n' +
        '}\n' +
        'export default AppComponent;\n';

    fs.writeFileSync(resolve("route/backendRoute.tsx"), backendTemplate);
    fs.writeFileSync(resolve("route/clientRoute.tsx"), clientTemplate);
    fs.writeFileSync(resolve("route/index.tsx"), indeTemplate);
});

gulp.task("blockGenerate", () => {
    const _path = resolve('./view/block');
    const foldres = fs.readdirSync(_path).filter(function (file) {
        return fs.statSync(_path + '/' + file).isDirectory();
    });

    let importBlock = '';
    let importBlockBack = '';
    let exportBlock = '';
    let letName = '';

    foldres.forEach((name) => {
        letName += "let " + name + ": any;\n";
        importBlock += '   ' + name + ' = LazyLoadComponent(() => System.import("./' + name + '"), LoadingComponent, ErrorComponent);\n';
        importBlockBack += '   ' + name + ' = require("./' + name + '").default;\n';
        exportBlock += '    ' + name + ',\n';
    });


    const blockTemplate = 'import {ErrorComponent} from "_components/ErrorComponent";\n' +
        'import LazyLoadComponent from "_components/LazyLoadComponent";\n' +
        'import {LoadingComponent} from "_components/LoadingComponent";\n' +
        'declare const System: { import: (path: string) => Promise<any>; };\n\n' +
        letName +
        'if (process.env.BROWSER) {\n' +
        importBlock +
        '} else {\n' +
        importBlockBack +
        '}\n' +
        'export {\n' +
        exportBlock +
        '};\n';

    fs.writeFileSync(resolve(_path, "index.ts"), blockTemplate);
});


gulp.task('------Production------');


gulp.task('prebuild', ['autoTypedStyle', 'routeGenerate', 'blockGenerate'], function () {
    const exit_path = resolve('./static/images');
    gulp.src('./static/original_images/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            apiKeys: ['RsN84oBjmXxPkCB5s_ZlfA1fRS1U32LY', 'bN4uZbaI06-ESRiKhD6yS3P4NF9zle7W', 'durCxw2lwQgJmxvwOnpyLrMdEsNEImOY'],
            cached: true,
            size: [
                {name: "2k", method: "fit", width: 2560, height: 1440},
                {name: "full", method: "fit", width: 1920, height: 1080},
                {name: "plus", method: "fit", width: 1600, height: 900},
                {name: "hd", method: "fit", width: 1366, height: 768},
                {name: "xga", method: "fit", width: 1024, height: 768},
                {name: "wide", method: "fit", width: 768, height: 480},
                {name: "half", method: "fit", width: 480, height: 320}
            ],
            exit_path
        }))
        .pipe(gulp.dest(exit_path));
});

gulp.task('buildFrontend', (callback) => {
    try {
        exec('npm run productionFrontend', {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
            if (err != null) {
                callback(err);
                console.error(err);
                return
            }
            console.info(stdout);
            console.error(stderr);
            callback(err);
        });
    } catch (err) {
        console.error(err)
    }
});

gulp.task('buildBackend', ['buildFrontend'], (callback) => {
    try {
        exec('npm run productionBackend', {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
            if (err != null) {
                callback(err);
                console.error(err);
                return
            }
            console.info(stdout);
            console.error(stderr);
            callback(err);
        });
    } catch (err) {
        console.error(err)
    }
});

gulp.task('fixManifest', (cb) => {
    // const path = resolve("dist", "public", "appcache", "manifest.appcache");
    // if (fs.existsSync(path)) {
    //     const content = fs.readFileSync(path).toString().replace(/\/\.\.\/public/gmi, '').replace("CACHE:", "CACHE:\n/sprite.svg");
    //     fs.writeFileSync(path, content);
    // }
    cb()
});

gulp.task('cleanServer', ['fixManifest'], () => {
    gulp.src(['./dist/server/**/*.js',
        './dist/server/**/*.map',
        './dist/server/**/*.css'
    ]).pipe(deletefile({
        reg: /(index\.js$)|(manifest)/ig,
        deleteMatch: false
    }))
});

gulp.task('cleanPublic', ['cleanServer'], () => {
    gulp.src(['./dist/public/**/*.map', './dist/public/**/*.js']).pipe(deletefile({
        reg: new RegExp(style_js_remove.join("|"), "ig"),
        deleteMatch: true
    }))
});

gulp.task('cleanStyle', ['cleanPublic'], () => {
    gulp.src(['./dist/public/style/*.css']).pipe(deletefile({
        reg: new RegExp(style_js_remove.join("|"), "ig"),
        deleteMatch: false
    }))
});

gulp.task('svgo', ['cleanStyle'], () => {
    return gulp.run("svgoDev");
});

gulp.task('cssnano', ['svgo'], () => {
    return gulp.src(['./dist/public/style/*.css', '!./dist/public/style/font.*.css'])
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/public/style'));
});

gulp.task('build', ['svgo']);

