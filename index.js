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
          walk(file, function(err, res) {
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

module.exports = recurseDirectory;