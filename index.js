// Description: This file contains the code to recursively search for all .gradle files in a directory.

var fs = require('fs');
var path = require('path');
var recurseDirectory = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          recurseDirectory(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          // check if filename ends with .gradle
          if (file.endsWith('.gradle')) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

// define function searchAndReplaceStringInFile
// this function will search for a string in a file and replace it with another string
function searchAndReplaceStringInFile(filePath, searchString, replaceString) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(searchString, replaceString);
    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

// export searchAndReplaceStringInFile and recurseDirectory functions 
module.exports = {
  recurseDirectory,
  searchAndReplaceStringInFile
};