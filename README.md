# JS-TESTS
All what you need to start testing in JavaScript.

# Installation
- install Node.js and npm
- download this repo and go with commands:
- run `npm install` in command line
- run `npm install -g allure-commandline` in command line

# Running tests
- run `npm test` in command line to execute all tests
- run npm test -- --spec .\specs\home.spec.js in command line to execute index.html tests
- run npm test -- --spec .\specs\loginAndRegister.spec.js in command line to execute Login and Register modals tests and properly register a new client
- run `npm run report` to see general tests report in browser
- to remove old tests from general report delete `reports` directory

# Sources about webdriverIO
- [guide](http://webdriver.io/guide.html)
- [API reference](http://webdriver.io/api.html)

# Sources about Chai assertion library
- [guide](http://chaijs.com/guide/)
- [API reference](http://chaijs.com/api/)
- [Assertion API reference](http://chaijs.com/api/assert)

# Sources about Mocha test framework
- [guide](https://mochajs.org)
- [hooks](https://mochajs.org/#hooks)

# Additional info
1. Install webdriverio globally </br>
2. Install mocha globally </br>
3. Use ./specs folder as a directory where you'll save your tests </br>
