# @scheduled

> `@scheduled` functions are invoked at the times you specify

This `.arc` file defines some scheduled functions:

```arc
@app
testapp

@scheduled
daily-update-buddy rate(1 day)
friyay-only cron(0 15 ? * FRI *)
```
