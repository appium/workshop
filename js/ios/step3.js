var wd = require("wd") 
  , driverSeries = require("wd-series")
  , path = require("path")
  , should = require("should")
  , assert = require("assert")
  , app = path.resolve(__dirname, "../../apps/SauceDashboard.app.zip");

// Instantiate a new driver session
var driver = wd.remote("localhost", 4723);

var desiredCaps = {
    device: "iPhone Simulator"
    , name: "Appium: with WD"
    , platform: "Mac 10.8"
    , app: app
    , version: "6.1"
    , newCommandTimeout: 60
};

var username = process.env.SAUCE_USERNAME
    , password = process.env.SAUCE_PASSWORD;

var login = [
  function() { this.elementByTagName("alert");  },
  function() { this.res.elementsByTagName("textfield"); },
  function() { 
    this.fields = this.res;
    this.fields[0].sendKeys(username); 
  },
  function() { this.elementByTagName("secure"); },
  function() { this.res.sendKeys(password); },
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
      ])}
    ], function(err) {
      should.not.exist(err); 
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
        function() { this.back(); },
        function() { this.sleep(3); },
        function() { this.elementsByTagName("cell"); },
        function() { this.res.should.not.be.empty; }
      ])}
    ], function(err) {
      should.not.exist(err);
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
    ], function(err) {
      should.not.exist(err); 
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
        function() { this.windowHandles(); },
        function() { this.window(this.res[0]); },
        function() { this.title(); },
        function() { this.execute("mobile: leaveWebView"); }
      ])}
    ], function(err) {
      should.not.exist(err);
      driver.quit() 
      done();
    });
  });
});

