# README

A very simple HTTP RPC wrapper for Denon receivers.

Inspired by https://github.com/bencouture/denon-rest-api

Denon command reference: https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf

## HTTP API

`/denon/get/:field`

Use for commands ending in `?` (getters) — do not pass the question mark

Example: `GET /denon/get/PW -> { response: "PWON" }`

`/denon/set/:command`

Use for commands not ending in `?` (setters)

Example: `GET /denon/set/PWON -> { response: "executed PWON" }`

## Running from the command line

```
nvm use
npm ci
npm run start
```

## Running in Docker

The included Dockerfile will run the server on an Alpine image.

### Variables

-   `ADDRESS` (required) — the IP address of the receiver you want to connect to`
-   `PORT` (optional) — the port for the webserver, 8000 by default
