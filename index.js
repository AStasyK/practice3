var jade = require('jade');
 
// compile 
var fn = jade.compile('string of jade', options);
var html = fn(locals);
 
// render 
var html = jade.render('string of jade', merge(options, locals));
 
// renderFile 
var html = jade.renderFile('filename.jade', merge(options, locals));