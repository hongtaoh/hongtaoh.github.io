---
title: "How to Embed An Observable Notebook in A Stand-alone Webpage"
date: 2020-11-02T09:03:10-05:00
author: Hongtao Hao
slug: exporting-observable-notebook
draft: false
toc: true
---
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

However, as can be seen, you don't have much freedom[^1] to edit the style of the elements, like the font, the positions of the buttons, and the like. And it's very slow to load. 

## Embed manually

It's not very difficult to embed your visualizations manually in a stand-alone webpage. I am providing a minimal example [here](https://hongtaoh.com/d3/explrable-data/), whose source codes can be seen [here](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/static/d3/explrable-data/index.html).

I won't explain the basic HTML elements in the page, as those are out of the scope of this tutorial. Go to the buttom of the source codes, and pay your attention to the codes between `<script type="module">` and `</script>`. 

### JavaScript scripts within the webpage

#### Import `Runtime`, `Inspector`, and your notebook

First, we import `Runtime` and `Inspector` from `https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js`. Then, we import the notebook you want to export. You can name it anything you like, not necessarily as `notebook`. You'll find that the notebook is always imported from `https://api.observablehq.com/@yourUsername/yourNotebook.js?v=3`. Edit it based on your own Observable username and your notebook URL. One thing worth noticing is that you can export private notebook as well, for example, forked notebooks you are working on, or those you don't want other people to see yet. To do that, go to the homepage of ObservableHQ, on the left side of the page, click "notebooks", find your unpublished notebook, right click the `...` menu, and choose "Enable link sharing". For private notebooks, the username will be simply `d`, and the notebook id is that after `d` shown in your notebook's URL. 

#### Define `render`

After importing `Runtime`, `Inspector`, and your notebook, we'll need to define a function called `render` (or any other name you want):

```js
function render(_node, value) {
        if (!(value instanceof Element)) {
          const el = document.createElement("span");
          el.innerHTML = value;
          value = el;
        }
        if (_node.firstChild !== value) {
          if (_node.firstChild) {
            while (_node.lastChild !== _node.firstChild) _node.removeChild(_node.lastChild);
            _node.replaceChild(value, _node.firstChild);
          } else {
            _node.appendChild(value);
          }
        }
      }
```

The above codes are note my creation, but from [observablehq/examples](https://github.com/observablehq/examples/blob/main/breakout/index.html).

#### Assign `id` to cells you are importing

Then, we define an object in which we assign `id` to the cells we want to import. 

```js
const renders = {
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

The object does note have to be named as `renders`. You can name it anything you like. As you can see, within the curly brackets, we assign `id` to each of the cells we want to import. With `id`, we can 1) put visualizations into specific places within the webpage, and 2) edit their styles with CSS. 

#### Last steps

The last steps are:

```js
const runtime = new Runtime();
const main = runtime.module(notebook, name => {
   const selector = renders[name];
   if (selector) {
     return {fulfilled: (value) => render(document.querySelector(selector), value)}
   } else {
     return true;
   }
  });
```

Again, those codes are from [observablehq/examples](https://github.com/observablehq/examples/blob/main/breakout/index.html). In the above codes, the `runtime` after `const` in the first line can have any name you like, but you need to edit the `runtime` in the second line accordingly. The `notebook` in the second line should be whatever name you assign when you import your notebook. In the third line, the name `renders` should be the name you used in the above step. 

### The `body` 

You can study the [source code](https://github.com/hongtaoh/hongtaoh.github.io/blob/sources/static/d3/explrable-data/index.html) in detail. I'll explain the basic ideas here. With `<div id="viewof-season"></div>`, we'll put the relevant visualization there. If needed, you can edit the style within the CSS stylesheet with `#viewof-season {}`. I barely used any CSS in my example, so I simply place the CSS code within `style` tags of the webpage. If you want more complicated styling, of course you can reference an external CSS stylesheet. 

### What if I have more than one notebook in one webpage

It's not that difficult. First, import the second/third/... notebook as you import the first one. Remember that you need to use different names for different notebooks, for example, `import notebook2 from ...`, and `import notebook3 from ...`. Also, you need a different name than `renders` in `const renders = {}`, maybe `const rendersTwo = {}` and `const rendersThree = {}`. Then, use different names than `runtime` in the last steps. 

For example, for the second notebook, it might be:

```js
const runtime2 = new Runtime();
const main = runtime2.module(notebook2, name => {
   const selector = rendersTwo[name];
   if (selector) {
     return {fulfilled: (value) => render(document.querySelector(selector), value)}
   } else {
     return true;
   }
  });
```

After that, edit the `body` section as necessary. 

If you don't understand it, study [this example](https://github.com/hongtaoh/covid19-dashboard).

### More examples

You can have a look at more examples of importing an Observable notebook in [observablehq/examples](https://github.com/observablehq/examples/blob/main/breakout/index.html). You can also have a look at a (somewhat) more advanced example [here](https://github.com/hongtaoh/covid19-dashboard). 

[^1]: I guess you can, but it takes some learning. I don't know how right now. 