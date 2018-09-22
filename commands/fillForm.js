module.exports = function(){
  browser.addCommand('fillForm', function(selector, data, submit) {
    for(let key in data){
      if (data.hasOwnProperty(key)) {
        this.element(`${selector} input[name=${key}]`).setValue(data[key]);
      }
    }
    if(submit){
      //TODO: fix when Webdriver API implemented
      if(browser.desiredCapabilities.browserName === 'firefox'){
        browser.submitForm(selector);
      }else{
        this.element(`${selector} input`).click().keys('\uE007');
      }
    }
  });
};
