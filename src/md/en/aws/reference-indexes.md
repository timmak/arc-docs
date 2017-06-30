# @indexes

> `@indexes` define DynamoDB table indexes

The following `.arc` file defines a DynamoDB table with two Global Secondary Indexes:

```arc
@app
testapp

@tables
accounts
  accountID *String

@indexes
accounts
  email *String

accounts
  created *String
```

The syntax for defining `@tables` and `@indexes` is identical.

- Partition key, defined by a `*`, is required
- Sort key, defined by `**`, is optional
- Currently only `String` an `Number` keys are implemented 
