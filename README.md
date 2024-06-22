# blogger-template-build-script
Google Blogger template build script. Merge HTML file using custom &lt;file> tag.

# Example
Path is relative to the file that includes it.

index.html
```html
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3' b:responsive='true' b:templateUrl='indie.xml' b:templateVersion='1.3.3' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
</head>
<body>

<h1> Blog Title </h1>

<file src='content/post.html'></file>
<file src="content/post.html"></file>
<file src="content/post.html"/>

<p> sample paragraph </p>
some text goes here
<div> some container </div>

</body>
</html>
```

content/header.html
```html
<h2>Post Title</h2>
<file src="./horizontal-line.html"/>
```

content/horizontal-line.html
```html
<hr/>
```

# Building
See build script in package.json. Use the following to build the merged file: 
```
npm run build
```
Build file is located at `build/output.html`.
