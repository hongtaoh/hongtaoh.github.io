---

title: Explaining and Implementing Hierarchical Clustering
date: 2022-08-24
author: Hongtao Hao
slug: hier_cluster
draft: false
toc: true
tags: ML

---

In this post, I'll explain what hierarchical clustering is and how to implement it with `Python`. 


```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```


```python
np.random.seed(1234)
N = 10 # number of points
matrix = np.random.rand(N, 2) # N points in 2 dimensional space
M = matrix * 10 # multiply ten so that the numbers are easier to understand. 
# Otherwise, all numbers are between 0 and 1
M
```




    array([[1.9151945 , 6.22108771],
           [4.37727739, 7.85358584],
           [7.79975808, 2.72592605],
           [2.76464255, 8.01872178],
           [9.58139354, 8.75932635],
           [3.5781727 , 5.00995126],
           [6.83462935, 7.12702027],
           [3.70250755, 5.61196186],
           [5.03083165, 0.1376845 ],
           [7.72826622, 8.82641191]])




```python
X = M[:, 0]
Y = M[:, 1]
from matplotlib.pyplot import figure
figure(figsize = (8,8), dpi = 100)
plt.scatter(X,Y)
plt.xlabel('X')
plt.ylabel('Y')
for i in range(N):
    plt.text(X[i], Y[i], str(i))
```


    
![png](/en/blog/2022-08-24-hierarchical-clustering_files/2022-08-24-hierarchical-clustering_4_0.png)
    


## Euclidean distance


```python
def eu_distance(x,y):
    d_square = np.sum((x-y)**2)
    d = np.sqrt(d_square)
    return d
```


```python
eu_distance(M[1], M[3])
```




    1.6210678581988338



## Distance matrix


```python
d_matrix = np.zeros((N, N))
for i in range(N):
    for j in range(N):
        if i < j:
            d_matrix[i,j] = eu_distance(M[i], M[j])
        else:
            d_matrix[i,j] = 10**5
```


```python
d_matrix_df = pd.DataFrame(d_matrix)
# display a portion for the sake of space:
d_matrix_df.iloc[0:6, 0:6]
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
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>100000.0</td>
      <td>2.954133</td>
      <td>6.844285</td>
      <td>1.988228</td>
      <td>8.075473</td>
      <td>2.057267</td>
    </tr>
    <tr>
      <th>1</th>
      <td>100000.0</td>
      <td>100000.000000</td>
      <td>6.164922</td>
      <td>1.621068</td>
      <td>5.282347</td>
      <td>2.953782</td>
    </tr>
    <tr>
      <th>2</th>
      <td>100000.0</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>7.305209</td>
      <td>6.290957</td>
      <td>4.799849</td>
    </tr>
    <tr>
      <th>3</th>
      <td>100000.0</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>6.856864</td>
      <td>3.116814</td>
    </tr>
    <tr>
      <th>4</th>
      <td>100000.0</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>7.077886</td>
    </tr>
    <tr>
      <th>5</th>
      <td>100000.0</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
      <td>100000.000000</td>
    </tr>
  </tbody>
</table>
</div>



## How does hierarchical clustering work

In our example, we have 10 data points, or nodes. The first step is to group the two nodes whose distance is the smallest among all distances. 


```python
all_ds = np.unique(d_matrix) # all unique distances
len(all_ds)
```




    46




```python
for i in range(len(all_ds)):
    print(np.where(d_matrix == np.sort(all_ds)[i]))
