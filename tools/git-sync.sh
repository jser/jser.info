#!/bin/bash

git pull
git add -A .
git commit -m "$1"
git push