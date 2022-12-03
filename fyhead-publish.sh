#!/usr/bin/env sh

set -e
pnpm run lint:fyhead --fix
pnpm run build:fyhead
cd packages/fyhead/dist

npm publish --tag alpha --access public
