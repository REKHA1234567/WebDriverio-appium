

describe('Assesment', async() => {  
    xit('Validate the default selection of the tab', async() => {
        // driver.isAppInstalled(appId)
        let Home_icon = await $('~Home')   
        let Home_screen =await $('~Home-screen') 
        // console.log(await Home_icon.isSelected());  //true

        await expect(Home_screen).toBeDisplayed() //assertion: Home-screen is displayed
        await expect(Home_icon).toBeSelected(); //assertion: Home-icon is by default selected:true
    });     

    xit('Validate that form tab is available for selection and is clickable',async()=>{
        // let Forms_icon = await $('//*[@content-desc="Forms"]') 
         let Forms_icon =await $('android=new UiSelector().clickable(true)')       
         await expect(Forms_icon).toBeEnabled() //assertion: Form-icon is existing       
         let isClickable = await Forms_icon.getAttribute('clickable')
         expect(isClickable).toEqual('true');
    })   

    xit('Validate the color change on the selection of the form tab //use img comparision',async()=>{
        let Forms_icon = await $('~Forms')    
        await Forms_icon.click();
        await expect(Forms_icon).toBeSelected();     
    }) 

    xit('Validate the Input behavior is working as intended',async()=>{
        // await driver.startActivity("com.wdiodemoapp","com.wdiodemoapp.MainActivity")
        let Forms_icon = await $('~Forms')    
        await Forms_icon.click();

        //validate test input textfield
        let textInput = await $('~text-input');
        let text = "webdriver"
        await textInput.setValue(text)
        await driver.hideKeyboard();
        let textResult  = await $('~input-text-result')
        console.log(await textResult.getText());
        await expect(textResult).toHaveText(text)

        //validate switch
        let switchWidget = $('~switch')
        await expect(switchWidget).toHaveText('OFF')
        let switchText = $('~switch-text')
        await expect(switchText).toHaveText('Click to turn the switch ON')
        await switchWidget.click();
        await expect(switchWidget).toHaveText('ON')
        await expect(switchText).toHaveText('Click to turn the switch OFF')
    })

    xit('Validate that picker element is working and it has 3 options to choose from',async()=>{
        let Forms_icon = await $('~Forms')    
        await Forms_icon.click();
        await $('//*[@text="Select an item..."]').click()
        let expectedList=['Select an item...','webdriver.io is awesome','Appium is awesome','This app is awesome']
        let actualList=[]
        let elements = await $$('//*[@resource-id="android:id/text1"]')
        for(let ele of elements){
            actualList.push(await ele.getText());
        }
        
        await expect(expectedList).toEqual(actualList)
    })

    xit('Validate that all options from picker elements are visible within the screen.//Compared using bounds attribute',async()=>{
        let Forms_icon = await $('~Forms')    
        await Forms_icon.click();
        await $('//*[@text="Select an item..."]').click()

        let screenBoundary = await $('//*[@resource-id="com.wdiodemoapp:id/select_dialog_listview"]').getAttribute('bounds')
        const Screenbounds = screenBoundary.match(/\d+/g).map(Number);
        const [screen_X, screen_Y, screen_Width, screen_Height] = Screenbounds;

        let pickerElementBoundary = await $('//*[@resource-id="android:id/text1"]').getAttribute('bounds')
        const pickerElementbounds = pickerElementBoundary.match(/\d+/g).map(Number);
        const [PickerElement_X, PickerElement_Y, PickerElement_Width, PickerElement_Height] = pickerElementbounds;

        if (PickerElement_X >= screen_X && PickerElement_Y >= screen_Y && PickerElement_X + PickerElement_Width <= screen_X + screen_Width && PickerElement_Y + PickerElement_Height <= screen_Y + screen_Height) {
            console.log('All picker elements are visible within the screen');
          } else {
            console.log('Not all picker elements are visible within the screen');
          }

    })

    xit('Validate that Inactive button is not interactable',async()=>{
        let Forms_icon = await $('~Forms')    
        await Forms_icon.click();
        let inactiveButton = await $('~button-Inactive')
        // let activeButton = await $('~button-Active')      
        // await inactiveButton.click()
        await expect(Forms_icon).toBeEnabled()
    })

    xit('Validate that android native alerts are functional',async()=>{
        let Forms_icon = await $('~Forms')    
        await Forms_icon.click();
        let activeButton = await $('~button-Active')
        await activeButton.click()
        let alertText = await driver.getAlertText();
        console.log(alertText);
        // await driver.acceptAlert();
        await driver.dismissAlert()
        await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
    })

    xit('Validate that keyboard is available to provide input in the text',async()=>{
                // await driver.startActivity("com.wdiodemoapp","com.wdiodemoapp.MainActivity")
                let Forms_icon = await $('~Forms')    
                await Forms_icon.click();
        
                //validate test input textfield
                let textInput = await $('~text-input');
                await textInput.click()
                let text = "webdriver"
                await textInput.setValue(text)
                await driver.hideKeyboard();
                let textResult  = await $('~input-text-result')
                console.log(await textResult.getText());
                await expect(textResult).toHaveText(text)
    })

});
