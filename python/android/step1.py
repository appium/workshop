import os
from common import AppiumTestCase


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
