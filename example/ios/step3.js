var wd = require("wd") 
  , driverSeries = require("wd-series")
  , path = require("path")
  , should = require("should")
  , assert = require("assert")
  , app = path.resolve(__dirname, "../../apps/SauceDashboard.app.zip");

// Instantiate a new driver session
var driver = wd.remote("localhost", 4723);

var desiredCaps = {
    device: ""
    , name: "Appium: with WD"
    , platform: "Mac"
    , app: app
    , version: "6.0"
    , browserName: "iOS"
    , newCommandTimeout: 60
};

var login = [
  function() { this.elementByTagName("alert");  },
  function() { this.res.elementsByTagName("textfield"); },
  function() { 
    this.fields = this.res;
    this.fields[0].sendKeys("AppiumUser"); 
  },
  function() { this.elementByTagName("secure"); },
  function() { this.res.sendKeys("appiumrocks"); },
  function() { this.elementByName("Sign In"); },
  function() { this.res.click(); },
  function() { this.sleep(10); },
];

describe("Job view", function() {
  it("Should click", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.iff(login, [
        function() { this.elementsByTagName("cell"); },
        function() { 
          this.cell = this.res[1];
          this.next();
        },
        function() { this.cell.click(); },
        function() { this.sleep(3); },
        function() { this.elementByTagName('text'); },
        function() { this.res.should.exist(); this.next(); }
      ])}
    ], function() { 
      driver.quit() 
      done();
    });
  });
  it("Should go back", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.iff(login, [
        function() { this.elementsByTagName("cell"); },
        function() { 
          this.cell = this.res[1];
          this.next();
        },
        function() { this.cell.click(); },
        function() { this.sleep(3); },
        function() { this.elementByTagName('text'); },
        function() { this.res.should.exist(); this.next(); },
        function() { this.back(); },
        function() { this.sleep(3); },
        function() { this.elementsByTagName("cell"); },
        function() { this.res.should.exist(); }
      ])}
    ], function() { 
      driver.quit() 
      done();
    });
  });
  it("Should swype", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.iff(login, [
        function() {
          var swipeOpts = {
            startX: 100
            , startY: 100
            , endX: 100
            , endY: 50
            , duration: 1.8
          };
          this.execute("mobile: swipe", [swipeOpts])
        },
      ])}
    ], function() { 
      driver.quit() 
      done();
    });
  });
  it("Should go back", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.iff(login, [
        function() { this.elementsByTagName("cell"); },
        function() { 
          this.cell = this.res[1];
          this.next();
        },
        function() { this.cell.click(); },
        function() { this.sleep(3); },
        function() { this.elementByTagName('text'); },
        function() { this.res.should.exist(); },
        function() { this.windowHandles(); },
        function() { this.window(this.res[0]); },
        function() { this.title(); },
        function() { this.res.should.exist(); this.next(); },
        function() { this.execute("mobile: leaveWebView"); }
      ])}
    ], function() { 
      driver.quit() 
      done();
    });
  });
});

