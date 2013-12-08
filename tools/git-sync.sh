#!/bin/bash
declare parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
cd $(cd $(dirname $(cd $(dirname $0);pwd));pwd)
git pull origin gh-pages
git add -A .
git commit -m "$1"
git push

