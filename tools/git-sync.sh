#!/bin/sh

set -e

parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)/.git/
git --git-dir="${parentDir}" pull
git --git-dir="${parentDir}" add -A .
git --git-dir="${parentDir}" commit -m "$1"
git --git-dir="${parentDir}" push
