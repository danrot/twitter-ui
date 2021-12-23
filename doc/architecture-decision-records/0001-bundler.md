# Bundler

## Status

Accepted

## Context

As a starting point a folder structure for the project has to be decided. Since bundlers might have an impact on that,
the decision about the bundler will be made first.

## Decision

This project will use parcel, because it is very easy to setup. I am also curious to see if such a zero configuration
build tools works well for bigger projects as well.

## Consequences

- No need to put a lot of work into the build tooling, because a lot is already preconfigured.
- Questionable if the preconfiguration is good enough, especially when the project grows.
- Might be necessary to switch to another bundler later, but that should not be a big deal, because most of the code
should be reusable. The only thing that might not work is some of the build tool configuration.
