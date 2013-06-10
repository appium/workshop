import os
from common import AppiumTestCase


class AppiumCrossPlatformTestCase(AppiumTestCase):

    _tests_ = False
    desired_caps = {}

    def setUp(self):
        AppiumTestCase.setUp(self)

    def test_cross_platform_app(self):
        uname = self.driver.find_element_by_name("userName")
        uname.send_keys(self.username)
        password = self.driver.find_element_by_name("userPassword")
        password.send_keys(self.password)
        self.driver.find_element_by_tag_name("button").click()
        #jobs = self.driver.find_element_by_name("jobList")
        #job_table_locator = self.elements['job_table'][self.device]
        #jobs = jobs.find_elements_by_tag_name(job_table_locator)
        #jobs[1].click()
        #osName = self.driver.find_element_by_name("osName").text
        #self.assertGreater(len(osName), 0)


class AppiumAndroidTestCase(AppiumCrossPlatformTestCase):

    _tests_ = True

    def setUp(self):
        self.device = 'android'
        app = os.path.join(os.path.dirname(__file__), "..", "apps",
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
        AppiumCrossPlatformTestCase.setUp(self)


class AppiumIOSTestCase(AppiumCrossPlatformTestCase):

    _tests_ = True

    def setUp(self):
        self.device = 'ios'
        app = os.path.join(os.path.dirname(__file__), "..", "apps",
                           "SauceDashboard.app.zip")
        self.desired_caps = {
            'device': 'iPhone Simulator',
            'platform': 'Mac 10.8',
            'app': app,
            'version': '6.1',
        }
        AppiumTestCase.setUp(self)
