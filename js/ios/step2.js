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

//Run the test
describe("Login popup", function() {
  it("should have text field userName", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
      function() { this.elementByTagName("alert");  },
      function() { this.res.elementsByTagName("textfield"); },
      function() { 
        should.not.exist(this.res);
        this.next();
      }
    ], function() { 
      driver.quit();
      done();
    });
  });
  it.only("should login", function(done) {
    driverSeries(driver, [
      function() { this.init(desiredCaps); },
      function() { this.setImplicitWaitTimeout(10000); },
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
      function() { this.elementsByTagName("cell"); },
      function() {
        this.res.should.not.be.empty;
        this.next();
      }], function(err) {
        should.not.exist(err);
        driver.quit();
        done();
      });
  });
});
