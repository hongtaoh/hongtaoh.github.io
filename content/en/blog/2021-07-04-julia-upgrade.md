---
title: "Julia: How to Upgrade to A New Release"
date: 2021-07-04T16:47:32-04:00
author: "Hongtao Hao"
slug: julia-upgrade
draft: false
toc: false
---
I am using macOS. 

First, download the new Julia release you are looking for from the [Official Downloads](https://julialang.org/downloads/). Take Julia v1.6.1 for example. When downloading is done, drag the julia icon to Applications. You'll see that the old Julia was replaced by the new one. That said, when you open Applications from Finder, or simply run the following snippet from your Terminal

```bash
open -a Finder ../../Applications
```

You'll see that the old version(s) is still there. 

At this time, when you type `julia --version` in Terminal, what will be shown is the old version, not the updated one you just downloaded. 

To update the Julia version in Terminal, you need to create a symlink to the updated version. The following snippet should run from your shell, e.g., the Terminal app on MacOS:

```bash
rm -f /usr/local/bin/julia
ln -s /Applications/Julia-1.6.app/Contents/Resources/julia/bin/julia /usr/local/bin/julia
```

The above snippet is taken from [Julia's Office Documentation](https://julialang.org/downloads/platform/). Refer to that link for updated codes if the new version you downloaded is not v1.6.1.

Run `julia --version` from your Terminal, you will see the updated version. 

You can check by running this snippet from your Terminal as well:

```bash
julia # Initiate the Julia prompt
versioninfo()
```

At this time, all the packages in your old Julia version are not in the updated version. 

To "transfer" packages, run the following codes in your Terminal (Suppose you are upgrading from v1.5 to v1.6):

```bash
cd ~/.julia/environments/
mkdir v1.6
cp v1.5/Project.toml v1.6/
cp v1.5/Manifest.toml v1.6/
```

The above snippet came from [Antonello's answer](https://stackoverflow.com/a/63391099/13716814) on Stack Overflow. 

At this point, if you previously have `IJulia` installed, when you open the Jupyter Notebook, you can only see the old version. 

To add the new Julia version in Jupyter Notebook, run the following in your Terminal: 

```bash
Julia # Initiate the Julia prompt
import Pkg
# Pkg.add("IJulia") if you haven't installed IJulia yet; 
# or Pkg.update("IJulia") if you want an update
Pkg.build("IJulia")
```

You will be able to see the updated version in your Jupyter Notebook.

I learned this snippet from [this thread on Julia's forum](https://discourse.julialang.org/t/using-ijulia-with-existing-jupyter-installation-outwith-anaconda/38832).

One last question you might have is how to remove old Julia versions from Jupyter Notebook. [Louise Davies's answer](https://stackoverflow.com/a/45211705/13716814) comes in handy here. Run `jupyter kernelspec list` in your Terminal, and run something like `jupyter kernelspec uninstall julia-1.5` to uninstall the old version(s). 