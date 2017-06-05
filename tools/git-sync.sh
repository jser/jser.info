#!/bin/bash
set -e
commitMessage=$1
currentDir=$(cd $(dirname $0) && pwd)
parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)

cd "${parentDir}"


if [ -z "`git config user.name`" ]; then
    echo "fatal: user.name is not set"
    exit 1
fi
if [ -z "`git config user.email`" ]; then
    echo "fatal: user.email is not set"
    exit 1
fi


isClean=$(git status --porcelain)
if [ -z "${isClean}" ]; then
  # Working directory clean
  git pull
  git push
else
  # Uncommitted changes
  git pull
  if [ -n "${commitMessage}" ]; then
    git add .
    git commit -m "${commitMessage}"
    git push
  fi
fi

if [[ -z $(git status --porcelain) ]];then
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Sync!!" -title "JSer.info"
else
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Error!!" -title "JSer.info"
fi
