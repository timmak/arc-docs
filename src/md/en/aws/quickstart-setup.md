# Setup

You'll need to a Amazon Web Services account and credentials setup on your development machine. 

AWS Credentials are listed in:

```
~/.aws/credentials
```

If that file doesn't exist, create it, and add something like the following:

```
[work]
aws_access_key_id=xxx
aws_secret_access_key=xxx

[personal]
aws_access_key_id=xxx
aws_secret_access_key=xxx
```

All arc npm run scripts require AWS_PROFILE and AWS_REGION environment variables set. Having your personal AWS setup seperated from the work one is just a suggestion! You could call them anything really. 

```
AWS_PROFILE=batman AWS_REGION=us-east-1 arc-create
```

You can learn all about this stuff right from Amazon Configuration and Credential Files

http://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html
