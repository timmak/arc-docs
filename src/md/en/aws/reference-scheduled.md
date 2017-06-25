# @scheduled

> `@scheduled` functions are invoked at the times you specify

This `.arc` file defines some scheduled functions:

```
@app
testapp

@scheduled
daily-update-buddy rate(1 day)
weekly-thingo rate()
friyay-only cron()
```

`@json` routes:

- Must be either an HTTP `POST` or `GET`
- Can have Express style URL parameters
