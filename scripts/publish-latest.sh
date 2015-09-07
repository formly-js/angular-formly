#!/bin/bash
set -e # exit with non-zero exit code if there are failures

F_VERSION=$1

echo "setting global bot config"
git config --global user.email kent+formly-bot@doddsfamily.us
git config --global user.name formly-bot

echo "checking out temp branch"
git checkout -b travis/temp

echo "adding dist"
git add dist package.json

echo "committing with $F_VERSION"
git commit -m v$F_VERSION --no-verify

echo "setting remote"
git remote set-url origin https://formly-bot:$BOT_GH_TOKEN@github.com/formly-js/angular-formly.git >/dev/null 2>/dev/null

echo "checking out latest"
git remote set-branches --add origin latest # required because travis clones with --branch=master
git fetch origin
git checkout latest

echo "merging built files"
git merge travis/temp -m "merging built files" -X theirs

echo "pushing"
git push origin HEAD:latest -f >/dev/null 2>/dev/null

echo "done!"

