---
title: "How to Download Wget for Mac without Homebrew"
date: 2020-10-07T11:53:04-04:00
author: Hongtao Hao
slug: wget
draft: false
toc: false
---

There are four ways to download [Wget](https://www.gnu.org/software/wget/):

1. [Via Xcode](https://www.fossmint.com/install-and-use-wget-on-mac/). 

However, Xcode takes up more than [10 GB](https://www.hackingwithswift.com/articles/18/how-to-make-xcode-take-up-less-space) when installed. I don't think it's worth it to download Xcode simply for Wget. 

2. Official website of Gun

I tried to download [wget2-1.99.2.tar.gz](https://ftp.gnu.org/gnu/wget/wget2-1.99.2.tar.gz) from [https://ftp.gnu.org/gnu/wget/](https://ftp.gnu.org/gnu/wget/) which I got from [https://www.gnu.org/software/wget/](https://www.gnu.org/software/wget/). 

```bash
cd ~/Downloads
curl -O https://ftp.gnu.org/gnu/wget/wget2-1.99.2.tar.gz
tar -zxvf wget2-1.99.2.tar.gz
cd wget2-1.99.2/
./configure
make
make install
wget http://ftp.gnu.org/gnu/wget/wget-1.19.5.tar.gz
```

However, errors occured. According to [this article](https://www.fossmint.com/install-and-use-wget-on-mac/), it seems I have to install Xcode first; otherwise running `./configure` won't be successful.

3. [Brew](https://stackoverflow.com/a/33902055)

A more detailed answer is [here](https://stackoverflow.com/a/33902055) by [Farsheed](https://stackoverflow.com/users/895659/farsheed) and edited by [gagarine](https://stackoverflow.com/users/382177/gagarine). I didn't have Homebrew installed, so I have to find another way. 

4. [MacPorts](https://stackoverflow.com/a/33902055)

A more detailed answer is provided [here](https://stackoverflow.com/a/33902055) by [Farsheed](https://stackoverflow.com/users/895659/farsheed) and edited by [gagarine](https://stackoverflow.com/users/382177/gagarine).

I downloaded [Macports](https://www.macports.org/install.php) first and then downloaded Wget from it. It worked. 

