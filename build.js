const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const indexFilePath = `./src/index.html`;
const outputFileDir = './dist';
const outputFileName = 'output.html';

// Helper function to process HTML recursively
const processHtml = (html, parentDir, fileSource, processedFiles = new Set()) => {
    return html.replace(/(?<!<!--\s*)<file\s+src="([^"]+)"\s*(?:\/>|>\s*<\/file>)/g, (match, src1, src2) => {
    const src = src1 || src2;
    // Resolve relative to the parent directory
    const fullPath = src.startsWith('/') ? src : path.resolve(parentDir, src);

    // Prevent self-inclusion or re-processing of the same file
    if (processedFiles.has(fullPath)) {
        // console.warn(`Skipping self-included or already processed file: ${src}`);
        return `<!-- <file> ignored --><script>/*! <![CDATA[ */ console.error('<file> path ignored in', '${fileSource}', ':', '${src}', 'can only include file once');/* ]]> */</script>`; // Include an error comment in the HTML
    }

    try {
        // Read and process the included file content
        let includerPath = fullPath.replace(/\\/g, '/');
        const includedContent = fs.readFileSync(fullPath, 'utf8');

        processedFiles.add(fullPath); // Track the file as processed
        return processHtml(includedContent, path.dirname(fullPath), includerPath, processedFiles); // Recurse for nested includes
    } catch (e) {
        return `<!-- <file> not found --><script>/*! <![CDATA[ */   console.error('<file> path not found in', '${fileSource}', ':', '${src}');/* ]]> */</script>`; // Include an error comment in the HTML
    }
    });
};

function createFile(basePath, fileName, content) {
    const filePath = path.join(basePath, fileName);

    // Ensure the directory exists
    fs.mkdir(basePath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            return;
        }

        // Write content to the file
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(`File created successfully at: ${filePath}`);
            }
        });
    });
}

fs.readFile(indexFilePath, 'utf8', async (err, data) => {

    const content = processHtml(data, path.dirname(indexFilePath), indexFilePath);

    createFile(outputFileDir, outputFileName, content);
    exec(`code ${path.join(outputFileDir, outputFileName)}`);

});