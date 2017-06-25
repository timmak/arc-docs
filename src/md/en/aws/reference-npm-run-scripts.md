# npm run scripts

> The `npm run` scripts execute workflows against an `.arc` file.

## arc-create

Create code and infra from `.arc` in the current directory:

```
npm run create
``` 

## arc-deploy

Deploy all code in `./src` to `staging`:

```
npm run deploy
```

Deploy all code in `./src` to `production`:

```
ARC_DEPLOY=production npm run deploy
```

Deploy a single (example) function to `staging`:
  
```
npm run deploy src/html/get-index
```

Deploy a single (example!) function to `production`:

```
ARC_DEPLOY=production npm run deploy src/html/get-index
```
