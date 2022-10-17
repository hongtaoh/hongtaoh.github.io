---

title: Basic Data Wrangling and Plotting Tutorial
date: 2022-10-05
author: Hongtao Hao
slug: wrangling
draft: false
toc: true
tags: DS

---


```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import altair as alt
```

Download data here: [aiddata.csv](/files/aiddata.csv)

## Data import and basic manipulation


```python
df = pd.read_csv('../static/files/aiddata.csv')
# df.head()
```

![](/en/blog/2022-10-05-wrangling_files/df_1.png)


```python
# don't actually need the first two columns:
df = df.iloc[:, 2:]

# rename the columns
df.columns = ['year', 'donor', 'recipient', 'amount', 'purpose_code', 'purpose_name']
# df.head()
```

![](/en/blog/2022-10-05-wrangling_files/df_2.png)


```python
# check the shape
df.shape

# close to 10K rows!
```




    (98540, 6)




```python
# check year range

min(df.year), max(df.year)
```




    (1973, 2013)



## Task 1

The first task is: for each country or region, visualize the difference between its donation and receiving, for each year. To do that, we need a dataframe that has these three columns:

  - year
  - country/region name
  - donation
  - receiving
  - difference

Then, we can visualize the difference by year for each country or region (hereafter referred as "country").

There are two obvious challenges: 
  - Right now, each row lists a donation-receiving pair. But what we want is: for each year, what's the amount of donation and receiving this country has. 
  - Not all countries appeared in all years. 
  
Let's first get donation and receiving data from the source data. 


```python
def parse_donation_and_receiving(df, var):
    """
    To get donationn or receiving data from df
    
    Input:
        - df: df
        - var: either 'donor' or 'recipient'
    
    Return:
        a dataframe
    """
    data = []
    for group in df.groupby(['year', var]):
        # total amount of donation or receiving in that year for this country
        total_amount = group[1].amount.sum()
        # the amount is so big, we use the unit of billio (10**9)
        total_amount = total_amount / 10**9
        data.append((
            # year:
            group[0][0],
            # country:
            group[0][1],
            # amount:
            total_amount
        ))
    var_name = 'donation' if var == 'donor' else 'received'
    data_df = pd.DataFrame(
        data, columns = ['year', 'country', var_name]
    )
    return data_df
```


```python
# We first get the donation data
donation_df = parse_donation_and_receiving(df, 'donor')
donation_df.head()
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
      <th>year</th>
      <th>country</th>
      <th>donation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>0.046286</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>0.039251</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Canada</td>
      <td>0.437928</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>France</td>
      <td>0.247190</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Germany</td>
      <td>0.562232</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Then we get the receiving data
receiving_df = parse_donation_and_receiving(df, 'recipient')
receiving_df.head()
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
      <th>year</th>
      <th>country</th>
      <th>received</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.312075</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Chile</td>
      <td>0.088056</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Colombia</td>
      <td>0.549945</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Cyprus</td>
      <td>0.009613</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>India</td>
      <td>2.285257</td>
    </tr>
  </tbody>
</table>
</div>



First, let's look at how many countries are there:


```python
all_cntry = list(df.donor) + list(df.recipient)
all_cntry = list(set(all_cntry))

# there are in total 47 unique countries
len(all_cntry)
```




    47



We have 47 unique countries, but the problem is, in some years, not all countries are present, for example, in `receiving_df`, only 10 countries were present in the year of 1973. 


```python
receiving_df[receiving_df.year == 1973]
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
      <th>year</th>
      <th>country</th>
      <th>received</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.312075</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Chile</td>
      <td>0.088056</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Colombia</td>
      <td>0.549945</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Cyprus</td>
      <td>0.009613</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>India</td>
      <td>2.285257</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1973</td>
      <td>Korea</td>
      <td>1.363707</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1973</td>
      <td>Kuwait</td>
      <td>0.000325</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1973</td>
      <td>Saudi Arabia</td>
      <td>0.000065</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1973</td>
      <td>Thailand</td>
      <td>0.206363</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1973</td>
      <td>United Arab Emirates</td>
      <td>0.000065</td>
    </tr>
  </tbody>
