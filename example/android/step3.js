var wd = require("wd") 
  , driverSeries = require("wd-series")
  , path = require("path")
  , assert = require("assert")
  , should = require("should")
  , app = path.resolve(__dirname, "../../../../AndroidStudioProjects/SauceDashboard/SauceDashboard/build/apk/SauceDashboard-debug-unaligned.apk");
//"http://appium.s3.amazonaws.com/SauceDashboard.apk";

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
      function() { this.res.should.exist(); this.next(); }
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
        this.res.should.exist();
        this.res.elementByTagName('relative');
      },
      function() { 
        this.res.should.exist();
        this.res.length.should.not.equal(0);
      }
    ], function() {
      driver.quit();
      done();
    });
  });
});

var login = [
  function() { this.sleep(3); },
  function() { this.elementByName("userName"); },
  function() { this.res.type("AppiumUser"); },
  function() { this.elementByName("userPassword"); },
  function() { this.res.type("appiumrocks"); },
  function() { this.elementByTagName("button"); },
  function() { this.res.click(); },
  function() { this.sleep(7); },
];

describe("Job view", function() {
  it("Should click", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.iff(login, [
        function() { this.elementByName("jobList")},
        function() { this.res.elementsByTagName('relative'); },
        function() { 
          this.cell = this.res[1];
          this.next()
        },
        function() { this.cell.click(); },
        function() { this.elementByName("osName"); },
        function() { this.res.should.exist(); }
      ])}
    ], function() { 
      driver.quit() 
      done();
    });
  });
});
