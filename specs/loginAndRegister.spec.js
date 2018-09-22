//IMPORTS
const assert = require('assert');
const globals = require('../globals');
const home = require('../pages/home');
const registerModal = home.sections.registerModal;
const loginModal = home.sections.loginModal;
const axios = require('axios');
const settings = require('../wdio.conf');

//REAL TESTS
describe('Register and login tests.', function() {

    before(function() {
        browser.windowHandleMaximize();
        home.open();
    });

    it('Should check if user can pass empty register form', function() {
        home.waitForVisible('@btnOpenSignUp');
        home.click('@btnOpenSignUp');
        registerModal.waitForVisible('@btnSubmit');
        registerModal.click('@btnSubmit');
        registerModal.waitForVisible('@errorEmail');
        assert.equal(registerModal.getText('@errorEmail'), 'E-mail address is not valid.');
        registerModal.waitForVisible('@errorPasswordToShort');
        assert.equal(registerModal.getText('@errorPasswordToShort'), 'Password is too short.');
        registerModal.waitForVisible('@errorPasswordNotMatch');
        assert.equal(registerModal.getText('@errorPasswordNotMatch'), 'Passwords do not match.');
        browser.pause(500);
    })

    it('Should check register modal email errors', function() {
        for(wrongEmail in globals.invalidEmails) {
            registerModal.waitForVisible('@inputEmail');
            registerModal.element('@inputEmail').setValue(globals.invalidEmails[wrongEmail]);
            registerModal.waitForVisible('@btnSubmit');
            registerModal.click('@btnSubmit');
            registerModal.waitForVisible('@errorEmail');
            assert.equal(registerModal.getText('@errorEmail'), 'E-mail address is not valid.');
        }
        browser.pause(500);
    })

    it('Should check if register modal password is not too short error', function() {
        for(wrongPassword in globals.invalidPasswords) {
            registerModal.waitForVisible('@inputPassword');
            registerModal.element('@inputPassword').setValue(globals.invalidPasswords[wrongPassword]);
            registerModal.waitForVisible('@btnSubmit');
            registerModal.click('@btnSubmit');
            registerModal.waitForVisible('@errorPasswordToShort');
            assert.equal(registerModal.getText('@errorPasswordToShort'), 'Password is too short.');
        }
        browser.pause(500);
    })

    it('Should check register modal password inputs match error', function() {
        registerModal.waitForVisible('@inputConfirmPassword');
        registerModal.element('@inputConfirmPassword').setValue(globals.wrongPassword);
        registerModal.waitForVisible('@btnSubmit');
        registerModal.click('@btnSubmit');
        registerModal.waitForVisible('@errorPasswordNotMatch');
        assert.equal(registerModal.getText('@errorPasswordNotMatch'), 'Passwords do not match.');
        browser.pause(500);
    })

    it('Should check if register modal display name is not too short', function() {
        registerModal.waitForVisible('@inputDisplayedName');
        registerModal.element('@inputDisplayedName').setValue(globals.wrongDisplayedName);
        registerModal.waitForVisible('@errorUsername');
        assert.equal(registerModal.getText('@errorUsername'), 'Your name is too short.');
        registerModal.waitForVisible('@btnCloseModal');
        registerModal.click('@btnCloseModal');
        browser.pause(500);
    })

   it('Should register properly', function() {
       //1. Creating new unique mail to register.
        let uniqueDate = new Date();
        let uniqueNumber = uniqueDate.getTime();
        let uniqueEmail = 'Your_spam_email+' + uniqueNumber + '@gmail.com';
        globals.newUser.login = uniqueEmail;
        globals.newUser.password = 'password';
        //2. Sending request
        axios.post('Your api register endpoint', {
            "displayName":"testUser",
            "email": uniqueEmail,
            "password":"password"
            }, {headers: {'Content-Type': 'application/json'}})
                .then(function(response) {
                    assert.equal(response.status, 200);
                })
                .catch(function (error) {
                    console.log(error);
                })
    }) 

    it('Should check if user can pass empty login form', function() {
        home.waitForVisible('@btnOpenLogin');
        home.click('@btnOpenLogin');
        loginModal.waitForVisible('@btnSubmit');
        loginModal.click('@btnSubmit');
        loginModal.waitForVisible('@errorEmail');
        assert.equal(loginModal.getText('@errorEmail'), 'E-mail address is not valid.');
        loginModal.waitForVisible('@errorPasswordToShort');
        assert.equal(loginModal.getText('@errorPasswordToShort'), 'Password is too short.');
        browser.pause(500);
    })

    it('Should check login modal wrong email errors', function() {
        for(wrongEmail in globals.invalidEmails) {
            loginModal.waitForVisible('@inputLogin');
            loginModal.element('@inputLogin').setValue(globals.invalidEmails[wrongEmail]);
            loginModal.waitForVisible('@btnSubmit');
            loginModal.click('@btnSubmit');
            loginModal.waitForVisible('@errorEmail');
            assert.equal(loginModal.getText('@errorEmail'), 'E-mail address is not valid.');
        }
        browser.pause(500);
    })

    it('Should check if login modal password is not too short error', function() {
        for(wrongPassword in globals.invalidPasswords) {
            loginModal.waitForVisible('@inputPassword');
            loginModal.element('@inputPassword').setValue(globals.invalidPasswords[wrongPassword]);
            loginModal.waitForVisible('@btnSubmit');
            loginModal.click('@btnSubmit');
            loginModal.waitForVisible('@errorPasswordToShort');
            assert.equal(loginModal.getText('@errorPasswordToShort'), 'Password is too short.');
        }
        loginModal.waitForVisible('@btnCloseModal');
        loginModal.click('@btnCloseModal');
        browser.pause(500);
    })

    it('Should check recover email errors', function() {
        home.waitForVisible('@btnOpenLogin');
        home.click('@btnOpenLogin');
        loginModal.waitForVisible('@btnRecover');
        loginModal.click('@btnRecover');
        loginModal.waitForVisible('@btnSubmitRecover');
        loginModal.click('@btnSubmitRecover');
        loginModal.waitForVisible('@errorEmailRecover');
        assert.equal(loginModal.getText('@errorEmailRecover'), 'E-mail address is not valid.');
        loginModal.waitForVisible('@btnCloseRecover');
        loginModal.click('@btnCloseRecover');
        browser.pause(500);
    })

    it('Should use recover password modal', function() {
        home.waitForVisible('@btnOpenLogin');
        home.click('@btnOpenLogin');
        loginModal.waitForVisible('@btnRecover');
        loginModal.click('@btnRecover');
        loginModal.waitForVisible('@inputEmailRecover');
        loginModal.element('@inputEmailRecover').setValue(globals.newUser.login);
        loginModal.waitForVisible('@btnSubmitRecover');
        loginModal.click('@btnSubmitRecover');
        loginModal.waitForVisible('@messageEmailSent');
        assert.equal(loginModal.getText('@messageEmailSent'), 'If the provided e-mail address exists, the message has been sent.');
        loginModal.waitForVisible('@btnCloseRecover');
        loginModal.click('@btnCloseRecover');
        browser.pause(500);
    })

    it('Should check if terms of service link works properly', function() {
        home.waitForVisible('@btnOpenSignUp');
        home.click('@btnOpenSignUp');
        registerModal.waitForVisible('@termsOfService');
        registerModal.click('@termsOfService');
        browser.pause(500);
        assert.equal(browser.getPath(), `${home.path}terms`);
        browser.back();
        browser.pause(500);
    })

    it('Should check if privacy policy link works properly', function() {
        home.waitForVisible('@btnOpenSignUp');
        home.click('@btnOpenSignUp');
        registerModal.waitForVisible('@privacyPolicy');
        registerModal.click('@privacyPolicy');
        browser.pause(500);
        let windowHandles = browser.windowHandles();
        browser.window(windowHandles.value[1]);
        let tabTitle = browser.window(windowHandles.value[1]).getUrl();
        browser.pause(1000);
        assert.equal(tabTitle, `${settings.config.baseUrl}/privacy`);
        browser.window(windowHandles.value[0]);
        browser.pause(500);
    })

    it('Should login properly', function() {
        home.waitForVisible('@btnOpenLogin');
        home.click('@btnOpenLogin');
        loginModal.waitForVisible('@inputLogin');
        loginModal.element('@inputLogin').setValue(globals.testUser.login);
        loginModal.waitForVisible('@inputPassword');
        loginModal.element('@inputPassword').setValue(globals.testUser.password);
        loginModal.waitForVisible('@btnSubmit');
        loginModal.click('@btnSubmit');
        home.waitForVisible('@nickName');
        assert.equal(home.getText('@nickName'), 'testUser');
    })
});
