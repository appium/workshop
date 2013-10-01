"use strict";

// simple test computation app using wd, like in appium tests

var wd = require("wd")
  , assert = require("assert")
  , path = require("path")
  , appPath = path.resolve(__dirname, "..", "apps", "TestApp6.1.app.zip")
  , desiredCaps = {
      device: 'iPhone Simulator'
      , app: appPath
    }
  , sum = 0;


var lookup = function(num, cb) {
      driver.elementByName('TextField' + num, function(err, element) {
        var num = Math.round(Math.random()*10000);
        sum += num;
        element.sendKeys(num, function() {
          cb();
        });
      });
    }

var driver = wd.remote('localhost', 4723);

driver.init(desiredCaps, function() {
  driver.elementByName('SumLabel', function(err, label) {
    lookup(1, function() {
      lookup(2, function() {
        driver.elementByName('ComputeSumButton', function(err, computeBtn) {
          computeBtn.click(function() {
            label.text(function(err, txt) {
              var actual = parseInt(txt, 10);
              assert.equal(sum, actual);
            });
          });
        });
      });
    });
  });
})
