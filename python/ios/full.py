import os
from common import AppiumTestCase


class AppiumIOSTestCase(AppiumTestCase):

    def setUp(self):
        app = os.path.join(os.path.dirname(__file__), "..", "..", "apps",
                           "SauceDashboard.app.zip")
        self.desired_caps = {
            'device': 'iPhone Simulator',
            'platform': 'Mac 10.8',
            'app': app,
            'version': '6.1',
        }
        AppiumTestCase.setUp(self)

    def test_iphone_app(self):
        alert = self.driver.find_element_by_tag_name("alert")
        fields = alert.find_elements_by_tag_name("textfield")
        self.assertGreater(len(fields), 0)
