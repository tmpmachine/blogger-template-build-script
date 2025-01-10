# blogger-template-build-script
Node script for compiling Blogger template HTML files.

## How To

1. Put your Blogger template code in `src/index.html`. **Do not rename or move this file**.
2. To include another HTML file, use `<file src="">` tag. The following are valid:
```html
<file src="widgets/example.html"></file>
<file src="widgets/example.html"/>
```
3. To compile the HTML files, run:
```
node build
```
4. See `dist/output.html`.
5. You may adjust the following configuration in `build.js`:
```js
const indexFilePath = `./src/index.html`;
const outputFileDir = './dist';
const outputFileName = 'output.html';
```

## Comment A `<file>` Tag
Do comment one tag at a time.

Valid:
```html
<!-- <file src="widgets/header.html"></file> -->
<!-- 
<file src="widgets/footer.html"></file> 
-->
```

Invalid, only the first one is ignored:
```html
<!-- 
    <file src="widgets/header.html"></file>
    <file src="widgets/footer.html"></file> 
-->
```

## Tips
For faster development, the following task script will run `node build` and open the output file in the new tab. You can use the default VS Code keyboard shortcut to run the build script (**Ctrl + Shift + B**).

`/.vscode/tasks.json`
```
{
    "version": "2.0.0",
    "tasks": [
      {
        "label": "build",
        "type": "shell",
        "command": "node",
        "args": [
          "build"
        ],
        "group": {
          "kind": "build",
          "isDefault": true
        },
        "problemMatcher": [],
        "detail": "Generated task to run node build"
      },
    ]
  }
  
```