```

    (array([5]), array([7]))
    (array([1]), array([3]))
    (array([4]), array([9]))
    (array([0]), array([7]))
    (array([6]), array([9]))
    (array([0]), array([3]))
    (array([0]), array([5]))
    (array([1]), array([7]))
    (array([1]), array([6]))
    (array([3]), array([7]))
    (array([1]), array([5]))
    (array([0]), array([1]))
    (array([3]), array([5]))
    (array([4]), array([6]))
    (array([6]), array([7]))
    (array([1]), array([9]))
    (array([2]), array([8]))
    (array([5]), array([6]))
    (array([3]), array([6]))
    (array([2]), array([6]))
    (array([2]), array([5]))
    (array([0]), array([6]))
    (array([2]), array([7]))
    (array([3]), array([9]))
    (array([5]), array([8]))
    (array([7]), array([9]))
    (array([1]), array([4]))
    (array([7]), array([8]))
    (array([5]), array([9]))
    (array([2]), array([9]))
    (array([1]), array([2]))
    (array([2]), array([4]))
    (array([0]), array([9]))
    (array([4]), array([7]))
    (array([0]), array([8]))
    (array([0]), array([2]))
    (array([3]), array([4]))
    (array([4]), array([5]))
    (array([6]), array([8]))
    (array([2]), array([3]))
    (array([1]), array([8]))
    (array([0]), array([4]))
    (array([3]), array([8]))
    (array([8]), array([9]))
    (array([4]), array([8]))
    (array([0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6,
           6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8,
           8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]), array([0, 0, 1, 0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 5, 0,
           1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7,
           8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))


The first step is to group Node 5 and Node 7 together because their distance is the smallest. Then 1 and 3. Then 4 and 9. Then we have 0 and 7. But 7 is already in the group of `[5,7]`. What should we do here? An intuitive solution is putting 0 into the group of `[5,7]`, so we have a larger group: `[5,7,0]`. Then we have 6 and 9. Similarly, we can put 6 into the group of `[4,9]` and have larger group of `[4,9,6]`. 

Right now we have the following clusters:
  - 5, 7, 0
  - 1, 3
  - 4, 9, 6

Keep going in the above list and we have 0 and 3. But these two are already part of the above clusters. Because the pair of 0 and 3 occurs after 1 and 3, we know that the distance between 1 and 3 is shorter, so we do not change the cluster of 1 and 3. The pair of 0 and 3 also occurs after that of 0 and 7, so the distance between 0 and 7 is shorter. That's why we do not change the cluster of `[5, 7, 0]`. The same is for the node pairs below `[0, 3]` until the pair of 2 and 8. Then we can have another cluster: 
  - 2, 8
  
Then we stop. 
  
To summarize our above procedure: we sort pairs by their distance in ascending order. From top to below, if neither nodes is part of a cluster, we group the two together to form a cluster. We keep going, and if one of the node (say, Node `a`) in a pair is part of a cluster (say, Cluster `C`) whereas the other node (say, Node `b`) is not, we put Node `b` into the cluster of `C`. If both nodes have already been part of the clusters we had, then we do not change anything and keep moving down in the sorted list. We keep doing this until all nodes are part of the clusters we have. 

All seem to be good but there are at least two problems in our above procedure. 

### The first problem: we did not merge clusters with smaller distances first

First of all, it seems strange that we have a cluster of `[2,8]`. We can see that the distance between Node2 and Node8 is larger than the distance between the cluster of `[5,7,0]` and `[1,3]`. So, before we merge the cluster of `[5,7,0]` and `[2,3]` into a larger cluster, we should not merge Node2 and Node8. 

You may say that an easy solution would be to have this rule: the last pair should be separated. That is to say, we have two clusters: `[2]` and `[8]`. However, this does not solve the problem. Let's say we have another two nodes: Node10 and Node11. These two are very far away from the rest. Let's say their coordinates are something like `$(10^6, 10^6)$`. The distance between Node10 and Node11 is smaller than the smallest distance between any of them and any of the nodes 0-9. That means we will merge Node2 and Node8, and then we have Node10 and Node11 left. According to this rule, we will have two seperate clusters: `[10]` and `[11]`.

Do you see the problem? With this rule, we are still grouping `[2]` and `[8]` before we gruop `[5,7,0]` and `[1,3]`. Therefore, the above rule does not solve the problem. What should we do then?

If you follow my thoughts, you know that the problem we face now is that we should gruop `[5,7,0]` and `[1,3]` before grouping `[2]` and `[8]` but our procedure, or algorithm, does not allow us to do so. Then we need to modify our algorithm. 

Why should we gruop `[5,7,0]` and `[1,3]` before grouping `[2]` and `[8]`? Because the distance between `[5,7,0]` and `[1,3]` is smaller than that between `[2]` and `[8]`. Then, a simple solution is that we calculate distances betweenn all cluster pairs, and then merge the pair with the smallest diestance. 

To do so, we should view a node which is not part of a cluster as a cluster. That's to say, before we start clustering anything, in our example, we have ten clusters: `[0]`, `[1]`, `[2]`, `[3]`, `[4]`, `[5]`, `[6]`, `[7]`, `[8]`, `[9]`.

But we have a problem: how do we quantify the distance between two clusters when at least one of the two contains more than one nodes? It's easy to measure the distance between two clusters with single node: we just calculate their Euclidean distance, but for clusters with more nodes, we get lost. For example, I ask you, what is the distance between the cluster of `[5,7,0]` and `[1,3]`? This issue is related to the second problem. 

### Second problem: which cluster to join?

In our original procedure, in the fourth step, we have Node0 and Node7 but Node7 is already part of `[5, 7]`. We decided to let Node0 join `[5, 7]`, but there is a problem. 

Suppose the situation is like this:

![](/en/blog/2022-08-24-hierarchical-clustering_files/cluster_challenge.png)

The distance between Node0 and Node7 is smaller than that between Node0 and Node3. Then should Node0 be part of the cluster of `[1,3]` or `[5,7]`?

It all comes down to how we measure distances between clusters. You can say that between the smallest distance for Node0 (or the cluster of `[0]`) is between it and Node7, which is part of the cluster of `[5,7]`, it should join `[5,7]`. But on the other hand, you can say that when you sum up the distances: 

`$$d_{0}^{1} + d_{0}^{3} < d_{0}^{5} + d_{0}^{7} $$`

We can see that it's better to let Node0 join the cluster of `[1,3]`. 

Or that because the largest distance between `[0]` and `[1,3]` is smaller than the largest distance between `[0]` and `[5,7]`, we should let Node0 join `[1,3]` instead of `[5,7]`. 

## Three methods to measure distance between clusters

In fact, the above are the three methods of hierchical clustering:

  - **Single linkage**: the distance between cluster A and cluster B is defined as the smallest distance between each node in cluster A and each nodes in cluster B. In the above example, the distance between `[0]` and `[5,7]` is that between Node0 and Node7. And the distance between `[0]` and `[1,3]` is that between Node0 and Node3. Then we should merge `[0]` and `[5,7]` together because their distance is **SMALLER**. 
  
  - **Complete linkage**: the distance between cluster A and cluster B is defined as the largest distance between each node in cluster A and each node in cluster B. In the above example, the distance between `[0]` and `[5,7]` is that between Node0 and Node5. And the distance between `[0]` and `[1,3]` is that between Node0 and Node1. Then we should merge `[0]` and `[1,3]` together because their distance is **SMALLER**. 
  
  - **Average linkage**: the distance between cluster A and cluster B is defined as the average distance between each node in cluster A and each node in cluster B. In the above example, the distance between `[0]` and `[5,7]` is `$\frac{1}{2}(d_{0}^{1} + d_{5}^{7})$`. And the distance between `[0]` and `[1,3]` is `$\frac{1}{2}(d_{0}^{1} + d_{5}^{7})$`. Then we should merge `[0]` and `[1,3]` together because their distance is **SMALLER**. 
  
I guess you will know how to compute the distance between `[5,7]` and `[1,3]`: we have four distance pairs: `$d_{5}^{1}$`, `$d_{5}^{3}$`, `$d_{7}^{1}$`, `$d_{7}^{3}$`. If we use single linkage, we use the smallest among the four. If we use complete linkage, we use the largest. For average linkage, we compute the mean of all four distances. 

### Implementing the three methods


```python
def single_linkage(cluster1, cluster2, d_matrix):
    dmin = 10**10
    for i in cluster1:
        for j in cluster2:
            if i < j:
                d = d_matrix[i,j]
            else:
                d = d_matrix[j,i]
            if d < dmin:
                dmin = d
    return dmin
