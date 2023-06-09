class formsScreen{
    get textInput(){
        return $('~text-input');
    }
    get textResult(){
        return $('~input-text-result')
    }
    get switchWidget(){
        return $('~switch')
    }
    get switchText(){
        return $('~switch-text')
    }
    get SelectItem_dd(){
        return $('//*[@text="Select an item..."]')
    } 
    get SelectItem_dd_options(){
        return $$('//*[@resource-id="android:id/text1"]')
    }   
    get webdriverIO_option(){
        return $('//*[@text="webdriver.io is awesome"]')
    }
    get appium_option(){
        return $('//*[@text="Appium is awesome"]')
    }
    get app_option(){
        return $('//*[@text="This app is awesome"]')
    }
    get selected_option(){
        return $('//android.view.ViewGroup[@content-desc="Dropdown"]/android.view.ViewGroup/android.widget.EditText')
    }
    get screenBoundary(){
        return $('//*[@resource-id="com.wdiodemoapp:id/select_dialog_listview"]')
    }
    get pickerElementBoundary(){
        return $('//*[@resource-id="android:id/text1"]')
    }
    get inactiveButton(){
        return $('~button-Inactive')
    }
    get activeButton(){
        return $('~button-Active')
    }
    get alert_text(){
        return $('//*[@resource-id="android:id/alertTitle"]')
    }
    get askMeLater_btn(){
        return $('//*[@resource-id="android:id/button3"]')
    }
    get cancel_btn(){
        return $('//*[@resource-id="android:id/button2"]')
    }
    get ok_btn(){
        return $('//*[@resource-id="android:id/button1"]')
    }
}
module.exports = new formsScreen();