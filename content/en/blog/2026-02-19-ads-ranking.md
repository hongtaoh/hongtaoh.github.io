---
title: "Building An Ads Ranking System From Scratch"
date: 2026-02-20
author: "Hongtao Hao"
slug: ads-ranking
draft: false
toc: true
tags: ML
---

We are building an Ads ranking ML system from scratch. 

The basic idea is this: think about Facebook or Instagram. The platform has millions of ads to show, but it needs algorithms to decide which ads to show. Why? Because, if it shows you ads randomly, you'll get annoyed and leave the platform, let alone clicking the ads and purchasing. What Meat wants:

- You keep happy and like the ads, and even better, click it and make the purchase.
- Advertisers are happy and make money and keep putting ads on Meta. 
- Meta makes money and has more revenue and the stock prices keep going up and paying the employees. 

The problem is, how to create that algorithm? That's the focus of this blog post. 

Before we talk about algorithms, let's look at what data we have:


```python
import pandas as pd 
import matplotlib.pyplot as plt 
import numpy as np 
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
```


```python
event = pd.read_csv('data/ads_ranking/event_log.csv')
event.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>user_id</th>
      <th>ad_id</th>
      <th>device</th>
      <th>location</th>
      <th>weekday</th>
      <th>month</th>
      <th>hour</th>
      <th>clicked</th>
      <th>converted</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>4</td>
      <td>mobile</td>
      <td>US</td>
      <td>2</td>
      <td>3</td>
      <td>23</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>18</td>
      <td>mobile</td>
      <td>US</td>
      <td>1</td>
      <td>2</td>
      <td>6</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>20</td>
      <td>mobile</td>
      <td>US</td>
      <td>6</td>
      <td>12</td>
      <td>17</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>15</td>
      <td>mobile</td>
      <td>Asia</td>
      <td>1</td>
      <td>3</td>
      <td>22</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>9</td>
      <td>mobile</td>
      <td>Asia</td>
      <td>3</td>
      <td>2</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>




```python
ads = pd.read_csv('data/ads_ranking/ad_catalog.csv')
ads.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ad_id</th>
      <th>category</th>
      <th>advertiser_id</th>
      <th>format</th>
      <th>bid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>shoes</td>
      <td>1</td>
      <td>image</td>
      <td>1.2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>shoes</td>
      <td>1</td>
      <td>video</td>
      <td>2.5</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>shoes</td>
      <td>1</td>
      <td>carousel</td>
      <td>1.8</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>shoes</td>
      <td>2</td>
      <td>image</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>shoes</td>
      <td>2</td>
      <td>video</td>
      <td>2.2</td>
    </tr>
  </tbody>
</table>
</div>




