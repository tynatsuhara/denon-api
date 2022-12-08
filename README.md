# README

A very simple REST interface for Denon receivers.

Inspired by https://github.com/bencouture/denon-rest-api

## Running from the command line

```
nvm use
npm ci
npm run start
```

## Running in Docker

The included Dockerfile will run the server on an Alpine image.

### Variables

`ADDRESS` (required) — the IP address of the receiver you want to connect to
`PORT` (optional) — the port for the webserver, 8000 by default
