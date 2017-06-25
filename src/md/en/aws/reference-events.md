# @events

> `@events` define SNS topics and Lambda handlers for them. 

This `.arc` file defines two `@events`:

```
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

Once deployed you can invoke these handlers:

```javascript
var arc = require('arc-prototype')

arc.events.publish({
  name: 'hit-counter',
  payload: {hits: 1},
}, console.log)
```

Yyou can even invoke Lambdas across apps:

```javascript
var arc = require('arc-prototype')

arc.events.publish({
  app: 'some-other-app',
  name: 'hit-counter',
  payload: {hits: 2},
}, console.log)
```
