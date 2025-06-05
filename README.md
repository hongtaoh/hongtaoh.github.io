# Hongtao Hao's Personal Website

This is [Hongtao Hao](https://hongtaoh.com/)'s personal website. It is based on the theme of [hugo-ht](https://github.com/hongtaoh/hugo-ht).

This repository is licensed under MIT. 

## Update hugo-ht

### Push 

```sh
cd themes/hugo-ht

git status
git add .
git commit -m "Update theme: your message"
git push origin master  

cd ../../

git add themes/hugo-ht
git commit -m "Update submodule pointer to latest theme commit"
git push origin main  
```

### Pull 

```sh
cd themes/hugo-ht
git pull origin master
cd ../..
```

