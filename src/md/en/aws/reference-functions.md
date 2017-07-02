# Functions

> `@architect/functions` is for creating cloud function signatures

- arc.html.get
- arc.html.post
- arc.json.get
- arc.json.post
- arc.events.subscribe
- arc.events.publish
- arc.tables.insert
- arc.tables.update
- arc.tables.destroy


## @html and @json

Accepts one or more Express middleware style functions.

### html.get
### html.post
### json.get
### json.post

## @events

Subscribe functions to events. Publish events from any other function.

### arc.events.subscribe

Subscribes a function to an event.

```javascript
var arc = require('@architect/functions')

function handler(payload, callback) {

}

exports.handler = arc.events.subscribe(handler)
```

### arc.events.publish

## @tables

Trigger functions from DynamoDB table events.

### arc.tables.insert
### arc.tables.update
### arc.tables.destroy
























## Examples

```javascript
var arc = require('@architect/functions')

function index(req, res) {

}

exports.handler = arc.html.get(index)
```
