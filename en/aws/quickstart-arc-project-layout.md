# Project layout

`architect` projects make use of `npm run` scripts to read and execute workflows against a `.arc` file. 

- `npm run create` creates Lambda code locally in `./src` for each respective `.arc` declaration and deploys them immediately to AWS
- `npm run deploy` redeploys Lambda code defined by `.arc` to `staging` and, with an additional manual step (setting `ARC_DEPLOY=production` env var), deploys to `production`
- `npm start` kicks up a local http server and in-memory db for code defined by `.arc` with `NODE_ENV` set to `testing`

Given the following `.arc` file:

```arc
@app
testapp

@events
hello

@html
get /

@json
get /posts
```

Running `npm run create` creates the following code:

```bash
/
|-- src
|   |-- events
|   |   `-- hello/
|   |-- html
|   |   `-- get-index/
|   `-- json
|       `-- get-posts/
|-- .arc
`-- package.json
```

The generated code was also immediately deployed. Subsequent edits to the local code is deployed by running `npm run deploy`.

Happy with `staging`? Ship a release to `production` by running `ARC_DEPLOY=production npm run deploy`. 

Time to celebrate! &#x26c5; 

## Next: [Reference & authoring Lambda functions](/reference)
