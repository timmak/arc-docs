# Install

From an installation perspective arc is a set of npm run scripts and an otherwise vanilla node project. 

Before you start make sure you are setup with AWS Credentials.

Then open up a terminal and create a project folder:

```bash
mkdir mytestapp
cd mytestapp
npm init --yes
npm install @smallwins/arc-create @smallwins/arc-deploy --save
touch .arc
```

Add the following to `package.json`:

```javascript
// don't forget to setup your AWS_PROFILE
{
  "create": "AWS_PROFILE=xxx AWS_REGION=us-west-1 arc-create",
  "deploy": "AWS_PROFILE=xxx AWS_REGION=us-west-1 arc-deploy"
}
```

And the following for the `.arc` file:

```bash
@app
testapp

@html
get /

@json
get /api
```

Finally run `npm run create` and check out the deployed app. You have successfully *"installed"* arc!
