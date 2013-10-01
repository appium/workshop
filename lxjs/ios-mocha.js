var yiewd = require('yiewd')
  , driver = yiewd.remote('localhost', 4723)
  , assert = require("assert")
  , path = require("path")
  , appPath = path.resolve(__dirname, "..", "apps", "TestApp6.1.app.zip")
  , desiredCaps = {
      device: 'iPhone Simulator'
      , app: appPath
    }
  , o_O = require('monocle-js').o_O
  , sum = 0;

var lookup = o_O(function*(num) {
  var elem = driver.elementByName('TextField' + num);
  var num = Math.round(Math.random()*10000);
  sum += num;
  yield elem.sendKeys(num)
});


describe('My Calculator App test', function() {

  it('should compute the sum of two random numbers', function(done) {
    driver.run(function*() {
        yield this.init(desiredCaps);
        var label = yield this.elementByName('SumLabel');
        yield lookup(1);
        yield lookup(2);

        yield(yield this.elementByName('ComputeSumButton')).click()

        var actual = parseInt(yield label.text());
        assert.equal(sum, actual);

        yield this.quit();
        done();
    });
  });

  it('should be able to get text of a button', function(done) {
    driver.run(function*() {
      yield this.init(desiredCaps);
      var txt = yield(yield driver.elementByTagName('button')).text();
      assert.equal("ComputeSumButton", txt);
      yield this.quit();
        done();
    });
  });

});
