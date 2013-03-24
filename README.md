# Website Preprocessor

Website File Preprocessor to preprocess Static and even dynamic websites.

requirement: `node.js`

example usage:
```
/path/to/build.js build.json
```

# The template language/system

The primary purpose is to include fragments into another document.
For example with something like this: `<build:include title/>`

But you dont include fragments by file name. You inject sections from within the files: `<build:inject menu>`

## Here an example template:

template.html:
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title><build:include title/></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="/styles.css" />
	</head>
	<body>
	<div id="mid_d1">
		<div id="header"><build:include title/></div>
		<div id="haut">
			<ul class="menu">
				<build:include menu/>
			</ul>
		</div>
		<div id="center">
			<build:include content/>
		</div>
	</div>
	</body>
</html>
```

## And here the files to be included:

menu.html:
```html
<build:inject menu>
<li><a href="/">Home</a></li>
<li><a href="/blog">Blog</a></li>
<li><a href="/wiki">Wiki</a></li>
</build:inject>
```

default.html:
```html
<build:inject title>My Title</build:inject>

<build:inject content>
<h1>Error 404</h1>
</build:inject>
```

## And last but not least: the build-json

```js
{
	"compdir":"./comp/", // the compilations source dir
	"incldir":"./incl/", // the include source dir
	"destdir":"./dest/", // the compilations destination dir
	
	// no include array means: include all
	"include":[],
	// no compile array means: compile all
	"compile":[],
	template:'./template.html', // the template file to be used
}
```

# how to install the Website Preprocessor

```
git clone https://github.com/maxymania/build-website-preprocessor.git
```

you can create a shortcut by creating `~/bin/build-ws-pp` and write to it:
```
#!/bin/sh
/path/to/build.js $*
```
