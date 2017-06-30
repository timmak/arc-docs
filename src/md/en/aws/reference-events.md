# @events

> `@events` define SNS topics and Lambda handlers for them. 

This `.arc` file defines two `@events`:

```arc
@app
testapp

@events
hit-counter
likes
```

Which have two corosponding handlers:

```
/
|-events
| |-hit-counter/
| '-likes/
|-.arc
'-package.json
```

The code for the `hit-counter` handler:

```javascript
var arc = require('@smallwins/arc-prototype')

function count(payload, callback) {
  // save count to the db here
  callback()
}

exports.handler = arc.events.subscribe(count)
```

Once deployed you can invoke these handlers from any other function defined under the `@app` namespace:

```javascript
var arc = require('arc-prototype')

arc.events.publish({
  name: 'hit-counter',
  payload: {hits: 1},
}, console.log)
```

Yyou can even invoke Lambdas across `@app` namespaces:

```javascript
var arc = require('arc-prototype')

arc.events.publish({
  app: 'some-other-app',
  name: 'hit-counter',
  payload: {hits: 2},
}, console.log)
```
