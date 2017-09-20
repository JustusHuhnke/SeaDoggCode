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
    return watch('./static/original_images/**/*.{png,jpg,jpeg}', () => {
        gulp.start('tinypng');
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

gulp.task('svgoDev', ['svgSprite'], () => {

    return gulp.src('./dist/public/*.svg', {ignoreInitial: false})
        .pipe(svgo({
            plugins: [
                {removeAttrs: {attrs: ['class', 'fill', 'viewBox']}},
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
                {cleanupNumericValues: {floatPrecision: 3}},
                {addAttributesToSVGElement: {attribute: ['viewBox="0 0 24 24"']}}
            ]
        }))
        .pipe(gulp.dest('./dist/public'));
});

gulp.task('autoTypedStyle', (callback) => {
    webpack({
        entry: styles_entry,
        output: {
            path: resolve(__dirname, '.gulp/style'),
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.scss', '.css'],
            descriptionFiles: ['package.json'],
            moduleExtensions: ['-loader']
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
                },]
        },
        plugins: [
            new ExtractTextPlugin("[name].css")
        ]
    }, function (err, stats) {
        let template = "";
        style_js_remove.forEach((name) => {
            if (name === "base") return;
            const str = fs.readFileSync(resolve(__dirname, '.gulp/style', name + '.css'), 'utf8');
            const regex = /(\.([\w-_]+))(,|{)/gi;
            let m;
            let clases = [];

            let _template = `export interface I${name[0].toUpperCase() + name.slice(1)} {\n`;
            while ((m = regex.exec(str)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                clases.push(m[2])
            }
            clases = (clases.filter(onlyUnique));
            if (clases.length) {
                clases.forEach((name) => {
                    _template += `  readonly "${name}": string;\n`
                });
                _template += "}\n";
                template += _template;
            }
        });
        fs.writeFile(resolve('styles/interface.ts'), template, function (err) {
            if (err)
                return console.log(err);

            callback();
        });
    });
});

gulp.task("routeGenerate", () => {
    const route = JSON.parse(fs.readFileSync(resolve("route/Route.json")));
    let importBackend = '';
    let routeBackend = '';
    let routeFrontend = '';
    let routeIndex = '';

    route.routes.forEach(({path, container, exact}) => {
        importBackend += 'import {'+container+'} from "_containers/'+container+'";\n';
        routeBackend += '       <Route'+(exact === true ? ' exact={true}' : '')+' path="'+path+'" component={'+container+'}/>\n';

        routeFrontend += 'const '+container+' = LazyLoadComponent(() => System.import("_containers/'+container+'"), LoadingComponent, ErrorComponent);\n';

        routeIndex += '         <Route'+(exact === true ? ' exact={true}' : '')+' path="'+path+'" component={require("_containers/'+container+'").'+container+'}/>\n';

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
        return fs.statSync(_path+'/'+file).isDirectory();
    });

    let importBlock = '';
    let exportBlock = '';

    foldres.forEach((name) => {
        importBlock += 'const ' + name + ' = process.env.BROWSER &&\n' +
            '   LazyLoadComponent(() => System.import("./' + name + '"), LoadingComponent, ErrorComponent) ||\n' +
            '   require("./' + name + '").default;\n\n';
        exportBlock += '    ' + name + ',\n';
    });


    const blockTemplate = 'import {ErrorComponent} from "_components/ErrorComponent";\n' +
        'import LazyLoadComponent from "_components/LazyLoadComponent";\n' +
        'import {LoadingComponent} from "_components/LoadingComponent";\n' +
        'declare const System: { import: (path: string) => Promise<any>; };\n\n' +
        importBlock +
        'export {\n' +
        exportBlock +
        '};\n';

    fs.writeFileSync(resolve(_path, "index.ts"), blockTemplate);
});


gulp.task('------Production------');


gulp.task('tinypng', ['autoTypedStyle', 'routeGenerate', 'blockGenerate'], function () {
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

gulp.task('prebuild', ['tinypng'], (callback) => {
    try {
        exec('npm run productionFrontend', {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
            if (err != null) {
                callback(err);
                console.error(err);
                return
            }
            console.info(stdout);
            console.error(stderr);
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
        });
    } catch (err) {
        console.error(err)
    }
});

gulp.task('fixManifest', ['prebuild'], (cb) => {
    const path = resolve("dist", "public", "appcache", "manifest.appcache");
    if (fs.existsSync(path)) {
        const content = fs.readFileSync(path).toString().replace(/\/\.\.\/public/gmi, '');
        fs.writeFileSync(path, content);
    }
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

gulp.task('build', ['svgo']);

