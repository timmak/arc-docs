var arc = require('@smallwins/arc-prototype')
var render = require('@smallwins/arc-www-md')

function index(req, res) {
  res({
    html: render(`guide-${req.params.guideID}`)
  })
}

exports.handler = arc.html.get(index)
