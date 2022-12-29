#!/usr/bin/env sh

set -e
pnpm run lint:fyw3 --fix
pnpm run build:fyw3
cd packages/fyw3/dist

npm publish --access public
