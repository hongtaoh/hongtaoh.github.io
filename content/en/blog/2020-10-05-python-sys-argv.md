---
title: "What is sys.argv in Python and How to Use It"
date: 2020-10-05T11:58:54-04:00
author: Hongtao Hao
slug: python-sys-argv
draft: false
toc: false
---
While I was updating the data for [Professor YY](https://github.com/yy/)'s [COVID19-data project](https://github.com/covid19-data/covid19-data), I noticed some lines of codes containing `sys.argv`. I didn't understand it in the begining, nor was I sure how to use it. I understood it later. This post is to explain what `sys.argv` is and how to use it. 

Python `sys.argv` is essentially a variable from the [`sys`]((https://docs.python.org/3/library/sys.html)) module. This variable contains arguments that are to be passed to the python script you are calling in the command line[^1].

I'll explain by example. 

First, take a look at [`nyt_state_data.py`](https://github.com/hongtaoh/covid19-data/blob/master/scripts/nyt_state_data.py). It has three `sys.argv` variables:

```python
NYT_STATE_DATA = sys.argv[1]
USA_STATE_CODE_DATA = sys.argv[2]
OUT_FNAME = sys.argv[3]
```

By default, `sys.argv[0]` is the script name. 

Take a closer look at [`nyt_state_data.py`](https://github.com/hongtaoh/covid19-data/blob/master/scripts/nyt_state_data.py), and you'll find that the first two `sys.argv` variables are `CSV` files to be read by `pandas` and the last one is a string or file location for the [`pandas.DataFrame.to_csv`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_csv.html) function.

Let's say I have this [nyt_state_data.py](https://github.com/hongtaoh/covid19-data/blob/master/scripts/nyt_state_data.py) locally. The location is `Desktop/Covid19-data/scripts/nyt_state_data.py`.

In terminal, I'll call this script first, followed by three arguments passed to this script:

```bash
python Desktop/covid19-data/scripts/nyt_state_data.py https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv https://raw.githubusercontent.com/hongtaoh/covid19-data/master/data_sources/wikipedia/ISO3166/usa_state_code.csv Desktop/covid19-data/output/cases/cases_us_states_nyt_UP_TO_$(date -v -1d '+%d_%B_%Y').csv
```
The date setting is based on These two sources: [1](https://www.howtogeek.com/410442/how-to-display-the-date-and-time-in-the-linux-terminal-and-use-it-in-bash-scripts/), [2](https://apple.stackexchange.com/a/115836)

I know above code is very messay since the URLs of the two CSV files are pretty long. I'll demystify it this way:

```bash
python YourScript.py Arg1 Arg2 Arg3
```

Arguments for `sys` are separated by space. 

[^1]: My explanation is based on [sys.argv - Command Line Arguments in Python [Part 1]](https://kerneldev.com/command-line-arguments-using-python-sys-argv-part-1/) by [Sapnesh Naik](https://github.com/SapneshNaik).

