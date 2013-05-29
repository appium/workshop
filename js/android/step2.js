var wd = require("wd") 
  , driverSeries = require("wd-series")
  , path = require("path")
  , assert = require("assert")
  , should = require("should")
  , app = path.resolve(__dirname, "../../SauceDashboard.apk");

// Instantiate a new driver session
var driver = wd.remote("localhost", 4723);

var desiredCaps = {
    name: "Appium: with WD"
    , browserName: ""
    , platform: "Android"
    , app: app
    , version: "4.2"
    , newCommandTimeout: 60
    , 'app-package': "com.saucelabs.saucedashboard"
    , 'app-activity': "DashActivity"
};


//Run the test
describe("Login popup", function() {
  it("should have text field userName", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.elementByName("userName"); },
      function() { should.not.exist(this.res); this.next(); }
    ], function() {
      driver.quit();
      done();
    });
  });
  it("should login", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.elementByName("userName"); },
      function() { this.res.type("AppiumUser"); },
      function() { this.elementByName("userPassword"); },
      function() { this.res.type("appiumrocks"); },
      function() { this.elementByTagName("button"); },
      function() { this.res.click(); },
      function() { this.sleep(7); },
      function() { this.elementByName("jobList")},
      function() { 
        should.not.exist(this.res);
        this.res.elementByTagName('relative');
      },
      function() { 
        should.not.exist(this.res);
        this.res.length.should.not.equal(0);
      }
    ], function() {
      driver.quit();
      done();
    });
  });
});

