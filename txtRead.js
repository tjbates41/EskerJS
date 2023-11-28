const fs = require('fs');
const readline = require('readline');


// read line from the user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readTextFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        
        // Counting the metrics that are outlines in the report
        const lineCount = content.split('\n').length;
        const charCount = content.length;
        const letterCount = content.replace(/[^a-zA-Z]/g, '').length;
        const digitCount = content.replace(/\D/g, '').length;
        const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;


        // Cleaning for punctuation to get proper lengths and counts
        const wordLengths = content.split(/\s+/).map(word => word.replace(/[^\w]/g, '').length);
        const wordLengthCounts = {};
        wordLengths.forEach(length => {
            wordLengthCounts[length] = (wordLengthCounts[length] || 0) + 1;
        });

        // Creating the report string
        let report = `File name: ${filePath}\n`;
        report += `Number of lines: ${lineCount}\n`;
        report += `Number of characters (total): ${charCount}\n`;
        report += `Number of letters: ${letterCount}\n`;
        report += `Number of figures: ${digitCount}\n`;
        report += `Number of other characters: ${charCount - (letterCount + digitCount)}\n`;
        report += `Number of words: ${wordCount}\n`;

        // Adding word length counts to the report
        for (const [length, count] of Object.entries(wordLengthCounts)) {
            report += `Number of ${length} letter words: ${count}\n`;
        }

        return report;
    } catch (error) {
        // Handling file not found error
        if (error.code === 'ENOENT') {
            return "File not found.";
        } else {
            throw error;
        }
    }
}


rl.question("Enter the path to the text file: ", (filePath) => {
    // Calling the function and printing the result
    const report = readTextFile(filePath);
    console.log(report);

    // Closing the readline interface
    rl.close();
});
