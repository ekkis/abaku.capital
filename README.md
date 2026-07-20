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
project's `.env` through `server.js`. To select its listening port, copy
`deploy/abaku.conf.example` to `/etc/conf.d/abaku` and set `ABAKU_PORT`. The
port must also match the port in nginx's `proxy_pass` directive. The same
configuration file can override the repository, Node executable, service
account, and log location.

Nginx does not automatically read OpenRC variables, so update the
`proxy_pass` port in `deploy/nginx.conf` (and the installed nginx config) to
the same value as `ABAKU_PORT`.
