import os
from common import AppiumTestCase


class AppiumAndroidTestCase(AppiumTestCase):

    def setUp(self):
        app = os.path.join(os.path.dirname(__file__), "..", "..", "apps",
                           "ContactManager.apk")
        self.desired_caps = {
            'device': 'Android',
            'platform': 'Linux',
            'app': app,
            'app-package': 'com.example.android.contactmanager',
            'app-activity': 'ContactManager',
            'version': '4.2',
        }
        AppiumTestCase.setUp(self)

    def test_add_contact(self):
        el = self.driver.find_element_by_name("Add Contact")
        el.click()

        textfields = self.driver.find_elements_by_tag_name("textfield")
        textfields[0].send_keys("My Name")
        textfields[2].send_keys("someone@somewhere.com")
        self.assertEqual(textfields[0].text, "My Name")
        self.assertEqual(textfields[2].text, "someone@somewhere.com")
        self.driver.back()

        el = self.driver.find_element_by_tag_name("button")
        self.assertEqual(el.text, "Add Contact")

        el = self.driver.find_element_by_xpath("//checkBox")
        el.click()
        self.assertEqual(el.text, "Show Invisible Contacts (Only)")