```


```python
def complete_linkage(cluster1, cluster2, d_matrix):
    dmax = 0
    for i in cluster1:
        for j in cluster2:
            if i < j:
                d = d_matrix[i,j]
            else:
                d = d_matrix[j,i]
            if d > dmax:
                dmax = d
    return dmax
```


```python
def average_linkage(cluster1, cluster2, d_matrix):
    d_list = []
    for i in cluster1:
        for j in cluster2:
            if i < j:
                d = d_matrix[i,j]
            else:
                d = d_matrix[j,i]
            d_list.append(d)
    return np.mean(d_list)
```

In fact, both single linkage and complete linkage can use the method like in `average_linkage`: get the list of all distances and get the min (for single linkage) or max (for complete linkage):

```py
def single_linkage(cluster1, cluster2, d_matrix):
    d_list = []
    for i in cluster1:
        for j in cluster2:
            if i < j:
                d = d_matrix[i,j]
            else:
                d = d_matrix[j,i]
            d_list.append(d)
    return min(d_list)
    
def complete_linkage(cluster1, cluster2, d_matrix):
    d_list = []
    for i in cluster1:
        for j in cluster2:
            if i < j:
                d = d_matrix[i,j]
            else:
                d = d_matrix[j,i]
            d_list.append(d)
    return max(d_list)
