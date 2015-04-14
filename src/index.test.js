let angular = require('./angular-fix');
require('angular-mocks/angular-mocks');
window.apiCheck = require('api-check');
const chai = require('chai');
const sinonChai = require('sinon-chai');
window.expect = chai.expect;
chai.use(sinonChai);

require('./providers/formlyApiCheck.test');
require('./providers/formlyConfig.test');
require('./services/formlyUtil.test');
require('./directives/formly-custom-validation.test');
require('./directives/formly-field.test');
require('./directives/formly-form.test');
require('./run/formlyNgModelAttrsManipulator.test');

module.exports = require('./index.common');
