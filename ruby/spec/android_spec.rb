require 'selenium-webdriver'

RSpec.configure do |config|
    config.before(:each) do
        appium_port = 4723
        appium_url = "http://localhost:#{appium_port}/wd/hub"
        app_path = File.join(File.dirname(__FILE__), '..', '..', 'apps',
                             'ContactManager.apk')
        desired_caps = {
            newCommandTimeout: 60,
            name: example.metadata[:full_description],
            device: 'Android',
            platform: 'Linux',
            app: app_path,
            'app-package' => 'com.example.android.contactmanager',
            'app-activity' => '.ContactManager',
            version: '4.2'
        }
        @driver = Selenium::WebDriver.for(
            :remote,
            url: appium_url,
            desired_capabilities: desired_caps
        )
    end

    config.after(:each) do
        @driver.quit
    end
end

describe 'An Android Contacts App' do
    it 'should add a new contact' do
        @driver.find_element(:name, 'Add Contact').click
        fields = @driver.find_elements(:tag_name, 'textfield')
        fields[0].send_keys 'My Name'
        fields[2].send_keys 'someone@somewhere.com'
        fields[0].text.should eq 'My Name'
        fields[2].text.should eq 'someone@somewhere.com'
        @driver.navigate.back
        button_text = @driver.find_element(:tag_name, 'button').text
        button_text.should eq 'Add Contact'
        checkbox = @driver.find_element(:xpath, '//checkBox')
        checkbox.click
        checkbox.text.should eq 'Show Invisible Contacts (Only)'
    end
end

