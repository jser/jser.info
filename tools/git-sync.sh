#!/bin/bash

declare parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)
git -c "${parentDir}" pull
git -c "${parentDir}" add -A .
git -c "${parentDir}" commit -m "$1"
git -c "${parentDir}" push
