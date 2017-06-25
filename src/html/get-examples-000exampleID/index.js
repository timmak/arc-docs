var arc = require('@smallwins/arc-prototype')
var render = require('@smallwins/arc-www-md')

function index(req, res) {
  res({
    html: render(`examples-${req.params.exampleID}`)
  })
}

exports.handler = arc.html.get(index)
