var wallabyWebpack = require('wallaby-webpack');
var path = require('path');

var compilerOptions = Object.assign(
  require('./projectA/tsconfig.json').compilerOptions,
  require('./projectA/src/tsconfig.spec.json').compilerOptions);

compilerOptions.module = 'CommonJs';

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'projectA/src/wallabyTest.js',
      'projectA/src/**/*spec.js',
       // added...
      'share-module/src/app/**/*.spec.js'
    ],

    module: {
      rules: [
        {test: /\.css$/, loader: ['raw-loader']},
        {test: /\.html$/, loader: 'raw-loader'},
        {test: /\.ts$/, loader: '@ngtools/webpack', include: /node_modules/},
        {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
        {test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader']},
        {test: /\.less$/, loaders: ['raw-loader', {loader: 'less-loader', options: {paths: [__dirname]}}]},
        {test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader']},
        {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=128000'}
      ]
    },

    resolve: {
      // symlinks: false,
      extensions: ['.js', '.ts'],
      modules: [
        path.join(wallaby.projectCacheDir, './projectA/src/app'),
        path.join(wallaby.projectCacheDir, './projectA/src'),
        // added...
        path.join(wallaby.projectCacheDir),
        'node_modules'
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  });

  return {
    files: [
      {pattern: './projectA/src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false},
      {pattern: './projectA/src/**/*.d.ts', ignore: true},
      {pattern: './projectA/src/**/*spec.ts', ignore: true},
       // added...
      {pattern: './share-module/src/app/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false},
      {pattern: './share-module/src/app/**/*.d.ts', ignore: true},
      {pattern: './share-module/src/app/**/*spec.ts', ignore: true}
    ],

    tests: [
      {pattern: './projectA/src/**/*spec.ts', load: false},
      {pattern: './projectA/src/**/*e2e-spec.ts', ignore: true},
       // added...
      {pattern: './share-module/src/app/**/*spec.ts', load: false},
      {pattern: './share-module/src/app/**/*e2e-spec.ts', ignore: true}
    ],

    testFramework: 'jasmine',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    middleware: function (app, express) {
      var path = require('path');
      app.use('/favicon.ico', express.static(path.join(__dirname, 'src/favicon.ico')));
      app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
    },

    env: {
      kind: 'electron'
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};