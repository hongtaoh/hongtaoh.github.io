---
title: "OpenAlex FAQ"
date: 2022-01-11T16:00:49-06:00
author: "Hongtao Hao"
slug: openalex
draft: false
toc: false
---

[OpenAlex](https://openalex.org/) just released its API and its webiste is coming soon, which is exciting. 

## Search by DOI

If you want to get data from OpenAlex, but don't have openalex work id, you can get the same information via paper DOI. [The API Dcoumentataion mentions this](https://docs.openalex.org/api/get-single-entities).

For example, you have this DOI: `10.1109/TVCG.2020.3030380`.

First, you can access this paper, via two urls: 
   - http://dx.doi.org/10.1109/TVCG.2020.3030380
   - https://doi.org/10.1109/TVCG.2020.3030380

These two urls point to the same destination: https://ieeexplore.ieee.org/document/9222338.

Okay, now, tell me how to access OpenAlex data based on DOI. 

According to the [The API Dcoumentataion](https://docs.openalex.org/api/get-single-entities), you can access it in these ways:

   - https://api.openalex.org/works/doi:10.1109/TVCG.2020.3030380
   - https://api.openalex.org/works/http://dx.doi.org/10.1109/TVCG.2020.3030380
   - https://api.openalex.org/works/https://doi.org/10.1109/TVCG.2020.3030380

## Search by title

According to [official documentation](https://docs.openalex.org/api/get-lists-of-entities#search), we can search by title this way:

```
https://api.openalex.org/works?filter=title.search:cubist
```

The above url will show all the papers whose title contain the word of cubist. 

If you have the exact title, just put it at the end of the url, for example,

```
https://api.openalex.org/works?filter=title.search:Efficient simplification of point-sampled surfaces
```

If the title your are quering contains '&', ':', '?, and/or ',', rememeber to replace them with `''`. This is because both '&' and ':' are quering parameters and will rusult in errors when quering. 

If you use `python`, you can do it this way:

```py
import re
title = 'this: is a bad title & not recommended for you, right?'
title_converted = re.sub(r'\:|\?|\&|\,', '', title)
```

## Search for host venues

Reference:
  1. https://docs.openalex.org/api/get-lists-of-entities#venues-filters
  2. https://docs.openalex.org/about-the-data/venue

### By display name

```
https://api.openalex.org/venues?filter=display_name.search:communication and sport
```

### By ISSN

```
https://api.openalex.org/venues?filter=issn:2374-3670
```

### By ISSN_L

```
https://api.openalex.org/venues/issn_l:2167-8359
```

Note that if you use `?filter=`, then the results are usually more than one. 

## Pagination 

In list of entities, OpenAlex's default is 25 items per page. You can view the first 10000 items by setting `page` and `per-page` parameters. 

For example,

```
https://api.openalex.org/concepts
```

You can set them this way:

```
https://api.openalex.org/concepts?per-page=50&page=50
```

Another example,

```
https://api.openalex.org/works?filter=host_venue.id:V84775595
```

You can set the two parameters this way:

```
https://api.openalex.org/works?filter=host_venue.id:V84775595&page=2&per-page=50
```

I learned the trick of `&` here: [Everything You Need to Know About API Pagination](https://nordicapis.com/everything-you-need-to-know-about-api-pagination/) by [J Simpson](https://nordicapis.com/author/jsimpson/). 

## Query speed

- Quering paper title is much faster than quering OpenAlex Work ID, or paper DOI.
- Being in the polite pool (i.e., disclosing your email) is not faster than in the common pool. 
- The speed of two query methods for DOI, i.e., `works/doi:DOI` and `works/https://doi.org/DOI`, do not vary significantly. Each query roughly takes 6-10 seconds. 
- The speed of quering OpenAlex Work ID and that of querying paper DOI do not differ significantly. Querying DOI might be slightly faster. 