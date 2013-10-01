"use strict";

var yiewd = require('yiewd'),
  , driver = yiewd.remote('localhost', 4723)
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
      search = yield this.elementByCss('.search-key');
      yield this.sleep(3);
      employees = yield this.elementsByCss('.topcoat-list a');
      employees.length.should.equal(5);
      yield employees[3].click();
      options = yield this.elementsByCss('.actions a');
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
