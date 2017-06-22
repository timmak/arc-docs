var waterfall = require('run-waterfall')
var md = require('marked')
var fs = require('fs')
var path = require('path')
var ledger = {}

/**
 * Accepts a string identifier for a markdown file and returns it as HTML. The read is cached.
 *
 * usage
 *   
 *   var html = md('intro-concepts')
 */
module.exports = function _md(filename, callback) {
  if (ledger[filename]) {
    callback(null, ledger[filename])
  }
  else {
    var filepath = path.join(__dirname, 'en', 'aws', `${filename}.md`)
    waterfall([
      function _read(callback) {
        fs.readFile(filepath, callback)
      },
      function _parse(buffer, callback) {
        var str = buffer.toString()
        var html = md(str)
        callback(null, html)
      },
      function _cache(html, callback) {
        ledger[filename] = html
        callback(null, html)
      }
    ], callback)
  }
}
