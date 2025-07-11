#!/bin/bash
cd `dirname $0`
DATE=`date`
yarn ncu -u
yarn install
git add --all -v || exit 1
git commit -m "${DATE}" || exit 1
git push || exit 1
