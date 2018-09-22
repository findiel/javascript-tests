//IMPORTS
const assert = require('assert');
const home = require('../pages/home');
const footer = require('../pages/footer');
const settings = require('../wdio.conf');

//REAL TESTS
describe('Footer tests.', function() {

    before(function() {
        browser.windowHandleMaximize();
        home.open();
    });
    //Your footer tests goes here
    it('Should check if terms of service link works properly', function() {
        footer.waitForVisible('@termsOfService');
        footer.click('@termsOfService');
        browser.pause(500);
        let windowHandles = browser.windowHandles();
        browser.window(windowHandles.value[1]);
        let tabTitle = browser.window(windowHandles.value[1]).getUrl();
        browser.pause(500);
        assert.equal(tabTitle, `${settings.config.baseUrl}/terms`);
        browser.window(windowHandles.value[0]);
        browser.pause(500);
    })

    it('Should check if privacy policy link works properly', function() {
        footer.waitForVisible('@privacyPolicy');
        footer.click('@privacyPolicy');
        browser.pause(500);
        let windowHandles = browser.windowHandles();
        browser.window(windowHandles.value[2]);
        let tabTitle = browser.window(windowHandles.value[2]).getUrl();
        browser.pause(500);
        assert.equal(tabTitle, `${settings.config.baseUrl}/privacy`);
        browser.window(windowHandles.value[0]);
        browser.pause(500);
    })

})