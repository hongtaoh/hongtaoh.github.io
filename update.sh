rm -rf public
hugo
git add .
msg="updating $(date)"
git commit -m "$msg"
git push origin sources