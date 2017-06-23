var test = require('tape')
var layout = require('../src/md')

test('env', t=> {
  t.plan(1)
  t.ok(layout, 'got layout')
})

test('index.md html', t=> {
  t.plan(1)
  var html = layout('guides')
  t.ok(html, 'got md')
  console.log(html)
})

