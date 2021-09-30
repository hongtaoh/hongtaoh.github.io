---
title: "GitHub Authentication Update"
date: 2021-08-03T11:53:38-04:00
author: "Hongtao Hao"
slug: github-authentication
draft: false
toc: false
---
When I was updating my blog using Git, I was sent an email from GitHub:

>Basic authentication using a password to Git is deprecated and will soon no longer work. Visit https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information around suggested workarounds and removal dates.

To solve this issue, go to [https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/) as suggested. At [What you need to do today](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/#what-you-need-to-do-today), you will see that using a personal access token is recommended. 

Read [this official documentation](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create a personal access token. Remember to save your token carefully!

If you are using a Mac, then you probably need to [update credentials from the Keychain Access](https://docs.github.com/en/get-started/getting-started-with-git/updating-credentials-from-the-macos-keychain) to replace the old passwords with the newly created access token. 

Follow the procedure mentioned in the above documentation. When searching for `github.com` in Keychain Access, you will see two results. One is `github.com`, and the other is `github.com(USERNAME)`. Delete the first one. 

Then, use Git in Terminal and you will be prompted to enter your GitHub username and passwords. For the passwords, use the access token you just created. 