#!/bin/bash
set -e # exit with non-zero exit code if there are failures

F_VERSION=$1

echo "setting global bot config"
git config --global user.email kent+formly-bot@doddsfamily.us
git config --global user.name formly-bot

echo "setting remote"
git remote set-url origin https://formly-bot:$BOT_GH_TOKEN@github.com/formly-js/angular-formly.git

echo "merging master"
git merge origin/master -m "master merge" -X theirs

echo "adding dist"
git add dist package.json

echo "committing with $F_VERSION"
git commit -m $F_VERSION --no-verify

echo "tagging with v$F_VERSION"
git tag v${F_VERSION} -f

echo "pushing"
git push origin latest --tags -f

echo "done!"

