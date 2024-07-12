---
title: "Selenium 爬虫如何在新窗口保持登陆"
date: 2024-04-04T16:31:19-05:00
author: "郝鸿涛"
slug: selenium-keep-logged-in
draft: true
toc: false
tags: 编程
---

我的配置：

- Mac
- Firefox 

用 Selenium 打开新窗口后，一般无法保持登陆。如何解决？

下载 Firefox cookies.txt 插件 (Add-on)。在你已经登陆的网站点开这个插件，选择导出 cookies，只导出此网站的即可。讲导出的 `cookies.txt` 放在与下面代码文档平行的位置。

然后

```py
import selenium
import http.cookiejar

# Path to the cookies file
cookies_file_path = 'cookies.txt'

# url to scrape
yoururl = "https://google.com"

# Create an instance of MozillaCookieJar
cookie_jar = http.cookiejar.MozillaCookieJar()
cookie_jar.load(cookies_file_path, ignore_discard=True, ignore_expires=True)

# Create a new Selenium WebDriver instance (Firefox in this case)
driver = webdriver.Firefox()
driver.get(yoururl)  # Replace with the URL that requires the cookies

# Add each cookie to the driver
for cookie in cookie_jar:
    cookie_dict = {
    'name': cookie.name, 
    'value': cookie.value, 
    'path': cookie.path, 
    'domain': cookie.domain, 
    'secure': cookie.secure
    }
    
    # Optional: Some websites may require expiry and other field
    if hasattr(cookie, 'expiry') and cookie.expiry:
        cookie_dict['expiry'] = cookie.expiry
    if hasattr(cookie, 'httponly') and cookie.httponly:
        cookie_dict['httponly'] = cookie.httponly
    
    driver.add_cookie(cookie_dict)

# Refresh the page to apply cookies
driver.refresh()

```

上面的代码基本上是 ChatGPT 的杰作。