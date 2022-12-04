#!/usr/bin/env sh

set -e
pnpm run lint:fyvue --fix
pnpm run build:fyvue
cd packages/fyvue/dist

npm publish
