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
        this.res.should.not.be.empty;
        this.next();
      }
    ], function(err) {
      should.not.exist(err);
      driver.quit(function() {
        done();
      });
    });
  });
});
