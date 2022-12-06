#!/usr/bin/env sh

set -e
pnpm run lint:fycore --fix
pnpm run build:fycore
cd packages/fycore/dist

npm publish --access public
