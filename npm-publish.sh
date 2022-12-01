#!/usr/bin/env sh

set -e
yarn run lint:fyvue --fix
yarn run build:fyvue
cd packages/fyvue/dist

npm publish
