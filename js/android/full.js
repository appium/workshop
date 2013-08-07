var wd = require("wd")
  , driverSeries = require("wd-series")
  , path = require("path")
  , assert = require("assert")
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
    , 'app-wait-activity': ".CredentialsActivity"
    , 'app-activity': ".DashActivity"
};

var username = process.env.SAUCE_USERNAME || "AppiumUser"
    , password = process.env.SAUCE_PASSWORD || "appiumrocks";

//Run the test
driverSeries(driver, [
  function() { this.init(desiredCaps); },
  function() { this.setImplicitWaitTimeout(10000); },
  function() { this.sleep(3); },
  function() { this.elementByName('userName'); },
  function() { this.res.type(username); },
  function() { this.elementByName('userPassword'); },
  function() { this.res.type(password); },
  function() { this.elementByTagName("button"); },
  function() { this.res.click(); },
  function() { this.sleep(7); },
  function() { this.elementByName("jobList")},
  function() {
    console.log(this.res);
    this.res.elementsByTagName('relative');
  },
  function() {
    this.cell = this.res[1];
    this.next()
  },
  function() { this.cell.click(); },
  function() { this.sleep(5); },
  function() { this.back(); },
], function() { driver.quit() });
