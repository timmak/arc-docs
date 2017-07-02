# @html

> `@html` section defines HTTP routes that return `text/html` content.

This `.arc` file defines some typical HTML routes:

```arc
@app
testapp

@html
get /
get /pages
get /pages/:dateID
get /contact
post /contact
```

`@html` routes:

- Must have an `/` route defined
- Must be either an HTTP `POST` or `GET`
- Can have Express style URL parameters

The `.arc` above generates the following functions:

```bash
/
|-html
| |-get-index/
| |-get-pages/
| |-get-pages-000dateID/
| |-get-contact/
| '-post-contact/
|-.arc
'-package.json
```

The route `/pages/:dateID` corosponding handler deliberately looks a bit weird with the triple `000` so you can quickly identify URL params from URL parts. The deployment lambdas targets follow suite:

- `testapp-staging-get-pages-000dateID`
- `testapp-production-get-pages-000dateID`

## HTTP GET

HTTP `GET` routes look something like this:

```javascript
var arc = require('@smallwins/arc-prototype')

function handler(req, res) {
  res({
    html: '<strong>Hello world</strong>'
  })
}

exports.handler = arc.html.get(handler)
```

Things to understand about HTTP `GET` handlers:

- `arc.html.get` accepts one or more functions that follow Express style middleware ssignature: `(req, res, next)=>`
- `req` is a plain object with `path`, `method`, `query`, `params`, `body` keys
- `res` is a function that must be invoked with either `html` or `location` and optionally a `session` key
- `next` is an optional function to continue middleware execution

## HTTP POST

- HTTP `POST` routes can **only** call `res` with `location` key and value of the path to redirect to. 
- `session` can optionally be set.

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
