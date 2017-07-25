# &#x1f329; architect
## Provision and deploy cloud architecture as text

Event driven programming with cloud functions is tricky to setup and maintain. `architect` offers a simple plaintext manifest and `npm` script based workflows for creating, deploying, working offline and more.

Currently, architect` supports the following Amazon Web Services:

- [Lambda](https://aws.amazon.com/lambda/)
- [API Gateway](https://aws.amazon.com/api-gateway/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [SNS](https://aws.amazon.com/sns/)

Everything you do with `architect` starts with a `.arc` file:

```arc
# this is an .arc file
@app
testapp

@html
get /
get /hellos
post /hello
```

Running `npm run create` generates cloud function code locally:

```bash
/
|-- src
|   `-- html
|       |-- get-index/
|       |-- get-hellos/
|       `-- post-hello/
|-- .arc
`-- package.json

```

And `npm run deploy` ships this code to the cloud. <span class=cloud>&#x1f329;</span>

## Infra primitives currently supported

- HTTP route handler functions for `application/json`, `text/html`, `text/css` and `text/javascript`
- Subscribe functions to events (and publish events from any other function)
- Scheduled functions 
- Database tables, indexes, and trigger functions

## Workflows currently supported

- **Create infra** from an `.arc` manifest, enabling deletion and re-creation of infrastructure trivial (i.e. change availability zones in minutes)
- **Deploy in seconds** with first class support for `staging` and `production` with a proper `NODE_ENV` environment variable 
- **Work locally** while completely offline with a speedy in-memory database
 
## Next steps

- [Read the introduction](/intro)
- [Follow the quickstart](/quickstart)
- [Read the reference](/reference)
