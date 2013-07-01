from selenium import webdriver

import unittest
import os


class AppiumTestCase(unittest.TestCase):

    def setUp(self):
        self.username = os.environ.get('SAUCE_USERNAME')
        self.password = os.environ.get('SAUCE_PASSWORD')
        appium = "http://localhost:%s/wd/hub" % 4723
        self.desired_caps.update({
            'name': getattr(self, '_testMethodName',
                            self.name).replace('_', ' ').capitalize(),
            'newCommandTimeout': 60
        })
        print self.desired_caps
        self.driver = webdriver.Remote(appium, self.desired_caps)
        self.driver.implicitly_wait(30)

    def tearDown(self):
        self.driver.quit()
