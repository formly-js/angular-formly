#!/bin/bash
set -e # exit with non-zero exit code if there are failures

F_VERSION=$1

echo "shoing origin"
git remote show origin

echo "updating"
git remote update

echo "fetching"
git fetch

echo "checking out"
git checkout -b latest

echo "mergin master"
git merge origin/master -m "master merge" -X theirs

echo "adding dist"
git add dist package.json

echo "committing with $F_VERSION"
git commit -m $F_VERSION --no-verify

echo "tagging with v$F_VERSION"
git tag v${F_VERSION} -f

echo "pushing"
git push https://github.com/formly-js/angular-formly.git latest --tags -f

echo "done!"

