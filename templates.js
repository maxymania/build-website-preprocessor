
var Tags = /(\<build\:[a-z]+.*?\/?\>|\<\/build\:[a-z]+\>)/;

var StartTag = /\<build:([a-z]+) (.*?)(\/?)\>/;
var EndTag = /\<\/build:([a-z]+)\>/;


function ParseOuter(templ){
	var objects = [];
	var arr = (''+templ).split(Tags);
	objects.push({raw:arr[0],cmd:'/',data:''});
	var i=1;
	while(i<arr.length){
		var obj = arr[i].match(StartTag);
		if(!obj)throw new Error("no match");
		if(obj[3]!='/'){
			i++;
			i++;
		}
		i++;
		objects.push({raw:arr[i],cmd:obj[1],data:obj[2]});
		i++;
	}
	return objects;
}

function ParseInner(templ){
	var objects = [];
	var arr = (''+templ).split(Tags);
	var i=1;
	while(i<arr.length){
		var obj = arr[i].match(StartTag);
		if(!obj)throw new Error("no match");
		if(obj[3]!='/'){
			i++;
			objects.push({raw:arr[i],cmd:obj[1],data:obj[2]});
			i++;
		}
		i++;
		i++;
	}
	return objects;
}

function register(dest,list){
	var i,n;
	n=list.length;
	for(i=0;i<n;++i)
		switch(list[i].cmd){
		case 'inject':dest[list[i].data]=list[i].raw;  break;
		}
}

function execute(list,src,cb){
	var i,n;
	n=list.length;
	for(i=0;i<n;++i)
		switch(list[i].cmd){
		case 'include': cb(src[list[i].data] || '');
		default: cb(list[i].raw);  break;
		}
}

module.exports={
	ParseOuter:ParseOuter,
	register:register,
	ParseInner:ParseInner,
	execute:execute
};

