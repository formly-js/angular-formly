#!/bin/bash
set -e # exit with non-zero exit code if there are failures

F_VERSION=$1
git remote set-url github https://formly-bot:${BOT_GH_TOKEN}@github.com/formly-js/angular-formly.git >/dev/null 2>/dev/null

echo "merging master"
git merge github/master -m "master merge" -X theirs >/dev/null 2>/dev/null

echo "adding dist"
git add dist package.json

echo "committing with $F_VERSION"
git commit -m $F_VERSION --no-verify

echo "tagging with v$F_VERSION"
git tag v${F_VERSION} -f

echo "pushing"
git push github latest --tags -f >/dev/null 2>/dev/null

echo "done!"

