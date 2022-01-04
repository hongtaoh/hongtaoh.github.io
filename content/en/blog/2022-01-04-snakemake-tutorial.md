---
title: "A Beginner's Guide to Snakemake "
date: 2022-01-04T14:33:15-06:00
author: "Hongtao Hao"
slug: snakemake
draft: false
toc: false
---
{{<block class="info">}}

Please refer to the README.md in [hongtaoh/snakemake-tutorial](https://github.com/hongtaoh/snakemake-tutorial) for updated instructions. This blog post might be outdated. 
{{<end>}}

Prerequisit: You've installed conda or miniconda.

I also assume you are using a Mac or Linux. If you are using Windows, refer to [here](https://snakemake.readthedocs.io/en/stable/tutorial/setup.html#windows-subsystem-for-linux) first. 

Let's say you already have a project folder. Take [snakemake-tutorial](https://github.com/hongtaoh/snakemake-tutorial) as an example. 

## Install snakemake

First, create a virtual environment for your project. 

```
cd snakemake-tutorial
conda create --name s-tutorial python=3.8
conda activate s-tutorial
```

Then, we install packages into this virtual environment. For simplicity, I will only use `pandas`. 

```
conda install pandas
```

Then, install snakemake:

```
pip3 install "git+https://github.com/ashwinvis/datrie.git@python3.8-cythonize"
pip3 install snakemake
```

The above code came from [here](https://github.com/snakemake/snakemake/issues/246)

## Create a Snakefile

Let's say, we have this raw data, `data/raw/raw_data.csv` :

```txt
year,value
2001,4
2002,5
2003,6
```

We want a `python` script that select only rows whose `year` is equal to or greater than `2002`. Let's say we name this `Python` script as `get_since_2002.py`. We will place it in the folder of `scripts`. 

This script, `scripts/get_since_2002.py`, will generate an output named `since_2002.csv` based on the input: `data/raw/raw_data.csv`. And, we want to place this output file to the folder of `data/derived`.

Based on the above information, we will have this `Snakefile`:


```
ffrom os.path import join as pjoin

DATA_DIR = "data/"
RAW_DATA_DIR = pjoin(DATA_DIR, "raw")
DERIVED_DATA_DIR = pjoin(DATA_DIR, "derived")

###############################################################################
# Raw datasets
###############################################################################

RAW_DATA = pjoin(RAW_DATA_DIR, 'raw_data.csv')

###############################################################################
# Final outputs
###############################################################################

SINCE_2002 = pjoin(DERIVED_DATA_DIR, 'since_2002.csv')

###############################################################################
# Workflows
###############################################################################

rule get_since_2002:
    input: RAW_DATA
    output: SINCE_2002
    shell: "python scripts/get_since_2002.py {input} {output}"
```

## Create python scripts

As described above, we'll name it as `get_since_2002.py` and put it into the `scripts` folder.

```python
import sys
import pandas as pd

RAW_DATA = sys.argv[1]
OUT_FNAME = sys.argv[2]

df = pd.read_csv(RAW_DATA)
df_out = df.loc[df.year >= 2002]
df_out.to_csv(OUT_FNAME)
```

## Execute Snakefile

Now, go to the directory where your `Snakefile` is located, and run `snakemake --cores 1`:

```
snakemake --cores 1
```

What this snippt does is to find `Snakefile` and execute it. 

If successful, you'll see this:

```bash
Building DAG of jobs...
Using shell: /bin/bash
Provided cores: 1 (use --cores to define parallelism)
Rules claiming more threads will be scaled down.
Job stats:
job               count    min threads    max threads
--------------  -------  -------------  -------------
get_since_2002        1              1              1
total                 1              1              1

Select jobs to execute...

[Tue Jan  4 14:23:46 2022]
rule get_since_2002:
    input: data/raw/raw_data.csv
    output: data/derived/since_2002.csv
    jobid: 0
    resources: tmpdir=/var/folders/z2/5kr96fyn63z_tj_bwr33t5dw0000gn/T

[Tue Jan  4 14:23:49 2022]
Finished job 0.
1 of 1 steps (100%) done
```

And you will find `since_2002.csv` in `data/derived`. 

## References

- [Set up your project](https://goodresearch.dev/setup.html)
- [Snakemake Tutorial, Setup](https://snakemake.readthedocs.io/en/stable/tutorial/setup.html)