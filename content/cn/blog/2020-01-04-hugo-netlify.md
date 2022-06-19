---
title: 如何将 Hugo 部署到 Netlify
author: 郝鸿涛
date: '2020-01-04'
slug: hugo-netlify-deploy
toc: true
tags: 编程
aliases:
    - /cn/2020-01-04-hugo-netlify-deployment/
    - /cn/2020/01/04/hugo-netlify-deployment/
---
{{<block class="tip">}}
2021-04-06: [Netlify](https://www.netlify.com/) 貌似已经被墙了。请参考我最新的这篇博客：[如何零基础免费搭建个人网站](/cn/2021/03/02/personal-webiste-tutorial/)
{{<end>}}

首先，什么是部署？为什么要部署？

其实，准确的说，我们要做的是先把我们在本地的 hugo 文件夹托管到 github，这是第一步。第二步将 hugo 文件夹中的 public 文件夹与 netlify 连接起来，这样 public 文件夹里的内容就变成了我们想要的网站。

我们部署网站的目的就是让本地的内容可以送达互联网，这样别人才能看到我们创作的内容。

[hugo的官方文档](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/) 讲到了如何部署到 netlify，但是第一步，即，先将本地的hugo文件托管到 github，它没有讲。Allison Hill 写的 [hugo建站教程](https://alison.rbind.io/post/2017-06-12-up-and-running-with-blogdown/) 也提到了部署到netlify的方法，但是她漏了一项，即，写入 netlify.toml 这个文件。谢益辉大神写的 [*blogdown: Creating Websites with R Markdown*](https://bookdown.org/yihui/blogdown/) 这本书对我帮助非常大，但是很奇怪的是，书中涉及到 [netlify部署](https://bookdown.org/yihui/blogdown/netlify.html) 只是非常简单地介绍了一下原理，对于具体流程则没有涉及。此外，[Marvin's Blog](https://zh4ui.net/post/2017-12-02-deploy-hugo-on-netlify/) 以及 [Sulinehk's blog](https://www.sulinehk.com/post/deploying-hugo-website-to-netlify/) 也都专门讲过 hugo 的 netlify 部署，但是有些内容有些过时，比如自定义域名时的DNS设置。

这篇帖子是针对像我一样的计算机小白的，我会详细把每一步解释清楚。以下主要以苹果电脑为例，使用windows系统的同学可以作为参考，但我不保证过程正确。

## 一、创建本地 hugo 文件夹
这个文件夹是你一开始通过hugo new site xxx 建立的那个文件夹，比如如果你用的hugo new site quickstart，那么quickstart文件夹就是我们要托管到github的本地文件夹，当然，不一定非得用quickstart这个名字，你想用mysite, myblog, hugo-website, my-website...都可以。如果你还不知道怎么开始用hugo，可以参考olOwOlo的那篇 [《hugo从入门到会用》](https://blog.olowolo.com/post/hugo-quick-start/)。这里我们就用quickstart为例。

## 二、Github 新建仓库
首先登陆github，如果你还没有注册github账号，请参考[这篇帖子](https://blog.csdn.net/qq_41782425/article/details/85179912)。登陆成功之后，如下图所示，点击右上角的那个加号，然后点击'new repository'。这里的repository是仓库的意思。

{{<figure src="/media/netlify/deploy-1.png" title="新建 Github 仓库">}}

点击之后，在 'repository name' 这一栏，填入任何你一个你喜欢的名字作为你的仓库名称。注意，github仓库的名称不一定非要和本地仓库名称一样，这里我用hugo-website，你可以用你喜欢的。在description中你可以对这个仓库进行描述，这样你自己以及别人可以一眼知道这个仓库是做什么的，我这里填入 "My personal website deployed on Netlify"，当然，你用中文也可以。然后，public or private 这里，我们选择默认的 public。在 "initialize this repository with a README" 这儿，我们不要加。我试过一开始加上，但是后面的步骤会很麻烦，老是出错，所以这里**切记不要加**

README.md 这个文件主要是放在你的仓库里，这样别人来到你的仓库的时候，可以通过这个文件，更具体地知道这个仓库是做什么的，以及别人该怎么使用这个仓库。这个我们可以之后再加。

然后别的不要动，最后点击  'create repository'。如下图所示：

{{<figure src="/media/netlify/deploy-2.png" title="新建仓库设置">}}

点击之后，会出现如下界面。点击右侧那个复制按钮，这样这个仓库的地址我们就复制下来了。如下图：

{{<figure src="/media/netlify/deploy-copypath.png" title="复制仓库地址">}}

好了，现在 github 部分我们就暂时操作完了，接下来来我们要做的是将本地的 quickstart 文件夹与 github 仓库连接起来。

## 三、Terminal 及 Git 知识预备
对 terminal 以及 git 的操作很熟悉的童鞋，这一部分的步骤可以忽略。

------

苹果电脑请打开 terminal 。如果你还不会打开 terminal: 在电脑右上角的搜索🔍处，输入 terminal，回车，terminal（终端）就会出现。使用 Windows 的童鞋请打开 Git Bash 。

苹果系统：打开 terminal 之后，首先 cd 到本地 hugo 文件夹，如果你之前命名 quickstart，那么就是 cd 到 quickstart 文件夹。

- 如果你还不知道 cd 是什么：cd 是英文 change directory 的缩写，意思是让系统把目光注意到我们现在要操作的文件夹。毕竟，我们有那么多文件夹，电脑不知道我们现在要操作哪个。cd 后面的是这个文件夹的路径。

- 如果你还不知道怎么获得某个文件夹的路径：右击这个文件夹，选择“显示简介”，然后把“位置”这一行复制下来，比如我的是：/Users/Tal/Desktop 。这个路径是不全的，我们还需要在后面接着写上：/quickstart，也就是说，完整的路径是：/Users/Tal/Desktop/quickstart 

知道了路径后，在 terminal 中输入：

```bash
cd /Users/Tal/Desktop/quickstart #注意cd后面的路径换成你自己的
```

如果你使用的是 Windows 系统：请自己查一下怎么操作，我不是很清楚。
 
接下来的操作我们需要用到 Git。

- 如果你还没有下载 git，直接在 terminal 输入 `git --version`，然后系统会带着你安装 git，具体请参考 [这篇](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)。

- 如果上面的方法不行（应该不会），你可以用 homebrew 的方式来安装，即在 terminal 中输入 `brew install git`。因为需要用到 homebrew，你需要提前安装，操作方法见这里：[install homebrew](https://brew.sh/)。

git 安装完之后，可能需要一些设置，在终端输入`git config --global user.name "你的git用户名"`，以及`git config --global user.email "你的邮箱"`，具体请参考：[初次运行 Git 前的配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)。需要注意的是，这个用户名和邮箱，不一定非要和 github 的用户名一样，具体请参考 [github的解释](https://help.github.com/cn/github/using-git/setting-your-username-in-git)。

------

## 四、将本地 quickstart 文件夹与 github repository 进行关联
这一步我参考的是 [不谇](https://codepool.top/) 的 [hugo 教程系列（十一）](https://codepool.top/posts/hugo-tutorial-11/)。在这里真诚地表示感谢。不谇老师的 hugo 教程是我见过的中文世界中最好、最负责、最全面的、对我帮助最大的。

我们现在需要做的第一步是：将 quickstart 初始化为本地仓库。

上面的 `cd /Users/Tal/Desktop/quickstart` 在终端输入后，点击回车，然后紧接着输入：`git init` ， 这里的 init 是英文 initiate 的缩写。如果正确的话，terminal 应该显示 `Initialized empty Git repository in /Users/Tal/Desktop/quickstart/.git/` 。 

然后我们输入以下：
```bash
rm -rf public #删除public 文件夹
hugo #重新建站
# 首先告诉 git ， 我要加东西了哦～
git add . # 是的，你没看错，add 后先空格，然后有个英文句号，这个 . 是代码的一部分
git commit -m "my first commit." # 然后告诉 git, 我们的东西已经加好了
# 这行的 commit ，你可以理解成“变动”，后面的 -m 是 message 的缩写，是在告诉 git , 我们这次变动的一些信息，这条信息之后会在 github 上显示，你以及别人看到后就会知道你做了什么变动。

# 然后，最关键的一步，将本地 quickstart 文件夹与远程 github 仓库建立联系：
git remote add origin https://github.com/hhao1992/hugo-website.git
# 这里，origin 后面，就是图三中复制的那个链接，你要换成你自己的

# 最后，将本地仓库上传到 github
git push -u origin master

```

这里稍微提一句，origin 后面的部分就是仓库的网址。Github 仓库网址有两种形式：https 以及 ssh 。如果用 ssh 形式的网址的话需要设置 public ssh keys ， 比较麻烦。因此Github官方网站也[推荐](https://help.github.com/cn/github/using-git/which-remote-url-should-i-use)使用 https 的仓库网址。因此，当你在别的网上教程中见到用的是 ssh 形式的网址，你直接换成 https 形式的就好，Git 都可以识别。上面我建的仓库的 ssh 形式的网址是：`git@github.com:hhao1992/hugo-website.git`。

现在你刷新一下你的 Github 页面，如果不出意外的话，这个仓库里应该有东西了。很好，最重要的任务已经完成了，现在需要做的就是将 Github 仓库与 Netlify 进行关联。

## 五、将 Github 仓库部署于Netlify

{{<figure src="https://alison.rbind.io/blog/2017-06-up-running-with-blogdown/blogdown-signpost-5.png" title="图片作者：Allison Hill ">}}

[Netlify](https://www.netlify.com/) 提供免费的静态网站托管服务，它可以帮我们把 Github 仓库里的文件以网页形式发布到互联网。

如果你还没有注册 Netlify 账号，那么请先打开上面的网址，进行注册 (Sing up)。已经注册的胖友点击 登陆 (Sing in)。刚开始注册的胖友，可能会被带到如下网页：

{{<figure src="https://d33wubrfki0l68.cloudfront.net/0e9f9cefe968382536d4e4baa66e49945ad2694c/e20ef/images/hosting-and-deployment/hosting-on-netlify/netlify-signup.jpg" title="图片来源：Hugo 官网">}}

因为我们用的是 Github, 所以这里选择 Github, 然后会被带到授权页面，如下：

{{<figure src="https://d33wubrfki0l68.cloudfront.net/66276caf9e5deee836ba60fab50f78f6074e3ca0/0cc43/images/hosting-and-deployment/hosting-on-netlify/netlify-first-authorize.jpg" title="图片来源：Hugo 官网">}}

请点击："Authorize application （授权此应用）"


进入之后，点击 'New Site from Git'，如下图：
{{<figure src="/media/netlify/netlify-new-site-from-git.png" title="Netlify 新建基于 Git 的网站">}}

如果你是第一次登陆，随后可能会进入如下授权页面：
{{<figure src="https://d33wubrfki0l68.cloudfront.net/dd85bd12e419baeb7ef56e45c43235d2004ce341/77531/images/hosting-and-deployment/hosting-on-netlify/netlify-authorize-added-permissions.jpg" title="图片来源：Hugo 官网" >}}

**注**：以上四张图片中有三张来自 Hugo 官网上 [*Host on Netlify*](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/) 这篇文章，因为我之前已经在 Netlify 注册过了，所以我进入后不会出现那三个页面，只能引用这篇文章的图片。在此表示感谢。

随后，在 "Create a new site: Continuous Deployment" 这里选择 Github 。

{{<figure src="/media/netlify/netlify-create-a-new-site-github.png" title="部署来源选择 Github">}}


之后，点击我们刚才建的仓库，因为我的仓库名称是 hugo-website , 因此点击它：

{{<figure src="/media/netlify/netlify-select-github-repo.png" title="选择相应的 Github 仓库">}}

在随后的页面里，在 Basic build settings 这里，将 build command 设置成 hugo_你的 hugo version 。比如，我的 hugo version 是 0.62.0 , 那么我就填：hugo_0.62.0 。如何看自己的 hugo version 呢？ 很简单，在 terminal 终端输入: `hugo version`，然后看输出的结果就好。

{{<figure src="/media/netlify/netlify-deploy-settings.png" title="页面生成参数设置">}}

### 稍等片刻...
到了这一步，在我们点击 “部署网站” 之前，还有一个非常关键的步骤，那便是在我们的本地 hugo 文件，以及与之相关联的 Github 远程 hugo 文件中，添加 netlify.toml 这个文件。这一步在 Hugo 官方的 [*Host on Netlify*](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/) 也讲到了。

加入这个文件，是为了让 Netlify 在部署的时候，知道该怎么处理 Hugo 所生成的网页。

简而言之，就是在你的本地 hugo 文件夹的根目录下新建一个 toml 文件，包含下面的代码内容（你需要根据自己的 hugo version 作出响应修改）：

```toml
[build]
publish = "public"
command = "hugo --gc --minify"

[context.production.environment]
HUGO_VERSION = "0.62.2" #请根据自己的 Hugo 版本进行修改
HUGO_ENV = "production"
HUGO_ENABLEGITINFO = "true"

[context.split1]
command = "hugo --gc --minify --enableGitInfo"

[context.split1.environment]
HUGO_VERSION = "0.62.2" #请根据自己的 Hugo 版本进行修改
HUGO_ENV = "production"

[context.deploy-preview]
command = "hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"

[context.deploy-preview.environment]
HUGO_VERSION = "0.62.2" #请根据自己的 Hugo 版本进行修改

[context.branch-deploy]
command = "hugo --gc --minify -b $DEPLOY_PRIME_URL"

[context.branch-deploy.environment]
HUGO_VERSION = "0.62.2" #请根据自己的 Hugo 版本进行修改

[context.next.environment]
HUGO_ENABLEGITINFO = "true"

```
现在，本地 hugo 文件以及有了这个 netlify.toml 文件，我们需要做的是让 Github Repo 更新，也拥有这个文件。你当然可以直接在 Github 上，把这个文件拖进去，但是，这种方式太野蛮，太粗暴，会被程序员所不齿的。更加文雅的方式是在 Terminal 进行如下（瞎）操作：

```bash
git add .
git commit -m "上传 netlify.toml"
git push

```
（注：以上代码参考 [Codepool 的 hugo 教程（十一）](https://codepool.top/posts/hugo-tutorial-11/)）

好，不出意外的话，你刷新一下 Github ，应该就能看到新上传的文件了。

### 继续！

然后点击 "Deploy site"。不出意外的话，等一分钟左右，部署就成功了：

{{<figure src="/media/netlify/netlify-deploy-success.png" title="点击部署网站，然后等待一分钟">}}

点开链接，就能看到自己的网站了。

{{<figure src="/media/netlify/netlify-website.png" title="大功告成">}}

但现在有个问题是，网站的名字太长了，而且很丑：`https://flamboyant-pike-432825.netlify.com/` 有没有办法改一改呢？

好，回到刚才的页面，点击 ”Domain settings", 在随后出现的页面中，点击你目前的域名右侧的那三个点，然后选择 "Edit site name":

{{<figure src="/media/netlify/netlify-edit-site-name.png" title="域名设置">}}


然后输入你想要的名字即可，比如我输入我的名字，新的网址会在下面出现：

{{<figure src="/media/netlify/netlify-hongtao-site.jpg" title="自定义 Netlify 域名">}}

好了，网站已经建好了，下面我们讲一下如何进行日常网站更新，因为我们不可能一辈子都不写一篇新文章（虽然有可能...) 。

## 六、网站如何日常更新？（被粉丝催更了咋办？）

本地的 Hugo 文件好更新，但是 Netlify 是根据 Github 仓库里的内容来建网站的，所以，这里的更新，更重要的是更新 Github 仓库。

其实，我们刚才不就更新了吗？我们把本地新建的 netlify.toml 文件上传到 Github ，已经是在更新了。Hugo 的日常更新，和这个步骤类似，唯一的不同是，我们在更新之前，需要把本地 hugo 文件的 public 文件夹 删除，然后让 hugo 刷新网页内容。为什么要把 public 文件先删除呢？因为 public 文件并不会实时更新。[Mike Dane](https://www.mikedane.com/about/) 的[这篇文章](https://www.mikedane.com/static-site-generators/hugo/building-hosting/) 也讲到，比如你在 content 文件夹下删除几篇文章后，然后运行 `hugo` , 那么很可能这几篇被删除的文章依旧在 public 文件夹下。因此，最保险的办法是在运行 `hugo` 命令之前，用 `rm -rf public` 删除 public 文件夹。

因此，参考 [Codepool](https://codepool.top/posts/hugo-tutorial-11/)，更新网站所需代码（在 Terminal 输入）如下：

```bash
rm -rf public #删除public 文件夹
hugo #重新建站
git add .  #告诉 git 加东西
msg="rebuilding site $(date)" #获得此次更新的日期
git commit -m "$msg" #让 Git 在 Github 仓库写入这次更新的日期
git push origin master #上传
```

{{< block class="warning" >}}
用这几行代码的前提是你不会直接在 GitHub 上加或者减东西东西。也就是说，GitHub 上的 remote 要和你电脑上相对应的本地文件夹内容完全一致。
{{< end >}}

每次输入些代码挺烦的，有没有更简单的办法？当然有，谁让我们是（伪）程序员呢。

很简单，打开一个文本编辑器，比如 [Typora](https://www.typora.io/)，[Sublime Text](https://www.cnblogs.com/wind128/p/4409422.html) 等。新建一个名为 deploy.sh 的文档，把上面的代码复制进去就好。

每次更新的时候，只需要在 Terminal 中输入以下代码即可：

```bash
bash deploy.sh
```

顺便提一下 Codepool 的[那篇文章](https://codepool.top/posts/hugo-tutorial-11/)中令我困惑的两点：

1. 他提到了在运行 `hugo` 之前要先用 `rm -rf public` 删除 public 文件夹。但是，在随后的 deploy.sh 文件中，他并没有把 `rm -rf public` 包括进来；
2. 他提到，每次更新，只需要输入 `./deploy`， 但是这行代码我试过，不成功。

<s>这两点，如果不是错误的话，就是我哪里没弄懂。</s>

{{<block class="note">}}
我和 Codepool 的作者联系了之后，发现是我错了。第二个点我还是不懂，也许是另一种执行方式。不过第一点，我试了一下，`hugo` 命令运行之前 用不用 `rm -rf public` 结果都是一样的。我之前是觉得，不用 `rm -rf public` 的话，只能更新或者新加 `content` 文件夹里的东西，而如果 `content` 里有删除的话，`public` 文件夹里还是会有，并不会删除。但是我试了一下，其实`public` 文件夹是和 `content` 同步的。

但是，像[Mike Dane](https://www.mikedane.com/about/) 在[这篇文章](https://www.mikedane.com/static-site-generators/hugo/building-hosting/) 里提到的，如果你的网站变动比较大，比如你的 `layout` 文件夹有大的变动，那么不先删除 `public` 文件夹就运行 `hugo` 命令，很可能网站不会更新所有的变动。因此，稳妥起见，还是在 `hugo` 之前，加上`rm -rf public`。
{{<end>}}


## 七、如果你跟着这篇教程走，还是碰到了错误...

1. 再认真看一下，看看是不是漏了代码；
2. 看看 terminal 的错误提示是什么？我之前碰到过的一个错误提示大意是：**没有找到 submoduel 代码**。如果是这样的话，那么，你需要用 `git submodule` 来把 hugo 主题克隆下来，而不能用 `git clone`。这一点的原理我还没彻底搞清楚，不过你用 `git submodule` 试一下，应该可以。