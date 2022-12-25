#!/usr/bin/env sh

set -e
pnpm run lint:fyicons --fix
pnpm run build:fyicons
cd packages/fyicons/dist

npm publish --access public
