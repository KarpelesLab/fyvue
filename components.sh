#!/usr/bin/env sh

set -e
pnpm run lint:components --fix
pnpm run build:components
cd packages/components/dist

npm publish --access public
