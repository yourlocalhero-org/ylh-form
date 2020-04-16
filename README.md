# Your Local Hero - Voucher form

A custom checkout form used for https://yourlocalhero.org/ to simplify the hosting for running the service or starting up a similiar one yourself. The goal for the technical parts of the service is to be as simple as possible with no database needed, but with some flexibility in terms of for example picking a payment provider should you need to replace Stripe.

To have everything running live the services used are:

- [Squarespace](https://www.squarespace.com/) - For the landing page which links to this form for different cities
- [Stripe](https://stripe.com/) - For payments and receipts.
- [Google spreadsheet](http://docs.google.com/spreadsheets) - To act as a "database" and store locations as well as vouchers for the restaurants to view.
- [Zapier](https://zapier.com/home) - To automate update of spreadsheets when stripe payments are completed.

And this custom form that ties it together hosted on [Digital Ocean](http://digitalocean.com/).

## Installation

Clone and install dependencies

```bash
$ git clone https://github.com/yourlocalhero-org/ylh-form.git
$ cd ylh-form
$ npm i
```

### nvm

This projects uses [nvm](https://github.com/creationix/nvm) either install and use that or match the node version found in `.nvmrc` file to ensure all the packages work.

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
