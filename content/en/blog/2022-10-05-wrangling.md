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


```python
# We first get the donation data
donation_data = []
for group in df.groupby(['year', 'donor']):
    # total amount of donation in that year for this country
    total_yearly_donation = sum(group[1].amount)
    # year, country name, total
    donation_data.append(
        (group[0][0], group[0][1], total_yearly_donation))
donation_df = pd.DataFrame(
    donation_data, columns=['year','country','donation'])
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
      <td>46285863.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>39251336.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Canada</td>
      <td>437928427.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>France</td>
      <td>247189555.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Germany</td>
      <td>562232384.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Then we get the receiving data
receiving_data = []
for group in df.groupby(['year', 'recipient']):
    # total amount of receiving in that year for this country
    total_yearly_receiving = sum(group[1].amount)
    # year, country name, total
    receiving_data.append(
        (group[0][0], group[0][1], total_yearly_receiving))
receiving_df = pd.DataFrame(
    receiving_data, columns=['year','country','receiving'])
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
      <th>receiving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>3.120750e+08</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Chile</td>
      <td>8.805608e+07</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Colombia</td>
      <td>5.499448e+08</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Cyprus</td>
      <td>9.613414e+06</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>India</td>
      <td>2.285257e+09</td>
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




```python
# We have so many countries. It's difficult to visualize them all in one plot
# So I am assigning groups to countries. 
# Basically, I want to plot 4 countires in each figure
cntry_group_list = list(np.arange(1,13)) * 4
del cntry_group_list[-1]
```

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
      <th>receiving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>3.120750e+08</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Chile</td>
      <td>8.805608e+07</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Colombia</td>
      <td>5.499448e+08</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Cyprus</td>
      <td>9.613414e+06</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>India</td>
      <td>2.285257e+09</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1973</td>
      <td>Korea</td>
      <td>1.363707e+09</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1973</td>
      <td>Kuwait</td>
      <td>3.254830e+05</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1973</td>
      <td>Saudi Arabia</td>
      <td>6.509700e+04</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1973</td>
      <td>Thailand</td>
      <td>2.063634e+08</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1973</td>
      <td>United Arab Emirates</td>
      <td>6.509700e+04</td>
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
      <td>4.628586e+07</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>3.925134e+07</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Canada</td>
      <td>4.379284e+08</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>France</td>
      <td>2.471896e+08</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Germany</td>
      <td>5.622324e+08</td>
    </tr>
    <tr>
      <th>5</th>
      <td>1973</td>
      <td>Italy</td>
      <td>1.667191e+08</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1973</td>
      <td>Japan</td>
      <td>9.389659e+08</td>
    </tr>
    <tr>
      <th>7</th>
      <td>1973</td>
      <td>Netherlands</td>
      <td>1.627509e+08</td>
    </tr>
    <tr>
      <th>8</th>
      <td>1973</td>
      <td>Norway</td>
      <td>3.587485e+07</td>
    </tr>
    <tr>
      <th>9</th>
      <td>1973</td>
      <td>Sweden</td>
      <td>1.683693e+08</td>
    </tr>
    <tr>
      <th>10</th>
      <td>1973</td>
      <td>Switzerland</td>
      <td>1.406094e+07</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1973</td>
      <td>United Kingdom</td>
      <td>4.425792e+08</td>
    </tr>
    <tr>
      <th>12</th>
      <td>1973</td>
      <td>United States</td>
      <td>1.553264e+09</td>
    </tr>
  </tbody>
</table>
</div>



This is how I solved the problem:


```python
donation_dfs = []
for group in donation_df.groupby('year'):
    year = group[0]
    present_cntry = group[1].country.tolist()
    absent_cntry = [x for x in all_cntry if x not in present_cntry]
    absent_df = pd.DataFrame({
        'year': year,
        'country': absent_cntry,
        'donation': 0
    })
    dff = pd.concat([group[1], absent_df], ignore_index = True)
    
    dff.sort_values(by='country', ascending=True, inplace=True)
    dff['group'] = cntry_group_list
    donation_dfs.append(dff)
donation = pd.concat(donation_dfs, ignore_index = True)
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
      <th>group</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>46285863.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Austria</td>
      <td>0.0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>39251336.0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.0</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Canada</td>
      <td>437928427.0</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
receiving_dfs = []
for group in receiving_df.groupby('year'):
    year = group[0]
    present_cntry = group[1].country.tolist()
    absent_cntry = [x for x in all_cntry if x not in present_cntry]
    absent_df = pd.DataFrame({
        'year': year,
        'country': absent_cntry,
        'receiving': 0
    })
    dff = pd.concat([group[1], absent_df], ignore_index = True)
    dff.sort_values(by='country', ascending=True, inplace=True)
    dff['group'] = cntry_group_list
    receiving_dfs.append(dff)
receiving = pd.concat(receiving_dfs, ignore_index = True)
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
      <th>receiving</th>
      <th>group</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>0.0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Austria</td>
      <td>0.0</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>0.0</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>312075045.0</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Canada</td>
      <td>0.0</td>
      <td>5</td>
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
all_df['receiving'] = receiving['receiving']
all_df['d_minus_r'] = all_df['donation'] - all_df['receiving']
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
      <th>group</th>
      <th>receiving</th>
      <th>d_minus_r</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1973</td>
      <td>Australia</td>
      <td>46285863.0</td>
      <td>1</td>
      <td>0.0</td>
      <td>46285863.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1973</td>
      <td>Austria</td>
      <td>0.0</td>
      <td>2</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1973</td>
      <td>Belgium</td>
      <td>39251336.0</td>
      <td>3</td>
      <td>0.0</td>
      <td>39251336.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1973</td>
      <td>Brazil</td>
      <td>0.0</td>
      <td>4</td>
      <td>312075045.0</td>
      <td>-312075045.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1973</td>
      <td>Canada</td>
      <td>437928427.0</td>
      <td>5</td>
      <td>0.0</td>
      <td>437928427.0</td>
    </tr>
  </tbody>
</table>
</div>



To make the plot, we need to transform the format of year:


```python
all_df['year'] = pd.to_datetime(all_df['year'], format='%Y')
```


```python
# We only plot group 1, for simplicity
group1 = all_df[all_df.group == 1]
```


```python
alt.Chart(group1).mark_line().encode(
    x='year:T',
    y = alt.Y(
        'd_minus_r:Q',
        title = 'Donation minus receiving'
    ),
    color='country:N',
    strokeDash='country:N'
)
```




