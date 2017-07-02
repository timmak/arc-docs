# npm run scripts

> The `npm run` scripts execute workflows against an `.arc` file.

### setup

```bash
npm i @architect/deploy @architect/create @architect/sandbox @architect/modules --save-dev
```

Add the following to `scripts` in `package.json`:

```javascript
{
  "create": "AWS_PROFILE=xxx AWS_REGION=us-west-1 arc-create",
  "deploy": "AWS_PROFILE=xxx AWS_REGION=us-west-1 arc-deploy",
  "sandbox": "arc-sandbox",
  "install": "arc-modules-install",
  "link": "arc-modules-link",
  "uninstall": "arc-modules-uninstall",
  "update": "arc-modules-update",
}
```

> Don't forget to setup `AWS_PROFILE` and `AWS_REGION` env variables

## arc-create

Create code and infra from `.arc` in the current directory:

```bash
npm run create
``` 

## arc-deploy

Deploy all code in `./src` to `staging`:

```bash
npm run deploy
```

Deploy all code in `./src` to `production`:

```bash
ARC_DEPLOY=production npm run deploy
```

Deploy a single (example) function to `staging`:

```bash
npm run deploy src/html/get-index
```

Deploy a single (example!) function to `production`:

```bash
ARC_DEPLOY=production npm run deploy src/html/get-index
```

## arc-sandbox

Start a local webserver and in memory DyanmoDB instance:

```bash
npm start
```

## arc-modules

Install a module to all `.arc` defined functions in `./src`:

```bash
npm run install lodash
```

Link a local module to all `.arc` defined functions in `./src`:

```bash
npm run link src/md
```

Uninstall a module from all `.arc` defined functions in `./src`:

```bash
npm run uninstall lodash
```

Update a module in all `.arc` defined functions in `./src`:

```bash
npm run update lodash
```
