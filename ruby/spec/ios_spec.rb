require 'selenium-webdriver'

RSpec.configure do |config|
    config.before(:each) do
        appium_port = 4723
        appium_url = "http://localhost:#{appium_port}/wd/hub"
        app_path = File.join(File.dirname(__FILE__), '..', '..', 'apps',
                             'TestApp6.1.app.zip')
        desired_caps = {
            newCommandTimeout: 60,
            name: example.metadata[:full_description],
            device: 'iPhone Simulator',
            platform: 'Mac 10.8',
            app: app_path,
            version: '6.1'
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

describe 'An iOS Test App' do
    it 'should calculate the sum of two numbers' do
        @values = []
        fields = @driver.find_elements :tag_name, 'textField'
        fields.each do |field|
            random_num = rand 10
            field.send_keys random_num
            @values << random_num
        end
        @driver.find_element(:tag_name, 'button').click
        res_text = @driver.find_element(:tag_name, 'staticText').text.to_i
        res_text.should eq @values.inject(:+)
    end
end