<!-- 
<div id="altair-viz-56fcfe660f104156b37f40a710f22623"></div>
<script type="text/javascript">
  (function(spec, embedOpt){
    let outputDiv = document.currentScript.previousElementSibling;
    if (outputDiv.id !== "altair-viz-56fcfe660f104156b37f40a710f22623") {
      outputDiv = document.getElementById("altair-viz-56fcfe660f104156b37f40a710f22623");
    }
    const paths = {
      "vega": "https://cdn.jsdelivr.net/npm//vega@5?noext",
      "vega-lib": "https://cdn.jsdelivr.net/npm//vega-lib?noext",
      "vega-lite": "https://cdn.jsdelivr.net/npm//vega-lite@4.8.1?noext",
      "vega-embed": "https://cdn.jsdelivr.net/npm//vega-embed@6?noext",
    };

    function loadScript(lib) {
      return new Promise(function(resolve, reject) {
        var s = document.createElement('script');
        s.src = paths[lib];
        s.async = true;
        s.onload = () => resolve(paths[lib]);
        s.onerror = () => reject(`Error loading script: `${paths[lib]}`);
        document.getElementsByTagName("head")[0].appendChild(s);
      });
    }

    function showError(err) {
      outputDiv.innerHTML = `<div class="error" style="color:red;">$`{err}</div>`;
      throw err;
    }

    function displayChart(vegaEmbed) {
      vegaEmbed(outputDiv, spec, embedOpt)
        .catch(err => showError(`Javascript Error: `${err.message}<br>This usually means there's a typo in your chart specification. See the javascript console for the full traceback.`));
    }

    if(typeof define === "function" && define.amd) {
      requirejs.config({paths});
      require(["vega-embed"], displayChart, err => showError(`Error loading script: $`{err.message}`));
    } else if (typeof vegaEmbed === "function") {
      displayChart(vegaEmbed);
    } else {
      loadScript("vega")
        .then(() => loadScript("vega-lite"))
        .then(() => loadScript("vega-embed"))
        .catch(showError)
        .then(() => displayChart(vegaEmbed));
    }
  })({"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}}, "data": {"name": "data-592f973e196e6bdac3759d7c7f078874"}, "mark": "line", "encoding": {"color": {"type": "nominal", "field": "country"}, "strokeDash": {"type": "nominal", "field": "country"}, "x": {"type": "temporal", "field": "year"}, "y": {"type": "quantitative", "field": "d_minus_r", "title": "Donation minus receiving"}}, "`$schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-592f973e196e6bdac3759d7c7f078874": [{"year": "1973-01-01T00:00:00", "country": "Australia", "donation": 46285863.0, "group": 1, "receiving": 0.0, "d_minus_r": 46285863.0}, {"year": "1973-01-01T00:00:00", "country": "France", "donation": 247189555.0, "group": 1, "receiving": 0.0, "d_minus_r": 247189555.0}, {"year": "1973-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1973-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1974-01-01T00:00:00", "country": "Australia", "donation": 26950877.0, "group": 1, "receiving": 0.0, "d_minus_r": 26950877.0}, {"year": "1974-01-01T00:00:00", "country": "France", "donation": 367384662.0, "group": 1, "receiving": 0.0, "d_minus_r": 367384662.0}, {"year": "1974-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1974-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1975-01-01T00:00:00", "country": "Australia", "donation": 77691781.0, "group": 1, "receiving": 0.0, "d_minus_r": 77691781.0}, {"year": "1975-01-01T00:00:00", "country": "France", "donation": 192416969.0, "group": 1, "receiving": 0.0, "d_minus_r": 192416969.0}, {"year": "1975-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1975-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1976-01-01T00:00:00", "country": "Australia", "donation": 27718070.0, "group": 1, "receiving": 0.0, "d_minus_r": 27718070.0}, {"year": "1976-01-01T00:00:00", "country": "France", "donation": 183658423.0, "group": 1, "receiving": 0.0, "d_minus_r": 183658423.0}, {"year": "1976-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1976-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1977-01-01T00:00:00", "country": "Australia", "donation": 72648152.0, "group": 1, "receiving": 0.0, "d_minus_r": 72648152.0}, {"year": "1977-01-01T00:00:00", "country": "France", "donation": 168900067.0, "group": 1, "receiving": 0.0, "d_minus_r": 168900067.0}, {"year": "1977-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1977-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1978-01-01T00:00:00", "country": "Australia", "donation": 47483698.0, "group": 1, "receiving": 0.0, "d_minus_r": 47483698.0}, {"year": "1978-01-01T00:00:00", "country": "France", "donation": 97437457.0, "group": 1, "receiving": 0.0, "d_minus_r": 97437457.0}, {"year": "1978-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1978-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1979-01-01T00:00:00", "country": "Australia", "donation": 9763598.0, "group": 1, "receiving": 0.0, "d_minus_r": 9763598.0}, {"year": "1979-01-01T00:00:00", "country": "France", "donation": 25058027.0, "group": 1, "receiving": 0.0, "d_minus_r": 25058027.0}, {"year": "1979-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1979-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1980-01-01T00:00:00", "country": "Australia", "donation": 23283790.0, "group": 1, "receiving": 54502260.0, "d_minus_r": -31218470.0}, {"year": "1980-01-01T00:00:00", "country": "France", "donation": 360323267.0, "group": 1, "receiving": 116609845.0, "d_minus_r": 243713422.0}, {"year": "1980-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1980-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1981-01-01T00:00:00", "country": "Australia", "donation": 18425831.0, "group": 1, "receiving": 747648005.0, "d_minus_r": -729222174.0}, {"year": "1981-01-01T00:00:00", "country": "France", "donation": 277458713.0, "group": 1, "receiving": 120922782.0, "d_minus_r": 156535931.0}, {"year": "1981-01-01T00:00:00", "country": "Liechtenstein", "donation": 199326.0, "group": 1, "receiving": 18264370.0, "d_minus_r": -18065044.0}, {"year": "1981-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1982-01-01T00:00:00", "country": "Australia", "donation": 10458375.0, "group": 1, "receiving": 2599450.0, "d_minus_r": 7858925.0}, {"year": "1982-01-01T00:00:00", "country": "France", "donation": 446543740.0, "group": 1, "receiving": 0.0, "d_minus_r": 446543740.0}, {"year": "1982-01-01T00:00:00", "country": "Liechtenstein", "donation": 734297.0, "group": 1, "receiving": 0.0, "d_minus_r": 734297.0}, {"year": "1982-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1983-01-01T00:00:00", "country": "Australia", "donation": 7388539.0, "group": 1, "receiving": 0.0, "d_minus_r": 7388539.0}, {"year": "1983-01-01T00:00:00", "country": "France", "donation": 164059809.0, "group": 1, "receiving": 0.0, "d_minus_r": 164059809.0}, {"year": "1983-01-01T00:00:00", "country": "Liechtenstein", "donation": 63282.0, "group": 1, "receiving": 0.0, "d_minus_r": 63282.0}, {"year": "1983-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1984-01-01T00:00:00", "country": "Australia", "donation": 3698286.0, "group": 1, "receiving": 0.0, "d_minus_r": 3698286.0}, {"year": "1984-01-01T00:00:00", "country": "France", "donation": 367362828.0, "group": 1, "receiving": 0.0, "d_minus_r": 367362828.0}, {"year": "1984-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1984-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1985-01-01T00:00:00", "country": "Australia", "donation": 6929573.0, "group": 1, "receiving": 0.0, "d_minus_r": 6929573.0}, {"year": "1985-01-01T00:00:00", "country": "France", "donation": 212486003.0, "group": 1, "receiving": 0.0, "d_minus_r": 212486003.0}, {"year": "1985-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1985-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1986-01-01T00:00:00", "country": "Australia", "donation": 25229662.0, "group": 1, "receiving": 0.0, "d_minus_r": 25229662.0}, {"year": "1986-01-01T00:00:00", "country": "France", "donation": 296394154.0, "group": 1, "receiving": 0.0, "d_minus_r": 296394154.0}, {"year": "1986-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1986-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1987-01-01T00:00:00", "country": "Australia", "donation": 18309923.0, "group": 1, "receiving": 0.0, "d_minus_r": 18309923.0}, {"year": "1987-01-01T00:00:00", "country": "France", "donation": 254311333.0, "group": 1, "receiving": 0.0, "d_minus_r": 254311333.0}, {"year": "1987-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1987-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1988-01-01T00:00:00", "country": "Australia", "donation": 1758350.0, "group": 1, "receiving": 0.0, "d_minus_r": 1758350.0}, {"year": "1988-01-01T00:00:00", "country": "France", "donation": 274040470.0, "group": 1, "receiving": 0.0, "d_minus_r": 274040470.0}, {"year": "1988-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1988-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1989-01-01T00:00:00", "country": "Australia", "donation": 163270223.0, "group": 1, "receiving": 0.0, "d_minus_r": 163270223.0}, {"year": "1989-01-01T00:00:00", "country": "France", "donation": 469783071.0, "group": 1, "receiving": 0.0, "d_minus_r": 469783071.0}, {"year": "1989-01-01T00:00:00", "country": "Liechtenstein", "donation": 11161.0, "group": 1, "receiving": 0.0, "d_minus_r": 11161.0}, {"year": "1989-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1990-01-01T00:00:00", "country": "Australia", "donation": 93432068.0, "group": 1, "receiving": 0.0, "d_minus_r": 93432068.0}, {"year": "1990-01-01T00:00:00", "country": "France", "donation": 586988135.0, "group": 1, "receiving": 0.0, "d_minus_r": 586988135.0}, {"year": "1990-01-01T00:00:00", "country": "Liechtenstein", "donation": 299897.0, "group": 1, "receiving": 0.0, "d_minus_r": 299897.0}, {"year": "1990-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1991-01-01T00:00:00", "country": "Australia", "donation": 518306838.0, "group": 1, "receiving": 0.0, "d_minus_r": 518306838.0}, {"year": "1991-01-01T00:00:00", "country": "France", "donation": 75995551.0, "group": 1, "receiving": 0.0, "d_minus_r": 75995551.0}, {"year": "1991-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1991-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1992-01-01T00:00:00", "country": "Australia", "donation": 57379649.0, "group": 1, "receiving": 193553716.0, "d_minus_r": -136174067.0}, {"year": "1992-01-01T00:00:00", "country": "France", "donation": 220827059.0, "group": 1, "receiving": 0.0, "d_minus_r": 220827059.0}, {"year": "1992-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1992-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1993-01-01T00:00:00", "country": "Australia", "donation": 37557879.0, "group": 1, "receiving": 79262311.0, "d_minus_r": -41704432.0}, {"year": "1993-01-01T00:00:00", "country": "France", "donation": 246959806.0, "group": 1, "receiving": 0.0, "d_minus_r": 246959806.0}, {"year": "1993-01-01T00:00:00", "country": "Liechtenstein", "donation": 124845.0, "group": 1, "receiving": 0.0, "d_minus_r": 124845.0}, {"year": "1993-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 9121048.0, "d_minus_r": -9121048.0}, {"year": "1994-01-01T00:00:00", "country": "Australia", "donation": 62005978.0, "group": 1, "receiving": 321233163.0, "d_minus_r": -259227185.0}, {"year": "1994-01-01T00:00:00", "country": "France", "donation": 242597753.0, "group": 1, "receiving": 0.0, "d_minus_r": 242597753.0}, {"year": "1994-01-01T00:00:00", "country": "Liechtenstein", "donation": 86232.0, "group": 1, "receiving": 0.0, "d_minus_r": 86232.0}, {"year": "1994-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 52553361.0, "d_minus_r": -52553361.0}, {"year": "1995-01-01T00:00:00", "country": "Australia", "donation": 87263724.0, "group": 1, "receiving": 343759453.0, "d_minus_r": -256495729.0}, {"year": "1995-01-01T00:00:00", "country": "France", "donation": 184288339.0, "group": 1, "receiving": 0.0, "d_minus_r": 184288339.0}, {"year": "1995-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1995-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 75586685.0, "d_minus_r": -75586685.0}, {"year": "1996-01-01T00:00:00", "country": "Australia", "donation": 80468022.0, "group": 1, "receiving": 0.0, "d_minus_r": 80468022.0}, {"year": "1996-01-01T00:00:00", "country": "France", "donation": 310518112.0, "group": 1, "receiving": 0.0, "d_minus_r": 310518112.0}, {"year": "1996-01-01T00:00:00", "country": "Liechtenstein", "donation": 141858.0, "group": 1, "receiving": 0.0, "d_minus_r": 141858.0}, {"year": "1996-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 120767538.0, "d_minus_r": -120767538.0}, {"year": "1997-01-01T00:00:00", "country": "Australia", "donation": 99085271.0, "group": 1, "receiving": 0.0, "d_minus_r": 99085271.0}, {"year": "1997-01-01T00:00:00", "country": "France", "donation": 181377579.0, "group": 1, "receiving": 0.0, "d_minus_r": 181377579.0}, {"year": "1997-01-01T00:00:00", "country": "Liechtenstein", "donation": 104054.0, "group": 1, "receiving": 0.0, "d_minus_r": 104054.0}, {"year": "1997-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 219387257.0, "d_minus_r": -219387257.0}, {"year": "1998-01-01T00:00:00", "country": "Australia", "donation": 60046657.0, "group": 1, "receiving": 133176980.0, "d_minus_r": -73130323.0}, {"year": "1998-01-01T00:00:00", "country": "France", "donation": 218643543.0, "group": 1, "receiving": 0.0, "d_minus_r": 218643543.0}, {"year": "1998-01-01T00:00:00", "country": "Liechtenstein", "donation": 98845.0, "group": 1, "receiving": 0.0, "d_minus_r": 98845.0}, {"year": "1998-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 22763026.0, "d_minus_r": -22763026.0}, {"year": "1999-01-01T00:00:00", "country": "Australia", "donation": 87775767.0, "group": 1, "receiving": 0.0, "d_minus_r": 87775767.0}, {"year": "1999-01-01T00:00:00", "country": "France", "donation": 195502185.0, "group": 1, "receiving": 0.0, "d_minus_r": 195502185.0}, {"year": "1999-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "1999-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 132187615.0, "d_minus_r": -132187615.0}, {"year": "2000-01-01T00:00:00", "country": "Australia", "donation": 115957719.0, "group": 1, "receiving": 0.0, "d_minus_r": 115957719.0}, {"year": "2000-01-01T00:00:00", "country": "France", "donation": 526519855.0, "group": 1, "receiving": 0.0, "d_minus_r": 526519855.0}, {"year": "2000-01-01T00:00:00", "country": "Liechtenstein", "donation": 380208.0, "group": 1, "receiving": 0.0, "d_minus_r": 380208.0}, {"year": "2000-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 24767414.0, "d_minus_r": -24767414.0}, {"year": "2001-01-01T00:00:00", "country": "Australia", "donation": 99427776.0, "group": 1, "receiving": 0.0, "d_minus_r": 99427776.0}, {"year": "2001-01-01T00:00:00", "country": "France", "donation": 621418995.0, "group": 1, "receiving": 0.0, "d_minus_r": 621418995.0}, {"year": "2001-01-01T00:00:00", "country": "Liechtenstein", "donation": 264468.0, "group": 1, "receiving": 0.0, "d_minus_r": 264468.0}, {"year": "2001-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 52945385.0, "d_minus_r": -52945385.0}, {"year": "2002-01-01T00:00:00", "country": "Australia", "donation": 45235182.0, "group": 1, "receiving": 696882923.0, "d_minus_r": -651647741.0}, {"year": "2002-01-01T00:00:00", "country": "France", "donation": 534709591.0, "group": 1, "receiving": 0.0, "d_minus_r": 534709591.0}, {"year": "2002-01-01T00:00:00", "country": "Liechtenstein", "donation": 147592.0, "group": 1, "receiving": 10053.0, "d_minus_r": 137539.0}, {"year": "2002-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 35860783.0, "d_minus_r": -35860783.0}, {"year": "2003-01-01T00:00:00", "country": "Australia", "donation": 94571888.0, "group": 1, "receiving": 0.0, "d_minus_r": 94571888.0}, {"year": "2003-01-01T00:00:00", "country": "France", "donation": 507020648.0, "group": 1, "receiving": 0.0, "d_minus_r": 507020648.0}, {"year": "2003-01-01T00:00:00", "country": "Liechtenstein", "donation": 544967.0, "group": 1, "receiving": 0.0, "d_minus_r": 544967.0}, {"year": "2003-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 41479968.0, "d_minus_r": -41479968.0}, {"year": "2004-01-01T00:00:00", "country": "Australia", "donation": 17256770.0, "group": 1, "receiving": 0.0, "d_minus_r": 17256770.0}, {"year": "2004-01-01T00:00:00", "country": "France", "donation": 596317633.0, "group": 1, "receiving": 0.0, "d_minus_r": 596317633.0}, {"year": "2004-01-01T00:00:00", "country": "Liechtenstein", "donation": 216815.0, "group": 1, "receiving": 0.0, "d_minus_r": 216815.0}, {"year": "2004-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 33775543.0, "d_minus_r": -33775543.0}, {"year": "2005-01-01T00:00:00", "country": "Australia", "donation": 28927690.0, "group": 1, "receiving": 0.0, "d_minus_r": 28927690.0}, {"year": "2005-01-01T00:00:00", "country": "France", "donation": 275332592.0, "group": 1, "receiving": 0.0, "d_minus_r": 275332592.0}, {"year": "2005-01-01T00:00:00", "country": "Liechtenstein", "donation": 494415.0, "group": 1, "receiving": 51947.0, "d_minus_r": 442468.0}, {"year": "2005-01-01T00:00:00", "country": "Slovak Republic", "donation": 326093.0, "group": 1, "receiving": 0.0, "d_minus_r": 326093.0}, {"year": "2006-01-01T00:00:00", "country": "Australia", "donation": 27058214.0, "group": 1, "receiving": 0.0, "d_minus_r": 27058214.0}, {"year": "2006-01-01T00:00:00", "country": "France", "donation": 464260209.0, "group": 1, "receiving": 0.0, "d_minus_r": 464260209.0}, {"year": "2006-01-01T00:00:00", "country": "Liechtenstein", "donation": 121077.0, "group": 1, "receiving": 0.0, "d_minus_r": 121077.0}, {"year": "2006-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2007-01-01T00:00:00", "country": "Australia", "donation": 13864351.0, "group": 1, "receiving": 0.0, "d_minus_r": 13864351.0}, {"year": "2007-01-01T00:00:00", "country": "France", "donation": 401771684.0, "group": 1, "receiving": 0.0, "d_minus_r": 401771684.0}, {"year": "2007-01-01T00:00:00", "country": "Liechtenstein", "donation": 199170.0, "group": 1, "receiving": 0.0, "d_minus_r": 199170.0}, {"year": "2007-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2008-01-01T00:00:00", "country": "Australia", "donation": 18754564.0, "group": 1, "receiving": 0.0, "d_minus_r": 18754564.0}, {"year": "2008-01-01T00:00:00", "country": "France", "donation": 246968178.0, "group": 1, "receiving": 8227.0, "d_minus_r": 246959951.0}, {"year": "2008-01-01T00:00:00", "country": "Liechtenstein", "donation": 138191.0, "group": 1, "receiving": 66713.0, "d_minus_r": 71478.0}, {"year": "2008-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2009-01-01T00:00:00", "country": "Australia", "donation": 17680084.0, "group": 1, "receiving": 0.0, "d_minus_r": 17680084.0}, {"year": "2009-01-01T00:00:00", "country": "France", "donation": 443827383.0, "group": 1, "receiving": 0.0, "d_minus_r": 443827383.0}, {"year": "2009-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2009-01-01T00:00:00", "country": "Slovak Republic", "donation": 14202.0, "group": 1, "receiving": 0.0, "d_minus_r": 14202.0}, {"year": "2010-01-01T00:00:00", "country": "Australia", "donation": 32806019.0, "group": 1, "receiving": 0.0, "d_minus_r": 32806019.0}, {"year": "2010-01-01T00:00:00", "country": "France", "donation": 479271279.0, "group": 1, "receiving": 0.0, "d_minus_r": 479271279.0}, {"year": "2010-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2010-01-01T00:00:00", "country": "Slovak Republic", "donation": 14132.0, "group": 1, "receiving": 0.0, "d_minus_r": 14132.0}, {"year": "2011-01-01T00:00:00", "country": "Australia", "donation": 41545539.0, "group": 1, "receiving": 0.0, "d_minus_r": 41545539.0}, {"year": "2011-01-01T00:00:00", "country": "France", "donation": 385580197.0, "group": 1, "receiving": 0.0, "d_minus_r": 385580197.0}, {"year": "2011-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2011-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2012-01-01T00:00:00", "country": "Australia", "donation": 55649016.0, "group": 1, "receiving": 0.0, "d_minus_r": 55649016.0}, {"year": "2012-01-01T00:00:00", "country": "France", "donation": 1857862442.0, "group": 1, "receiving": 0.0, "d_minus_r": 1857862442.0}, {"year": "2012-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2012-01-01T00:00:00", "country": "Slovak Republic", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2013-01-01T00:00:00", "country": "Australia", "donation": 67265056.0, "group": 1, "receiving": 0.0, "d_minus_r": 67265056.0}, {"year": "2013-01-01T00:00:00", "country": "France", "donation": 1247092339.0, "group": 1, "receiving": 0.0, "d_minus_r": 1247092339.0}, {"year": "2013-01-01T00:00:00", "country": "Liechtenstein", "donation": 0.0, "group": 1, "receiving": 0.0, "d_minus_r": 0.0}, {"year": "2013-01-01T00:00:00", "country": "Slovak Republic", "donation": 41147.0, "group": 1, "receiving": 0.0, "d_minus_r": 41147.0}]}}, {"mode": "vega-lite"});
</script> -->



![](/en/blog/2022-10-05-wrangling_files/diff_country_year.png)


```python
plt.figure(figsize=(10,8))
ax = sns.lineplot(x='year', y='d_minus_r', hue='country', data = group1)
ax.set(ylabel='Donation minus receiving')
```




    [Text(0, 0.5, 'Donation minus receiving')]




    
![png](/en/blog/2022-10-05-wrangling_files/2022-10-05-wrangling_30_1.png)
    


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
# make the plot
alt.Chart(purpose).mark_line().encode(
    x = 'year',
    y = 'amount',
    color = 'purpose_name',
    strokeDash = 'purpose_name'
)
```



<!-- 

<div id="altair-viz-310cb0df2eae4a69bbb2729ca37fc30d"></div>
<script type="text/javascript">
  (function(spec, embedOpt){
    let outputDiv = document.currentScript.previousElementSibling;
    if (outputDiv.id !== "altair-viz-310cb0df2eae4a69bbb2729ca37fc30d") {
      outputDiv = document.getElementById("altair-viz-310cb0df2eae4a69bbb2729ca37fc30d");
    }
    const paths = {
      "vega": "https://cdn.jsdelivr.net/npm//vega@5?noext",
      "vega-lib": "https://cdn.jsdelivr.net/npm//vega-lib?noext",
      "vega-lite": "https://cdn.jsdelivr.net/npm//vega-lite@4.8.1?noext",
      "vega-embed": "https://cdn.jsdelivr.net/npm//vega-embed@6?noext",
    };

    function loadScript(lib) {
      return new Promise(function(resolve, reject) {
        var s = document.createElement('script');
        s.src = paths[lib];
        s.async = true;
        s.onload = () => resolve(paths[lib]);
        s.onerror = () => reject(`Error loading script: $`{paths[lib]}`);
        document.getElementsByTagName("head")[0].appendChild(s);
      });
    }

    function showError(err) {
      outputDiv.innerHTML = `<div class="error" style="color:red;">`${err}</div>`;
      throw err;
    }

    function displayChart(vegaEmbed) {
      vegaEmbed(outputDiv, spec, embedOpt)
        .catch(err => showError(`Javascript Error: $`{err.message}<br>This usually means there's a typo in your chart specification. See the javascript console for the full traceback.`));
    }

    if(typeof define === "function" && define.amd) {
      requirejs.config({paths});
      require(["vega-embed"], displayChart, err => showError(`Error loading script: `${err.message}`));
    } else if (typeof vegaEmbed === "function") {
      displayChart(vegaEmbed);
    } else {
      loadScript("vega")
        .then(() => loadScript("vega-lite"))
        .then(() => loadScript("vega-embed"))
        .catch(showError)
        .then(() => displayChart(vegaEmbed));
    }
  })({"config": {"view": {"continuousWidth": 400, "continuousHeight": 300}}, "data": {"name": "data-87e0a6c1278a7eb77a80da8a9dd755d9"}, "mark": "line", "encoding": {"color": {"type": "nominal", "field": "purpose_name"}, "strokeDash": {"type": "nominal", "field": "purpose_name"}, "x": {"type": "quantitative", "field": "year"}, "y": {"type": "quantitative", "field": "amount"}}, "$`schema": "https://vega.github.io/schema/vega-lite/v4.8.1.json", "datasets": {"data-87e0a6c1278a7eb77a80da8a9dd755d9": [{"year": 1974, "amount": 15256725.0, "purpose_name": "Air transport"}, {"year": 1975, "amount": 15829434.0, "purpose_name": "Air transport"}, {"year": 1977, "amount": 704628.0, "purpose_name": "Air transport"}, {"year": 1979, "amount": 73420234.0, "purpose_name": "Air transport"}, {"year": 1980, "amount": 3088274857.0, "purpose_name": "Air transport"}, {"year": 1981, "amount": 4768108479.0, "purpose_name": "Air transport"}, {"year": 1982, "amount": 514466891.0, "purpose_name": "Air transport"}, {"year": 1983, "amount": 218134010.0, "purpose_name": "Air transport"}, {"year": 1984, "amount": 976488278.0, "purpose_name": "Air transport"}, {"year": 1985, "amount": 287676519.0, "purpose_name": "Air transport"}, {"year": 1986, "amount": 695113150.0, "purpose_name": "Air transport"}, {"year": 1987, "amount": 1012887955.0, "purpose_name": "Air transport"}, {"year": 1988, "amount": 96497158.0, "purpose_name": "Air transport"}, {"year": 1989, "amount": 98465542.0, "purpose_name": "Air transport"}, {"year": 1990, "amount": 254913681.0, "purpose_name": "Air transport"}, {"year": 1991, "amount": 310459678.0, "purpose_name": "Air transport"}, {"year": 1992, "amount": 1771359012.0, "purpose_name": "Air transport"}, {"year": 1993, "amount": 2121584979.0, "purpose_name": "Air transport"}, {"year": 1994, "amount": 4211207268.0, "purpose_name": "Air transport"}, {"year": 1995, "amount": 497807763.0, "purpose_name": "Air transport"}, {"year": 1996, "amount": 742750235.0, "purpose_name": "Air transport"}, {"year": 1997, "amount": 1605192456.0, "purpose_name": "Air transport"}, {"year": 1998, "amount": 634116769.0, "purpose_name": "Air transport"}, {"year": 1999, "amount": 5896935547.0, "purpose_name": "Air transport"}, {"year": 2000, "amount": 3089373356.0, "purpose_name": "Air transport"}, {"year": 2001, "amount": 2461432288.0, "purpose_name": "Air transport"}, {"year": 2002, "amount": 3409273587.0, "purpose_name": "Air transport"}, {"year": 2003, "amount": 1605190.0, "purpose_name": "Air transport"}, {"year": 2004, "amount": 513119049.0, "purpose_name": "Air transport"}, {"year": 2005, "amount": 410669869.0, "purpose_name": "Air transport"}, {"year": 2006, "amount": 278918.0, "purpose_name": "Air transport"}, {"year": 2007, "amount": 777396.0, "purpose_name": "Air transport"}, {"year": 2008, "amount": 947246.0, "purpose_name": "Air transport"}, {"year": 2009, "amount": 2206650.0, "purpose_name": "Air transport"}, {"year": 2010, "amount": 1015388.0, "purpose_name": "Air transport"}, {"year": 2011, "amount": 4105579.0, "purpose_name": "Air transport"}, {"year": 2012, "amount": 4397101.0, "purpose_name": "Air transport"}, {"year": 2013, "amount": 5627464.0, "purpose_name": "Air transport"}, {"year": 1973, "amount": 291886347.0, "purpose_name": "Import support (capital goods)"}, {"year": 1974, "amount": 227194054.0, "purpose_name": "Import support (capital goods)"}, {"year": 1975, "amount": 282632241.0, "purpose_name": "Import support (capital goods)"}, {"year": 1976, "amount": 154515986.0, "purpose_name": "Import support (capital goods)"}, {"year": 1977, "amount": 253556338.0, "purpose_name": "Import support (capital goods)"}, {"year": 1978, "amount": 18579093.0, "purpose_name": "Import support (capital goods)"}, {"year": 1979, "amount": 264125863.0, "purpose_name": "Import support (capital goods)"}, {"year": 1981, "amount": 40653634.0, "purpose_name": "Import support (capital goods)"}, {"year": 1982, "amount": 113498832.0, "purpose_name": "Import support (capital goods)"}, {"year": 1983, "amount": 86619358.0, "purpose_name": "Import support (capital goods)"}, {"year": 1984, "amount": 90227902.0, "purpose_name": "Import support (capital goods)"}, {"year": 1985, "amount": 77954263.0, "purpose_name": "Import support (capital goods)"}, {"year": 1986, "amount": 44726766.0, "purpose_name": "Import support (capital goods)"}, {"year": 1987, "amount": 60164507.0, "purpose_name": "Import support (capital goods)"}, {"year": 1988, "amount": 138310066.0, "purpose_name": "Import support (capital goods)"}, {"year": 1990, "amount": 50648790.0, "purpose_name": "Import support (capital goods)"}, {"year": 1991, "amount": 163177723.0, "purpose_name": "Import support (capital goods)"}, {"year": 1992, "amount": 7482017761.0, "purpose_name": "Import support (capital goods)"}, {"year": 1993, "amount": 49168610.0, "purpose_name": "Import support (capital goods)"}, {"year": 2003, "amount": 74620674.0, "purpose_name": "Import support (capital goods)"}, {"year": 2008, "amount": 71540.0, "purpose_name": "Import support (capital goods)"}, {"year": 2010, "amount": 1896.0, "purpose_name": "Import support (capital goods)"}, {"year": 1973, "amount": 200776443.0, "purpose_name": "Industrial development"}, {"year": 1974, "amount": 153995109.0, "purpose_name": "Industrial development"}, {"year": 1975, "amount": 141256857.0, "purpose_name": "Industrial development"}, {"year": 1976, "amount": 180729570.0, "purpose_name": "Industrial development"}, {"year": 1977, "amount": 352523660.0, "purpose_name": "Industrial development"}, {"year": 1978, "amount": 106052778.0, "purpose_name": "Industrial development"}, {"year": 1979, "amount": 308650682.0, "purpose_name": "Industrial development"}, {"year": 1980, "amount": 816335780.0, "purpose_name": "Industrial development"}, {"year": 1981, "amount": 634174424.0, "purpose_name": "Industrial development"}, {"year": 1982, "amount": 1370602905.0, "purpose_name": "Industrial development"}, {"year": 1983, "amount": 334406639.0, "purpose_name": "Industrial development"}, {"year": 1984, "amount": 1088866239.0, "purpose_name": "Industrial development"}, {"year": 1985, "amount": 940204559.0, "purpose_name": "Industrial development"}, {"year": 1986, "amount": 625537865.0, "purpose_name": "Industrial development"}, {"year": 1987, "amount": 380313458.0, "purpose_name": "Industrial development"}, {"year": 1988, "amount": 906410888.0, "purpose_name": "Industrial development"}, {"year": 1989, "amount": 388659858.0, "purpose_name": "Industrial development"}, {"year": 1990, "amount": 887708073.0, "purpose_name": "Industrial development"}, {"year": 1991, "amount": 1289413570.0, "purpose_name": "Industrial development"}, {"year": 1992, "amount": 1885616356.0, "purpose_name": "Industrial development"}, {"year": 1993, "amount": 1689134694.0, "purpose_name": "Industrial development"}, {"year": 1994, "amount": 1595567680.0, "purpose_name": "Industrial development"}, {"year": 1995, "amount": 679756647.0, "purpose_name": "Industrial development"}, {"year": 1996, "amount": 829747151.0, "purpose_name": "Industrial development"}, {"year": 1997, "amount": 766376994.0, "purpose_name": "Industrial development"}, {"year": 1998, "amount": 308069616.0, "purpose_name": "Industrial development"}, {"year": 1999, "amount": 40875883.0, "purpose_name": "Industrial development"}, {"year": 2000, "amount": 141462184.0, "purpose_name": "Industrial development"}, {"year": 2001, "amount": 494144961.0, "purpose_name": "Industrial development"}, {"year": 2002, "amount": 29064744.0, "purpose_name": "Industrial development"}, {"year": 2003, "amount": 32437533.0, "purpose_name": "Industrial development"}, {"year": 2004, "amount": 7331241.0, "purpose_name": "Industrial development"}, {"year": 2005, "amount": 6703637.0, "purpose_name": "Industrial development"}, {"year": 2006, "amount": 9213317.0, "purpose_name": "Industrial development"}, {"year": 2007, "amount": 2652404.0, "purpose_name": "Industrial development"}, {"year": 2008, "amount": 5278467.0, "purpose_name": "Industrial development"}, {"year": 2009, "amount": 7334558.0, "purpose_name": "Industrial development"}, {"year": 2010, "amount": 78456408.0, "purpose_name": "Industrial development"}, {"year": 2011, "amount": 15188216.0, "purpose_name": "Industrial development"}, {"year": 2012, "amount": 2569208.0, "purpose_name": "Industrial development"}, {"year": 2013, "amount": 4937413.0, "purpose_name": "Industrial development"}, {"year": 1973, "amount": 27825666.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1974, "amount": 39880530.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1975, "amount": 33166434.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1978, "amount": 95676536.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1980, "amount": 1584877308.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1981, "amount": 1096016261.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1982, "amount": 699994088.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1983, "amount": 211715759.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1984, "amount": 680944122.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1985, "amount": 182940134.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1986, "amount": 102087624.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1987, "amount": 51448529.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1988, "amount": 390801061.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1989, "amount": 42742542.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1990, "amount": 70680811.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1991, "amount": 3767416.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1992, "amount": 1494675086.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1993, "amount": 388132738.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1994, "amount": 1606345960.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1995, "amount": 770605554.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1996, "amount": 919658202.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1997, "amount": 1291967800.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1998, "amount": 961929323.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1999, "amount": 560713336.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2000, "amount": 3523908.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2001, "amount": 425306890.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2002, "amount": 308877253.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2003, "amount": 505564994.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2004, "amount": 1350242.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2005, "amount": 185195321.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2006, "amount": 616036.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2007, "amount": 132164.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2008, "amount": 888204.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2009, "amount": 86235329.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2010, "amount": 1612781.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2011, "amount": 200948.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2012, "amount": 49672035.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 2013, "amount": 250838515.0, "purpose_name": "Power generation/non-renewable sources"}, {"year": 1974, "amount": 124861445.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1976, "amount": 258500419.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1977, "amount": 348718518.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1978, "amount": 105991262.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1980, "amount": 110811408.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1981, "amount": 240636248.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1982, "amount": 484434111.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1983, "amount": 25073823.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1984, "amount": 479805457.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1985, "amount": 53703140.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1986, "amount": 164769263.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1987, "amount": 107755657.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1989, "amount": 910336207.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1990, "amount": 7572945.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1991, "amount": 66239728.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1992, "amount": 44999636.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1993, "amount": 90780001.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1994, "amount": 195628395.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1995, "amount": 518374380.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1996, "amount": 120338108.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1997, "amount": 470215385.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1998, "amount": 12774435.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1999, "amount": 158385618.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2000, "amount": 5131051.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2001, "amount": 204411855.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2002, "amount": 47637502.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2003, "amount": 16126597.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2004, "amount": 458289920.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2005, "amount": 182849973.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2006, "amount": 223553347.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2007, "amount": 15479641.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2008, "amount": 181083150.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2009, "amount": 242645248.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2010, "amount": 178425707.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2011, "amount": 1036425472.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2012, "amount": 389711520.0, "purpose_name": "Power generation/renewable sources"}, {"year": 2013, "amount": 336238470.0, "purpose_name": "Power generation/renewable sources"}, {"year": 1985, "amount": 1014259163.0, "purpose_name": "RESCHEDULING AND REFINANCING"}, {"year": 1989, "amount": 2606246263.0, "purpose_name": "RESCHEDULING AND REFINANCING"}, {"year": 1990, "amount": 2768322374.0, "purpose_name": "RESCHEDULING AND REFINANCING"}, {"year": 1992, "amount": 8344866729.0, "purpose_name": "RESCHEDULING AND REFINANCING"}, {"year": 1993, "amount": 63809098.0, "purpose_name": "RESCHEDULING AND REFINANCING"}, {"year": 1973, "amount": 95792628.0, "purpose_name": "Rail transport"}, {"year": 1974, "amount": 42563758.0, "purpose_name": "Rail transport"}, {"year": 1975, "amount": 60080677.0, "purpose_name": "Rail transport"}, {"year": 1976, "amount": 65859994.0, "purpose_name": "Rail transport"}, {"year": 1979, "amount": 57275683.0, "purpose_name": "Rail transport"}, {"year": 1980, "amount": 21776984.0, "purpose_name": "Rail transport"}, {"year": 1981, "amount": 230395196.0, "purpose_name": "Rail transport"}, {"year": 1982, "amount": 302371098.0, "purpose_name": "Rail transport"}, {"year": 1983, "amount": 441780960.0, "purpose_name": "Rail transport"}, {"year": 1984, "amount": 475235242.0, "purpose_name": "Rail transport"}, {"year": 1985, "amount": 134596484.0, "purpose_name": "Rail transport"}, {"year": 1986, "amount": 34843304.0, "purpose_name": "Rail transport"}, {"year": 1987, "amount": 85117635.0, "purpose_name": "Rail transport"}, {"year": 1988, "amount": 107365899.0, "purpose_name": "Rail transport"}, {"year": 1989, "amount": 73959565.0, "purpose_name": "Rail transport"}, {"year": 1990, "amount": 938279048.0, "purpose_name": "Rail transport"}, {"year": 1991, "amount": 185736779.0, "purpose_name": "Rail transport"}, {"year": 1992, "amount": 90394219.0, "purpose_name": "Rail transport"}, {"year": 1993, "amount": 341385289.0, "purpose_name": "Rail transport"}, {"year": 1994, "amount": 167636496.0, "purpose_name": "Rail transport"}, {"year": 1995, "amount": 172767802.0, "purpose_name": "Rail transport"}, {"year": 1996, "amount": 391229602.0, "purpose_name": "Rail transport"}, {"year": 1997, "amount": 694798740.0, "purpose_name": "Rail transport"}, {"year": 1998, "amount": 657668408.0, "purpose_name": "Rail transport"}, {"year": 1999, "amount": 800042829.0, "purpose_name": "Rail transport"}, {"year": 2000, "amount": 535115398.0, "purpose_name": "Rail transport"}, {"year": 2001, "amount": 78742572.0, "purpose_name": "Rail transport"}, {"year": 2002, "amount": 317903789.0, "purpose_name": "Rail transport"}, {"year": 2003, "amount": 386716108.0, "purpose_name": "Rail transport"}, {"year": 2004, "amount": 678991354.0, "purpose_name": "Rail transport"}, {"year": 2005, "amount": 223491419.0, "purpose_name": "Rail transport"}, {"year": 2006, "amount": 697248639.0, "purpose_name": "Rail transport"}, {"year": 2007, "amount": 161756943.0, "purpose_name": "Rail transport"}, {"year": 2008, "amount": 1945744781.0, "purpose_name": "Rail transport"}, {"year": 2009, "amount": 1726078347.0, "purpose_name": "Rail transport"}, {"year": 2010, "amount": 2769998813.0, "purpose_name": "Rail transport"}, {"year": 2011, "amount": 436777967.0, "purpose_name": "Rail transport"}, {"year": 2012, "amount": 1619976788.0, "purpose_name": "Rail transport"}, {"year": 2013, "amount": 2251372351.0, "purpose_name": "Rail transport"}, {"year": 1973, "amount": 417531876.0, "purpose_name": "Sectors not specified"}, {"year": 1974, "amount": 1494468694.0, "purpose_name": "Sectors not specified"}, {"year": 1975, "amount": 241789044.0, "purpose_name": "Sectors not specified"}, {"year": 1976, "amount": 20109296.0, "purpose_name": "Sectors not specified"}, {"year": 1977, "amount": 102934109.0, "purpose_name": "Sectors not specified"}, {"year": 1978, "amount": 612477467.0, "purpose_name": "Sectors not specified"}, {"year": 1979, "amount": 14480256.0, "purpose_name": "Sectors not specified"}, {"year": 1980, "amount": 625264932.0, "purpose_name": "Sectors not specified"}, {"year": 1981, "amount": 226495794.0, "purpose_name": "Sectors not specified"}, {"year": 1982, "amount": 28341818.0, "purpose_name": "Sectors not specified"}, {"year": 1983, "amount": 28053981.0, "purpose_name": "Sectors not specified"}, {"year": 1984, "amount": 85052932.0, "purpose_name": "Sectors not specified"}, {"year": 1985, "amount": 16971249.0, "purpose_name": "Sectors not specified"}, {"year": 1986, "amount": 39156366.0, "purpose_name": "Sectors not specified"}, {"year": 1987, "amount": 459634655.0, "purpose_name": "Sectors not specified"}, {"year": 1988, "amount": 44191434.0, "purpose_name": "Sectors not specified"}, {"year": 1989, "amount": 301154163.0, "purpose_name": "Sectors not specified"}, {"year": 1990, "amount": 274525730.0, "purpose_name": "Sectors not specified"}, {"year": 1991, "amount": 37421735.0, "purpose_name": "Sectors not specified"}, {"year": 1992, "amount": 24704771.0, "purpose_name": "Sectors not specified"}, {"year": 1993, "amount": 92344027.0, "purpose_name": "Sectors not specified"}, {"year": 1994, "amount": 469982188.0, "purpose_name": "Sectors not specified"}, {"year": 1995, "amount": 26583525.0, "purpose_name": "Sectors not specified"}, {"year": 1996, "amount": 20621181.0, "purpose_name": "Sectors not specified"}, {"year": 1997, "amount": 37674005.0, "purpose_name": "Sectors not specified"}, {"year": 1998, "amount": 49739040.0, "purpose_name": "Sectors not specified"}, {"year": 1999, "amount": 59971296.0, "purpose_name": "Sectors not specified"}, {"year": 2000, "amount": 37385312.0, "purpose_name": "Sectors not specified"}, {"year": 2001, "amount": 260114366.0, "purpose_name": "Sectors not specified"}, {"year": 2002, "amount": 145553578.0, "purpose_name": "Sectors not specified"}, {"year": 2003, "amount": 62468112.0, "purpose_name": "Sectors not specified"}, {"year": 2004, "amount": 56568847.0, "purpose_name": "Sectors not specified"}, {"year": 2005, "amount": 228654008.0, "purpose_name": "Sectors not specified"}, {"year": 2006, "amount": 208689208.0, "purpose_name": "Sectors not specified"}, {"year": 2007, "amount": 428405559.0, "purpose_name": "Sectors not specified"}, {"year": 2008, "amount": 211425901.0, "purpose_name": "Sectors not specified"}, {"year": 2009, "amount": 149861862.0, "purpose_name": "Sectors not specified"}, {"year": 2010, "amount": 272410052.0, "purpose_name": "Sectors not specified"}, {"year": 2011, "amount": 76129233.0, "purpose_name": "Sectors not specified"}, {"year": 2012, "amount": 264847704.0, "purpose_name": "Sectors not specified"}, {"year": 2013, "amount": 297164922.0, "purpose_name": "Sectors not specified"}, {"year": 1976, "amount": 22193818.0, "purpose_name": "Social/ welfare services"}, {"year": 1978, "amount": 179918453.0, "purpose_name": "Social/ welfare services"}, {"year": 1979, "amount": 13638901.0, "purpose_name": "Social/ welfare services"}, {"year": 1980, "amount": 26972340.0, "purpose_name": "Social/ welfare services"}, {"year": 1981, "amount": 644673.0, "purpose_name": "Social/ welfare services"}, {"year": 1982, "amount": 31654720.0, "purpose_name": "Social/ welfare services"}, {"year": 1983, "amount": 24671997.0, "purpose_name": "Social/ welfare services"}, {"year": 1984, "amount": 19766810.0, "purpose_name": "Social/ welfare services"}, {"year": 1985, "amount": 33496454.0, "purpose_name": "Social/ welfare services"}, {"year": 1986, "amount": 14344384.0, "purpose_name": "Social/ welfare services"}, {"year": 1987, "amount": 11481589.0, "purpose_name": "Social/ welfare services"}, {"year": 1988, "amount": 7938535.0, "purpose_name": "Social/ welfare services"}, {"year": 1989, "amount": 22345362.0, "purpose_name": "Social/ welfare services"}, {"year": 1990, "amount": 72342785.0, "purpose_name": "Social/ welfare services"}, {"year": 1991, "amount": 24186026.0, "purpose_name": "Social/ welfare services"}, {"year": 1992, "amount": 146417259.0, "purpose_name": "Social/ welfare services"}, {"year": 1993, "amount": 35408778.0, "purpose_name": "Social/ welfare services"}, {"year": 1994, "amount": 58670556.0, "purpose_name": "Social/ welfare services"}, {"year": 1995, "amount": 111991116.0, "purpose_name": "Social/ welfare services"}, {"year": 1996, "amount": 93499965.0, "purpose_name": "Social/ welfare services"}, {"year": 1997, "amount": 71418576.0, "purpose_name": "Social/ welfare services"}, {"year": 1998, "amount": 212562940.0, "purpose_name": "Social/ welfare services"}, {"year": 1999, "amount": 118053361.0, "purpose_name": "Social/ welfare services"}, {"year": 2000, "amount": 1419058679.0, "purpose_name": "Social/ welfare services"}, {"year": 2001, "amount": 418391339.0, "purpose_name": "Social/ welfare services"}, {"year": 2002, "amount": 189193002.0, "purpose_name": "Social/ welfare services"}, {"year": 2003, "amount": 413408249.0, "purpose_name": "Social/ welfare services"}, {"year": 2004, "amount": 796312991.0, "purpose_name": "Social/ welfare services"}, {"year": 2005, "amount": 766717891.0, "purpose_name": "Social/ welfare services"}, {"year": 2006, "amount": 1499146442.0, "purpose_name": "Social/ welfare services"}, {"year": 2007, "amount": 395077858.0, "purpose_name": "Social/ welfare services"}, {"year": 2008, "amount": 709105782.0, "purpose_name": "Social/ welfare services"}, {"year": 2009, "amount": 709783323.0, "purpose_name": "Social/ welfare services"}, {"year": 2010, "amount": 260603166.0, "purpose_name": "Social/ welfare services"}, {"year": 2011, "amount": 128044941.0, "purpose_name": "Social/ welfare services"}, {"year": 2012, "amount": 70213003.0, "purpose_name": "Social/ welfare services"}, {"year": 2013, "amount": 78053299.0, "purpose_name": "Social/ welfare services"}, {"year": 1973, "amount": 205122036.0, "purpose_name": "Telecommunications"}, {"year": 1974, "amount": 180475251.0, "purpose_name": "Telecommunications"}, {"year": 1975, "amount": 33166434.0, "purpose_name": "Telecommunications"}, {"year": 1976, "amount": 101268177.0, "purpose_name": "Telecommunications"}, {"year": 1977, "amount": 132007996.0, "purpose_name": "Telecommunications"}, {"year": 1978, "amount": 210273343.0, "purpose_name": "Telecommunications"}, {"year": 1980, "amount": 514178514.0, "purpose_name": "Telecommunications"}, {"year": 1981, "amount": 914341361.0, "purpose_name": "Telecommunications"}, {"year": 1982, "amount": 224573780.0, "purpose_name": "Telecommunications"}, {"year": 1983, "amount": 79964594.0, "purpose_name": "Telecommunications"}, {"year": 1984, "amount": 215829973.0, "purpose_name": "Telecommunications"}, {"year": 1985, "amount": 183388029.0, "purpose_name": "Telecommunications"}, {"year": 1986, "amount": 168285454.0, "purpose_name": "Telecommunications"}, {"year": 1987, "amount": 110144423.0, "purpose_name": "Telecommunications"}, {"year": 1988, "amount": 535073066.0, "purpose_name": "Telecommunications"}, {"year": 1989, "amount": 239013115.0, "purpose_name": "Telecommunications"}, {"year": 1990, "amount": 290465588.0, "purpose_name": "Telecommunications"}, {"year": 1991, "amount": 339762137.0, "purpose_name": "Telecommunications"}, {"year": 1992, "amount": 321971933.0, "purpose_name": "Telecommunications"}, {"year": 1993, "amount": 240701033.0, "purpose_name": "Telecommunications"}, {"year": 1994, "amount": 198625039.0, "purpose_name": "Telecommunications"}, {"year": 1995, "amount": 240902364.0, "purpose_name": "Telecommunications"}, {"year": 1996, "amount": 992246816.0, "purpose_name": "Telecommunications"}, {"year": 1997, "amount": 270129200.0, "purpose_name": "Telecommunications"}, {"year": 1998, "amount": 323717723.0, "purpose_name": "Telecommunications"}, {"year": 1999, "amount": 410867928.0, "purpose_name": "Telecommunications"}, {"year": 2000, "amount": 449102487.0, "purpose_name": "Telecommunications"}, {"year": 2001, "amount": 116120532.0, "purpose_name": "Telecommunications"}, {"year": 2002, "amount": 334067486.0, "purpose_name": "Telecommunications"}, {"year": 2003, "amount": 33823637.0, "purpose_name": "Telecommunications"}, {"year": 2004, "amount": 3685399.0, "purpose_name": "Telecommunications"}, {"year": 2005, "amount": 595366.0, "purpose_name": "Telecommunications"}, {"year": 2006, "amount": 198757.0, "purpose_name": "Telecommunications"}, {"year": 2007, "amount": 243478.0, "purpose_name": "Telecommunications"}, {"year": 2008, "amount": 62893.0, "purpose_name": "Telecommunications"}, {"year": 2009, "amount": 486644.0, "purpose_name": "Telecommunications"}, {"year": 2010, "amount": 2603981.0, "purpose_name": "Telecommunications"}, {"year": 2011, "amount": 774579.0, "purpose_name": "Telecommunications"}, {"year": 2012, "amount": 1611860.0, "purpose_name": "Telecommunications"}, {"year": 2013, "amount": 5520572.0, "purpose_name": "Telecommunications"}]}}, {"mode": "vega-lite"});
</script>

 -->

![](/en/blog/2022-10-05-wrangling_files/purpose_by_year.png)