```python
users = pd.read_csv('data/ads_ranking/user_catalog.csv')
users.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>user_id</th>
      <th>age_group</th>
      <th>gender</th>
      <th>country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>18-24</td>
      <td>M</td>
      <td>US</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>25-34</td>
      <td>F</td>
      <td>UK</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>35-44</td>
      <td>M</td>
      <td>Germany</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>25-34</td>
      <td>F</td>
      <td>US</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>18-24</td>
      <td>M</td>
      <td>Japan</td>
    </tr>
  </tbody>
</table>
</div>



## Problem Navigation and Data

The `ads` is the ads catalog. In it, the `bid` is the amount of money each advertiser is willing to pay for that ad to be shown to a user. 

The `users` is the user raw data. You can assume it's accurate. 

The `event` is the historical dataset. The `clicked` is a binary variable, showing whether the user clicked the ad or not. `converted` is also binary, telling us whether the user actually purchased that item. 

Our goal: If I give you the user features (who they are), ads features (what every ad is), and the circumstances of the impression (when, where, on what device), you tell me which ads to show to the user at that moment. 

Note that in real life, we don't have the `clicked` and `converted` in the `event`, which are historical data. In real life, we need to rank ads and decide which ad to show to that user under those circumstances in realtime.

The general formula we have is:

`$$\text{Expected revenue} = \text{bid} \times P(\text{clicked}) \times P(\text{conversion} \mid \text{clicked})$$`

Therefore, for each future "event", i.e., a given user and given contexts, we need to calcualte P(clicked) and p(conversion) for each ad. The problem is: calculating these is expensive. Before we calculate them, we need a shortlist of ads (say, from 100 millions ads, we need a shortlist of 1,000). Then we calculate the two probabilities and get a final list of 5-10 ads to show to the user. 

Some terminologies:

- `pCTR`: short for `$P(\text{clicked})$`. CTR means click through rate. 
- `pCVR`: short for `$P(\text{conversion} \mid \text{clicked}$`. CVR means conversion rate. 
- Impression: an ads showing to the user is an impression. 

Then, you might wonder, why don't we simply calculate `$P(\text{purchase} \mid \text{shown ad})$`? Well, technically we could, but the `bid` is about each click, not each "purchase". If we predict `$P(\text{purchase} \mid \text{shown ad})$` directly, we won't be able to calculate the Expected Revenue correctly, right?

## Feature Engineering

We humans can understand something like `category: shoes, tech, food`, and `user_38291047`, but it's hard for computers. It needs numbers. A naive approach is like this: `category: 1, 2, 3` and `user_id: 0`. The problem is that computers will treat them ordinal: food is three times shoes. This doesn't make sense. One-hot encoding solves the issue: instead of having `category`, we make each category a column and use 0/1 binary. 

If we have three ads and they belong to `shoe, tech, food`, then, the `shoe` column will be `1, 0, 0`, `tech` col will be `0, 1, 0` and `food` col is `0, 0, 1`.

But we cannot use one-hot encoding for the high-cardinality user ids. Why? Suppose we have 100 millions, then each user is a binary variable. That's impossible. We cannot handle so many variables. A better approach is to use embeddings. Say we have a 128 dimensional space and we assign a coordinate for each user id. How to find the coordinate? Machine Learning. And that's what we are going to do. 

Now, you understand embedding, and you might wonder, wait, why don't we use embedding for the low-cardinality variables? Bingo. We can. In fact, it's better and more flexible than one-hot encoding. One simple reason is that the one-hot encoding 0/1 is fixed but the embedding coordinates are learned, so it's better. 

Another thing is that for numerical variables, we can also project one scalar to high dimensional representations through linear projection. However, to keep things simple in this blog, I'll just use the original scalars instead (after standardization, i.e., converting to z scores).

So we have these three sources of data:

```txt
User catalog   : user_id, age_group, gender, country
Ad catalog     : ad_id, advertiser_id, category, format, bid
Event log      : device, location, weekday, month, hour
```
And this is our encoding scheme:

```txt
user_id        → embedding lookup  (10 users, but in real world 500M)
age_group      → embedding lookup  (4 groups)
gender         → embedding lookup  (2 values)
country        → embedding lookup  (5 countries)

ad_id          → embedding lookup  (20 ads, but in real world 10M+)
advertiser_id  → embedding lookup  (5 advertisers)
category       → embedding lookup  (3 categories)
format         → embedding lookup  (3 formats)
bid            → numerical  (already a meaningful number)

device         → embedding lookup  (3 devices)
location       → embedding lookup  (3 locations)
weekday        → embedding lookup  (7 values, non-linear pattern)
month          → embedding lookup  (12 values, non-linear pattern)
hour           → numerical  (0-23, natural ordering exists)
```

### Feature Store 

Besides these stand-alone features, we can have some aggregate features:

- `user_historical_ctr`: Is this user a clicker in general?
- `ad_historical_ctr`: Is this ad generally appealing?
- `user_x_category_ctr`: Does this user like this category?
- `user_x_advertiser_converted`: Has this user bought from this advertiser before?

If the data is gigantic, say, you have 100 million users, you might store this gigantic table in Redis. But in essense, it's just a precomputed table ready for lookup. 


```python
event_merged = event.merge(
    ads[["ad_id", "category", "advertiser_id"]], on="ad_id")
```


```python
# 1. user historical CTR
user_ctr = (
    event
    .groupby("user_id")["clicked"]
    .mean()
    .reset_index()
    .rename(columns={"clicked": "user_historical_ctr"})
)

# 2. ad historical CTR
ad_ctr = (
    event
    .groupby("ad_id")["clicked"]
    .mean()
    .reset_index()
    .rename(columns={"clicked": "ad_historical_ctr"})
)

# 3. user x category CTR
user_category_ctr = (
    event_merged
    .groupby(["user_id", "category"])["clicked"]
    .mean()
    .reset_index()
    .rename(columns={"clicked": "user_x_category_ctr"})
)

# 4. user x advertiser conversion (ever converted = max)
user_advertiser_conv = (
    event_merged
    .groupby(["user_id", "advertiser_id"])["converted"]
    .max()
    .reset_index()
    .rename(columns={"converted": "user_x_advertiser_converted"})
)

# 5: user x category conversion (ever converted = max)
user_category_conv = (
    event_merged
    .groupby(["user_id", "category"])["converted"]
    .max()
    .reset_index()
    .rename(columns={"converted": "user_x_category_converted"})
)

# save
user_ctr.to_csv("data/ads_ranking/fs_user_ctr.csv", index=False)
ad_ctr.to_csv("data/ads_ranking/fs_ad_ctr.csv", index=False)
user_category_ctr.to_csv("data/ads_ranking/fs_user_category_ctr.csv", index=False)
user_advertiser_conv.to_csv("data/ads_ranking/fs_user_advertiser_conv.csv", index=False)
user_category_conv.to_csv("data/ads_ranking/fs_user_category_conv.csv", index=False)
```

Now, we have these tables:

```txt
event_log
user_catalog
ad_catalog
fs_user_ctr
fs_ad_ctr
fs_user_category_ctr
fs_user_advertiser_conv
fs_user_category_conv
```

Joining them will give us a giant table with all these variables:

```txt
user_id | ad_id | device | location | weekday | month | hour |
age_group | gender | country |
category | advertiser_id | format | bid |
user_historical_ctr | ad_historical_ctr |
user_x_category_ctr | user_x_advertiser_converted | user_x_category_cnverted |
clicked | converted
```

One question: how do we deal with missing data? Say, when a user never clicks nor purchased a category or advertiser? For `ctr`, we can use the average `ctr` of that category across all users. Why? Because `ctr` is a continuous variable. We don't have historical data for this user and this category, so our best guess is to use mean imputation. This is different from when we have missing data in the `conv`, which is a binary variable (0/1). We will just use 0 for the missing data for the `conv`. 

Now we merge all the data:


```python
# start with event log
df = event.copy()

# join user catalog
df = df.merge(users, on="user_id", how="left")

# join ad catalog
df = df.merge(ads, on="ad_id", how="left")

# join feature store — user historical ctr
df = df.merge(user_ctr, on="user_id", how="left")

# join feature store — ad historical ctr
df = df.merge(ad_ctr, on="ad_id", how="left")

# join feature store — user x category ctr
df = df.merge(user_category_ctr, on=["user_id", "category"], how="left")

# join feature store — user x advertiser converted
df = df.merge(user_advertiser_conv, on=["user_id", "advertiser_id"], how="left")

# join feature store — user x category converted
df = df.merge(user_category_conv, on=["user_id", "category"], how="left")

# handle missing values
category_mean_ctr = user_category_ctr.groupby("category")["user_x_category_ctr"].mean()
df["user_x_category_ctr"] = df.apply(
    lambda row: category_mean_ctr[row["category"]] 
    if pd.isna(row["user_x_category_ctr"]) 
    else row["user_x_category_ctr"],
    axis=1
)
df["user_x_advertiser_converted"] = df["user_x_advertiser_converted"].fillna(0)
df["user_x_category_converted"]   = df["user_x_category_converted"].fillna(0)

# save
df.to_csv("data/ads_ranking/features.csv", index=False)

print(f"Shape: {df.shape}")
print(f"Columns: {df.columns}")
```

{{< indentedblock >}}
Shape: (500, 21)
Columns: Index(['user_id', 'ad_id', 'device', 'location', 'weekday', 'month', 'hour',
'clicked', 'converted', 'age_group', 'gender', 'country', 'category',
'advertiser_id', 'format', 'bid', 'user_historical_ctr',
'ad_historical_ctr', 'user_x_category_ctr',
'user_x_advertiser_converted', 'user_x_category_converted'],
dtype='object')
{{< /indentedblock >}}
## Models

### Two Tower Model 

Predicting `pCTR` and `pCVR` is expensive. When we have 500 million users and 100 million ads, we cannot calcualte these two numbers for each `user x ad`: after all, users won't sit there for half an hour for you to do the math and then scroll the screen. We need to find a cheaper way to get a short list of 1k ads, based on the user. Two tower model is the correct way to go. 

How does the two tower model work? There are two towers: user tower and ads tower. We have the historical data and know which users clicked which ads and didn't click which other ads. Using this information, we try to get a coordinate for each ad in a high dimensional space and get a coordinate for each user as well. We then freeze the ads vectors, but compute the user vectors at request time. We use dot product to find the nearest neighbors (using `FAISS`). This way, we can quickly get a short list of 1k ads for the current user under a certain context. 

This is the architecture:

```txt
User Tower input:
  categorical: age_group, gender, country, device, location, weekday, month
               → each gets its own embedding table
  numerical:   hour, user_historical_ctr, user_x_category_ctr,
               user_x_advertiser_converted, user_x_category_converted
               → standardize → use directly
  concatenate all → MLP → 64D vector

Ad Tower input:
  categorical: category, advertiser_id, format
               → each gets its own embedding table
  numerical:   bid, ad_historical_ctr
               → standardize → use directly
  concatenate all → MLP → 64D vector

Training:
  for each clicked impression:
    positive = clicked ad
    negatives = 4 randomly sampled ads
  loss = softmax cross entropy
  goal: dot(user_vector, positive_ad_vector) > all 4 negatives
```

And we freeze the ads tower:

```txt
Run all 20 ads through the trained Ad Tower
Ad 1  → Ad Tower → [0.3, 0.5, ...] (64D vector) → store
Ad 2  → Ad Tower → [0.1, 0.8, ...] (64D vector) → store
...
Ad 20 → Ad Tower → [0.4, 0.2, ...] (64D vector) → store

Store all 20 vectors in FAISS index.
```

We also freeze the leanred parameters for the user tower:

```txt
age_group embedding table  → learned during training, fixed at serving
gender embedding table     → learned during training, fixed at serving
country embedding table    → learned during training, fixed at serving
device embedding table     → learned during training, fixed at serving
...
MLP weights                → learned during training, fixed at serving
```

And calculate the user tower online:

```txt
age_group="25-34" → lookup row 1 from frozen embedding table → [0.4, 0.1, ...]
gender="F"        → lookup row 1 from frozen embedding table → [0.2, 0.9, ...]
hour=21           → standardize → 0.875
...
concatenate all → frozen MLP → 64D user vector
FAISS: find 1000 nearest ad vectors
→ these 1000 ads go to CTR/CVR model
```


```python
# ─────────────────────────────────────────────
# STEP 1: LABEL ENCODING
# nn.Embedding expects 0-indexed integers
# ─────────────────────────────────────────────
df["age_group"]     = df["age_group"].map({"18-24": 0, "25-34": 1, "35-44": 2, "45+": 3})
df["gender"]        = df["gender"].map({"M": 0, "F": 1})
df["country"]       = df["country"].map({"US": 0, "UK": 1, "Germany": 2, "Japan": 3, "Brazil": 4})
df["device"]        = df["device"].map({"mobile": 0, "desktop": 1, "tablet": 2})
df["location"]      = df["location"].map({"US": 0, "EU": 1, "Asia": 2})
df["category"]      = df["category"].map({"shoes": 0, "tech": 1, "food": 2})
df["format"]        = df["format"].map({"image": 0, "video": 1, "carousel": 2})
df["advertiser_id"] = df["advertiser_id"].map({1: 0, 2: 1, 3: 2, 4: 3, 5: 4})
df["weekday"]       = df["weekday"] - 1   # 1-7 → 0-6
df["month"]         = df["month"] - 1     # 1-12 → 0-11

# ─────────────────────────────────────────────
# STEP 2: STANDARDIZE NUMERICAL FEATURES
# ─────────────────────────────────────────────
num_cols = ["hour", "user_historical_ctr", "ad_historical_ctr",
            "user_x_category_ctr", "user_x_advertiser_converted",
            "user_x_category_converted", "bid"]

for col in num_cols:
    mean = df[col].mean()
    std  = df[col].std()
    df[col] = (df[col] - mean) / std if std > 0 else 0.0

# ─────────────────────────────────────────────
# STEP 3: DEFINE FEATURE COLUMNS
# ─────────────────────────────────────────────
USER_CAT_COLS = ["age_group", "gender", "country", "device", "location", "weekday", "month"]
USER_NUM_COLS = ["hour", "user_historical_ctr", "user_x_category_ctr",
                 "user_x_advertiser_converted", "user_x_category_converted"]

AD_CAT_COLS   = ["category", "advertiser_id", "format"]
AD_NUM_COLS   = ["bid", "ad_historical_ctr"]
```


```python
# ─────────────────────────────────────────────
# STEP 4: DATASET
# For each clicked impression, return:
#   - user categorical features
#   - user numerical features
#   - positive ad categorical features (the clicked ad)
#   - positive ad numerical features
#   - negative ad categorical features (4 random ads)
#   - negative ad numerical features
# ─────────────────────────────────────────────
class TwoTowerDataset(Dataset):
    def __init__(self, df, n_negatives=4):
        self.clicks      = df[df["clicked"] == 1].reset_index(drop=True)
        self.all_ads     = df[AD_CAT_COLS + AD_NUM_COLS + ["ad_id"]].drop_duplicates("ad_id").reset_index(drop=True)
        self.n_negatives = n_negatives

    def __len__(self):
        return len(self.clicks)

    def __getitem__(self, idx):
        row = self.clicks.iloc[idx]

        # user features
        user_categorical = torch.tensor(row[USER_CAT_COLS].values.astype(int),   dtype=torch.long)
        user_numerical   = torch.tensor(row[USER_NUM_COLS].values.astype(float), dtype=torch.float)

        # positive ad = the ad that was clicked
        pos_categorical  = torch.tensor(row[AD_CAT_COLS].values.astype(int),     dtype=torch.long)
        pos_numerical    = torch.tensor(row[AD_NUM_COLS].values.astype(float),   dtype=torch.float)

        # negative ads = 4 random ads that were NOT the clicked one
        neg_pool             = self.all_ads[self.all_ads["ad_id"] != row["ad_id"]]
        negatives            = neg_pool.sample(self.n_negatives)
        neg_categorical      = torch.tensor(negatives[AD_CAT_COLS].values.astype(int),   dtype=torch.long)
        neg_numerical        = torch.tensor(negatives[AD_NUM_COLS].values.astype(float), dtype=torch.float)

        return user_categorical, user_numerical, pos_categorical, pos_numerical, neg_categorical, neg_numerical

```


```python
# ─────────────────────────────────────────────
# STEP 5: MODEL
# ─────────────────────────────────────────────
EMBED_DIM  = 8
OUTPUT_DIM = 64

class UserTower(nn.Module):
    def __init__(self):
        super().__init__()
        self.emb_age_group = nn.Embedding(4,  EMBED_DIM)
        self.emb_gender    = nn.Embedding(2,  EMBED_DIM)
        self.emb_country   = nn.Embedding(5,  EMBED_DIM)
        self.emb_device    = nn.Embedding(3,  EMBED_DIM)
        self.emb_location  = nn.Embedding(3,  EMBED_DIM)
        self.emb_weekday   = nn.Embedding(7,  EMBED_DIM)
        self.emb_month     = nn.Embedding(12, EMBED_DIM)

        # 7 embeddings × 8 dims + 5 numerical features
        self.mlp = nn.Sequential(
            nn.Linear(7 * EMBED_DIM + len(USER_NUM_COLS), 64),
            nn.ReLU(),
            nn.Linear(64, OUTPUT_DIM),
        )

    def forward(self, categorical, numerical):
        # look up embedding for each categorical feature
        age_group_emb = self.emb_age_group(categorical[:, 0])  # (B, 8)
        gender_emb    = self.emb_gender(categorical[:, 1])     # (B, 8)
        country_emb   = self.emb_country(categorical[:, 2])    # (B, 8)
        device_emb    = self.emb_device(categorical[:, 3])     # (B, 8)
        location_emb  = self.emb_location(categorical[:, 4])   # (B, 8)
        weekday_emb   = self.emb_weekday(categorical[:, 5])    # (B, 8)
        month_emb     = self.emb_month(categorical[:, 6])      # (B, 8)

        # concatenate all embeddings + numerical into one vector
        x = torch.cat([
            age_group_emb, gender_emb, country_emb,
            device_emb, location_emb, weekday_emb, month_emb,
            numerical,
        ], dim=1)  # (B, 61)

        return self.mlp(x)  # (B, 64)
```


```python
class AdTower(nn.Module):
    def __init__(self):
        super().__init__()
        self.emb_category   = nn.Embedding(3, EMBED_DIM)
        self.emb_advertiser = nn.Embedding(5, EMBED_DIM)
        self.emb_format     = nn.Embedding(3, EMBED_DIM)

        # 3 embeddings × 8 dims + 2 numerical features
        self.mlp = nn.Sequential(
            nn.Linear(3 * EMBED_DIM + len(AD_NUM_COLS), 64),
            nn.ReLU(),
            nn.Linear(64, OUTPUT_DIM),
        )

    def forward(self, categorical, numerical):
        category_emb   = self.emb_category(categorical[:, 0])    # (B, 8)
        advertiser_emb = self.emb_advertiser(categorical[:, 1])  # (B, 8)
        format_emb     = self.emb_format(categorical[:, 2])      # (B, 8)

        x = torch.cat([
            category_emb, advertiser_emb, format_emb,
            numerical,
        ], dim=1)  # (B, 26)

        return self.mlp(x)  # (B, 64)
```


```python
# ─────────────────────────────────────────────
# STEP 6: TRAINING
# ─────────────────────────────────────────────
dataset    = TwoTowerDataset(df, n_negatives=4)
dataloader = DataLoader(dataset, batch_size=16, shuffle=True)

user_tower = UserTower()
ad_tower   = AdTower()
optimizer  = torch.optim.Adam(
    list(user_tower.parameters()) + list(ad_tower.parameters()),
    lr=0.001
)

for epoch in range(20):
    total_loss = 0

    for user_categorical, user_numerical, pos_categorical, pos_numerical, neg_categorical, neg_numerical in dataloader:

        optimizer.zero_grad()

        batch_size     = user_categorical.shape[0]  # number of examples in this batch
        n_negatives    = neg_categorical.shape[1]   # number of negatives per example = 4

        # compute user vector
        user_vec = user_tower(user_categorical, user_numerical)  # (batch_size, 64)

        # compute positive ad vector
        pos_vec  = ad_tower(pos_categorical, pos_numerical)      # (batch_size, 64)

        # compute negative ad vectors
        # neg_categorical shape: (batch_size, 4, 3) → reshape to (batch_size*4, 3) for ad tower
        # then reshape back to (batch_size, 4, 64)
        neg_vecs = ad_tower(
            neg_categorical.view(batch_size * n_negatives, -1),
            neg_numerical.view(batch_size * n_negatives, -1)
        ).view(batch_size, n_negatives, OUTPUT_DIM)              # (batch_size, 4, 64)

        # dot product: user vs positive ad
        pos_score  = (user_vec * pos_vec).sum(dim=1, keepdim=True)           # (batch_size, 1)

        # dot product: user vs each negative ad
        neg_scores = torch.bmm(
            neg_vecs,                        # (batch_size, 4, 64)
            user_vec.unsqueeze(2)            # (batch_size, 64, 1)
        ).squeeze(2)                         # (batch_size, 4)

        # concatenate scores: [pos_score, neg_scores] → (batch_size, 5)
        # label = 0 means "correct answer is at index 0" = the positive ad
        all_scores = torch.cat([pos_score, neg_scores], dim=1)   # (batch_size, 5)
        labels     = torch.zeros(batch_size, dtype=torch.long)   # always 0

        loss = F.cross_entropy(all_scores, labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    if (epoch + 1) % 5 == 0:
        print(f"Epoch {epoch+1}/20 | Loss: {total_loss/len(dataloader):.4f}")
```

{{< indentedblock >}}
Epoch 5/20 | Loss: 1.2147
Epoch 10/20 | Loss: 0.7753
Epoch 15/20 | Loss: 0.5993
Epoch 20/20 | Loss: 0.5407
{{< /indentedblock >}}
```python
# ─────────────────────────────────────────────
# STEP 7: VERIFY
# user 1 (shoes) → top 5 ads should be shoes
# user 4 (tech)  → top 5 ads should be tech
# user 7 (food)  → top 5 ads should be food
# ─────────────────────────────────────────────
user_tower.eval()
ad_tower.eval()

all_ads  = df[AD_CAT_COLS + AD_NUM_COLS + ["ad_id"]].drop_duplicates("ad_id").reset_index(drop=True)
cat_name = {0: "shoes", 1: "tech", 2: "food"}
pref     = {1: "shoes", 4: "tech", 7: "food"}

with torch.no_grad():
    # precompute all 20 ad vectors
    ad_vecs = ad_tower(
        torch.tensor(all_ads[AD_CAT_COLS].values.astype(int),   dtype=torch.long),
        torch.tensor(all_ads[AD_NUM_COLS].values.astype(float), dtype=torch.float)
    )  # (20, 64)

    print("\n=== Top 5 ads per user ===")
    for user_id in [1, 4, 7]:
        row = df[df["user_id"] == user_id].iloc[0]

        user_vec = user_tower(
            torch.tensor(row[USER_CAT_COLS].values.astype(int),   dtype=torch.long).unsqueeze(0),
            torch.tensor(row[USER_NUM_COLS].values.astype(float), dtype=torch.float).unsqueeze(0)
        )  # (1, 64)

        # score all ads by dot product
        scores = (ad_vecs @ user_vec.T).squeeze()  # (20,)
        top5   = scores.argsort(descending=True)[:5]

        print(f"\nUser {user_id} (prefers {pref[user_id]}):")
        for i in top5:
            ad_row = all_ads.iloc[i.item()]
            print(f"  Ad {int(ad_row['ad_id']):2d} "
                  f"({cat_name[int(ad_row['category'])]:5s}) "
                  f"score: {scores[i].item():.3f}")
```

{{< indentedblock >}}
=== Top 5 ads per user ===

User 1 (prefers shoes):
Ad  5 (shoes) score: 1.766
Ad  7 (shoes) score: 1.623
Ad  4 (shoes) score: 1.620
Ad  3 (shoes) score: 1.359
Ad  6 (shoes) score: 0.443

User 4 (prefers tech):
Ad 13 (tech ) score: 5.230
Ad 14 (tech ) score: 4.197
Ad 10 (tech ) score: 3.958
Ad 11 (tech ) score: 3.500
Ad 12 (tech ) score: 3.285

User 7 (prefers food):
Ad 20 (food ) score: 3.634
Ad 17 (food ) score: 3.302
Ad 10 (tech ) score: 2.979
Ad 13 (tech ) score: 2.355
Ad  3 (shoes) score: 1.912
{{< /indentedblock >}}
### CTR and CVR Models

In the two tower model, the parameters we learned are the embedding lookup tables for categorical variables and the MLP weights for the user tower and also the ad tower. 

As mentioned earlier, we freeze these parameters and also all ads vectors. At request time, we compute the user vector and use FAISS to get the top 1k candidates for our CTR and CVR models. 

The CTR model is meant to predict the `pCTR` and CVR model the `pCVR`. The basic idea is that for each row in the giant `df` where we have all the user, ad and context information, we process the variables the same way as we did for the two tower model, but now we are not doing the dot procedure the way we did before. Rather, with all these variables, AND separate user ID embedding lookup and ad ID embedding look up, we are predicting the pCTR and pCVR. 

Notice that user and context features do have predictive powers, but they are "generalized" and not specific to a user. With user embedding lookup tables, each user obtains one coordinate specific to them, allowing more granular prediction. Same for Ads. 

For CTR and CVR models, we are using binary cross entropy loss, because the predicted variable is binary (0/1). However, since in the production reality, the class is very imbalanced (maybe over 99% of the impressions are not clicked), it's better to use focal loss:

```txt
FL = -α × (1-p)^γ × log(p)    for positive (y=1)
FL = -(1-α) × p^γ × log(1-p)  for negative (y=0)
```

Two hyperparameters:

- γ (gamma): how much to down-weight easy examples. Typically 2.
- α (alpha): class weight for positives. Typically 0.25.

```txt
positive examples (clicked)     → weight 0.25
negative examples (not clicked) → weight 0.75
```

In plain English, take the example of when `$y=1$`:

- If the model is already confident and correct (easy example) → (1-p)^γ is small → small loss contribution
- If the model is wrong or uncertain (hard example) → (1-p)^γ is large → large loss contribution


Another thing is that after we have all the user, ads and context predictors, we want some interactions between them. That is to say, we do not want to use the basic representation; rather, we want to use transformers to further process the representations. However, transformers are expensive. Therefore, rather than using transformers, we compute the dot product between feature vectors. 

The architecture of CTR and CVR models are:

```txt
Input features:
  categorical → embedding lookup 
  numerical   → standardize + use directly 
  user_id     → separate embedding lookup
  ad_id       → separate embedding lookup 

Interaction step:
  project all embeddings to same dimension (say 16D)
  compute dot product between every pair
  → gives us interaction scores

Final prediction:
  concatenate [all embeddings + numerical + interaction scores]
  → MLP → single number → sigmoid → pCTR
```

In the following, I will only cover the CTR model. The CVR model has identical architecture to the CTR model. The only difference is that it trains on clicked impressions only, with `converted` as the label. 


```python
# ─────────────────────────────────────────────
# FOCAL LOSS
# ─────────────────────────────────────────────
def focal_loss(predicted_prob, label, alpha=0.25, gamma=2.0):
    """
    predicted_prob: model output after sigmoid, shape (batch_size,)
    label:          ground truth 0 or 1,        shape (batch_size,)
    """
    # clip to avoid log(0)
    predicted_prob = predicted_prob.clamp(min=1e-7, max=1 - 1e-7)

    # loss for positive examples (label = 1)
    loss_positive  = -alpha * (1 - predicted_prob) ** gamma * torch.log(predicted_prob)

    # loss for negative examples (label = 0)
    loss_negative  = -(1 - alpha) * predicted_prob ** gamma * torch.log(1 - predicted_prob)

    # pick the right loss for each example based on its label
    loss = torch.where(label == 1, loss_positive, loss_negative)

    return loss.mean()

# ─────────────────────────────────────────────
# DATASET
# all impressions, label = clicked (0 or 1)
# ─────────────────────────────────────────────
USER_CAT_COLS = ["age_group", "gender", "country", "device", "location", "weekday", "month"]
USER_NUM_COLS = ["hour", "user_historical_ctr", "user_x_category_ctr",
                 "user_x_advertiser_converted", "user_x_category_converted"]
AD_CAT_COLS   = ["category", "advertiser_id", "format"]
AD_NUM_COLS   = ["bid", "ad_historical_ctr"]

class CTRDataset(Dataset):
    def __init__(self, df):
        self.df = df.reset_index(drop=True)

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]

        user_categorical = torch.tensor(row[USER_CAT_COLS].values.astype(int),   dtype=torch.long)
        user_numerical   = torch.tensor(row[USER_NUM_COLS].values.astype(float), dtype=torch.float)
        ad_categorical   = torch.tensor(row[AD_CAT_COLS].values.astype(int),     dtype=torch.long)
        ad_numerical     = torch.tensor(row[AD_NUM_COLS].values.astype(float),   dtype=torch.float)

        # user_id and ad_id for memorization embeddings
        user_id          = torch.tensor(row["user_id"] - 1,  dtype=torch.long)  # 1-10 → 0-9
        ad_id            = torch.tensor(row["ad_id"] - 1,    dtype=torch.long)  # 1-20 → 0-19

        label            = torch.tensor(row["clicked"], dtype=torch.float)

        return user_categorical, user_numerical, ad_categorical, ad_numerical, user_id, ad_id, label
```


```python
# ─────────────────────────────────────────────
# CTR MODEL (DLRM-style)
#
# Architecture:
#   1. embedding lookup for all categorical features
#   2. separate user_id and ad_id embeddings (memorization)
#   3. project all embeddings to same dimension (INTERACT_DIM)
#   4. compute dot product between every pair of projected embeddings
#      → interaction scores
#   5. concatenate everything + interaction scores
#   6. MLP → sigmoid → pCTR
# ─────────────────────────────────────────────
EMBED_DIM    = 16   # embedding dimension for categorical features
INTERACT_DIM = 16   # dimension for dot product interactions
OUTPUT_DIM   = 1    # single probability output

class CTRModel(nn.Module):
    def __init__(self, n_users=10, n_ads=20):
        super().__init__()

        # ── categorical embeddings (same as two-tower) ──
        self.emb_age_group  = nn.Embedding(4,  EMBED_DIM)
        self.emb_gender     = nn.Embedding(2,  EMBED_DIM)
        self.emb_country    = nn.Embedding(5,  EMBED_DIM)
        self.emb_device     = nn.Embedding(3,  EMBED_DIM)
        self.emb_location   = nn.Embedding(3,  EMBED_DIM)
        self.emb_weekday    = nn.Embedding(7,  EMBED_DIM)
        self.emb_month      = nn.Embedding(12, EMBED_DIM)
        self.emb_category   = nn.Embedding(3,  EMBED_DIM)
        self.emb_advertiser = nn.Embedding(5,  EMBED_DIM)
        self.emb_format     = nn.Embedding(3,  EMBED_DIM)

        # ── user_id and ad_id embeddings (memorization) ──
        self.emb_user_id    = nn.Embedding(n_users, EMBED_DIM)
        self.emb_ad_id      = nn.Embedding(n_ads,   EMBED_DIM)

        # ── projection layers: project all embeddings to INTERACT_DIM ──
        # needed so all vectors are same size for dot product interactions
        # we have 12 embeddings total (10 categorical + user_id + ad_id)
        self.projection     = nn.Linear(EMBED_DIM, INTERACT_DIM)

        # ── MLP ──
        # input = all embeddings flattened + numerical features + interaction scores
        n_embeddings        = 12                              # total number of embeddings
        n_interactions      = n_embeddings * (n_embeddings - 1) // 2  # pairs = 12*11/2 = 66
        n_numerical         = len(USER_NUM_COLS) + len(AD_NUM_COLS)   # 5 + 2 = 7
        mlp_input_dim       = n_embeddings * EMBED_DIM + n_numerical + n_interactions

        self.mlp = nn.Sequential(
            nn.Linear(mlp_input_dim, 128),
            nn.ReLU(),
            nn.Dropout(0.2),        # ← add dropout to prevent overfitting 
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Dropout(0.2),        # ← add dropout to prevent overfitting 
            nn.Linear(64, OUTPUT_DIM),
        )

    def forward(self, user_categorical, user_numerical, ad_categorical, ad_numerical, user_id, ad_id, return_logit:bool=False):

        # ── step 1: look up all embeddings ──
        age_group_emb   = self.emb_age_group(user_categorical[:, 0])   # (B, 16)
        gender_emb      = self.emb_gender(user_categorical[:, 1])      # (B, 16)
        country_emb     = self.emb_country(user_categorical[:, 2])     # (B, 16)
        device_emb      = self.emb_device(user_categorical[:, 3])      # (B, 16)
        location_emb    = self.emb_location(user_categorical[:, 4])    # (B, 16)
        weekday_emb     = self.emb_weekday(user_categorical[:, 5])     # (B, 16)
        month_emb       = self.emb_month(user_categorical[:, 6])       # (B, 16)
        category_emb    = self.emb_category(ad_categorical[:, 0])      # (B, 16)
        advertiser_emb  = self.emb_advertiser(ad_categorical[:, 1])    # (B, 16)
        format_emb      = self.emb_format(ad_categorical[:, 2])        # (B, 16)
        user_id_emb     = self.emb_user_id(user_id)                    # (B, 16)
        ad_id_emb       = self.emb_ad_id(ad_id)                        # (B, 16)

        # collect all embeddings into a list
        all_embeddings = [
            age_group_emb, gender_emb, country_emb,
            device_emb, location_emb, weekday_emb, month_emb,
            category_emb, advertiser_emb, format_emb,
            user_id_emb, ad_id_emb
        ]  # 12 embeddings, each (B, 16)

        # ── step 2: project all embeddings to INTERACT_DIM ──
        projected = [self.projection(emb) for emb in all_embeddings]  # 12 × (B, 16)

        # ── step 3: compute dot product between every pair ──
        interaction_scores = []
        for i in range(len(projected)):
            for j in range(i + 1, len(projected)):
                # dot product between embedding i and embedding j
                dot = (projected[i] * projected[j]).sum(dim=1, keepdim=True)  # (B, 1)
                interaction_scores.append(dot)

        # stack all interaction scores → (B, 66)
        interactions = torch.cat(interaction_scores, dim=1)  # (B, 66)

        # ── step 4: concatenate everything ──
        all_features = torch.cat(
            [emb for emb in all_embeddings]   # all embeddings flattened: (B, 12*16)
            + [user_numerical, ad_numerical]  # numerical features:       (B, 7)
            + [interactions],                 # interaction scores:        (B, 66)
            dim=1
        )

        # ── step 5: MLP → sigmoid → pCTR ──
        logit = self.mlp(all_features)           # (B, 1)

        if return_logit:
            return logit.squeeze(1)              # raw logit, for calibration
        
        return torch.sigmoid(logit).squeeze(1)   # probability, for normal use
```


```python
# ─────────────────────────────────────────────
# TRAINING
# ─────────────────────────────────────────────
dataset    = CTRDataset(df)
dataloader = DataLoader(dataset, batch_size=16, shuffle=True)

ctr_model = CTRModel(n_users=10, n_ads=20)
optimizer = torch.optim.Adam(ctr_model.parameters(), lr=0.001, weight_decay=1e-5)

for epoch in range(20):
    total_loss = 0

    for user_categorical, user_numerical, ad_categorical, ad_numerical, user_id, ad_id, label in dataloader:
        optimizer.zero_grad()

        pCTR = ctr_model(user_categorical, user_numerical, ad_categorical, ad_numerical, user_id, ad_id)
        loss = focal_loss(pCTR, label)

        loss.backward()
        optimizer.step()
        total_loss += loss.item()

    if (epoch + 1) % 5 == 0:
        print(f"Epoch {epoch+1}/20 | Loss: {total_loss/len(dataloader):.4f}")
```

{{< indentedblock >}}
Epoch 5/20 | Loss: 0.0240
Epoch 10/20 | Loss: 0.0113
Epoch 15/20 | Loss: 0.0028
Epoch 20/20 | Loss: 0.0014
{{< /indentedblock >}}
```python
# ─────────────────────────────────────────────
# VERIFY
# for user 1 (shoes), shoe ads should have higher pCTR
# for user 4 (tech),  tech ads should have higher pCTR
# for user 7 (food),  food ads should have higher pCTR
# ─────────────────────────────────────────────
ctr_model.eval()
cat_name = {0: "shoes", 1: "tech", 2: "food"}
pref     = {1: "shoes", 4: "tech", 7: "food"}

all_ads  = df[AD_CAT_COLS + AD_NUM_COLS + ["ad_id"]].drop_duplicates("ad_id").reset_index(drop=True)

print("\n=== Top 5 ads per user (by pCTR) ===")
with torch.no_grad():
    for user_id_val in [1, 4, 7]:
        user_row = df[df["user_id"] == user_id_val].iloc[0]
        scores   = []

        for _, ad_row in all_ads.iterrows():
            user_categorical = torch.tensor(user_row[USER_CAT_COLS].values.astype(int),     dtype=torch.long).unsqueeze(0)
            user_numerical   = torch.tensor(user_row[USER_NUM_COLS].values.astype(float),   dtype=torch.float).unsqueeze(0)
            ad_categorical   = torch.tensor(ad_row[AD_CAT_COLS].values.astype(int),         dtype=torch.long).unsqueeze(0)
            ad_numerical     = torch.tensor(ad_row[AD_NUM_COLS].values.astype(float),       dtype=torch.float).unsqueeze(0)
            user_id_tensor   = torch.tensor(user_id_val - 1,           dtype=torch.long).unsqueeze(0)
            ad_id_tensor     = torch.tensor(int(ad_row["ad_id"]) - 1,  dtype=torch.long).unsqueeze(0)

            pCTR = ctr_model(user_categorical, user_numerical, ad_categorical, ad_numerical, user_id_tensor, ad_id_tensor)
            scores.append((int(ad_row["ad_id"]), cat_name[int(ad_row["category"])], pCTR.item()))

        scores.sort(key=lambda x: x[2], reverse=True)

        print(f"\nUser {user_id_val} (prefers {pref[user_id_val]}):")
        for ad_id, category, score in scores[:5]:
            print(f"  Ad {ad_id:2d} ({category:5s}): pCTR = {score:.3f}")
```

{{< indentedblock >}}
=== Top 5 ads per user (by pCTR) ===

User 1 (prefers shoes):
Ad  5 (shoes): pCTR = 0.982
Ad  7 (shoes): pCTR = 0.918
Ad  4 (shoes): pCTR = 0.909
Ad  2 (shoes): pCTR = 0.901
Ad  1 (shoes): pCTR = 0.779

User 4 (prefers tech):
Ad 14 (tech ): pCTR = 0.934
Ad 11 (tech ): pCTR = 0.540
Ad 13 (tech ): pCTR = 0.512
Ad  9 (tech ): pCTR = 0.327
Ad 15 (food ): pCTR = 0.252

User 7 (prefers food):
Ad  5 (shoes): pCTR = 0.011
Ad 12 (tech ): pCTR = 0.009
Ad 17 (food ): pCTR = 0.006
Ad 13 (tech ): pCTR = 0.006
Ad 16 (food ): pCTR = 0.005
{{< /indentedblock >}}
## Calibration 

Because we used focal loss, the model's predicted probabilities are not accurate in absolute terms. They're inflated or deflated. The ranking order might be correct but the actual numbers are wrong.

This matters because the scoring formula is:

```txt
score = bid × pCTR × pCVR
```

If pCTR is inflated, the scores are wrong. Calibration fixes the absolute probability values while preserving the ranking order.

We use Platt Scaling, which is quite simple:

```txt
p_calibrated = sigmoid(a × logit + b)
```

The `logit` is the raw pCTR score from our CTR model. We fit a logistic regression to calibrate it:

1. Freeze the trained CTR model completely
2. Take held-out data (e.g., our `test_event_log.csv`) — data the model never saw
3. Run every example through the frozen model → get logits
4. Fit a tiny logistic regression with 1 input (logit) and 2 parameters (a, b) using regular binary cross entropy loss
5. Only 2 parameters, converges in seconds




```python
# load test event log
test_event = pd.read_csv("data/ads_ranking/test_event_log.csv")

# join feature store — same as training
test_df = test_event.copy()
test_df = test_df.merge(users,                on="user_id",                    how="left")
test_df = test_df.merge(ads,                  on="ad_id",                      how="left")
test_df = test_df.merge(user_ctr,             on="user_id",                    how="left")
test_df = test_df.merge(ad_ctr,               on="ad_id",                      how="left")
test_df = test_df.merge(user_category_ctr,    on=["user_id", "category"],      how="left")
test_df = test_df.merge(user_advertiser_conv, on=["user_id", "advertiser_id"], how="left")
test_df = test_df.merge(user_category_conv,   on=["user_id", "category"],      how="left")

# fill missing
test_df["user_x_category_ctr"]        = test_df["user_x_category_ctr"].fillna(test_df["user_x_category_ctr"].mean())
test_df["user_x_advertiser_converted"] = test_df["user_x_advertiser_converted"].fillna(0)
test_df["user_x_category_converted"]   = test_df["user_x_category_converted"].fillna(0)

# label encoding — same maps as training
test_df["age_group"]     = test_df["age_group"].map({"18-24": 0, "25-34": 1, "35-44": 2, "45+": 3})
test_df["gender"]        = test_df["gender"].map({"M": 0, "F": 1})
test_df["country"]       = test_df["country"].map({"US": 0, "UK": 1, "Germany": 2, "Japan": 3, "Brazil": 4})
test_df["device"]        = test_df["device"].map({"mobile": 0, "desktop": 1, "tablet": 2})
test_df["location"]      = test_df["location"].map({"US": 0, "EU": 1, "Asia": 2})
test_df["category"]      = test_df["category"].map({"shoes": 0, "tech": 1, "food": 2})
test_df["format"]        = test_df["format"].map({"image": 0, "video": 1, "carousel": 2})
test_df["advertiser_id"] = test_df["advertiser_id"].map({1: 0, 2: 1, 3: 2, 4: 3, 5: 4})
test_df["weekday"]       = test_df["weekday"] - 1
test_df["month"]         = test_df["month"] - 1

# standardize — IMPORTANT: use training data (df) stats, not test stats
for col in num_cols:
    mean = df[col].mean()
    std  = df[col].std()
    test_df[col] = (test_df[col] - mean) / std if std > 0 else 0.0
```


```python
ctr_model.eval()
all_logits = []
all_labels = []

with torch.no_grad():
    for i in range(len(test_df)):
        row = test_df.iloc[i]

        user_categorical = torch.tensor(row[USER_CAT_COLS].values.astype(int),   dtype=torch.long).unsqueeze(0)
        user_numerical   = torch.tensor(row[USER_NUM_COLS].values.astype(float), dtype=torch.float).unsqueeze(0)
        ad_categorical   = torch.tensor(row[AD_CAT_COLS].values.astype(int),     dtype=torch.long).unsqueeze(0)
        ad_numerical     = torch.tensor(row[AD_NUM_COLS].values.astype(float),   dtype=torch.float).unsqueeze(0)
        user_id_tensor   = torch.tensor(int(row["user_id"]) - 1, dtype=torch.long).unsqueeze(0)
        ad_id_tensor     = torch.tensor(int(row["ad_id"])   - 1, dtype=torch.long).unsqueeze(0)

        logit = ctr_model(user_categorical, user_numerical, ad_categorical, ad_numerical, user_id_tensor, ad_id_tensor, return_logit=True)
        all_logits.append(logit.item())
        all_labels.append(row["clicked"])

logits = torch.tensor(all_logits, dtype=torch.float)
labels = torch.tensor(all_labels, dtype=torch.float)
```


```python
a = nn.Parameter(torch.tensor(1.0))
b = nn.Parameter(torch.tensor(0.0))
optimizer = torch.optim.Adam([a, b], lr=0.01)

for epoch in range(200):
    optimizer.zero_grad()
    calibrated_prob = torch.sigmoid(a * logits + b)
    loss = F.binary_cross_entropy(calibrated_prob, labels)
    loss.backward()
    optimizer.step()

print(f"a={a.item():.3f}, b={b.item():.3f}")
```

{{< indentedblock >}}
a=0.618, b=-0.980
{{< /indentedblock >}}
```python
with torch.no_grad():
    raw_probs        = torch.sigmoid(logits)
    calibrated_probs = torch.sigmoid(a * logits + b)

print(f"Raw pCTR mean:        {raw_probs.mean():.3f}")
print(f"Calibrated pCTR mean: {calibrated_probs.mean():.3f}")
print(f"Actual CTR:           {labels.mean():.3f}")
```

{{< indentedblock >}}
Raw pCTR mean:        0.446
Calibrated pCTR mean: 0.306
Actual CTR:           0.302
{{< /indentedblock >}}
## The End

We have covered everything. It's not for production, so we did not cover FAISS, nor online A/B testing. 

### Summary

This is an overview of this system design problem. 

The business objective is three-fold: 1) keep users on the platform and open the ads and become converted; 2) the advertisers make money; 3) the platform (Meta) makes money. 

The ML objective: the log loss of positive ads to be as small as possible; ROC-AUC to be as close to 1 as possible; expcted calibration error (ECE) to be as small as possible. 

Data: we need the event log, users and ads information. 

Featuer engineering: 
- We compute cross features. 
- We use embedding lookup tables for categorical variables. 
- We use the standardized values for the numerical variables. 

Models:
- Two tower model for quick candidate generation (objective is 1k short list ads). Basica idea is to have the concatenated user tower and the concatenated ads tower. We have one positive ad and four random negative ads. Each ad vector will have a dot product with the user tower. Then use the softmax cross entropy loss. 
- CTR and CVR models used to predict pCTR and pCVR. Now we do the training impression by impression. The input is the concatenated user + ad + context and the goal is to predict the pCTR and pCVR. Use focal loss to account for the extreme class imbalance. Notice that we have the user_id and ad_id embedding for each user and ad, which is a big difference from the two tower model. Also, we added the dot product interaction between all feature pairs to the predictors. 
- Calibration: the problem is that the output pCTR and pCVR, although having the correct relative magnitude, might be off in terms of absolute values. We fit a simple logistic regression to map the raw predicted values to the actual values, using held-out test data. 

Evaluation and Deployment:
- offline metrics: 
{{< indentedblock >}}
- recall@k for two tower models.
- log loss, ROC-AUC for CTR and CVR models
- ECE (Expected Calibration Error) for calibration
{{< /indentedblock >}}
- online metrics: AB testing for the business metrics
- serving: use two tower first to get the short list using FAISS, then use the CTR and CVR plus the calibration model to get the final top 5 ads to show to the user. 
- Do regular retraining every 24 hours and monitor data shift and performance. 
```txt
User + Context
      ↓
  User Tower → 64D vector
                    ↓
                  FAISS → top 1k ads
                    ↓
              CTR Model → pCTR → calibration
              CVR Model → pCVR → calibration
                    ↓
         bid × pCTR × pCVR → top 5-10 ads
```

## Follow-up Questions

- Why bid × pCTR × pCVR (not just bit × pCVR)
{{< indentedblock >}}
- Because bid is based on pCTR.
{{< /indentedblock >}}
- Why CTR and CVR are separate models
{{< indentedblock >}}
- Same reason above.
{{< /indentedblock >}}
- Why two-tower for retrieval
{{< indentedblock >}}
- Because it's fast.
{{< /indentedblock >}}
- Why embeddings over one-hot
{{< indentedblock >}}
- More flexible.
{{< /indentedblock >}}
- Why two-tower has no user_id/ad_id embeddings
{{< indentedblock >}}
- Ad Tower input must contain ONLY ad information
→ ad vector is the same regardless of which user is being served
→ precompute once, reuse for everyone
{{< /indentedblock >}}
- Why calibration is needed after focal loss
{{< indentedblock >}}
- More accurate.
{{< /indentedblock >}}