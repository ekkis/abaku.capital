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

Link the included service file and enable it at boot. The service runs as
`www-data:www-data` by default and writes its output to
`/var/log/nginx/abaku.log`:

```sh
ln -s "$(pwd)/deploy/openrc" /etc/init.d/abaku
rc-update add abaku default
rc-service abaku start
```

The service follows the symlink to locate this repository and loads the
project's `.env` through `server.js`. If the repository, Node executable,
service account, or log location differs, copy `deploy/abaku.conf.example` to
`/etc/conf.d/abaku` and uncomment the relevant overrides.
