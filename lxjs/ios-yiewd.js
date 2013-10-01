"use strict";

// simple test computation app using wd, like in appium tests but using yiewd

var wd = require("yiewd")
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

var driver = wd.remote('localhost', 4723);

driver.run(function*() {
  try {
    yield this.init(desiredCaps);
    var label = yield this.elementByName('SumLabel');
    yield lookup(1);
    yield lookup(2);

    yield(yield this.elementByName('ComputeSumButton')).click()

    var actual = parseInt(yield label.text());
    assert.equal(sum, actual);

  } catch (e) {
    console.log(e);
  }
  yield this.sleep(3);
  yield this.quit();
});
