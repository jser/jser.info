#!/bin/sh
declare parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
git fetch && git merge origin/gh-pages
git add -A "$parentDir"
git commit -m "$1"
git push

