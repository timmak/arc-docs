# Arc Project Layout

Arc projects make use of npm run scripts to read and execute workflows against a `.arc` file. 

- `arc-create` creates lambda code locally in `./src` for each respective `.arc` declaration
- `arc-deploy` deploys lambda code defined in `.arc` to `staging` and, with an additional manual step, `production`

Quickly kick up a project:

```
mkdir testapp
cd testapp
npm init --yes
npm i @smallwins/arc-create @smallwins/arc-deploy --save
touch .arc
```

Add the following to `package.json`:

```javascript
{
  "scripts": {
    "create": "AWS_PROFILE=urprofile AWS_REGION=us-west-1 arc-create",
    "deploy": "AWS_PROFILE=urprofile AWS_REGION=us-west-1 arc-deploy"
  }
}
```

Given the following `.arc` file:

```
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

```
/
|-src
| |-events
| | '-hello/
| |-html
| | '-get-index/
| '-json
|   '-get-posts/
|-.arc
'-package.json
```

The generated code was also immediately deployed. Subsequent edits to the local code is deployed by running `npm run deploy`. 

Happy with `staging`? Ship a release to `production` by running `ARC_DEPLOY=production npm run deploy`. 

Time to celebrate! Or from here you can read up on how lambda functions are authored in the reference. If you find reference docs wordy just skip to the code examples.
