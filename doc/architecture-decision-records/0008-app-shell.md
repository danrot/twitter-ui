# App Shell

## Status

Accepted

## Context

The web application should also work without an internet connection.

## Decision

Implement an cacheable app shell, which can be used even if the device is offline. Cache it using a service worker and
the `CacheStorage` API. Cache the required content during the `install` event of the service worker and return it
directly in its `fetch` event.

## Consequences

- Service worker has to be implemented
- Cache clearing must be implemented
- App will work offline to a certain extent
