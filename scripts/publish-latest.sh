#!/bin/bash
set -e # exit with non-zero exit code if there are failurs

$F_VERSION=$1
echo "fetching"
git fetch

echo "checking out"
git checkout -b latest origin/latest

echo "adding dist"
git add dist

echo "committing with $F_VERSION"
git commit -m $F_VERSION --no-verify

echo "tagging with v$F_VERSION"
git tag v${F_VERSION} -f

echo "pushing"
git push origin latest --tags -f

echo "done!"

