# Folder Structure

## Status

Accepted

## Context

As a starting point a folder structure for the project has to be decided. The decision for parcel as a bundler has
already been made. Parcel does not enforce a folder structure, the only thing is that a HTML file has been given as a
starting point, from which parcel gets all the dependencies. This allows to choose the folder structure freely.

## Decision

The folder structure looks as follows:

`dist`
: Contains all the compiled bundles for the project (default value of parcel)

`doc`
: Contains all the documentation for this project.

`doc/architecture-decision-records`
: Contains all the ADRs, which will explain all architectural decisions made in this project.

`src`
: Contains all the source code for this project.

## Consequences

- Not clear yet where tests should be located (separate `tests` directory or right next to the source file)
- Put not too much thought into this, can be modified as implementation progresses.
