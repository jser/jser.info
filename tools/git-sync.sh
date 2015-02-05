#!/bin/sh

set -e
commitMessage=$1
parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
cd "${parentDir}"

isClean=$(git status --porcelain)
if [ -z "${isClean}" ]; then
  # Working directory clean
  git pull
  git push
else
  # Uncommitted changes
  git stash
  git pull
  git stash pop
  if [ -n "${commitMessage}" ]; then
    git add -A .
    git commit -m "${commitMessage}"
  fi
  git push
fi
