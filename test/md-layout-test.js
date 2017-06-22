var test = require('tape')
var layout = require('../src/md/layout')

test('env', t=> {
  t.plan(1)
  t.ok(layout, 'got layout')
})

test('index.md html', t=> {
  t.plan(1)
  layout('index', function _md(err, html) {
    if (err) {
      t.fail(err)
      console.log(err)
    }
    else {
      t.ok(html, 'got md')
      console.log(html)
    }
  })
})
