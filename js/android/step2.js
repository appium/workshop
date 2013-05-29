var wd = require("wd") 
  , driverSeries = require("wd-series")
  , path = require("path")
  , assert = require("assert")
  , should = require("should")
  , app = path.resolve(__dirname, "../../apps/SauceDashboard.apk");

// Instantiate a new driver session
var driver = wd.remote("localhost", 4723);

var desiredCaps = {
    name: "Appium: with WD"
    , platform: "Linux"
    , device: "Android"
    , app: app
    , version: "4.2"
    , newCommandTimeout: 60
    , 'app-package': "com.saucelabs.saucedashboard"
    , 'app-activity': "DashActivity"
};

var username = process.env.SAUCE_USERNAME
    , password = process.env.SAUCE_PASSWORD;

//Run the test
describe("Login popup", function() {
  it("should have text field userName", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.elementByName("userName"); },
    ], function(err) {
      should.not.exist(err);
      driver.quit();
      done();
    });
  });
  it.only("should login", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.elementByName("userName"); },
      function() { this.res.type(username); },
      function() { this.elementByName("userPassword"); },
      function() { this.res.type(password); },
      function() { this.elementByTagName("button"); },
      function() { this.res.click(); },
      function() { this.sleep(7); },
      function() { this.elementByName("jobList")},
      function() { 
        this.res.elementsByTagName('relative');
      },
      function() {
        this.res.length.should.not.equal(0);
        this.next();
      }
    ], function(err) {
      should.not.exist(err);
      driver.quit();
      done();
    });
  });
});

