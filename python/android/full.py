from selenium import webdriver

import unittest
import os


class AppiumTestCase(unittest.TestCase):

    def setUp(self):
        self.username = os.environ.get('SAUCE_USERNAME')
        self.password = os.environ.get('SAUCE_PASSWORD')
        appium = "http://localhost:%s/wd/hub" % 4723
        self.desired_caps.update({
            'name': 'Appium Android Test',
            'newCommandTimeout': 60
        })
        print self.desired_caps
        self.driver = webdriver.Remote(appium, self.desired_caps)
        self.driver.implicitly_wait(30)

    def tearDown(self):
        self.driver.quit()


class AppiumAndroidTestCase(AppiumTestCase):

    def setUp(self):
        app = os.path.join(os.path.dirname(__file__), "..", "..", "apps",
                           "SauceDashboard.apk")
        self.desired_caps = {
            'device': 'Android',
            'platform': 'Linux',
            'app': app,
            'app-package': 'com.saucelabs.saucedashboard',
            'app-activity': 'DashActivity',
            'app-wait-activity': 'CredentialsActivity',
            'version': '4.2',
        }
        AppiumTestCase.setUp(self)

    def test_android_app(self):
        uname = self.driver.find_element_by_name("userName")
        uname.send_keys(self.username)
        password = self.driver.find_element_by_name("userPassword")
        password.send_keys(self.password)
        self.driver.find_element_by_tag_name("button").click()
        jobs = self.driver.find_element_by_name("jobList")
        jobs = jobs.find_elements_by_tag_name("relative")
        jobs[1].click()
        os = self.driver.find_element_by_name("osName").text
        self.assertGreater(len(os), 0)
