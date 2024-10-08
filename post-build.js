const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

// Get the output directory and the target directory from environment variables
const currentDate = new Date().toLocaleString();
const debugMessage = `console.debug('Build Date: ${currentDate}');`;

function addConsoleDebugToJsFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', dir, err);
            return;
        }

        files.forEach(file => {
            // Check if the file ends with .js and contains 'main' in the filename
            if (file.endsWith('.js') && file.includes('main')) {
                const jsFile = path.join(dir, file);

                fs.access(jsFile, fs.constants.F_OK, (err) => {
                    if (err) {
                        console.error('JavaScript file not found:', jsFile);
                        return;
                    }

                    // Append console.debug to the end of the JavaScript file
                    fs.appendFile(jsFile, `\n${debugMessage}\n`, (err) => {
                        if (err) {
                            console.error('Error writing to file:', jsFile, err);
                        } else {
                            console.log(`Appended console.debug to: ${jsFile}`);
                        }
                    });
                });
            }
        });
    });
}

const publishPath = 'C:/inetpub/wwwroot'; // for stage
//const publishPath = 'C:/inetpub/wwwroot'; // for cloud

const projectName = process.env.PROJECT_NAME;
const outputDir = `dist/${projectName}`;
const targetDir = publishPath + '/' + process.env.OUTPUT_PATH + '/' + projectName;

// Function to move the files
function moveBuild() {
  if (fs.existsSync(outputDir)) {
    console.log(`Moving build from ${outputDir} to ${targetDir}`);
    fse.moveSync(outputDir, targetDir, { overwrite: true });
    console.log(`Build successfully moved to ${targetDir}`);
  } else {
    console.error(`Build directory ${outputDir} not found`);
  }
}

moveBuild();
addConsoleDebugToJsFiles(targetDir);