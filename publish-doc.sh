#!/usr/bin/env sh

set -e

pnpm run doc
cd doc/.vuepress/dist/

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:KarpelesLab/fyvue master:gh-pages
