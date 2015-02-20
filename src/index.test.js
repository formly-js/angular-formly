require('./angular-fix');
require('angular-mocks/angular-mocks');
const chai = require('chai');
const sinonChai = require('sinon-chai');
window.expect = chai.expect;
chai.use(sinonChai);
module.exports = require('./index.common');
