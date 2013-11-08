#!/bin/bash
declare parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
git pull
git add -A "${parentDir}/"
git commit -m "$1"
git push