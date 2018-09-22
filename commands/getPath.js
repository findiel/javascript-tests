module.exports = function(){
  const pathRE = /.+?:\/\/.+?(\/.+?)(?:#|\?|$)/i;
  browser.addCommand('getPath', function(){
    const path = pathRE.exec(this.getUrl());
    return path ? path[1] : '';
  });
};
