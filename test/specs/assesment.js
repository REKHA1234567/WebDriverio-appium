const pixelmatch = require('pixelmatch');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const HomeScreen = require('../pageobjects/homeScreen.js')
const formsScreen = require('../pageobjects/formsScreen.js');
const homeScreen = require('../pageobjects/homeScreen.js');


describe('Assesment', async() => {  
    
    it('Validate the default selection of the tab', async() => {
        await expect(HomeScreen.homeScreen).toBeDisplayed() //assertion: Home-screen is displayed
        await expect(HomeScreen.homeIcon).toBeSelected(); //assertion: Home-icon is by default selected:true
    });     

    it('Validate that form tab is available for selection and is clickable',async()=>{         
         await expect(HomeScreen.Forms_icon).toBeEnabled() //assertion: Form-icon is existing       
         let isClickable = await HomeScreen.Forms_icon.getAttribute('clickable')
         expect(isClickable).toEqual('true');
    })   

    it('Validate the color change on the selection of the form tab //use img comparision',async()=>{
        
        //taking the screeshot before color change
        const beforeImage = await driver.takeScreenshot();       
        const beforeImageBuffer = Buffer.from(beforeImage, 'base64');
        
        //clicking on forms icon 
        await HomeScreen.Forms_icon.click();

        //taking the screeshot after color change
        const afterImage = await driver.takeScreenshot();
        const afterImageBuffer = Buffer.from(afterImage, 'base64');
        
        // load images as PNG objects
        const beforePng = PNG.sync.read(fs.readFileSync('./beforeScreenshot.png'));
        const afterPng = PNG.sync.read(fs.readFileSync('./afterScreenshot.png'));

        const diff = pixelmatch(beforePng.data, afterPng.data, null, beforePng.width, beforePng.height, { threshold: 0.1 });
 
        //assertion
        expect(diff).not.toBe(0);
    }) 

    it('Validate the Input behavior is working as intended',async()=>{
       
        await HomeScreen.Forms_icon.click();

        //validate test input textfield
        let text = "webdriver"
        await formsScreen.textInput.setValue(text)
        await formsScreen.textResult.getText();
        await expect(formsScreen.textResult).toHaveText(text)

        //validate switch
        await expect(formsScreen.switchWidget).toHaveText('OFF')
        await expect(formsScreen.switchText).toHaveText('Click to turn the switch ON')
        await formsScreen.switchWidget.click();
        await expect(formsScreen.switchWidget).toHaveText('ON')
        await expect(formsScreen.switchText).toHaveText('Click to turn the switch OFF')
    })

    it('Validate that picker element is working and it has 3 options to choose from',async()=>{    
        await homeScreen.Forms_icon.click();
        await formsScreen.SelectItem_dd.click()
        let expectedList=['Select an item...','webdriver.io is awesome','Appium is awesome','This app is awesome']
        let actualList=[]
        let elements = await formsScreen.SelectItem_dd_options
        for(let ele of elements){
            actualList.push(await ele.getText());
        }     
        //validation for all the options   
        await expect(expectedList).toEqual(actualList) 
        await formsScreen.webdriverIO_option.click()

        //validation for selected option
        let selectedoption = await formsScreen.selectedOption.getText() 
        expect(selectedoption).toEqual('webdriver.io is awesome')

    })

    it('Validate that all options from picker elements are visible within the screen.//Compared using bounds attribute',async()=>{ 
        await homeScreen.Forms_icon.click();
        await formsScreen.SelectItem_dd.click()

        let screenBoundary = await formsScreen.screenBoundary.getAttribute('bounds')
        const Screenbounds = screenBoundary.match(/\d+/g).map(Number);
        const [screen_X, screen_Y, screen_Width, screen_Height] = Screenbounds;

        let pickerElementBoundary = await formsScreen.pickerElementBoundary.getAttribute('bounds')
        const pickerElementbounds = pickerElementBoundary.match(/\d+/g).map(Number);
        const [PickerElement_X, PickerElement_Y, PickerElement_Width, PickerElement_Height] = pickerElementbounds;

        let allPickerElementsVisible = false;
        if (PickerElement_X >= screen_X && PickerElement_Y >= screen_Y && PickerElement_X + PickerElement_Width <= screen_X + screen_Width && PickerElement_Y + PickerElement_Height <= screen_Y + screen_Height) {
              allPickerElementsVisible = true;
          }
        
        if(allPickerElementsVisible){
            await formsScreen.selectfirstoption.click()
        }
    })

    it('Validate that Inactive button is not interactable',async()=>{        
        await homeScreen.Forms_icon.click();    
        await expect(formsScreen.inactiveButton).not.toBeEnabled()
    })

    it('Validate that android native alerts are functional',async()=>{    
        await homeScreen.Forms_icon.click();
        await formsScreen.activeButton.click()
        let alertText = await driver.getAlertText();
        await driver.dismissAlert()
        await expect(formsScreen.alert_text).not.toExist();
        await expect(formsScreen.askMeLater_btn).not.toExist();
        await expect(formsScreen.cancel_btn).not.toExist();
        await expect(formsScreen.ok_btn).not.toExist();
    })

    it('Validate that keyboard is available to provide input in the text',async()=>{  
                await homeScreen.Forms_icon.click();
                await formsScreen.textInput.click()
                const isKeyboardVisible = await driver.isKeyboardShown();
                await expect(isKeyboardVisible).toEqual(true)
                let text = "webdriver"
                await formsScreen.textInput.setValue(text)
                await driver.hideKeyboard();
                await formsScreen.textResult.getText();
                await expect(formsScreen.textResult).toHaveText(text)
    })
});
