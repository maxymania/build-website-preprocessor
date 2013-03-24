var fs = require('fs');
var templates = require('./templates.js');

function Build(opts){
	var std=[];
	var templ = templates.ParseOuter(fs.readFileSync(opts.template));
	
	var incl = opts.include || fs.readdirSync(opts.incldir);
	for(var i in incl){
		std.push(
			templates.ParseInner(fs.readFileSync((opts.incldir||'')+(incl[i]),'utf8'))
		);
	}
	var comp = opts.compile || fs.readdirSync(opts.compdir);
	for(var i in comp){
		var k = {};
		var d = templates.ParseInner(fs.readFileSync(opts.compdir+(comp[i])));
		for(var j in std)
			templates.register(k,std[j]);
		templates.register(k,d);
		//var fobj = fs.openSync(opts.destdir+(comp[i]),'w');
		var fobj = fs.createWriteStream(opts.destdir+(comp[i]));
		templates.execute(templ,k,function(d){fobj.write(d,'utf8');});
		fobj.end();
	}
	opts.dest;
};

module.exports={
	Build:Build
};

