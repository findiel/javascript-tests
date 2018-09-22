//Use this script to define global varibles that you can use in every test
module.exports = {
  testUser: {
    login: 'Your login goes here',
    password: 'Your password goes here'
  },
  newUser: {
    login: 'New user login goes here automaticly -> loginAndRegister.spec.js test',
    password: 'New user password goes here automaticly -> loginAndRegister.spec.js test'
  },
  gmailSpam: {
    login: 'Your company spam mail goes here',
    password: 'Your company spam mail password goes here'
  },
  invalidEmails : {
    missingAtSignOrDomain: 'example',
    missingAdress: '@domain.com',
    missingAtSign: 'example.com',
    doubleAtSign: 'example@@.com',
    garbage: '#@%^%#$@#$@#.com',
    coppiedFirst: 'Joe Smith <email@domain.com>',
    coppiedSecond: 'email@domain.com (Joe Smith)',
    spaceBetween: 'example @domain.com'
  },
  invalidPasswords: {
    tooShort: 'qw'
  },
  wrongPassword: 'wrongPassword',
  polishDiacriticsLowwerCase: 'zażółć gęsią jaźń',
  polishDiacriticsUpperCase: 'ZAŻÓŁĆ GĘSIĄ JAŹŃ',
};
