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
    get selectfirstoption(){
        return $('//*[@text="webdriver.io is awesome"]')
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
}
module.exports = new formsScreen();