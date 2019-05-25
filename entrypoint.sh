#!/bin/sh

#API Doc
npm run apidocs

# Run Migrations
npm run sqlz:migrate
exec "$@"
