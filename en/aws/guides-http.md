# HTTP

> An `.arc` abstracts API Gateway configuration and provisioning; `@architect/functions` are powerful tools for working with HTTP

An `architect`app has HTTP `GET` and `POST` Lambda function handlers for the follow `Content-Type`'s:

- `text/html`
- `application/json`

> Coming soon: `text/css` and `text/javscript`

## Request

Every HTTP handler receives a plain javascript object `req` as a first parameter.

```javascript
var arc = require('@architect/functions')

function index(req, res) {
  res({
    html: `<b>hello world</b>` 
  })
}

exports.handler = arc.html.get(index)
```

`req` has the following keys:

- `body` - any `application/x-www-form-urlencoded` form variables as a plain `Object`
- `path` - absolute path of the request
- `method` - either `GET` or `POST`
- `params` - any url param defined
- `query` - any query params defined
- `headers` - a plain `Object` of request headers 
- `session` - a plain `Object` representing the current session

`req` also has two hidden helper methods:

- `req._url` - transforms url paths `/` into `/staging` or `/production` appropriately on API Gateway
- `req._verify` - verify a `csrf` token

Continue reading to learn more about `req._url` and `req._verify` below.

## Response

`res` is a function that accepts named parameters:

- **required** one of `json` or `html` or `location` depending on the ContentType of the Lambda hander you are implementing
- optionally `session` to assign to the current session
- optionally `status` of `403`, `404` or `500` (`200` is default and `302` happens when `location` is set)

This is an example handler `200` response of `Content-Type: text/html`:

```javascript
var arc = require('@architect/functions')

function index(req, res) {
  res({
    html: `<b>hello world</b>` 
  })
}

exports.handler = arc.html.get(index)
```

This shows a `302` from a `POST` writing to the `session`:

```javascript
var arc = require('@architect/functions')

function login(req, res) {
  var isLoggedIn = req.body.email === 'admin' && req.body.password === 'admin'
  res({
    session: {isLoggedIn},
    location: req._url('/')
  })
}

exports.handler = arc.html.post(login)
```

This is a `302` response clearing the session data:

```javascript
var arc = require('@architect/functions')

function logout(req, res) {
  res({
    session: {},
    location: req._url('/')
  })
}

exports.handler = arc.html.post(logout)
```

This is an example `500` response:

```javascript
var arc = require('@architect/functions')

// something went wrong!
function fail(req, res) {
  res({
    status: 500,
    html: 'internal "server" error'
  })
}

exports.handler = arc.html.get(fail)
```

## Sessions

All HTTP endpoints are session enabled by default. 

- Session tables are automatically generated by `npm run create` with the name `${appname}-staging-sessions` and `${appname}-production-sessions` respectively 
- Every request is tagged to a session in DynamoDB via a signed cookie `_idx`
- Session data expires after a week of inactivity

Note:

- HTTP endpoints are slower with sessions enabled becuase its marshalling data to and from DynamoDB
- To disable session support remove `SESSION_TABLE_NAME` environment variable from the Lambda configuration in the AWS console (session becomes a pass thru)
- If disabled you can also delete any corresponding session tables from DynamoDB

## Middleware Pattern

All `.arc` defined HTTP endpoints can register multiple express-style middleware functions. 

In this example we register `log`, `ping` and `index` to run in series. Each function signals to continue to the next function in the series  by calling `next()`. Execution is halted at any time in the chain by calling `res`.

```javascript
var arc = require('@architect/functions')

function log(req, res, next) {
  console.log(JSON.stringify(req, null, 2))
  next()
}

function ping(req, res, next) {
  // does something with SNS here maybe
  next()
}

function index(req, res) {
  res({
    html: 'rendered index'
  })
}

exports.handler = arc.html.get(log, ping, index)
```

## URLs

API Gateway generates long urls that are hard to read. It extends the url base path with either `staging` or `production` which means a link intended to point at `/` should actually point at `/staging/` or `/production/`. This pain point is eased if you setup a [custom domain name with DNS](/guides/custom-dns). `architect` also bundles a hidden helper function `req._url` for resolving url paths that haven't yet been configured with DNS. This is helpful for early prototyping.

Here is an example index page, protected by authentication middlewhare, that demonstrates `req._url` usage.

```javascript
var arc = require('@architect/functions')

function auth(req, res, next) {
  if (req.session.isLoggedIn) {
    next()
  }
  else {
    res({
      location: req._url('/login')
    }) 
  }
}

function index(req, res) {
  res({
    html: `<a href=${req._url('/logout')}>logout</a>` 
  })
}

exports.handler = arc.html.get(auth, index)
```

## Example App

This example `.arc` brings together all the concepts for defining HTTP Lambdas:

```arc
@app
example-login-flow

@html
get /
get /logout
get /protected
post /login
```

`npm run create` generates the following directory structure:

```bash
/
|- src
|  `- html
|     |- get-index/
|     |- get-logout/
|     |- get-protected/
|     `- post-login/
|- .arc
`- package.json
```

On this foundation we will implement a proof of concept login flow.

First we render a form for `/login` if `req.session.isLoggedIn` is `false`:

```javascript
var arc = require('@architect/functions')

function index(req, res) {
  var header = `<h1>Login Demo</h1>`
  var protec = `<a href=${req._url('/protected')}>protected</a>`
  var logout = `<a href=${req._url('/logout')}>logout</a>`
  var nav = `<p>${protec} | ${logout}</p>`

  var form = `
  <form action=${req._url('/login')} method=post>
    <label for=email>Email</label>
    <input type=text name=email>
    <label for=password>Password</label>
    <input type=password name=password>
    <button>Login</button>
  </form>
  `

  res({
    html: `${header} ${req.session.isLoggedIn? nav : form}`
  })
}

exports.handler = arc.html.get(index)
```

That form performs an HTTP `POST` to `/login` where we look for mock values in `req.body.email` and `req.body.password`:

```javascript
var arc = require('@architect/functions')

function route(req, res) {
  var isLoggedIn = req.body.email === 'admin' && req.body.password === 'admin'
  res({
    session: {isLoggedIn},
    location: req._url(`/`)
  })
}

exports.handler = arc.html.post(route)
```

If successful `req.session.isLoggedIn` will be `true` and `nav` gets rendered. `/protected` utilizes middleware to ensure only logged in users can see it.

```javascript
var arc = require('@architect/functions')

function protect(req, res, next) {
  if (req.session.isLoggedIn) {
    next()
  }
  else {
    res({
      location: req._url(`/`)
    })
  }
}

function attack(req, res) {
  var msg = 'oh hai you must be logged in to see me!'
  var logout = `<a href=${req._url('/logout')}>logout</a>`
  res({
    html: `${msg} ${logout}`
  })
}

exports.handler = arc.html.get(protect, attack)
```

Logging out just resets the `session` and redirects back to `/`.

```javascript
var arc = require('@architect/functions')

function route(req, res) {
  res({
    session: {},
    location: req._url(`/`)
  })
}

exports.handler = arc.html.get(route)
```

And that's it! You can find the entire [example repo here](https://github.com/arc-repos/arc-example-login-flow).
