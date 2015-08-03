/* eslint no-console:0 */
import _ from 'lodash';

let key = 0;

const input = '<input ng-model="model[options.key]" />';
const multiNgModelField = `
  <input type="input" name="{{id}}_start" ng-model="model[options.key].start" />
  <input type="input" name="{{id}}_stop" ng-model="model[options.key].stop" />
`;
const basicForm = '<formly-form form="theForm" model="model" fields="fields" options="options"></formly-form>';

export default {
  getNewField, input, multiNgModelField, basicForm, shouldWarn, shouldNotWarn, shouldWarnWithLog
};

function getNewField(options) {
  return _.merge({template: input, key: key++}, options);
}

function shouldWarn(match, test) {
  const originalWarn = console.warn;
  let calledArgs;
  console.warn = function() {
    calledArgs = arguments;
  };
  test();
  expect(calledArgs, 'expected warning and there was none').to.exist;
  expect(Array.prototype.join.call(calledArgs, ' ')).to.match(match);
  console.warn = originalWarn;
}


function shouldNotWarn(test) {
  const originalWarn = console.warn;
  let calledArgs;
  console.warn = function() {
    calledArgs = arguments;
  };
  test();
  if (calledArgs) {
    console.log(calledArgs);
    throw new Error('Expected no warning, but there was one', calledArgs);
  }
  console.warn = originalWarn;
}

function shouldWarnWithLog($log, logArgs, test) {
  /* eslint no-console:0 */
  test();
  expect($log.warn.logs, '$log should have only been called once').to.have.length(1);
  const log = $log.warn.logs[0];
  _.each(logArgs, (arg, index) => {
    if (_.isRegExp(arg)) {
      expect(log[index]).to.match(arg);
    } else {
      expect(log[index]).to.equal(arg);
    }
  });
}
