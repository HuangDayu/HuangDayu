#!/bin/bash
git status
git checkout --orphan blog
git add .
if [[ $1 ]]; then
	git commit -m $1
else
	time=$(date "+%Y-%m-%d %H:%M:%S")
	git commit -am "${time}"
	echo "commit message: ${time}"
fi
git branch -D gh-pages
git branch -m gh-pages
git push -f origin gh-pages
echo "reset commit end!"