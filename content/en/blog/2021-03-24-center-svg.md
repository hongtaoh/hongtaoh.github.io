---
title: "How to Center an SVG in a div"
date: 2021-03-24T16:45:19-04:00
author: "Hongtao Hao"
slug: center-svg
draft: false
toc: false
---

I saw [this question](https://stackoverflow.com/questions/8639383/how-do-i-center-an-svg-in-a-div/66766245#66766245) on Stack Overflow: How to center an SVG in a div. 

[Spadar Shut](https://stackoverflow.com/a/8640044/13716814) suggested using `display: block` and `margin: auto`. Other people, like [David](https://stackoverflow.com/a/25185515/13716814) suggested using `<div style="text-align:center;">`. 

I tried both methods, and they worked. 

To sum, You can either add `style = "text-align: center;"` to the `div`, or add `style= "display: block; margin: auto"` to the `svg`.

```html
<div style="width: 900; text-align: center">
  <svg id="demo" width="500" height="100" 
       style="background-color: skyblue">
    <rect x="200" y="30" width="100" height="70" 
          style="fill: red"></rect>
  </svg>
</div>
```

or:

```html
<div style="width: 900">
  <svg id="demo" width="500" height="100" 
        style="background-color: skyblue; display: block; margin: auto">
    <rect x="200" y="30" width="100" height="70" style="fill: red"></rect>
  </svg>
</div>
```