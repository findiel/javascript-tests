'use strict';

class Page {
  constructor({ path, elements, sections, timeout }){
    this.selector = false;
    this.path = path || '/';
    this.selectors = elements;
    this.timeout = timeout || 5000;
    this.sections = {};
    if(sections){
      Object.keys(sections).forEach(key => {
        this.sections[key] = new Section(sections[key]);
      });
    }
  }

  element(selector){
    return browser.element(this.getSelector(selector));
  }

  elements(selector){
    return browser.elements(this.getSelector(selector));
  }

  getSelector(selector){
    let name = /^\@([\w]+)$/i.exec(selector);
    if(name){
      name = name[1];
      selector = this.selectors[name];
      if(!selector){
        let section = this.sections[name];
        if(section){
          selector = section.selector;
        }else{
          throw Error(`Element '${name}' is not defined!`);
        }
      }
    }
    return this.selector
      ? `${this.selector} ${selector}`
      : selector;
  }

  call(method, selector){
    let args = Array.prototype.slice.call(arguments, 2);
    args.unshift(this.getSelector(selector));
    return method.apply(browser, args);
  }

  open(sectionName){
    browser.url(sectionName ? this.sections[sectionName].path : this.path);
  }

  click(selector, index){
    if(Array.isArray(selector)) {
      return selector[index].click();
    }else {
      return browser.click(this.getSelector(selector));
    }
  }

  fillForm(selector, data, submit){
    return browser.fillForm(this.getSelector(selector), data, submit);
  }

  getText(selector){
    if(Array.isArray(selector)) {
      return browser.getText(this.getSelector(selector)[0]);
    }else {
      return browser.getText(this.getSelector(selector));
    }
  }

  getValue(selector){
    return browser.getValue(this.getSelector(selector));
  }

  isVisible(selector){
    return browser.isVisible(this.getSelector(selector));
  }

  waitForExist(selector, timeout, reverse){
    timeout = timeout || this.timeout;
    return browser.waitForExist(this.getSelector(selector), timeout, reverse);
  }

  waitForVisible(selector, timeout, reverse){
    timeout = timeout || this.timeout;
    return browser.waitForVisible(this.getSelector(selector), timeout, reverse);
  }

  try(selector) {
    if(!selector) {
      setTimeout(this.try, 500);
    }
  }
}

class Section extends Page {
  constructor(cfg){
    super(cfg);
    if(cfg.selector){
      this.selector = cfg.selector;
    }else{
      // throw Error('Section requires a selector'); //TODO: restore when sections adjusted
      this.selector = '';
    }
  }
}

module.exports = Page;
