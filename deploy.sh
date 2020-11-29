export LC_TIME=en_US.UTF-8

# The commit message.
MESSAGE="Updating site $(date)"
SOURCE=sources

msg() {
    printf "\033[1;32m :: %s\n\033[0m" "$1"
}

git add .
git commit -m "$MESSAGE"
git push origin "$SOURCE"

#!/bin/sh

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

echo "Pushing to github"
git push origin gh-pages
