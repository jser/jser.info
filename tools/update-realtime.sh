#!/bin/bash
# https://github.com/jser/realtime.jser.info を更新する
declare currentDir=$(cd $(dirname $0);pwd)

# http://rcmdnk.github.io/blog/2013/12/08/computer-bash/
tmpDir=$(mktemp -d 2>/dev/null||mktemp -d -t tmp)

# items.jsonを作成する
node ${currentDir}/converter/all_in_one_JSON.js

lastCommit=$(git log --oneline | head -n 1)
#
git clone https://github.com/jser/realtime.jser.info.git "${tmpDir}/realtime.jser.info"
mv ${currentDir}/converter/items.json "${tmpDir}/realtime.jser.info/_data/"

cd "${tmpDir}/realtime.jser.info"
# build
npm install
npm run build:posts
# git update
git add .
git commit -m "${lastCommit}"
if [ -z "${GH_TOKEN}" ]; then
    git push --force --quiet "https://github.com/jser/realtime.jser.info.git" gh-pages:gh-pages > /dev/null
else
    git push --force --quiet "https://${GH_TOKEN}@github.com/jser/realtime.jser.info.git" gh-pages:gh-pages > /dev/null
fi
# pop
cd -
