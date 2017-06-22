var test = require('tape')
var md = require('../src/md')

test('env', t=> {
  t.plan(1)
  t.ok(md, 'got md')
})

test('index.md html', t=> {
  t.plan(1)
  md('index', function _md(err, html) {
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
