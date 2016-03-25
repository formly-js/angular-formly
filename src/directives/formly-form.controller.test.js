/* eslint no-shadow:0 */
/* eslint no-console:0 */
/* eslint max-len:0 */
/* eslint max-nested-callbacks:0 */
import {getNewField, shouldWarnWithLog} from '../test.utils.js'
import _ from 'lodash'

describe('FormlyFormController', () => {
  let $controller, formlyConfig, scope
  beforeEach(window.module('formly'))
  beforeEach(inject((_formlyConfig_, $rootScope, _$controller_) => {
    formlyConfig = _formlyConfig_
    scope = $rootScope.$new()
    scope.model = {}
    scope.fields = []
    scope.options = {}
    $controller = _$controller_
  }))

  describe(`fieldTransform`, () => {
    beforeEach(() => {
      formlyConfig.extras.fieldTransform = fieldTransform
    })

    it(`should give a deprecation warning when formlyConfig.extras.fieldTransform is a function rather than an array`, inject(($log) => {

      shouldWarnWithLog(
        $log,
        [
          'Formly Warning:',
          'fieldTransform as a function has been deprecated.',
          /Attempted for formlyConfig.extras/,
        ],
        () => $controller('FormlyFormController', {$scope: scope})
      )
    }))

    it(`should give a deprecation warning when options.fieldTransform function rather than an array`, inject(($log) => {
      formlyConfig.extras.fieldTransform = undefined
      scope.fields = [getNewField()]
      scope.options.fieldTransform = fields => fields
      shouldWarnWithLog(
        $log,
        [
          'Formly Warning:',
          'fieldTransform as a function has been deprecated.',
          'Attempted for form',
        ],
        () => $controller('FormlyFormController', {$scope: scope})
      )
    }))

    it(`should throw an error if something is passed in and nothing is returned`, () => {
      scope.fields = [getNewField()]
      scope.options.fieldTransform = function() {
        // I return nothing...
      }
      expect(() => $controller('FormlyFormController', {$scope: scope})).to.throw(/^Formly Error: fieldTransform must return an array of fields/)
    })

    it(`should allow you to transform field configuration`, () => {
      scope.options.fieldTransform = fieldTransform
      const spy = sinon.spy(scope.options, 'fieldTransform')
      doExpectations(spy)
    })

    it(`should use formlyConfig.extras.fieldTransform when not specified on options`, () => {
      const spy = sinon.spy(formlyConfig.extras, 'fieldTransform')
      doExpectations(spy)
    })

    it(`should allow you to use an array of transform functions`, () => {
      scope.fields = [getNewField({
        customThing: 'foo',
        otherCustomThing: {
          whatever: '|-o-|',
        }})]
      scope.options.fieldTransform = [fieldTransform]
      expect(() => $controller('FormlyFormController', {$scope: scope})).to.not.throw()

      const field = scope.fields[0]
      expect(field).to.have.deep.property('data.customThing')
      expect(field).to.have.deep.property('data.otherCustomThing')
    })

    function doExpectations(spy) {
      const originalFields = [{
        key: 'keyProp',
        template: '<hr />',
        customThing: 'foo',
        otherCustomThing: {
          whatever: '|-o-|',
        },
      }]
      scope.fields = originalFields
      $controller('FormlyFormController', {$scope: scope})
      expect(spy).to.have.been.calledWith(originalFields, scope.model, scope.options, scope.form)
      const field = scope.fields[0]

      expect(field).to.not.have.property('customThing')
      expect(field).to.not.have.property('otherCustomThing')
      expect(field).to.have.deep.property('data.customThing')
      expect(field).to.have.deep.property('data.otherCustomThing')
    }

    function fieldTransform(fields) {
      const extraKeys = ['customThing', 'otherCustomThing']
      return _.map(fields, field => {
        const newField = {data: {}}
        _.each(field, (val, name) => {
          if (_.includes(extraKeys, name)) {
            newField.data[name] = val
          } else {
            newField[name] = val
          }
        })
        return newField
      })
    }
  })

})
