"use strict";

var yiewd = require('yiewd')
  , driver = yiewd.remote('localhost', 4723)
  , should = require('should')
  , path = require('path')
  , phonegapApp = path.resolve(__dirname, "..", "apps",
      "HelloGappium.app.zip");

describe('Phonegap Test', function() {
  // test setup
  beforeEach(function(done) {
    driver.run(function*() {
      yield this.init({
        device: 'iPhone Simulator',
        app: phonegapApp
      });
      done();
    });
  });

  it('should open the app and navigate through the dialogs', function(done) {
    driver.run(function*() {
      var handles, search, employees, options;
      handles = yield this.windowHandles();
      yield this.window(handles[0]);
      search = yield this.elementByCssSelector('.search-key');
      yield this.sleep(3);
      yield search.sendKeys('j');
      employees = yield this.elementsByCssSelector('.topcoat-list a');
      employees.length.should.equal(5);
      yield employees[3].click();
      options = yield this.elementsByCssSelector('.actions a');
      options.length.should.equal(6);
      yield options[3].click();
      yield this.sleep(2);
      done();
    });
  });

  // test teardown
  afterEach(function(done) {
    driver.run(function*() {
      yield this.quit();
      done();
    })
  })
});
