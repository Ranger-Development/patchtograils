#!/usr/bin/env node

const { program } = require('commander');
const recurseDirectory = require('./index.js');

const program = new Command();
program.version('1.0.0');
program.description('A simple CLI for checking and replacing jcenter with grails in gradle files');
program.option('-d, --directory <directory>', 'The directory to search for gradle files');
program.option('-c, --current', 'Use the current working directory as the search path');
program.action(() => {
    // check if one of the options is defined. If not show help
    if ((!program.directory && !program.current) || (program.directory && program.current)) {
      program.help();
    }
    const directory = program.current ? process.cwd() : program.directory;
    recurseDirectory(program.directory, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
    }
  });
});
program.parse(process.argv);