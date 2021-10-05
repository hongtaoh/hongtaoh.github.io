---
title: "How to Embed an Observable Notebook in A Hugo Blog"
date: 2020-11-02T11:38:49-05:00
author: Hongtao Hao
slug: observable-hugo-embed
draft: false
toc: true
---
Embedding an Observable notebook in a Hugo blog post is no different than [embedding it in a stand alone webpage](/en/2020/11/02/exporting-observable-notebook/). Also, you can read [this tutorial](https://visionscarto.net/observable-jekyll/) on [Observable Jekyll](https://visionscarto.net/observable-jekyll/). Although it used Jekyll as an example, it's exactly the same for Hugo. 

## Direct embedding through `iframe`

You can embed a visualization on ObservableHQ directly through an `iframe`. I talked about how to do it [here](en/2020/11/02/exporting-observable-notebook/#embed-directly-via-iframe).

This is the result:

```js
<iframe width="100%" height="534" frameborder="0"
  src="https://observablehq.com/embed/@hongtaoh/explrable-data?cell=reset&cell=add&cell=D_chart"></iframe>
```
<iframe width="100%" height="534" frameborder="0"
  src="https://observablehq.com/embed/@hongtaoh/explrable-data?cell=reset&cell=add&cell=D_chart"></iframe>

If you don't want the logo at the bottom, or that you think the loading is too slow, you have to embed it manually, which is what I am going to talk about in this post. 

## Manual embedding

This part is almost exactly the same as [embedding in a stand-alone webpage](en/2020/11/02/exporting-observable-notebook/#embed-manually). However, since in a Hugo blog post, the `head` and `body` are already defined, you don't need to define the `head` and don't need to manually write `<p>...</p>`, for which you can simply use Markdown (which is why Hugo is invented...).

You should know that **within** a Hugo blog post, you can still (and herhaps need to) write `<div>...</div`, directly include a stylesheet with some CSS, and incldue the `<script type="module">`. You can see the source codes of this blog post [here](https://raw.githubusercontent.com/hongtaoh/hongtaoh.github.io/sources/content/en/blog/2020-11-02-embed-observable-notebook-in-blogs.md).

The below is what it looks like to manually embed this [Observable notebook](https://observablehq.com/@hongtaoh/explrable-data) of mine. 

### 1. Dropdown menu: Select your favorite season!

<div>
      <div id="viewof-season"></div>
      <div id="TimeSeason"></div>
</div>

## 2. Slider: Choose your confidence interval

<div>
      <div id="viewof-CI"></div>
      Dataset: <div id="dataset"></div>
      <div id="CIbody"></div>
</div>

## 3. Buttons

<div>
      <div id="add"></div>
      <div id="reset"></div>
      <div id="chart"></div>
      <button type="button" onclick="window.location.href='https://observablehq.com/@hongtaoh/explrable-data#D_chart';">See the source code.</button>
</div>

## Full width

If you want the visualization to be full width, it's very easy to do so. Follow the instructions in [this tutorial](https://visionscarto.net/observable-jekyll/). Wrap the target visuzliation within a `div` that is classed (What? It's not a verb?) `fullwidth` (or any name you prefer), and define `fullwidth` this way[^1]:

```css
.fullwidth {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
```

[^1]: It's not my creation, but the codes from [this tutorial](https://visionscarto.net/observable-jekyll/).

<style>
 #chart,
 #add,
 #reset {
        margin-bottom: 10px;
      }
</style>


<script type="module">
      import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
      import notebook from "https://api.observablehq.com/@hongtaoh/explrable-data.js?v=3";

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

      
      const runtime = new Runtime();
      const main = runtime.module(notebook, name => {
        const selector = renders[name];
        if (selector) {
          return {fulfilled: (value) => render(document.querySelector(selector), value)}
        } else {
          return true;
        }
      });
      
  	</script>
