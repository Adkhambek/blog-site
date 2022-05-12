# Blog site

## Install

```
$ git clone https://github.com/Adkhambek/blog-site.git
$ cd blog-site
$ npm install
```

## Setup

1. Create .env file that include:

```
* PORT = 3000
* PG_PORT =
* PG_USERNAME =
* PG_PASSWORD =
* PG_DATABASE =
* PG_CONNECTION_STRING =
* AUTH_USERNAME =
* AUTH_PASSWORD =
* SECRET_KEY =
* IMAGE_MAX_SIZE = 5
* POST_LIMIT = 6
```

2. Rewrite src/configs/siteInfo.js
3. Make favicon in [this site](https://favicon.io/favicon-converter/)
4. Change logo and profile images

## Simple build for production

```
> npm start
```
