---
title: "How to Embed An Observable Notebook in A Stand-alone Web Page"
date: 2020-11-02T09:03:10-05:00
author: Hongtao Hao
slug: exporting-observable-notebook
draft: false
toc: true
---

{{<block class="warning">}}
If you have multiple Observable notebooks in one website, it is better to make all variables unique. 
{{<end>}}

After designing data visualizations on [ObserbableHQ](https://observablehq.com), you might want to present your them in a stand-alone webpage. This post is to teach you how to do it. 

If you find my post not helpful, you can refer to [Advanced Embedding and Downloading](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks). 

## Embed directly via iframe

It's relatively easy to embed a visualization directly . For [this example](https://observablehq.com/@hongtaoh/explrable-data) of mine, to embed [this chart](https://observablehq.com/@hongtaoh/explrable-data#D_chart), I just need the following codes:

```
<iframe width="100%" height="534" frameborder="0"
  src="https://observablehq.com/embed/@hongtaoh/explrable-data?cell=reset&cell=add&cell=D_chart"></iframe>
```

<iframe width="100%" height="534" frameborder="0"
  src="https://observablehq.com/embed/@hongtaoh/explrable-data?cell=reset&cell=add&cell=D_chart"></iframe>

To get the above lines of code, on your Observable Notebook, just click the `...` menu on the left side of a cell, then choose "Embed". You will be directed to select cells to embed. Do as instructed. If you encounter problems with embedding, refer to [Handy Embed Code Generator](https://observablehq.com/@jashkenas/handy-embed-code-generator), or [Troubleshooting Embedding](https://observablehq.com/@observablehq/troubleshooting-embedding).

{{<block class="tip">}}

You might need to go to the top of your notebook. Next to "(Re)publish" and "Like", you can see the `...` menu. Click it and choose "Switch to classic". Then follow the above instructions and you'll be able to see the "Embed" option in the cell you choose. 

{{<end>}}

As you can see, you don't have much freedom to edit the style of the elements, such as the font, and the positions of the buttons. And the loading may be slow.  

## Embed manually

It's not very difficult to embed your visualizations manually in a stand-alone webpage. I am providing a minimal example [here](https://hongtaoh.com/d3/explorable-data/), whose source codes can be seen [here](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/static/d3/explorable-data/index.html). Go to the buttom of this source codes file, and pay attention to the codes between `<script type="module">` and `</script>`. 

Except for the part of "HTML within the `<body>` ", all other codes should be found between `<script type="module">` and `</script>`, which can be either placed within `<head>` or `<body>`.

### Import `Runtime` and  `Inspector`

First, import `Runtime` and `Inspector`:

```javascript
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
```

### Import your ObservableHQ notebook

Then, we import the notebook you want to export. You can name it anything you like, not necessarily as `D3ExplorableNotebook`. You'll find that the notebook is always imported from `https://api.observablehq.com/@yourUsername/yourNotebook.js?v=3`. Edit it based on your own Observable username and your notebook URL. 

```javascript
import D3ExplorableNotebook from "https://api.observablehq.com/@hongtaoh/explrable-data.js?v=3";
```

One thing worth noticing is that you can export private notebook as well, for example, forked notebooks you are working on, or those you don't want other people to see yet. To do that, go to the homepage of ObservableHQ, on the left side of the page, click "notebooks", find your unpublished notebook, right click the `...` menu, and choose "Enable link sharing". For private notebooks, the username will be simply `d`, and the notebook id is that after `d` shown in your notebook's URL. 

### Assign `id` to cells you are importing

Next, we define an object in which we assign `id` to the cells we want to import & present: 

```js
const rendersExplorable = {
      	"viewof season": "#viewof-season",
        "TimeSeason": "#TimeSeason",
        "viewof CI": "#viewof-CI",
        "CIbody": "#CIbody",
        "dataset": "#dataset",
        "reset": "#reset",
        "add": "#add",
        "D_chart": "#chart",
      }
````

The object does not have to be named as `rendersExplorable`; Name it anything you like. As you can see, within the curly brackets, we assign `id` to each of the cells we want to import. With `id`, we can 1) put visualizations into specific places within the webpage, and 2) edit their styles with CSS. 

### Apply Runtime and Insepctor

```js
const runtimeExplorable = new Runtime();
      
const mainExplorable = runtimeExplorable.module(D3ExplorableNotebook, name => {
  const selector = rendersExplorable[name];
  if (selector) {
        return new Inspector(document.querySelector(selector));
     } else {
         return true;
     }
});
```

The above codes are from [covid19-data/covid19-dashboard](https://github.com/covid19-data/covid19-dashboard/blob/master/index.html). 

`runtimeExplorabl` and `mainExplorable` are variables, so you can name it anyway you would like. 

The `D3ExplorableNotebook` in the second line should the name your imported notebook. In the third line, `rendersExplorable` should be the name you assign `id`s to cells. 

### HTML within the `<body>` 

You can study the [source code](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/static/d3/explorable-data/index.html) in detail. I'll explain the basic ideas here. With `<div id="viewof-season"></div>`, we'll put the relevant visualization there. If needed, you can edit the style within the CSS stylesheet with `#viewof-season {}`. I barely used any CSS in my example, so I simply place the CSS code within `style` tags of the webpage. If you want more complicated styling, of course you can (and probably should) reference an external CSS stylesheet. 

Two points are worth mentioning:

  1. Each [`id` you assigned above](/en/2020/11/02/exporting-observable-notebook/#assign-id-to-cells-you-are-importing) has to be used here. If there is an unused `id`, the whole web page won't render. If that is your case, delete the unnecessary id(s) [above](/en/2020/11/02/exporting-observable-notebook/#assign-id-to-cells-you-are-importing). 

  2. Each `id` can be used only for once. If you use an `id` twice, only the first one will be rendered. 

### What if I have more than one notebook in one webpage

It's not that difficult. First, import the second/third/... notebook as you import the first one. Remember that you need to use different names for different notebooks, for example, `import notebook2 from ...`, and `import notebook3 from ...`. 

Also, you need a different name than `renders` in `const renders = {}`. Maybe `const rendersTwo = {}` and `const rendersThree = {}`. Then, use different names than `runtime` in the last steps. 

For example, for the second notebook, it might be:

```js
const runtime2 = new Runtime();
const main2 = runtime2.module(notebook2, name => {
   const selector = rendersTwo[name];
   if (selector) {
        return new Inspector(document.querySelector(selector));
     } else {
         return true;
     }
  });
```

After that, edit the `body` section as necessary. 

If you don't understand it, study [my example](https://hongtaoh.com/d3/explorable-data/), and its [source code](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/static/d3/explorable-data/index.html).

### More examples

You can have a look at more examples of importing an Observable notebook in [observablehq/examples](https://github.com/observablehq/examples/blob/main/breakout/index.html). 