# Functions

> `@architect/functions` is for creating cloud function signatures

- `arc.html.get(...fns)`
- `arc.html.post(...fns)`
- `arc.json.get(...fns)`
- `arc.json.post(...fns)`
- `arc.events.subscribe((payload, callback)=>)`
- `arc.events.publish(params, callback)` where `params` requires `name` and `payload` and optionally `app` keys
- `arc.tables.insert((record, callback)=>)`
- `arc.tables.update((record, callback)=>)`
- `arc.tables.destroy((record, callback)=>)`

`arc.html` and `arc.json` functions accepts one or more Express middleware style functions `(req, res, next)=>`.

---

## `arc.html.get`

> HTTP `GET` handler that responds with `text/html`

HTML `GET` routes look like this:

```javascript
var arc = require('@architect/functions')

function handler(req, res) {
  res({
    html: '<strong>Hello world</strong>'
  })
}

exports.handler = arc.html.get(handler)
```

Things to understand:

- `arc.html.get` accepts one or more functions that follow Express style middleware signature: `(req, res, next)=>`
- `req` is a plain JavaScript `Object` with `path`, `method`, `query`, `params`, `body` keys
- `res` is a function that must be invoked with named params `html` or `location` and optionally `session` 
- `next` is an optional function to continue middleware execution 

---

## `arc.html.post`

> HTTP `POST` handler that responds with HTTP statusCode `302` and Location redirect

- HTTP `POST` routes can **only** call `res` with `location` key and value of the path to redirect to. 
- `session` can also optionally be set.

In the following example we define `validate` middleware:

```javascript
var arc = require('@smallwins/arc-prototype')
var sendEmail = require('./_send-email')

function validate(req, res, next) {
  var isValid = typeof req.body.email === 'undefined'
  if (isValid) {
    next()
  }
  else {
    res({
      session: {
        errors: ['email missing']
      },
      location: '/contact'
    })
  }
}

function handler(req, res) {
  sendEmail({
    email: req.body.email
  }, 
  function _email(err) {
    res({
      location: `/contact?success=${err? 'yep' : 'ruhroh'}`
    })
  })
}

exports.handler = arc.html.post(validate, handler)
```

## Sessions

By default, all routes are session enabled. If you wish to disable sessions remove `SESSION_TABLE_NAME` env variable from the deployment config in the AWS Console.

## arc.json.get
## arc.json.post

## arc.events.subscribe

> Subscribe functions to events

Subscribes a function to an event.

```javascript
var arc = require('@architect/functions')

function handler(payload, callback) {

}

exports.handler = arc.events.subscribe(handler)
```

## arc.events.publish

> Publish events from any other function

## arc.tables.insert
## arc.tables.update
## arc.tables.destroy
























## Examples

```javascript
var arc = require('@architect/functions')

function index(req, res) {

}

exports.handler = arc.html.get(index)
```
