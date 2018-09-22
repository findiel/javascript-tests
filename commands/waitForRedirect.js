module.exports = function(){
  browser.addCommand('waitForRedirect', function(target, timeout, description, reverse){
    return this.waitUntil(function(){
      return (this.getPath() === target) !== reverse;
    }.bind(this), timeout || 1000, description);
  });
};
