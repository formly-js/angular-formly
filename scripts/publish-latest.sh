#!/bin/bash
set -e # exit with non-zero exit code if there are failures

F_VERSION=$1

echo "setting global bot config"
git config --global user.email kent+formly-bot@doddsfamily.us
git config --global user.name formly-bot

echo "checking out latest"
git remote show origin
git remote update
git fetch origin
git checkout --track origin/latest

echo "setting remote"
git remote set-url origin https://formly-bot:$BOT_GH_TOKEN@github.com/formly-js/angular-formly.git >/dev/null 2>/dev/null

echo "merging master"
git merge origin/master -m "master merge" -X theirs

echo "adding dist"
git add dist package.json

echo "committing with $F_VERSION"
git commit -m v$F_VERSION --no-verify

echo "pushing"
git push origin HEAD:latest -f >/dev/null 2>/dev/null

echo "done!"

