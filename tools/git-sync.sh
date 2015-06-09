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
    git add .
    git commit -m "${commitMessage}"
  fi
  git push
fi

if [[ -n $(git status --porcelain) ]];then
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Error!!" -title "JSer.info"
else
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Sync!!" -title "JSer.info"
fi
