var arc = require('@smallwins/arc-prototype')
var layout = require('@smallwins/arc-www-md/layout-sync')

function index(req, res) {
  res({
    html: layout('reference')
  })
}

exports.handler = arc.html.get(index)
