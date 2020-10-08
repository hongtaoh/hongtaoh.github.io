// https://observablehq.com/@mbostock/slide@274
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Slide

To present, click *Fullscreen* in the notebook menu <svg viewBox="0 0 16 16" fill="#6f7c90" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle r="2" cy="8" cx="2"></circle><circle r="2" cy="8" cx="8"></circle><circle r="2" cy="8" cx="14"></circle></svg> above.`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide`Let’s give a presentation using an Observable notebook.`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide.js`
// Import the slide function and styles:
import {slide, slide_style} from "@mbostock/slide"

// Load the styles:
slide_style

// Create a slide:
slide\`Hello, *world*!\`
`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide`Hello, *world*!`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide`Use \`slide\` for Markdown, \`slide.js\` or \`slide.code\` for code, and \`slide.img\` for an image.`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide.js`
// This is a JavaScript code snippet.
function foo() {
  return 42;
}
`
)});
  main.variable(observer()).define(["slide"], function(slide){return(
slide.img`https://gist.githubusercontent.com/mbostock/9511ae067889eefa5537eedcbbf87dab/raw/944b6e5fe8dd535d6381b93d88bf4a854dac53d4/mona-lisa.jpg`
)});
  main.variable(observer()).define(["slide","tex"], function(slide,tex){return(
slide`You can use LaTeX, too: ${tex.block`
f(\textcolor{hotpink}{x}) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi \textcolor{hotpink}{x}}
    \,d\xi
`}`
)});
  main.variable(observer()).define(["slide","now"], function(slide,now){return(
slide`And it’s reactive!

${new Date(now).toLocaleString()}`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Implementation`
)});
  main.variable(observer("slide")).define("slide", ["md","hl"], function(md,hl)
{
  function slide() {
    const container = document.createElement("div");
    container.className = "slide";
    container.appendChild(md.apply(this, arguments));
    return container;
  }
  function code(strings) {
    const container = document.createElement("div");
    const pre = container.appendChild(document.createElement("pre"));
    const code = pre.appendChild(document.createElement("code"));
    let string = strings[0] + "", i = 0, n = arguments.length;
    while (++i < n) string += arguments[i] + "" + strings[i];
    code.textContent = string.trim();
    container.className = "slide slide--code";
    return container;
  }
  slide.code = code;
  slide.js = function() {
    const container = code.apply(this, arguments);
    const content = container.firstChild.firstChild;
    content.className = "js hljs javascript";
    hl.highlightBlock(content);
    return container;
  };
  slide.img = function(strings) {
    const img = new Image;
    let string = strings[0] + "", i = 0, n = arguments.length;
    while (++i < n) string += arguments[i] + "" + strings[i];
    img.src = string.trim();
    img.className = "slide slide--img";
    return img;
  };
  return slide;
}
);
  main.variable(observer("slide_style")).define("slide_style", ["html"], function(html){return(
html`<style>
.slide {
  width: calc(100% + 28px);
  margin: 0 -14px;
  padding: 10%;
  box-sizing: border-box;
  background: #333;
  color: #eee;
  min-height: 65vw;
  font-size: 5vw;
  line-height: 1.15;
  display: flex;
  align-items: center;
}

.slide a {
  color: hotpink;
}

.slide p,
.slide pre,
.slide img {
  max-width: 100%;
}

.slide--img {
  max-width: none;
  padding: 0;
}

.slide blockquote,
.slide ol,
.slide ul {
  max-width: none;
}

.slide > * {
  width: 100%;
}

.slide code {
  font-size: 80%;
}

.slide--code pre,
.slide--code code {
  font-size: 2.3vw;
}

.slide--code {
  color: rgb(27, 30, 35);
  background: rgb(247, 247, 249);
  border-bottom: solid 1px white;
}

</style>`
)});
  main.variable(observer("hl")).define("hl", ["require"], function(require){return(
require("@observablehq/highlight.js@1.0.0/highlight.min.js")
)});
  return main;
}
