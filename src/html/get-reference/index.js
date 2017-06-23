var arc = require('@smallwins/arc-prototype')
var render = require('@smallwins/arc-www-md')

function index(req, res) {
  res({
    html: render('reference')
  })
}

exports.handler = arc.html.get(index)
