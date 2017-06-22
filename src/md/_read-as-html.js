var md = require('marked')
var fs = require('fs')
var join = require('path').join

module.exports = function _reads(fname, callback) {
  var navPath = join(__dirname, 'en', 'aws', fname + '.md')
  fs.readFile(navPath, function _readFile(err, buffer) {
    if (err) {
      callback(err)
    }
    else {
      var result = {}
      result[fname] = md(buffer.toString())
      callback(null, result)
    }
  }) 
}