```

## Algorithm

Let's recap our algorithm. We start with 10 nodes. We consider each node as a separate cluster. Then we group two clusters with the smallest distances together. Then we keep doing the same, until the number of cluster is what we require. 

Let's implemente it. Exciting, isn't it?


```python
# how we initiate clusters
clusters = [[i] for i in range(len(M))]
clusters
```




    [[0], [1], [2], [3], [4], [5], [6], [7], [8], [9]]




```python
# to understand the following function, you need to know:
[0] + [1]
# will be:
```




    [0, 1]




```python
def hierarchical_clustering(M, d_matrix, target_cluster_num, method='single'):
    clusters = [[i] for i in range(len(M))]
    while len(clusters) > target_cluster_num:
        dmax = np.max(d_matrix) + 1
        dmin = dmax
        min_cluster1 = None
        min_cluster2 = None
        for cluster1 in clusters:
            for cluster2 in clusters:
                if cluster1 != cluster2:
                    assert method in [
                        'single', 'complete', 'average'], 'You have to choose from single, complete, and average'
                    if method == 'single':
                        d = single_linkage(cluster1, cluster2, d_matrix)
                    elif method == 'complete':
                        d = complete_linkage(cluster1, cluster2, d_matrix)
                    elif method == 'average':
                        d = average_linkage(cluster1, cluster2, d_matrix)
                        
                    if d < dmin:
                        dmin = d
                        min_cluster1 = cluster1
                        min_cluster2 = cluster2
        clusters.remove(min_cluster1)
        clusters.remove(min_cluster2)
        clusters.append(min_cluster1 + min_cluster2)
    return clusters
```

## Testing


```python
clusters = hierarchical_clustering(M, d_matrix, 3, method='complete')
clusters
```




    [[1, 3, 0, 5, 7], [6, 4, 9], [2, 8]]




```python
clustering_result = []
for i in range(len(M)):
    for c in clusters:
        c_index = clusters.index(c)
        if i in c:
            clustering_result.append(c_index)
```


```python
clustering_result
```




    [0, 0, 2, 0, 1, 0, 1, 0, 2, 1]




```python
## Scikit learn:
from sklearn.cluster import AgglomerativeClustering
sklearn_clustering = AgglomerativeClustering(n_clusters=3, affinity='euclidean',  linkage='complete').fit(M)
sklearn_clustering.labels_
```




    array([2, 2, 0, 2, 1, 2, 1, 2, 0, 1])




```python
# scipy
from scipy.cluster.hierarchy import linkage
from scipy.cluster.hierarchy import cut_tree

