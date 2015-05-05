import {merge} from 'lodash';

let key = 0;

const input = '<input ng-model="model[options.key]" />';
const basicForm = '<formly-form form="theForm" model="model" fields="fields"></formly-form>';

export default {
  getNewField, input, basicForm
};

function getNewField(options) {
  return merge({template: input, key: key++}, options);
}
