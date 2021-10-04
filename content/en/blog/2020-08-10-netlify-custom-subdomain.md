---
title: How to Set up A Custom Subdomain For Netlify
date: 2020-08-10T14:45:39-04:00
author: Hongtao Hao
slug: netlify-subdomain-setup
draft: false
toc: false
---
To configure a custom subdomain for Netlify (for example, to point `legacy-jupyterbook.hongtaoh.com` to `legacy-jupyterbook.netlify.app`) should be very easy, but the instructions on Netlify can be a little confusing, even misleading. 

{{<figure src="/media/enblog/netlify-subdomain-setup.png" title="The confusing instruction">}}

The most confusing point is shown above. It asks you to add a custom domain in the format of `www.yourdomain.com`. However, that is for configuring a custom *domain*, not a custom *subdomain*. Then, what should you do?

If you have your own domain, `www.yourdomain.com` and the domain for your Netlify project is `abc.netlify.app`. If you want to have a custom subdomain of `www.abc.yourdomain.com`, then you only need to input `abc.yourdomain.com` in the box (in the picture above). 

Then, follow the instruction [here](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/#configure-a-subdomain). What you should do is simply add a **CNAME record** with `abc` as the **host** and `abc.netlify.app` as the **value**. 

It should just work. 

