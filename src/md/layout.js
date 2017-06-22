var parallel = require('run-parallel')
var fs = require('fs')
var join = require('path').join
var _reads = require('./_read-as-html')
var ledger = {}

module.exports = function layout(filename, callback) {
  if (ledger[filename]) {
    callback(null, ledger[filename])
  }
  else {
    parallel([
      function _style(callback) {
        fs.readFile(join(__dirname, 'style.css'), callback)
      },
      function _nav(callback) {
        _reads('_nav', callback)
      },
      function _body(callback) {
        _reads(filename, callback)
      }
    ],
    function _done(err, results) {
      if (err) throw err
      var title = 'arc'
      var style = results.find(Buffer.isBuffer).toString()
      var nav = results.find(r=> r.hasOwnProperty('_nav'))._nav
      var body = results.find(r=> r.hasOwnProperty(filename))[filename]
      ledger[filename] = `
        <html>
        <head>
          <title>${title}</title>
          <style type=text/css>${style}</style>
        </head>
        <body>
        <section>
          <header>
            <nav>${nav}</nav>
          </header>
          <section>${body}</section>
          <footer></footer>
        </section>
        </body>
        </html>
      `
      callback(null, ledger[filename])    
    })
  }
}
