# Shared Deps

Cloud functions tend to share logic across an `@app`. The best way to do this is by creating a module you can share between them. 

Given the following `.arc` file:

```arc
@app
testapp

@html
get /
get /about
get /contact
post /contact
```

You would have the following file system layout:

```bash
/
|-src
| '-html
|   |-get-index/
|   |-get-about/
|   |-get-contact/
|   '-post-contact/
|-.arc
'-package.json
```

Sweet! However, each of these endpoints needs to share a layout. Lets create a module for that.

## Create a Scoped Module

```bash
mkdir src/layout
touch src/layout/index.js
touch src/layout/package.json
```

Add the following to `src/layout/index.js`:

```javascript
// index.js
module.exports = function layout(body) {
  return `<html><body><h1>layout</h1>${body}</body></html>`
}
```

You likely want to keep this module private but still use `npm`. You can learn about setting up an npm organization for scoped modules here.

```json
{
  "name":"@mycompany/layout"
}
```

## Link for Local Dev

Now you need to expose this module for local development. Normally you'd do this with `npm link` but this could get tedious with eveyrthing in `./src`! We can use `@archtiect/modules` to save time.

```javascript
npm run link src/layout
```

## Install and Deploy
