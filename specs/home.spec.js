//IMPORTS.
const assert = require('assert');
const home = require('../pages/home');
const navbar = require('../pages/navbar');
const loginModal = home.sections.loginModal;
const registerModal = home.sections.registerModal;
const settings = require('../wdio.conf');

//REAL TESTS.
describe('index.html page tests.', function() {

  before(function() {
    browser.windowHandleMaximize();
    home.open();
  });
  //Your index.html tests go here
  it('Should load page with a proper title', function(){
    let title = browser.getTitle();
    assert.equal(title, '');
  });

  it('Should check "Register" button', function() {
    
  })

  it('Should check "Login" button', function() {

  })
});
