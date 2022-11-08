#!/usr/bin/env sh

set -e

pnpm run build
cd dist/

npm publish --tag alpha
