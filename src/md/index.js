var fs = require('fs')
var md = require('marked')
var join = require('path').join
var ledger = {}

module.exports = function render(filename) {

  var cached = ledger.hasOwnProperty(filename)
  if (!cached) {
    var path = join(__dirname, 'en', 'aws', `${filename}.md`)

    var exists = fs.existsSync(path)
    if (exists) {

      var title = 'arc'
      var style = fs.readFileSync(join(__dirname, 'style.css')).toString()
      var nav = fs.readFileSync(join(__dirname, 'en', 'aws', '_nav.md')).toString()
      var body = fs.readFileSync(path).toString()

      ledger[filename] = `
        <html>
        <head>
          <title>${title}</title>
          <style type=text/css>${style}</style>
        </head>
        <body>
        <section>
          <header>
            <nav>${md(nav)}</nav>
          </header>
          <section>${md(body)}</section>
          <footer></footer>
        </section>
        </body>
        </html>
      `
    }
    else {
      ledger[filename] = '' // TODO empty str means 404
    }
  }
  return ledger[filename] 
}
