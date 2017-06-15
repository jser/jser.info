#!/bin/bash
set -x
currentDir=$(cd $(dirname $0) && pwd)
parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
# pre git-sync.sh
# 先にgit pullしてマージしてから開始する
cd "${parentDir}"

if [ -z "`git config user.name`" ]; then
    echo "fatal: user.name is not set"
    exit 1
fi
if [ -z "`git config user.email`" ]; then
    echo "fatal: user.email is not set"
    exit 1
fi

# git has uncommit content
git diff --exit-code --quiet
if [ $? -ne 0 ]; then
  echo "work treeにコミットされてないものがあります"
  exit 1
fi
# main
git pull
