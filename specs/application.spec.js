//IMPORTS.
const assert = require('assert');
const navbar = require('../../pages/navbar');
const home = require('../../pages/home');
const axios = require('axios');
const globals = require('../../globals');
const settings = require('../../wdio.conf');
const jwt = require('jsonwebtoken');

//INFO:
// 1. How to use JWT https://github.com/auth0/node-jsonwebtoken

//REAL TESTS.
describe('Evryplace user settings tests.', function() {
    before(function () {
        browser.windowHandleMaximize();
        
        //Creating a new workspace - new user.
        let uniqueDate = new Date();
        let uniqueNumber = uniqueDate.getTime();
        let uniqueEmail = `yourEmail+${uniqueNumber}@gmail.com`;
        let expirationTime = uniqueNumber * 2;

        const token = jwt.sign({
            "email" : uniqueEmail,
            "displayName": "Software Tester",
            "profileName": "Tests",
            "externalProfileId": uniqueNumber,
            "exp": expirationTime }, 
            'secretOrPrivateKey')

        //Registering & logging user.
        let loginSSOEndpoint = `${settings.config.baseUrl}api/v1/sso`;
        browser.call(() => axios.post(loginSSOEndpoint, {
            "jwt": token 
        }, { headers: {'Content-Type': 'application/json' }})
            .then(function(response) {
                assert.equal(response.status, 200)
                let cookies = response.headers['set-cookie'];
                const jsessionRe = /^JSESSIONID=([\w-\.]+);/;
                const rmtRe = /^RMT=([\w-\.]+);/;
                let jsession, rmt;
                cookies.forEach(cookie => {
                    if(jsessionRe.test(cookie)){
                        jsession = jsessionRe.exec(cookie)[1];
                    }else if(rmtRe.test(cookie)){
                        rmt = rmtRe.exec(cookie)[1];
                    }
                });
                //Keeping session.
                home.open();
                browser.setCookie({ name: 'JSESSIONID', value: jsession, path: '/', secure: true, httpOnly: true });
                browser.setCookie({ name: 'RMT', value: rmt, path: '/' });
            }));
    })


})