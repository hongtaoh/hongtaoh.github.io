---
title: "curl: (60) SSL certificate problem: certificate has expired"
date: 2021-11-21T08:36:37-06:00
author: "Hongtao Hao"
slug: ssl-certificate
draft: false
toc: false
---

I encountered this error message when I tried to install `TinyTex` in R.

```
curl: (60) SSL certificate problem: certificate has expired
More details here: https://curl.haxx.se/docs/sslcerts.html
```

I'm using macOS (10.14.6). 

This gave me quite a headache for quite a long time. Fortunately, I finally found a solution [here](https://apple.stackexchange.com/a/428453).

To repeat:

  1. open your Terminal and enter `open -a Finder /etc/ssl/`. As [Bri Bri suggested](https://apple.stackexchange.com/a/428453), rename `cert.pem` to something else. 
  2. Go to [https://curl.se/docs/caextract.html](https://curl.se/docs/caextract.html) and download the latest `cacert.pem`. 
  3. Rename it to `cert.pem` and drag it into the `/etc/ssl/` folder.
