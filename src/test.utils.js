import {merge} from 'lodash';

let key = 0;

const input = '<input ng-model="model[options.key]" />';
const multiNgModelField = `
  <input type="input" name="{{id}}_start" ng-model="model[options.key].start" />
  <input type="input" name="{{id}}_stop" ng-model="model[options.key].stop" />
`;
const basicForm = '<formly-form form="theForm" model="model" fields="fields" options="options"></formly-form>';

export default {
  getNewField, input, multiNgModelField, basicForm
};

function getNewField(options) {
  return merge({template: input, key: key++}, options);
}
