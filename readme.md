# <kbd>:cloud_with_lightning: @architect/docs</kbd>

> Documentation for `architect`

### Setup

Install dependencies and make sure the tests pass with:

```bash
npm it
```

And now you'll want to link the shared module in `src/md` with:

```bash
npm run link src/md
```

> Depending on how you setup Node you may need `sudo` privledges 

### Make Changes

If that all worked out you can start a local preview sandbox server at:

```bash
npm start
```

Any edits in `src/md` will restart the preview server with your changes.

### Publish Changes

```bash
npm run iterate
```

---

Currently only English and AWS are implemented! Translations and ports most welcome!
