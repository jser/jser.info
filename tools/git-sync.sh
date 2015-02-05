#!/bin/sh

set -e
commitMessage=$1
parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)/.git/
echo "${parentDir}"
isClean=$(git --git-dir="${parentDir}" status --porcelain)
if [ -z "${isClean}" ]; then
  # Working directory clean
  git --git-dir="${parentDir}" pull
  git --git-dir="${parentDir}" push
else
  # Uncommitted changes
  git --git-dir="${parentDir}" stash
  git --git-dir="${parentDir}" pull
  git --git-dir="${parentDir}" stash pop
  if [ -n "${commitMessage}" ]; then
    git --git-dir="${parentDir}" add -A .
    git --git-dir="${parentDir}" commit -m "${commitMessage}"
  fi
  git --git-dir="${parentDir}" push
fi
