#!/usr/bin/env node

const { Command } = require('commander');
const { recurseDirectory, searchAndReplaceStringInFile, processMultilineString }  = require('./index.js');
const fs = require('fs');
const path = require('path');
// Read the version number from package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

const program = new Command();
program.version(version);
program.description('A simple CLI for checking and replacing jcenter with grails in gradle files');
program.option('-d, --directory <directory>', 'The directory to search for gradle files');
program.option('-c, --current', 'Use the current working directory as the search path');
program.option('-s, --search <searchString>', 'The string to search for');
program.option('-r, --replace <replaceString>', 'The string to replace with');
program.action((options) => {
    // check if one of the options is defined. If not show help
    if ((!options.directory && !options.current) || (options.directory && options.current)) {
      program.help();
    }

    if (!options.search) {
      options.search = 'jcenter()';
    }
    if (!options.replace) {
      options.replace = "maven { url 'https://repo.grails.org/grails/core/' }";
    }
    else {
      options.replace = processMultilineString(options.replace);
    }

    if (options.replace.includes(options.search)) {
      console.error('The replace string cannot contain the search string');
      process.exit(1);
    }

    console.log(`Searching for ${options.search} and replacing it with ${options.replace}`);
    const directory = options.current ? process.cwd() : options.directory;
    console.log(`Searching for gradle files in ${directory}`);
    recurseDirectory(directory, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log(results);
        // iterate over the results and replace jcenter with grails
        results.forEach((file) => {
          searchAndReplaceStringInFile(file, options.search, options.replace);
        });
      }
    });
});
program.parse(process.argv);