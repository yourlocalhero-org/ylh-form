# Your Local Hero - Voucher form

## Installation

Clone and install dependencies

```bash
$ git clone https://github.com/yourlocalhero-org/ylh-form.git
$ cd ylh-form
$ npm i
```

### nvm

This projects uses [nvm](https://github.com/creationix/nvm) so make sure you have that installed to use the correct version of node.
Inside the project root directory:

```bash
$ nvm use
```

### .env

Environment variables needed to run everything:

`REACT_APP_` prefix makes the env variable accessible to the webapp and built into the static build.

```
REACT_APP_API=http://localhost:4000
REACT_APP_STRIPE_KEY=your_stripe_api_key
GOOGLE_API_KEY=google_api_key
GOOGLE_SPREADSHEET=id-to-spreadsheet-to-fetch-locations-from
STRIPE_KEY=your-stripe-secret-key-on-server
```

## Development

To start the webapp and watch for changes run

```bash
$ npm start
```

If you set the .env variable `REACT_APP_API` to `http://localhost:4000` you also need to run:

```bash
$ npm run server
```

for fetching locations and communicating with the Stripe API.

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling, if you need to update any global styles in the `./src/index.css` you need to run

```bash
$ npm run build:style
```

## Deployment / Release

To create a production build of the webapp run the following command with the .env variables you want in production

```bash
$ npm run build
```

If you want to run everything via Docker you can use the included Dockerfiles to create custom images

Building webapp

```
$ docker build . -t yourdockerusername/ylh-form
$ docker push yourdockerusername/ylh-form:latest
```

Building server

```
$ docker build -f ./Dockerfile.server -t yourdockerusername/ylh-api
$ docker push yourdockerusername/ylh-api:latest
```

Using caddy as a proxy and for https with let's encrypt:

```
$ cd caddy
$ docker build . -t yourdockerusername/ylh-caddy
$ docker push yourdockerusername/ylh-caddy:latest
```

With the following docker images you can use the `docker-compose.yml` as an example for running the service on a single server. Make sure the endpoints in `./caddy/caddy.conf` matches the domain you use to point to the server and it should all work with https. Note again that the `REACT_APP_` env variables are baked into the build/image but the other env variables are needed for the api.

#

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
