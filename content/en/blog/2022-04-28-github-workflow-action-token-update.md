---
title: "How to Update Personal Token for GitHub Action"
date: 2022-04-28T20:36:35-05:00
author: "Hongtao Hao"
slug: update-github-action-token
draft: false
toc: false
---
I use GitHub Actions in my personal website for automatic deployment. However, it is pretty annoying that I have to update my [token](https://github.com/settings/tokens) once in a while and I many times forget how to update it. Here is a memo for myself. 

First, regenerate the token [here](https://github.com/settings/tokens). Copy the new token. 

Second, go to the repository that uses the workflow. Settings -> Security -> Secrets -> Actions. Find the secret which is your token, possibly named as "PERSONAL_TOKEN". Click "Update", and paste the new token in the text entry box. 

Third, [delete `github.com` from macOS keychain](https://docs.github.com/en/get-started/getting-started-with-git/updating-credentials-from-the-macos-keychain). For details, also refer to one of my posts [*GitHub Authentication Update*](https://hongtaoh.com/en/2021/08/03/github-authentication/).

Fourth, make some changes to your local repository and push the changes to remote repository on GitHub. You will be prompted to input your username and passwords. For passwords, use the new token that you copied earlier. 