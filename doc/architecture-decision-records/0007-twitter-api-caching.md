# Twitter API caching

## Status

Accepted

## Context

Some information loaded from the twitter API does not need to be loaded all the time. E.g. the lists made by a user
change very seldom, therefore it makes sense to cache them almost infinitely. This does not affect all requests (e.g.
loading tweet themselves should not be cached).

This is also important since the twitter API has some rate limits, so requiring to loading data more often than
necessary can cause a malfunctioning application.

## Decision

The API calls are stored using the [CacheStorage API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage),
which is done by a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker), at least for the
calls that can be cached.

For each URL that should be cached in one or the other way a separate event listener in the service worker will be
registered, which quits execution with an early return if the URL does not match.

## Consequences

- Each URL that can be cached has to be separately implemented in the service worker
- Service workers have to be supported by the browser for caching to work
- If service workers are not supported the rate limit of the Twitter API might be reached quite soon
