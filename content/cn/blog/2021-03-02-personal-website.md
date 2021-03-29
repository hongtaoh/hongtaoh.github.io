---
title: "如何用 Hugo 搭建个人网站"
date: 2021-03-02T12:03:38-05:00
author: "郝鸿涛"
slug: hugo
draft: false
toc: true
---

本教程旨在手把手帮你搭建你的个人网站。建站工具是[Hugo](https://gohugo.io/) + [GitHub](https://github.com/) + ([Netlify](https://www.netlify.com/))，其中，Netlify 非必须。

## 前期准备

如果你是彻彻底底的零基础：没有 GitHub 账号、不知道 HTML 和 CSS 为何物、没用过 Git，甚至连 Markdown 都不知道是什么，强烈建议你先把[这份教程](https://intro2code.netlify.app/)认真读一下。读完后，你需要：

- 注册了 GitHub 账号、下载了文本编辑器、安装了 Git 和（如果你用的是 Windows 系统）终端

- 掌握了 Markdown、HTML 和 CSS 的基础语法

## 安装 Hugo

### 苹果系统 (Mac) 

如果你已经安装了 brew, 那么直接在 Terminal 中输入

```bash
brew install hugo 
```

如果你没安装 brew, 先到 [Hugo releases](https://github.com/gohugoio/hugo/releases)，找到类似 `hugo_0.81.0_macOS-64bit.tar.gz` 的文件，点击下载，并解压。需要注意的是 Hugo 一直在更新，所以你到时候看到的版本号很可能已经不是 `0.81.0`。

下载完之后，打开 Terminal, 输入 `open -a Finder /usr/local/bin`，然后把 `hugo_0.81.0_macOS-64bit` 文件中的 `hugo` 文件拖到 `/usr/local/bin` 当中：

```
└── local
    └── bin
        └── hugo
```

完成后，在 Terminal 中输入 `hugo version`, 如果显示 `Hugo Static Site Generator...` 证明安装成功。

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

如果你用的是 Windows 系统，同时按下 `Win` + `E`，选中右侧导航栏中的「桌面」，右键，选择「属性」，然后选择位置，将此路径复制下来。

{{<block class="note">}}
以上找到桌面路径的方法参考[win10桌面文件夹位置在哪？](http://www.xitonghe.com/jiaocheng/Windows10-10408.html)，在此表示感谢。
{{<end>}}

现在打开终端。

如果你用的是 Mac, 在 Terminal 中输入：

```bash
cd Desktop
```

如果你用的是 Windows，在你所选用的[终端](https://intro2code.netlify.app/prep.html#terminal)中输入：

```bash
cd 你刚才复制的路径
```

这部分以下的内容都是在终端中进行，不管是 Windows 还是 Mac，输入的内容一样。

```bash
hugo new site quickstart # quickstart 可以换成任何你想用的名称
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
mkdir hugo-ht-new
cp -r hugo-ht/* hugo-ht-new
rm -rf hugo-ht
mv hugo-ht-new hugo-ht
cd ..
cp -r themes/hugo-ht/exampleSite/* .
```

紧接着，运行

```bash
hugo server -D # 这里的 D 是 draft 的意思
```

打开终端显示的 [http://localhost:1313/](http://localhost:1313/)，不出意外的话你能看到和 [https://hugo-ht.hongtaoh.com/](https://hugo-ht.hongtaoh.com/) 一模一样的个人网站。

## 个人定制

### 只要中文部分

如果你不喜欢现在的双语博客，只想留下中文，请参照以下步骤：

1. 移动文件夹

打开终端，输入：

```bash
cp -r content/cn/about content
cp -r content/cn/posts content
```

2. 修改 config.toml

打开 `config.toml`, 把 `[[menu.en]]`, `[[menu.cn]]` 那部分删除，然后在那个位置加上：

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

另外，在 `params` 部分，把

```toml
# singleLang = true
defaultLang = "en"
```

改成

```toml
singleLang = true
defaultLang = "cn"
```




