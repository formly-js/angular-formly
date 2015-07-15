var here = require('kcd-common-tools/utils/here');

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
  },
  resolve: {
    alias: {
      'angular-fix': here('src/angular-fix')
    }
  }
};