</table>
</div>




```python
# same issue for donation data
donation_df[donation_df.year == 1973]
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
      <th>year</th>
      <th>country</th>
      <th>donation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>0.046286</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>0.039251</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Canada</td>
      <td>0.437928</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>France</td>
      <td>0.247190</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Germany</td>
      <td>0.562232</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1973</td>
      <td>Italy</td>
      <td>0.166719</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1973</td>
      <td>Japan</td>
      <td>0.938966</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1973</td>
      <td>Netherlands</td>
      <td>0.162751</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1973</td>
      <td>Norway</td>
      <td>0.035875</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1973</td>
      <td>Sweden</td>
      <td>0.168369</td>
    </tr>
    <tr>
      <th>10</th>
      <td>1973</td>
      <td>Switzerland</td>
      <td>0.014061</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1973</td>
      <td>United Kingdom</td>
      <td>0.442579</td>
    </tr>
    <tr>
      <th>12</th>
      <td>1973</td>
      <td>United States</td>
      <td>1.553264</td>
    </tr>
  </tbody>
</table>
</div>



You might ask: what will be the issue if not all countries are in each year. Good question! The issue is that if we do not have data for all countries each year, we are not able to get the difference between donation and receiving for each country in each year very easily. To do that, we need to "normalize" the time. If a country does not appear in a year, that means it does not recieve (or donate) any money in that year. 

This is how I solved the problem:


```python
def normalize_time(data, all_cntry, var_name):
    """normlize time for donation_df and receiving_df
    
    Input: 
        - data: either donation_df or receiving_df
        - all_cntry
        - var_name: either 'donation' or 'received'
    
    Output:
        - a dataframe
    """
    dfs = []
    for group in data.groupby('year'):
        year = group[0]
        present_cntry = group[1].country.tolist()
        absent_cntry = [x for x in all_cntry if x not in present_cntry]
        absent_df = pd.DataFrame({
            'year': year,
            'country': absent_cntry,
            var_name: 0
        })
        dff = pd.concat([group[1], absent_df], ignore_index = True)
        
        # by sorting the country, we make sure that rows in the output
        # donation and receiving dataframes correspond to each other
        dff.sort_values(by='country', ascending=True, inplace=True)
        dfs.append(dff)
    
    data_df = pd.concat(dfs, ignore_index = True)
    return data_df
```


```python
donation = normalize_time(donation_df, all_cntry, var_name = 'donation')
donation.head()
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
      <th>year</th>
      <th>country</th>
      <th>donation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>0.046286</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Austria</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>0.039251</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Canada</td>
      <td>0.437928</td>
    </tr>
  </tbody>
</table>
</div>




```python
receiving = normalize_time(receiving_df, all_cntry, var_name = 'received')
receiving.head()
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
      <th>year</th>
      <th>country</th>
      <th>received</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Austria</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.312075</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Canada</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
# to check whether the countries in the two lists are the same
r_c = list(set(receiving.country))
d_c = list(set(donation.country))
r_c == d_c
```




    True



Then we combine the two datasets and calculate the difference:


```python
all_df = donation
all_df['received'] = receiving['received']
all_df['d_minus_r'] = all_df['donation'] - all_df['received']
all_df.head()
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
      <th>year</th>
      <th>country</th>
      <th>donation</th>
      <th>received</th>
      <th>d_minus_r</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>0.046286</td>
      <td>0.000000</td>
      <td>0.046286</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Austria</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>0.039251</td>
      <td>0.000000</td>
      <td>0.039251</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.000000</td>
      <td>0.312075</td>
      <td>-0.312075</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Canada</td>
      <td>0.437928</td>
      <td>0.000000</td>
      <td>0.437928</td>
    </tr>
  </tbody>
</table>
</div>




```python
all_df.shape
```




    (1927, 5)



To make the plot, we need to transform the format of year:


```python
all_df['year'] = pd.to_datetime(all_df['year'], format='%Y')
```


```python
alt.Chart(all_df).mark_line().encode(
    x = alt.X(
        'year',
        title = 'Year'
    ),
    y = alt.Y(
        'd_minus_r:Q',
        title = 'Donation - Received',
        axis=alt.Axis(
            titleColor='#5276A7',
            labelExpr = 'datum.value + "B `$"'
        ),
    ),
    facet = alt.Facet(
        "country:N",
        columns = 8,
        title = 'Country/Region',
        header = alt.Header(labelFontSize = 12)
    )
).properties(
    width = 120,
    height = 110,
).configure_header(
    titleColor='#5276A7',
    titleFontSize=16,
#     labelColor='red',
    labelFontSize=14
)
```



{{<figure src="/en/blog/2022-10-05-wrangling_files/aid-small-multiple-diffonly.png" class="fullwidth">}}

The problem with this plot is that with it, we are not able to see the actual donation and receiving. We can achieve this in the following way. 


```python
all_df_melted = pd.melt(all_df, 
        id_vars=['year', 'country'], 
        value_vars=['donation', 'received'],
        var_name = 'category',
        value_name = 'amount'
       )
