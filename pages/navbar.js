'use strict';

const Page = require('./page');
const Navbar = new Page({
  sections: {},
  elements: {
    sectionA: '',
    sectionB: '',
    sectionC: '',
    sectionMain: ''
  }
});

module.exports = Navbar;