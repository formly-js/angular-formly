var webpack = require('webpack');
var deepExtend = require('deep-extend');
var fs = require('fs');
var path = require('path');

var exclude = /node_modules/;

var ngAnnotateLoader = here('loaders/ng-annotate.js');


var packageJsonString = fs.readFileSync('package.json', 'utf8');
var packageJson = JSON.parse(packageJsonString);
console.log('building version', packageJson.version);

var baseEnvVars = {
  ON_DEV: false,
  ON_TEST: false,
  ON_PROD: false,
  VERSION: JSON.stringify(packageJson.version)
};

var baseConfig = {
  context: here('src'),
  entry: './index.js',
  output: {
    filename: 'formly.js',
    path: here('dist'),
    library: 'ngFormly',
    libraryTarget: 'umd'
  },


  stats: {
    colors: true,
    reasons: true
  },

  externals: {
    angular: 'angular',
    'api-check': {
      root: 'apiCheck',
      amd: 'api-check',
      commonjs2: 'api-check',
      commonjs: 'api-check'
    }
  },

  plugins: [],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'angular-fix': here('src/angular-fix')
    }
  },

  module: {
    loaders: [
      {test: /\.html$/, loader: 'raw', exclude: exclude},
      {test: /\.js$/, loader: ngAnnotateLoader + '!babel!jshint', exclude: exclude},
      {test: /sinon.*\.js$/, loader: 'imports?define=>false'}
    ]
  }
};

var devConfig = {
  devtool: 'inline-source-map'
};


var prodConfig = {
  output: {
    filename: 'formly.min.js',
    path: here('dist')
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      exclude: /\.test\.js$/,
      compress: {
        warnings: false
      }
    })
  ],
  jshint: {
    failOnHint: true,
    emitErrors: true
  }
};

var testCIConfig = deepExtend({}, prodConfig);
var testConfig = deepExtend({}, devConfig);
delete testConfig.jshint;

delete testCIConfig.jshint;

var envContexts = {
  dev: {
    ON_DEV: true
  },
  prod: {
    ON_PROD: true
  },
  test: {
    ON_TEST: true
  },
  'test:ci': {
    ON_TEST: true
  }
};

module.exports = getConfig();

module.exports.getConfig = getConfig;

function getConfig(context) {
  context = context || 'dev';
  var configContexts = {
    dev: devConfig,
    prod: prodConfig,
    test: testConfig,
    'test:ci': testCIConfig
  };

  var resultConfig = deepExtend({}, baseConfig, configContexts[context]);
  var resultVars = deepExtend({}, baseEnvVars, envContexts[context]);

  resultConfig.plugins.push(new webpack.DefinePlugin(resultVars));
  resultConfig.plugins.push(new webpack.BannerPlugin(getBanner(), {raw: true}));

  console.log('Webpack config is in ' + context + ' mode');
  return resultConfig;
}

function getBanner() {
  return '// ' + packageJson.name + ' version ' +
    packageJson.version +
    ' built with ♥ by ' +
    packageJson.contributors.join(', ') +
    ' (ó ì_í)=óò=(ì_í ò)\n';
}

function here(p) {
  return path.join(__dirname, p || '');
}
