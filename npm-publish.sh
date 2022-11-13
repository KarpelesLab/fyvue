#!/usr/bin/env sh

set -e
yarn run lint:check --fix
yarn run build
cd dist/

npm publish --tag alpha
