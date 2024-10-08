const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

// Get the output directory and the target directory from environment variables

const publishPath = 'C:Users/tuy_2/Desktop/Publish';

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

// Execute the move
moveBuild();
