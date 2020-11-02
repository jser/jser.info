#!/bin/bash
# https://github.com/jser/realtime.jser.info を更新する
declare currentDir=$(cd $(dirname $0);pwd)

# http://rcmdnk.github.io/blog/2013/12/08/computer-bash/
tmpDir=$(mktemp -d 2>/dev/null||mktemp -d -t tmp)

# items.jsonを作成する
node ${currentDir}/converter/all_in_one_JSON.js

lastCommit=$(git log --date=short --format="[%ad] %B" -n 1 | head -n 1)
#
git clone --depth 1 https://github.com/jser/realtime.jser.info.git "${tmpDir}/realtime.jser.info"
mv ${currentDir}/converter/items.json "${tmpDir}/realtime.jser.info/_data/"

cd "${tmpDir}/realtime.jser.info"
# build
npm install
npm run build:posts
# git update
git add .
git commit -m "${lastCommit}"
if [ -z "${GH_TOKEN}" ]; then
    git push --quiet "https://github.com/jser/realtime.jser.info.git" gh-pages:gh-pages > /dev/null 2>&1
else
    git push --quiet "https://${GH_TOKEN}@github.com/jser/realtime.jser.info.git" gh-pages:gh-pages > /dev/null 2>&1
    # https://github.com/jser/realtime.jser.info/issues/2
    curl --silent -X POST -H "Accept: application/vnd.github.mister-fantastic-preview+json" -H "Authorization: token $GH_TOKEN" https://api.github.com/repos/jser/realtime.jser.info/pages/builds
fi
# pop
cd -