all_df_melted.replace({
    'donation': 'Donation',
    'received': 'Received'
}, inplace = True)
all_df_melted.rename(
    columns = {
        'category': 'Category'
    }, inplace = True)
all_df_melted.head()
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
      <th>year</th>
      <th>country</th>
      <th>Category</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973-01-01</td>
      <td>Australia</td>
      <td>Donation</td>
      <td>0.046286</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973-01-01</td>
      <td>Austria</td>
      <td>Donation</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973-01-01</td>
      <td>Belgium</td>
      <td>Donation</td>
      <td>0.039251</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973-01-01</td>
      <td>Brazil</td>
      <td>Donation</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973-01-01</td>
      <td>Canada</td>
      <td>Donation</td>
      <td>0.437928</td>
    </tr>
  </tbody>
</table>
</div>



This is important: because we are going to plot both donaiton and received amount each year for each country, it is important to replace 0 with NaN. Because the figures will be very small, if we do not change 0 to NaN, then we will consider 0 as small amount of donation or received amount, which is misleading. 


```python
all_df_melted['amount'] = all_df_melted['amount'].replace(0, np.nan)
all_df_melted.head()
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
      <th>year</th>
      <th>country</th>
      <th>Category</th>
      <th>amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973-01-01</td>
      <td>Australia</td>
      <td>Donation</td>
      <td>0.046286</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973-01-01</td>
      <td>Austria</td>
      <td>Donation</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973-01-01</td>
      <td>Belgium</td>
      <td>Donation</td>
      <td>0.039251</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973-01-01</td>
      <td>Brazil</td>
      <td>Donation</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973-01-01</td>
      <td>Canada</td>
      <td>Donation</td>
      <td>0.437928</td>
    </tr>
  </tbody>
</table>
</div>




```python
alt.Chart(all_df_melted).mark_line().encode(
    x = alt.X(
        'year',
        title = 'Year'
    ),
    y = alt.Y(
        'amount:Q',
        title = 'Amount',
        axis=alt.Axis(
            titleColor='#5276A7',
            labelExpr = 'datum.value + "B $`"'
        ),
    ),
    color = alt.Color(
        'Category:N',
    ),
    facet = alt.Facet(
        "country:N",
        columns = 8,
        title = 'Country/Region',
        header = alt.Header(labelFontSize = 12)
    )
).properties(
    width = 120,
    height = 110,
).configure_header(
    titleColor='#5276A7',
    titleFontSize=16,
#     labelColor='red',
    labelFontSize=14
)
```



{{<figure src="/en/blog/2022-10-05-wrangling_files/aid-small-multiple.png" class="fullwidth">}}

## Task 2

The second task is: find the top 10 coalesced purposes (according to the amount of donation) and for these ten purposes, show how their amount changes by time. 


```python
# First, find the top ten purposes
top_purpose_df = df.groupby('purpose_name')['amount'].agg('sum').nlargest(n=10)
top_10_purposes = list(top_purpose_df.index)
top_10_purposes
```




    ['Air transport',
     'Rail transport',
     'Industrial development',
     'Power generation/non-renewable sources',
     'RESCHEDULING AND REFINANCING',
     'Import support (capital goods)',
     'Social/ welfare services',
     'Telecommunications',
     'Power generation/renewable sources',
     'Sectors not specified']




```python
# Then select only data involving these top purposes
# We only want three columns: year, amount, and purpose name
purpose_df = df[df.purpose_name.isin(top_10_purposes)][['year', 'amount', 'purpose_name']]
# So many rows:
purpose_df.shape
```




    (17793, 3)




```python
purpose_df.head()
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
      <th>year</th>
      <th>amount</th>
      <th>purpose_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1977</td>
      <td>348718518.0</td>
      <td>Power generation/renewable sources</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1983</td>
      <td>79371799.0</td>
      <td>Rail transport</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1984</td>
      <td>212202942.0</td>
      <td>Rail transport</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1976</td>
      <td>193588873.0</td>
      <td>Power generation/renewable sources</td>
    </tr>
    <tr>
      <th>19</th>
      <td>1986</td>
      <td>53561256.0</td>
      <td>Power generation/renewable sources</td>
    </tr>
  </tbody>
