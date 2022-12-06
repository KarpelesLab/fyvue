#!/usr/bin/env sh

set -e
pnpm run lint:fyui --fix
pnpm run build:fyui
cd packages/fyui/dist

npm publish --access public
