const fs = require('fs');
const path = require('path');

// Input HTML file path (assuming index.html is in the current directory)
const inputFile = './index.html';
// Output directory path
const outputDir = './build';
// Output file name
const outputFile = 'output.html';

// Function to process HTML and replace <file> tags
function processHTML(html, basePath) {
    // Regular expression to find <file> tags with src attribute
    const fileTagRegex = /<file\s+src=(["'])(.*?)\1\s*(\/>|>.*?<\/file>)/g;
    let match;
    let previousHtml;

    // Process all <file> tags iteratively
    do {
        previousHtml = html;
        html = html.replace(fileTagRegex, (match, quote, src) => {
            const filePath = path.resolve(basePath, src);
            let fileContent = '';

            try {
                // Read the content of the file
                fileContent = fs.readFileSync(filePath, 'utf8');
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error);
            }

            // Recursively process the file content
            return processHTML(fileContent, path.dirname(filePath));
        });
    } while (html !== previousHtml);

    return html;
}

// Read input HTML file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }

    // Process HTML content
    const processedHTML = processHTML(data, path.dirname(inputFile));

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the modified HTML to the output file
    const outputPath = path.join(outputDir, outputFile);
    fs.writeFile(outputPath, processedHTML, 'utf8', (err) => {
        if (err) {
            console.error('Error writing output file:', err);
            return;
        }
        console.log(`Output file ${outputPath} created successfully.`);
    });
});
