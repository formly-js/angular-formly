module.exports = {
  output: { library: 'ngFormly' },
  externals: {
    angular: 'angular',
    'api-check': {
      root: 'apiCheck',
      amd: 'api-check',
      commonjs2: 'api-check',
      commonjs: 'api-check'
    }
  }
};
