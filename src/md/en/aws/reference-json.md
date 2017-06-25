# @json

> `@json` section defines HTTP routes that return `application/json` content.

This `.arc` file defines some typical JSON outes:

```
@app
testapp

@json
get /notes          
get /notes/:noteID
post /notes                # create a note
post /notes/:noteID        # update a note
post /notes/:noteID/delete # delete a note
```

`@json` routes:

- Must be either an HTTP `POST` or `GET`
- Can have Express style URL parameters

The `.arc` above generates the following REST-ish functions:

```
/
|-html
| |-get-notes/
| |-get-notes-000noteID/
| |-post-notes/
| |-post-notes-000noteID/
| '-post-notes-000noteID-delete/
|-.arc
'-package.json
```

`@json` routes look something like this:

```javascript
var arc = require('@smallwins/arc-prototype')

function handler(req, res) {
  res({
    json: {noteID:1, body:'hi'}
  })
}

exports.handler = arc.json.get(handler)
```

Things to understand:

- `arc.json.get` and `arc.json.post` accept one or more functions that follow Express style middleware ssignature: `(req, res, next)=>`
- `req` is a plain object with `path`, `method`, `query`, `params`, `body` keys
- `res` is a function that must be invoked with either `json` or `location` and optionally a `session` key
- `next` is an optional function to continue middleware execution

## Sessions

By default, all routes are session enabled. If you wish to disable sessions remove `SESSION_TABLE_NAME` env variable from the deployment config in the AWS Console.
