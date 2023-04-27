---
title: "如何零基础免费搭建个人网站"
date: 2021-03-02T12:03:38-05:00
author: "郝鸿涛"
slug: personal-website-tutorial
draft: false
toc: true
tags: 编程
aliases: 
  - /cn/2021/03/02/personal-webiste-tutorial/
---
{{<block class="note">}}
四、五年前我非常希望有一篇真正有用的教编程小白免费建个人网站的教程。我看到的基本上都是非常笼统的文章，没有非常细节的。我也理解，因为要写得很细，就要花很多时间，也很麻烦。我很想帮助别人建博客，就不嫌麻烦地写下了这篇教程。

如果你在这篇帖子中看到了错误，请点击本文目录上的按钮，复克 (fork) 我的个人网站之后就可以提交你的修改建议了。十分感谢！
{{<end>}}

{{<block class="info">}}
你也可以参考这篇：[手把手带你搭建个人博客(基础版)](https://cosx.org/2022/03/build-blog-step-by-step/)，作者庄亮亮。
{{<end>}}

本教程旨在手把手帮你搭建属于你的个人网站。建站工具是[Hugo](https://gohugo.io/) + [GitHub](https://github.com/)。两个都是免费的。完成后，你的个人网站网址是：`https://github用户名.github.io`。

{{<block class="info">}}
如果你参考这篇帖子顺利把个人网站建起来，欢迎把名字贴在下面！可以在评论区里说，我会加上去。

- [张晶](https://kristenjz.github.io/)
- [毛月](https://ashleygua.github.io/)
- [崔頔](https://cuidi1996.github.io/about/)

{{<end>}}

## 前期准备

如果你是彻彻底底的零基础：没有 GitHub 账号、不知道 HTML 和 CSS 为何物、没用过 Git，甚至连 Markdown 都不知道是什么，强烈建议你先把[这份教程](https://intro2code.hongtaoh.com/)的前三章认真读一下。读完后，你需要：

- 注册了 GitHub 账号

- 下载了[文本编辑器](https://intro2code.hongtaoh.com/prep.html#text-editor)

- 安装 Git
  - 苹果系统：打开 Terminal, 输入 `xcode-select --install`，这是[为了下载 Xcode Command Line Tools](https://dev.to/squademy/install-and-configure-git-on-a-fresh-new-macos-11-big-sur-in-2021-a-complete-guide-6ld)。然后在 Terminal 输入 `git --version`。更多 Git 下载办法请参考 [git 官方介绍](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)。
  - Windows 系统请参考[这里](https://intro2code.hongtaoh.com/html-basics.html#windows-%E7%B3%BB%E7%BB%9F%E5%AE%89%E8%A3%85-git)

- 掌握了 Markdown 的基础语法

以下提到「终端」，可以理解为苹果电脑上的 Terminal / 微软系统上的 Git Bash。

如果你是第一次使用 git, 你可能需要设置一些内容。在终端输入 `git config --global user.name "你的git用户名"`, 以及 `git config --global user.email "你的邮箱"`。用你的 GitHub 用户名和与 GitHub 绑定的邮箱就可以。不懂的话，请参考[这里](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)。

## 安装 Hugo

### 苹果系统 (Mac) 

如果你已经安装了 brew, 那么直接在 Terminal 中输入

```bash
brew install hugo 
```

如果你没安装 brew, 先到 [Hugo releases](https://github.com/gohugoio/hugo/releases)，找到类似 ` hugo_0.107.0_darwin-universal.tar.gz ` 的文件，点击下载，并解压。

下载完之后，打开 Terminal, 输入 `open -a Finder /usr/local/bin`，然后把 `hugo_0.81.0_macOS-64bit` 文件中的 `hugo` 拖到 `/usr/local/bin` 当中：

```
└── local
    └── bin
        └── hugo
```

完成后，在 Terminal 中输入 `hugo version`, 如果显示 `hugo v0.107.0 .....` 则证明 Hugo 安装成功。

{{<block class="info">}}
如果你的苹果电脑比较新，而且你是用上面这种拖动的方法（而不是 brew hugo) 这种方式，那么 `hugo version` 可能会显示软件不安全，无法打开。这时候，你需要做的是在 Terminal 中输入 `open -a Finder /usr/local/bin`，然后找到 Hugo，接着右键 'Open'，选择同意，之后就没事了。
{{<end>}}

### 微软系统 (Windows)

到 [Hugo releases](https://github.com/gohugoio/hugo/releases)，找到类似 `hugo_0.81.0_Windows-64bit.zip` 的文件，点击下载，并解压。解压后的文件夹中你能看到一个 `hugo.exe` 文件。

找一个磁盘，D、E、F 都可以，创建一个新文件夹，命名为 `Hugo`。然后，将其打开，在里面创建两个子文件夹，分别命名为 `bin` 和 `sites`。随后，将 `hugo.exe` 拖到 `bin` 里面。

之后，你需要将 Hugo 添加到系统路径：打开系统高级设置、环境变量，点击用户名中的 Path, 点击编辑，点击右上角的「新建」，随后复制 `bin` 文件夹地址，粘贴，回车，最后点击确定。

{{<block class="note">}}
以上将 Hugo 添加到系统路径的方法来自[osc_d8t0zzig](https://my.oschina.net/u/4269975)的[这篇文章](https://my.oschina.net/u/4269975/blog/4661512)，在此表示感谢。
{{<end>}}

完成后，打开你所选用的[终端](https://intro2code.netlify.app/prep.html#terminal)，输入：

```bash
hugo version
```

如果显示出 Hugo 版本号，则表示安装成功。

## 新建一个 Hugo 网站

Hugo 博客就是一个文件夹。首先你要确定把这个文件夹放在哪里。我会以放在桌面为例。

如果你用的是 Windows 系统，同时按下 `Win` + `E`，选中右侧导航栏中的「桌面」，右键，选择「属性」，然后选择上方的位置栏，将此路径复制下来。

{{<block class="note">}}
以上找到桌面路径的方法参考[win10桌面文件夹位置在哪？](http://www.xitonghe.com/jiaocheng/Windows10-10408.html)，在此表示感谢。
{{<end>}}

现在打开终端。

如果你用的是 Mac, 在 Terminal 中输入：

```bash
cd Desktop
```

如果你用的是 Windows，打开你所选用的[终端](https://intro2code.hongtaoh.com/prep.html#terminal)，比如 git bash, 输入：

{{<block class="info">}}
如果这一步碰到问题，请参考 [Ashleygua 的建议](https://github.com/hongtaoh/hongtaoh.github.io/issues/10#issuecomment-1326088874)。
{{<end>}}

```bash
cd 你刚才复制的路径
```

这部分以下的内容都是在终端中进行，不管是 Windows 还是 Mac，输入的内容一样。

```bash
hugo new site quickstart 
```

终端请暂时不要关闭。

## 网站主题

想看所有的主题，请移步 [Hugo Themes](https://themes.gohugo.io/)。下面以我在 [Hugo Xmin](https://github.com/yihui/hugo-xmin) 和 [Lithium](https://themes.gohugo.io/hugo-lithium-theme/) 两个主题基础上设计的 [Hugo-ht](https://github.com/hongtaoh/hugo-ht) 为例。不喜欢这个主题不要紧，你先学会怎么建基础的网站，之后再去折腾[其他主题](https://themes.gohugo.io/)会容易很多。

现在回到终端，输入

{{<block class="caution">}}
以下代码会将你目前 Hugo 网站中的 `Content` 文件夹和 `config.toml` 替换为 `Hugo-ht` 自带的内容。如果你当前 Hugo 网站中的 Content 文件夹及`config.toml`尚未备份，请千万不要运行以下代码！！！
{{<end>}}

```bash
cd quickstart/themes 
git clone https://github.com/hongtaoh/hugo-ht
mkdir hugo-ht-new # create a new folder called hugo-ht-new
cp -r hugo-ht/* hugo-ht-new # copy everything in hugo-ht to hugo-ht-new
rm -rf hugo-ht # delete the folder of hugo-ht
mv hugo-ht-new hugo-ht # change folder name
cd ..
cp -r themes/hugo-ht/exampleSite/* . # copy everything in the exampleSite folder to quickstart
cp -r themes/hugo-ht/archetypes . # replace the archetypes folder
```

记得回车。然后运行

```bash
hugo server -D # 这里的 D 是 draft 的意思
```

打开终端显示的 [http://localhost:1313/](http://localhost:1313/)，不出意外的话你能看到和 [https://hugo-ht.hongtaoh.com/](https://hugo-ht.hongtaoh.com/) 一模一样的个人网站。

如果没有什么问题，在终端输入 Ctrl+C 停止预览，但终端没必要关闭。

请先确保你已经把预览关闭，之后再往下继续。

## 新建 GitHub 仓库

登陆 GitHub, 点击头像左侧的加号，再点击'new repository'。

{{<figure src="/media/netlify/deploy-1.png" title="新建 Github 仓库">}}

在 Repository name 这里输入 `你的 GitHub 用户名.github.io`。Description 这里你写啥都可以。其他都不要动，点击 Create repository。

{{<figure src="/media/cnblog/username.github.io.png" title="新建仓库设置">}}

{{<block class="info">}}

这一点很重要！！

下面比较麻烦，如果你做得不成功，可以把上面的重做一下，然后用 Netlify 而不是 GitHub Pages。用 Netlify 的教程看[这里](/cn/2020/01/04/hugo-netlify-deploy/)。
{{<end>}}

## 密钥设置

### 创建 .github/workflows/gh-pages.yml

回到终端。确保你现在在 quickstart 文件夹的根目录。请在终端中输入 `pwd`，如果所出现的结果中 `quickstart` 后面还有东西，那就不是根目录。

如果你还在根目录，请输入

```bash
mkdir .github
mkdir .github/workflows
touch .github/workflows/gh-pages.yml
```
输入完之后回车。

### 设置 SSH Deploy Key

把鼠标放在目前的终端页面。然后：

- 苹果电脑：Command+N (同时按 Command 键和 N)

- 微软系统：鼠标放在 git bash 最上端（白色标题位置），右键，选择 New

{{<figure src="/media/cnblog/windows_git_bash_new.jpg" title="Windows 系统 git bash 新窗口如何打开">}}

你会看到一个新的终端页面。

苹果电脑输入：

```bash
cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
open -a Finder ~/.ssh 
```
回车。 

微软系统：

首先试着输入

{{<block class="warning">}}
以下的 Admin 请替换为你自己的电脑用户名！
{{<end>}}

```bash
start /C/Users/Admin/.ssh
```

如果显示说找不到这个文件，则接着在 Git bash 中输入：

```bash
cd /C/Users/Admin
start ~/.ssh
mkdir ~/.ssh/ && cd ~/.ssh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
start ~/.ssh
```

回车。此时，你会看到两个新增的文件：gh-pages 和 gh-pages.pub

紧接着，在目前的 terminal (也就是你刚才新建的这个) 页面

苹果电脑输入：`pbcopy < ~/.ssh/gh-pages.pub`

微软系统输入：`clip < ~/.ssh/gh-pages.pub`

现在，请回到 GitHub 你新建的仓库。把屏幕拉宽，点击 Settings -> 点击 Deploy keys -> 点击 Add deploy key。把鼠标放在 key 下面的文本框，苹果电脑按 Command+V，微软系统按 Control+V。在 Allow write access 那里打勾，在 Title 随便写点东西，比如“个人网站部署”，然后点击 Add key。

现在，回到刚才新建的终端。

苹果电脑输入：`pbcopy < ~/.ssh/gh-pages`

微软系统输入：`clip < ~/.ssh/gh-pages`

请再回到 GitHub 你新建的仓库。把屏幕拉宽，点击 Settings -> 点击 Secrets -> Actions ->New repository secret。把鼠标放在 Value 下面的文本框，苹果电脑按 Command+V，微软系统按 Control+V。在 Name 那里填 ACTIONS_DEPLOY_KEY，然后点击 Add secret。

现在可以把这个终端窗口关闭了。

## 设置 Personal Token

首先，打开[这个链接](https://github.com/settings/tokens)。进去后，点击 Generate new token 按钮, 选 Generate new token (Classic)， 在随后出现的页面中，选择你觉得合适的有效期限（默认为 30 天），在 Select scopes 这里选中 workflow，在 Note 那里随便写点东西，然后将页面往下拖，点击 Generate token。

生成之后，点击那一串字母后边的复制板，将 token 复制下来。

{{<figure src="/media/cnblog/personal_token.png" title="复制 personal token">}}

现在请回到 GitHub 你新建的仓库。把屏幕拉宽，点击 Settings -> Security -> Secrets -> Actions -> New repository secret。把鼠标放在 Value 下面的文本框，苹果电脑按 Command+V，微软系统按 Control+V。在 Name 那里填 PERSONAL_TOKEN，然后点击 Add secret。

{{<block class="info">}}
如果你之后更新 Personal Token 的话，一定记得在 Keychina Access 更新 “github.com, Internet password” 这里的密码，详情看[这里](https://stackoverflow.com/a/67765064)。 
{{<end>}}

## 添加 workflow

回到 quickstart 终端。（如果你把之前的终端关了，也不要紧，cd 到 quickstart 就好）。

苹果系统输入：

```bash
open .github/workflows/gh-pages.yml -a TextEdit 
```

微软系统输入：

```bash
notepad .github/workflows/gh-pages.yml
```

然后复制以下内容，粘贴到刚才弹出的 gh-pages.yml:

```YAML
name: github pages

on:
  push:
    branches:
      - master  # Set a branch name to trigger deployment

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod
          token: ${{ secrets.PERSONAL_TOKEN }}

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.79.1' # 请修改你的 hugo version

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./public
```

然后保存（Mac: Cmd+S; Windows: Control+S)。

终端不要关闭。

## 上传到 GitHub

回到刚才的终端，输入：

{{<block class="warning">}}
下面的代码中，请不要忘记把 USERNAME 换成你自己的 GitHub 用户名!!!!!!!!
{{<end>}}

```bash
git init
git add .
git commit -m "first commit."
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin master
```
回车。

{{<block class="note">}}
使用 Windows 系统的同学，如果你是第一次使用 Git，按完回车后，因为最后一步是往 GitHub 上传内容，你会被要求登陆 (Sign in) GitHub, 点击 Sign in with your browser 就可以，然后你会被要求 Authorize Git Credential Manager，点击绿色的 Authorize Git Credential Manager，在随后的页面中输入你的 GitHub 密码 (password)。随后，可能还会出现 OpenSSH 的页面，让你输入 GitHub 用户名 (Username for `https://github.com`)，按要求输入然后点击 OK 就好。Show input 可点可不点，点开的话你就可以看到你输的内容。
{{<end>}}

现在请再回到 GitHub 你新建的仓库。把屏幕拉宽，点击 Settings，一直往下拖，到你看到 Pages 为止。在 Source 那里，Branch 选择 gh-pages, 右侧的框框选择 root，然后点 Save。等一两分钟，当出现 

>Your site is published at https://USERNAME.github.io/ 

点开那个链接，你的网站应该就出现了。

## 后续

### 修改 config.toml

你 Hugo 文件夹根目录下的 config.toml 有几个地方需要你自己改：

- baseURL: 替换成 https://USERNAME.github.io/

- GithubEdit: 把所有的 USERNAME 换成你的 GitHub 用户名，把所有的 REPONAME 换成 github用户名.github.io

- Params.lang 部分 `Your Nam` 和「你的名字」换成你的大名。

### 更新网站

每次修改或添加新内容后，如果更新网站呢？

更新的话是这样一个流程：

我们用 `git add` 来让 git 知道我们这次要更新什么。如果你更新的是 README.md, 那就用 `git add README`。如果你更新的是中文的博客，那就用 `git add cn/posts`。如果你修改了很多内容，不想一个一个地加，可以用 `git add .`，意思是把全部的修改、新增内容上传。

然后，要用到 `git commit -m "Message"`，比如：`git commit -m "新增一篇博客"`。

最后是上传，用 `git push origin master`。

总结一下，每次更新网站时，首先 `cd` 到你的 Hugo 文件夹，然后运行：

```bash
git add . # 或者如 git add README.md
git commit -m "请给自己留言"
git push origin master
```

如果你连这都觉得麻烦，可以在 Hugo 文件夹根目录下用文本编辑器新建一个文件，命名为 `deploy.sh`，把以下内容复制粘贴到里面：

```bash
git add .
msg="updating site on $(date)" 
git commit -m "$msg"
git push origin master
```

这样，每次上传更新时，你只需要在 `cd` 了你的 Hugo 文件夹后运行

```bash
bash deploy.sh
```

### 只用一种语言

如果你不喜欢现在的双语博客，只想留下中文，请参照以下步骤：

1. 移动文件夹

打开终端，首先 cd 你的 Hugo 文件夹，然后

```bash
cp -r content/cn/about content 
#如果你只要英文，则用 cp -r content/en/about content。
cp -r content/cn/posts content
```

2. 修改 layouts/partials/nav.html

将 `<ul class = "nav-links">` 和 `</ul>` 之间的部分改为：

```html
{{ $currentPage := . }}
{{ $section := replaceRE "^/([^/]+)/.*" "$1" .Permalink }}
{{ range (default .Site.Menus.main (index .Site.Menus $section)) }}
<li><a href="{{ .URL | relURL }}">{{ .Name }}</a></li>
{{ end }}
```

以上代码参考 [李代江](https://daijiang.name/) 的[博客设置](https://github.com/rbind/daijiang/blob/master/layouts/partials/nav.html)，在此表示感谢。

3. 修改 config.toml

打开 `config.toml`, 把 `[[menu.en]]` 和 `[[menu.cn]]` 两部分删除，然后加上：

```toml
[[menu.main]]
    name = "主页"
    url = "/"
    weight = 1
[[menu.main]]
    name = "关于"
    url = "/about/"
    weight = 2
[[menu.main]]
    name = "博客"
    url = "/posts/" 
    weight = 3
```

需要注意的是， /posts/ 这个名字如果你要改的话，比如改成 /blog/，那么 `config.toml` 中 [params] 下的 `blogDirName = "posts"` 也要跟着改成 `blogDirName = "blog"`。

或者你可以参考[谢益辉](https://yihui.org/) 个人网站上的[菜单设置](https://github.com/rbind/yihui/blob/master/config.yaml) 来重新制作双语菜单。上面对于 `nav.html` 的修改让你可以同时有 `[[menu.main]]`、`[[menu.en]]` 和`[[menu.cn]]`。

另外，在 `params` 部分，把

```toml
# singleLang = true
defaultLang = "en"
```

改成

```toml
singleLang = true
defaultLang = "cn" #如果你只用英文，则用 "en"
```

### 中文为主，英文为辅

现在的设定是英文为主，如果你想把中文设置成主页，英文为辅，那么可以参考下面的步骤：

#### 1. 修改 config.toml

比如：

```
[[menu.cn]]
    name = "主页"
    url = "/"
    weight = 1
[[menu.cn]]
    name = "关于"
    url = "/cn/about/"
    weight = 2
[[menu.cn]]
    name = "English"
    url = "/en/about"
    weight = 3
[[menu.en]]
    name = "About"
    url = "/en/about"
    weight = 1
[[menu.en]]
    name = "中文"
    url = "/"
    weight = 2
```

然后把预设语言改成中文：

```
defaultLang = "cn"
```

2. 修改 `themes/hugo-ht/layouts/partials/nav.html`

把

```
{{ range .Site.Menus.en }}
```

改为

```
{{ range .Site.Menus.cn }}
```

### 新添加内容

#### 新加一篇博客

先在终端 cd 到你的 Hugo 文件夹，然后在终端输入：

```bash
hugo new cn/posts/2021-04-06-a-new-post.md
```

2021-04-06 只是一个例子，你换成你当天的日期就好。a-new-post 也只是一个例子，换成你想用的名称就好。

#### 新加一个像 [关于](https://hugo-ht.hongtaoh.com/cn/about/) 这样的单独页面

苹果电脑：先在终端 cd 到你的 Hugo 文件夹，然后在终端输入

```bash
mkdir content/cn/hobby # hobby 可以换成别的名字
cp content/cn/about/_index.md content/cn/hobby # hobby 可以换成别的名字
open content/cn/hobby/_index.md -a TextEdit 
```

更改这个 `_index.md` 的 Title 和内容即可。


微软系统：

打开 content 文件夹，进入 cn 或者 en 文件夹 （看你是想加一个中文页面，还是英文页面）。新建一个文件夹，起名随意，比如 hobby，然后把 about 文件夹里的 `_index.md` 复制粘贴到 hobby 文件夹里。打开 hobby文件夹里的 `_index.md`，更改 Title 和内容即可。如果不想要开头的目录，将 `toc: true` 改成 `toc: false`。

不管是苹果还是微软，新加了 hobby 文件夹之后，要想让它出现在网站上，你需要把它加在 config.toml，比如

```toml
[[menu.main]]
    name = "兴趣"
    url = "/hobby/"
    weight = 4
```

#### 新添加文件

你可以直接把文件，比如 `myPDF.pdf` 放到 `static` 文件夹，这样的话，这个文件的地址就是 `https://USERNAME.github.io/myPDF.pdf`。当你的文件比较多时，建议你在 `static` 文件夹下新建一个子文件夹，比如 `files`，然后把文件统一放到 `files` 里，这样的话，地址就是 `https://USERNAME.github.io/files/myPDF.pdf`

### 添加评论功能

如果你想添加评论功能，最简单的办法是打开 `themes` -> `hugo-ht` -> `layouts` -> `partials` -> `footer.html`。把

```
{{ if not .IsSection }}
<script src="https://utteranc.es/client.js"
        repo="hongtaoh/hongtaoh.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
{{ end }}
```

恢复正常，然后把 `hongtaoh/hongtaoh.github.io` 替换成你自己的信息，其它不用动。

然后，根据 [uterances 的教程](https://utteranc.es/)，打开[这里](https://github.com/apps/utterances), 点击 Configure，然后选择你的个人网站仓库即可。

### 自定义域名
{{<block class="tip">}}
如果你对 USERNAME.github.io 这个免费域名很满意，就没必要自己再去买域名。
{{<end>}}
  
这部分其实很容易。我的域名是在 [Namecheap](https://www.namecheap.com/) 买的。其他地方在设置上应该差不多。这里我就以 Namecheap 举例。

其实，Namecheap 自己已经给出了 [解决方法](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages)。

按照上面的方法，你在买完域名后，到 Manage 页面里的 Advanced DNS。首先把网站自动加的那两个 Record 删除，在 Namecheap, 网站自动加了 CNAME Record 和 URL Redirect Record, 把这两个先删除。随后，点击 "Add New Record"，新加四个 A Record, 这四个 Record 的 Host 填 @ , value 分别填下面四个：

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

其中，185.199.108.153 这个 A Record 的 TTL 选 30 min，其他填 Automatic

然后，加一个 CNAME Record, Host 填 www ，value 填 `<username>.github.io`，比如我的填 hhao1992.github.io, 随后 TTL 选 30 min。设置如下：

{{<figure src="https://namecheap.simplekb.com//SiteContents/2-7C22D5236A4543EB827F3BD8936E153E/media/2018-06-20_1804.png" title="图片来源：Namecheap">}}

这些设置好之后，我们需要让 Github 知道我们想把 `https://<username>.github.io` 这个网址转到 我们自己买的域名。怎么告诉呢？

Github 的 [官方指南](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site) 给出了方法。到 `<username>/<username>.github.io` 这个仓库，找到 Settings, 然后在 GitHub Pages 中的 Custom domain 这里填入我们自己的域名即可。

{{<figure src="https://docs.github.com/assets/images/help/pages/save-custom-subdomain.png" title="图片来源：GitHub">}}

比如，你买的域名是 example.com，在 Custome domain 这里输入 example.com 就行。

之后，你需要在 github/workflows/gh-pages.yml 最后那里加上 `cname: example.com`:

```YAML
- name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./public
          cname: example.com
```