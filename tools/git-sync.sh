#!/bin/bash
set -x
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

# Add files to stage for diffing
git add .
# git has uncommit content
if [ -n "$(git status --porcelain --ignore-submodules -unormal)" ]; then 
  # Uncommitted changes
  git pull
  git add .
  if [ -n "${commitMessage}" ]; then
    git commit -m "${commitMessage}"
  fi
fi

if [ -n "$(git status --porcelain --ignore-submodules -unormal)" ]; then
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Error!!" -title "JSer.info"
else
  git push
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Sync!!" -title "JSer.info"
fi
