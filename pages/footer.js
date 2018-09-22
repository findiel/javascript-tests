'use strict';

const Page = require('./page');
const Footer = new Page({
  path: '',
  sections: {},
  elements: {
    helpCenter: '',
    support: '',
    FAQ: '',
    facebook: '',
    linkedIn: '',
    sectionMain: '',
    termsOfService: '',
    privacyPolicy: '',
    googlePlay: '',
    appStore: '',
    btnbackToTop: ''
  }
});

module.exports = Footer;