# cityblock will mean mahanttan
scipy_clustering = linkage(M, method = "complete", metric="euclidean")
```


```python
print(cut_tree(
    scipy_clustering, n_clusters = 3).T)
```

    [[0 0 1 0 2 0 2 0 1 2]]


The three results should be interpreted this way: those numbers are the cluster number for each node. For example, in my clustering result, i.e., `clustering_result`, Node0 is in Cluster0, Node1 is in Cluster0, Node2 is in Cluster2, etc. Although the three results look different, they are actually the same: they just use different clustering numbers. 

## Tie breaking


```python
np.random.seed(1234)
N2 = 50 # number of points
matrix = np.random.rand(N2, 2) # N points in 2 dimensional space
M2 = matrix * 10 # multiply ten so that the numbers are easier to understand. 
# Otherwise, all numbers are between 0 and 1
M2
```




    array([[1.9151945 , 6.22108771],
           [4.37727739, 7.85358584],
           [7.79975808, 2.72592605],
           [2.76464255, 8.01872178],
           [9.58139354, 8.75932635],
           [3.5781727 , 5.00995126],
           [6.83462935, 7.12702027],
           [3.70250755, 5.61196186],
           [5.03083165, 0.1376845 ],
           [7.72826622, 8.82641191],
           [3.64885984, 6.15396178],
           [0.75381242, 3.68824006],
           [9.33140102, 6.51378143],
           [3.97202578, 7.88730143],
           [3.16836122, 5.68098653],
           [8.6912739 , 4.36173424],
           [8.02147642, 1.43766825],
           [7.04260971, 7.04581308],
           [2.18792106, 9.24867629],
           [4.42140755, 9.09315959],
           [0.59809223, 1.84287084],
           [0.47355279, 6.74880944],
           [5.9462478 , 5.33310163],
           [0.43324063, 5.6143308 ],
           [3.29668446, 5.02966833],
           [1.11894318, 6.07193706],
           [5.65944643, 0.06764062],
           [6.17441709, 9.12122886],
           [7.90524133, 9.92081466],
           [9.58801762, 7.91964135],
           [2.8525096 , 6.24916705],
           [4.78093796, 1.95675179],
           [3.82317452, 0.53873685],
           [4.51648408, 9.82004742],
           [1.239427  , 1.19380898],
           [7.38523056, 5.87303633],
           [4.71632534, 1.07126817],
           [2.29218565, 8.99965195],
           [4.16753538, 5.35851663],
           [0.06208517, 3.00641706],
           [4.36893172, 6.12148997],
           [9.18198075, 6.2573667 ],
           [7.05997565, 1.49833716],
           [7.46063409, 8.31006992],
           [6.33725769, 4.38309881],
           [1.52572775, 5.68409615],
           [5.28224278, 9.51428764],
           [4.80359179, 5.02559563],
           [5.36878193, 8.19202067],
           [0.57115638, 6.69421743]])




```python
X = M2[:, 0]
Y = M2[:, 1]
from matplotlib.pyplot import figure
figure(figsize = (10,10), dpi = 100)
plt.scatter(X,Y)
plt.xlabel('X')
plt.ylabel('Y')
for i in range(N2):
    plt.text(X[i], Y[i], str(i))
```


    
![png](/en/blog/2022-08-24-hierarchical-clustering_files/2022-08-24-hierarchical-clustering_38_0.png)
    



```python
d_matrix2 = np.zeros((N2, N2))
for i in range(N2):
    for j in range(N2):
        if i < j:
            d_matrix2[i,j] = eu_distance(M2[i], M2[j])
        else:
            d_matrix2[i,j] = 10**5
```


```python
all_ds2 = np.unique(d_matrix2) # all unique distances
len(all_ds2)
```




    1226




```python
((1+N2)*N2)/2 + 1
```




    1276.0




```python

```
