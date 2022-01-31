---
title: "How to Set Up Python Virtual Environments for Visual Studio Code"
date: 2022-01-04T14:49:39-06:00
author: "Hongtao Hao"
slug: visual-studio-venv
draft: false
toc: false
---
Open Visual Studio, click `View -> Command Palette`. 

Input `shell command` and choose `Install 'code' command in PATH`

Go to the root directory of your project folder. Then run `code .`

Again, click `View -> Command Palette`.

Type `Python: Select Interpreter`, and choose your virtual environment. 

Next time, when you open Visual Studio at the directory of this project, it will automatically activate the virtual environment of your choice, no matter which folder you are in, as long as the folder is part of this project. 

## References
- [https://stackoverflow.com/a/39604469](https://stackoverflow.com/a/39604469)