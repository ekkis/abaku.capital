# Abaku Capital

A lightweight, static website for Abaku Capital.

## Run locally

```bash
npm start
```

Then open `http://localhost:4173`.

To use another port, add it to `.env`:

```dotenv
PORT=4174
```

## Alpine Linux / OpenRC

Create an unprivileged service account, link the included service file, and
enable it at boot:

```sh
adduser -S -D -H -s /sbin/nologin abaku
ln -s "$(pwd)/deploy/abaku" /etc/init.d/abaku
rc-update add abaku default
rc-service abaku start
```

The service follows the symlink to locate this repository and loads the
project's `.env` through `server.js`. If the repository, Node executable,
service account, or log location differs, copy `deploy/abaku.conf.example` to
`/etc/conf.d/abaku` and uncomment the relevant overrides.
