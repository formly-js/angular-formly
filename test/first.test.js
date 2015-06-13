/* eslint-env mocha */

describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://localhost:8080/test/car-dealer-app');

    element(by.css('form [id*=input_first]')).sendKeys('my first name');
    element(by.css('form [id*=input_last]')).sendKeys('my last name');
    element(by.css('form [id*=input_age]')).sendKeys('26');
    element(by.css('form button[type=submit]')).click();

    var results = element(by.css('.results pre'));
    expect(results.getText()).toEqual(JSON.stringify({
      name: {
        first: 'my first name',
        last: 'my last name'
      },
      age: 26
    }, null, 2));
  });
});
