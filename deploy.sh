export LC_TIME=en_US.UTF-8

# The commit message.
MESSAGE="Updating site $(date)"
SOURCE=sources

git add .
git commit -m "$MESSAGE"
git push origin sources

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
