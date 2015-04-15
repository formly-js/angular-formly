// Load up the 'test environment' with angular mocks, which in turn needs angular in context
/* jshint -W098 */
// this because loading angular and angularMocks needs to happen before anything else :-( #globalscope
import angular from 'angular-fix';
import angularMocks from 'angular-mocks/angular-mocks';

// Load up the angular formly module
import index from './index.common';

// Bring in the test suites
import './providers/formlyApiCheck.test';
import './providers/formlyConfig.test';
import './services/formlyUtil.test';
import './directives/formly-custom-validation.test';
import './directives/formly-field.test';
import './directives/formly-form.test';
import './run/formlyNgModelAttrsManipulator.test';

// Use sinonChai for assertions
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

export default index;