</table>
</div>




```python
# For each purpose, we calculate the yearly sum:
purpose_dfs = []
for group in purpose_df.groupby('purpose_name'):
    purpose_name = group[0]
    group_df = group[1].groupby('year')['amount'].sum().to_frame()
    group_df.reset_index(inplace=True)
    group_df['purpose_name'] = group[0]
    purpose_dfs.append(group_df)
purpose = pd.concat(purpose_dfs, ignore_index = True)
purpose.head()
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
      <th>year</th>
      <th>amount</th>
      <th>purpose_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1974</td>
      <td>1.525672e+07</td>
      <td>Air transport</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1975</td>
      <td>1.582943e+07</td>
      <td>Air transport</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1977</td>
      <td>7.046280e+05</td>
      <td>Air transport</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1979</td>
      <td>7.342023e+07</td>
      <td>Air transport</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1980</td>
      <td>3.088275e+09</td>
      <td>Air transport</td>
    </tr>
  </tbody>
</table>
</div>




```python
purpose.shape
```




    (338, 3)




```python
# change amount to the unit of billion
purpose['amount'] = purpose['amount'] / 10**9

# # change the format to be year
purpose['year'] = pd.to_datetime(purpose['year'], format='%Y')
```


```python
max(purpose.amount)
```




    8.344866729




```python
# to change the purpose name
purpose_renamer_dic = {'Air transport': 'Air Transport',
 'Rail transport': 'Rail Transport',
 'Industrial development': 'Industrial Development',
 'Power generation/non-renewable sources': 'Power: Non-renewable',
 'RESCHEDULING AND REFINANCING': 'Rescheduling & Refinancing',
 'Import support (capital goods)': 'Import Support',
 'Social/ welfare services': 'Welfare Services',
 'Telecommunications': 'Telecommunications',
 'Power generation/renewable sources': 'Power: Renewable',
 'Sectors not specified': 'Not Specified'
 }
```


```python
purpose.replace(purpose_renamer_dic, inplace = True)
```


```python
# make the plot
alt.Chart(purpose).mark_line().encode(
    x = 'year',
    y = 'amount',
    color = 'purpose_name',
    strokeDash = 'purpose_name'
)
```



{{<figure src="/en/blog/2022-10-05-wrangling_files/purpose_by_year.png">}}

The problem with this chart is that it is so messy. We can visualize it in another way:


```python
alt.Chart(purpose).mark_rect().encode(
    x = alt.X(
        'year(year)',
        title = 'Year'
    ),
    y = alt.Y(
        'purpose_name:N',
        title = 'Coalesced Purposes of Donation',
        sort=alt.EncodingSortField(field='amount', op='sum', order='descending')
    ),
    color = alt.Color(
        'amount:Q',
        title = 'Amount (in Billion $`)',
    )
).properties(
    width = 720,
    height = 300,
    title = 'Top Ten Coalesced Purposes by Total Donation Amount (1973-2013)',
).configure_axis(
    labelFontSize=11,
    titleFontSize=12
)
```


{{<figure src="/en/blog/2022-10-05-wrangling_files/aid-heatmap.png">}}
