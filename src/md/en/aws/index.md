# arc

> provision and deploy cloud architecture as text

Currently supporting Amazon Web Services:

- Lambda
- API Gateway
- DynamoDB
- SNS

Everything you do with Architect starts with a `.arc` file:

```bash
# this is an .arc file
@app

@html
get /
get /hellos
post /hello

@css
style.css

@js
index.js
```

`arc-create` generates this cloud function code:

```
/
|-src
| |-html
| | |-get-index/
| | |-get-hellos/
| | '-post-hello/
| |-css
| | '-style-css/
| '-js
|   '-index-js/
|-.arc
'-package.json

```

`arc-deploy` ships this code to :cloud: supporting both `staging` and `production` environments.

There's lots more to it! From here:

- [Check out the introduction](/intro)
- [Read the quickstart](/quickstart)
- [Copy/paste examples](/examples)
