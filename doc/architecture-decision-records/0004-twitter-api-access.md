# Twitter API Access

## Status

Accepted

## Context

The main task of this project is to display tweets, so these tweets have to be loaded using the
[Twitter API](https://developer.twitter.com/en/docs/twitter-api). Accessing the API directly is not possible, because
CORS applies within the browser. This cannot be deactivated without installing an
[some extension](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) in the browser. So there is no other
way than setting up a server on our own.

## Decision

The `fastify` package is used to create a server. The `fastify-http-proxy` plugin will pass all requests starting with
`/api` to the Twitter API adding the authorization header (the token required to access the twitter API is taken from a
`.env` file resp. an environment variable). The `fastify-static` plugin will make the root of the webserver load the
application built using parcel. Then the web application can send requests to the server hosting it, which will pass
the request to the Twitter API.

## Consequences

- There needs to be an own web server running, which does nothing else than passing the request to the Twitter API
