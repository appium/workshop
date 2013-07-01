from selenium import webdriver

import unittest


class AppiumTestCase(unittest.TestCase):

    name = "Appium Test"

    def setUp(self):
        appium = "http://localhost:%s/wd/hub" % 4723
        self.desired_caps.update({
            'name': getattr(self, '_testMethodName',
                            self.name).replace('_', ' ').capitalize(),
            'newCommandTimeout': 60
        })
        self.driver = webdriver.Remote(appium, self.desired_caps)
        self.driver.implicitly_wait(30)

    def tearDown(self):
        self.driver.quit()
