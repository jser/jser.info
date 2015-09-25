#!/bin/sh

commitMessage=$1
currentDir=$(cd $(dirname $0) && pwd)
parentDir=$(cd $(dirname $(cd $(dirname $0);pwd));pwd)

# http://d.hatena.ne.jp/akuwano/20120411/1334113556
# Redirect stdout ( > ) into a named pipe ( >() ) running "tee"
exec > >(tee ${currentDir}/logfile.log)

# Without this, only stdout would be captured - i.e. your
# log file would not contain any error messages.
# SEE answer by Adam Spiers, which keeps STDERR a seperate stream -
# I did not want to steal from him by simply adding his answer to mine.
exec 2>&1

cd "${parentDir}"


isClean=$(git status --porcelain)
if [ -z "${isClean}" ]; then
  # Working directory clean
  git pull
  git push
else
  # Uncommitted changes
  git stash
  git pull
  git stash pop
  if [ -n "${commitMessage}" ]; then
    git add .
    git commit -m "${commitMessage}"
    git push
  fi
fi

if [[ -z $(git status --porcelain) ]];then
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Error!!" -title "JSer.info"
else
  type /usr/local/bin/terminal-notifier >/dev/null 2>&1 && /usr/local/bin/terminal-notifier -message "Sync!!" -title "JSer.info"
fi