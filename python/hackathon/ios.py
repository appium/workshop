import os
from common import AppiumTestCase
from random import randint


class AppiumIOSTestCase(AppiumTestCase):

    def setUp(self):
        app = os.path.join(os.path.dirname(__file__), "..", "..", "apps",
                           "TestApp6.1.app.zip")
        self.desired_caps = {
            'device': 'iPhone Simulator',
            'platform': 'Mac 10.8',
            'app': app,
            'version': '6.1',
        }
        self._values = []
        AppiumTestCase.setUp(self)

    def _populate(self):
        # populate text fields with two random number
        elems = self.driver.find_elements_by_tag_name('textField')
        for elem in elems:
            rndNum = randint(0, 10)
            elem.send_keys(rndNum)
            self._values.append(rndNum)

    def test_ui_computation(self):
        # populate text fields with values
        self._populate()
        # trigger computation by using the button
        buttons = self.driver.find_elements_by_tag_name("button")
        buttons[0].click()
        # is sum equal ?
        texts = self.driver.find_elements_by_tag_name("staticText")
        self.assertEqual(int(texts[0].text), self._values[0] + self._values[1])
