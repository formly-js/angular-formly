import utils from './utils.js';
import sinon from 'sinon';
import {expect} from 'chai';

// gotta do this because webstorm/jshint doesn't like destructuring imports :-(
const {extendFunction} = utils;


describe(`utils`, () => {

  describe(`extendFunction`, () => {
    let fn1, fn2, fn3;
    beforeEach(() => {
      fn1 = sinon.spy();
      fn2 = sinon.spy();
      fn3 = sinon.spy();
    });

    it(`should call all functions with the given`, () => {
      const extended = extendFunction(fn1, fn2);
      extended('foo');

      expect(fn1).to.have.been.calledWith('foo');
    });
  });

});
