---
title: "如何零基础免费搭建个人网站 (2024 更新版)"
date: 2024-03-22T16:07:41-05:00
author: "郝鸿涛"
slug: personal-website-tutorial
draft: false
toc: true
tags: 
---
这部分是我[之前一篇教程的更新版](/cn/2021/03/02/personal-website-tutorial/)，因为之前的弄得有点复杂，其实不用那么复杂。

首先，把之前教程「网站主题」之前的部分看完。之后的就不用看了。

下面的部分你不想看文字可以直接看[我做的一个视频](https://www.bilibili.com/video/BV1af421f7Tw/)。

{{<bilibili 1201958871>}}

## 新建 GitHub 仓库

{{<figure src="/media/netlify/deploy-1.png" title="新建 Github 仓库">}}

登陆 GitHub, 点击头像左侧的加号，再点击'new repository'。

{{<figure src="/media/cnblog/website-tutorial-new-git-repo.png" title="新建仓库设置">}}

在 Repository name 这里随便输入你喜欢的名字，比如 mywebsite。其他都不要动，点击 Create repository。

{{<figure src="/media/cnblog/website-tutorial-new-git-repo-copy-url.png" title="复制仓库 url">}}

随后，点击复制 url。

复制下面的代码，把 `YOURREPO` 换成你上面复制的 url，然后把所有代码粘贴到终端：

```bash
cd quickstart
git init
git submodule add https://github.com/hongtaoh/hugo-ht themes/hugo-ht
cp -r themes/hugo-ht/exampleSite/* .
cp -r themes/hugo-ht/archetypes . 
rm hugo.toml

git remote add origin YOURREPO
git add .
git commit -m "first commit"
git branch -M main
git push -u origin main
```

然后按回车键。

## Vercel

{{<figure src="/media/cnblog/vercel-login.png" title="Vercel 登陆">}}

登陆 [https://vercel.com/](https://vercel.com/)，点击 Continue with GitHub。

{{<figure src="/media/cnblog/vercel-add-new-project.png" title="Vercel 新建项目">}}

选择 Add New -> Project.

{{<figure src="/media/cnblog/vercel-import-git-repo.png" title="Vercel 导入项目">}}

找到 mywebsite，选择 Import，然后在随后的页面中点击 Deploy。随后你就可以看到你的网站了。

## 后续

### 新加一篇博客

先在终端 cd 到你的 Hugo 文件夹，然后在终端输入：

```bash
hugo new cn/posts/2024-04-06-a-new-post.md
```
2021-04-06 只是一个例子，你换成你当天的日期就好。a-new-post 也只是一个例子，换成你想用的名称就好。

然后接着输入

```bash
hugo server -D
```

打开终端显示的 http://localhost:1313/ ，你可以看到最新的。

如果没有什么问题，在终端输入 Ctrl+C 停止预览，但终端没必要关闭。

### 修改 config.toml

你 Hugo 文件夹根目录下的 config.toml 有几个地方需要你自己改：

- baseURL: 替换成你网站的域名，应该是类似这种 `https://myblog-hongtao.vercel.app/`。

- GithubEdit: 把所有的 USERNAME 换成你的 GitHub 用户名，把所有的 REPONAME 换成 github用户名.mywebsite (如果你新建的仓库名不是 mywebsite，那你需要用你自己起的名字)

- Params.lang 部分 `Your Nam` 和「你的名字」换成你的大名。

### 更新网站

每次修改或添加新内容后，如果更新网站呢？

更新的话是这样一个流程：

我们用 `git add` 来让 git 知道我们这次要更新什么。如果你更新的是 README.md, 那就用 `git add README`。如果你更新的是中文的博客，那就用 `git add cn/posts`。如果你修改了很多内容，不想一个一个地加，可以用 `git add .`，意思是把全部的修改、新增内容上传。

然后，要用到 `git commit -m "Message"`，比如：`git commit -m "新增一篇博客"`。

最后是上传，用 `git push`。

总结一下，每次更新网站时，首先 `cd` 到你的 Hugo 文件夹，然后运行：

```bash
git add . # 或者如 git add README.md
git commit -m "请给自己留言"
git push
```

如果你连这都觉得麻烦，可以在 Hugo 文件夹根目录下用文本编辑器新建一个文件，命名为 `deploy.sh`，把以下内容复制粘贴到里面：

```bash
git add .
msg="updating site on $(date)" 
git commit -m "$msg"
git push
```

这样，每次上传更新时，你只需要在 `cd` 了你的 Hugo 文件夹后运行

```bash
bash deploy.sh
```


