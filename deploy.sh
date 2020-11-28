#!/usr/bin/env bash
# This script allows you to easily and quickly generate and deploy your website
# using Hugo to your personal GitHub Pages repository. This script requires a
# certain configuration, run the `setup.sh` script to configure this. See
# https://hjdskes.github.io/blog/deploying-hugo-on-personal-github-pages/index.html
# for more information.
# Set the English locale for the `date` command.
export LC_TIME=en_US.UTF-8
USERNAME=hongtaoh # 请换成自己的 Github 用户名
SOURCE=sources # 如果你不是用的 sources 这个名字，请改成你用的
# The commit message.
MESSAGE="Rebuilding site $(date)"
msg() {
    printf "\033[1;32m :: %s\n\033[0m" "$1"
}
msg "Pulling down the \`master\` branch into \`public\` to help avoid merge conflicts"
git subtree pull --prefix=public \
    https://github.com/$USERNAME/$USERNAME.github.io.git master --squash -m "Merge origin master"
msg "Building the website"
rm -rf public
hugo
cd public
echo "hongtaoh.com" > CNAME
cd ..
msg "Pushing the updated \`public\` folder to the \`$SOURCE\` branch"
git add .
git commit -m "$MESSAGE"
git push origin "$SOURCE"
msg "Pushing the updated \`public\` folder to the \`master\` branch"
git subtree push --prefix=public \
    https://github.com/$USERNAME/$USERNAME.github.io.git master