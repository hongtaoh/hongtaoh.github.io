// https://observablehq.com/@hongtaoh/explrable-data@418
import define1 from "./e93997d5089d7165@2286.js";
import define2 from "./e6e3f7f78308b284@274.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["winter-img.jpg",new URL("./files/b280fe0cb6da8e3b3092006feba40dee258839bd095bb69c3d36ee55d45e9f21ccde17db0b54199c79da6677d5a34ef975923b6671b80db4131c8e05d5ddd343",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# explrable data`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## 1. Dropdown menu: Select your favorite season!
`
)});
  main.variable(observer("viewof season")).define("viewof season", ["select"], function(select){return(
select({
  title: "Season",
  description: "Please select your favorite season of the year.",
  options: ["Spring", "Summer", "Fall", "Winter"],
  value: "Fall"
})
)});
  main.variable(observer("season")).define("season", ["Generators", "viewof season"], (G, _) => G.input(_));
  main.variable(observer("Time")).define("Time", ["slide"], function(slide){return(
function Time (d) {
  if (d == "Spring") {return slide.img`https://imagesvc.meredithcorp.io/v3/mm/image?url=https://static.onecms.io/wp-content/uploads/sites/28/2018/03/china-flowers-cherry-CHINASPRING318.jpg` } 
  else if (d == "Summer") {return slide.img`https://park.ca/wp-content/uploads/2017/05/Summer-Insurance-Tips-1024x621.jpg`}
  else if (d == "Fall") {return slide.img`https://www.rd.com/wp-content/uploads/2016/09/fall-photos-Iowa_Stewart.jpg`}
  else {return slide.img`https://lapland.nordicvisitor.com/images/1/finland/winter-in-finland.jpg`}
}
)});
  main.variable(observer()).define(["Time","season"], function(Time,season){return(
Time(season)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## 2. Slider
`
)});
  main.variable(observer("viewof CI")).define("viewof CI", ["slider"], function(slider){return(
slider({
  min: 0.5,
  max: 0.999,
  step: 0.01,
  format: ".0%",
  value: 0.95,
  description: "Choose the confidence interval you want"
})
)});
  main.variable(observer("CI")).define("CI", ["Generators", "viewof CI"], (G, _) => G.input(_));
  main.variable(observer("body")).define("body", ["html"], function(html){return(
html`<body></body>`
)});
  main.variable(observer("dataset")).define("dataset", ["CI"], function(CI){return(
[Math.floor(CI * 130 + 77), CI * 100 + 25, CI * 100 + 75, 250 - CI * 100, Math.floor(320 - CI * 25), Math.floor(500 - CI * 250)]
)});
  main.variable(observer("width")).define("width", function(){return(
600
)});
  main.variable(observer("height")).define("height", function(){return(
200
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 40, bottom: 30, left: 40}
)});
  main.variable(observer("svg")).define("svg", ["d3","body","width","height"], function(d3,body,width,height){return(
d3.select(body)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
)});
  main.variable(observer("xScale")).define("xScale", ["d3","dataset","width","margin"], function(d3,dataset,width,margin){return(
d3.scaleLinear()
           .domain([0, d3.max(dataset)])
           .range([0, width - margin.right])
)});
  main.variable(observer()).define(["svg","dataset","xScale"], function(svg,dataset,xScale){return(
svg.selectAll("rect")
   .data(dataset)
   .join("rect")
   .attr("x", 0)
   .attr("y", (d, i) => i * 25)
   .attr("width", d => xScale(d))
   .attr("height", 20)
   .attr("fill", d => "rgb("+ Math.round(d / 1.2) +", "+ Math.round(d / 2) +", "+ Math.floor(d) +")")
)});
  main.variable(observer()).define(["svg","dataset","xScale"], function(svg,dataset,xScale){return(
svg.selectAll("text")
   .data(dataset)
   .join("text")
   .text(d => d)
   .attr("x", d => xScale(d) + 10)
   .attr("y", (d, i) => i * 25 + 12.5)
   .attr("font-family", "sans-serif")
   .attr("font-size", "14px")
   .attr("fill", d => "rgb("+ Math.round(d) +", "+ Math.round(d / 1.8) +", "+ Math.floor(d / 2) +")")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## 3. Button: Adding values and reset
`
)});
  main.variable(observer("reset")).define("reset", ["html"], function(html){return(
html `<button type = "button">Reset</button>`
)});
  main.variable(observer("add")).define("add", ["html"], function(html){return(
html `<button type = "button">Add data</button>`
)});
  main.variable(observer("chart")).define("chart", ["d3","add","reset"], function(d3,add,reset)
{
  
  const width = 880;
  
  const height = 350;
  
  const dataset = [5, 10, 24, 16, 18, 19, 22, 9, 8, 17, 4, 6, 10, 12, 20];
  
  const margin = ({top: 50, right: 200, bottom: 10, left: 10})
  
  const svg = d3.create("svg").attr("width", width).attr("height", height)
  
  let xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .range([0, width - margin.right])
                   .paddingInner(0.05);
  
  let yScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset)])
                 .range([0, height]);
  
  const rects = svg.selectAll("rect")
                   .data(dataset)
                   .join("rect")
                   .attr("x", (d, i) => xScale(i))
                   .attr("y", d => height - yScale(d))
                   .attr("width", xScale.bandwidth())
                   .attr("height", d => yScale(d))
                   .attr("fill", d => "rgb("+ Math.round(d * 5) +", "+ Math.round(d * 2) +", "+ Math.floor(d * 9) +")");
  
  d3.select(add)
    .on("click", function(){
    const maxValue = 40;
    let newNumber = 1+ Math.round(Math.random() * maxValue)
    dataset.push(newNumber)
    
    xScale.domain(d3.range(dataset.length));
    
    yScale.domain([0, d3.max(dataset)]);
    
    const bars = svg.selectAll("rect").data(dataset);
    
    const enter = bars.enter().append("rect").attr("x", width).attr("y", d => height - yScale(d))
    
    const updatedBars = enter.merge(bars)
                             .transition()
                             .duration(400)
                             .attr("x", (d, i) => xScale(i))
                             .attr("y", d => height - yScale(d))
                             .attr("width", xScale.bandwidth())
                             .attr("height", d => yScale(d))
                             .attr("fill", d => "rgb("+ Math.round(d * 5) +", "+ Math.round(d * 2) +", "+ Math.floor(d * 9) +")");
                      
    })
  
   d3.select(reset)
    .on("click", function(){
    while (dataset.length > 15) {
      dataset.pop()
    }
    
    xScale.domain(d3.range(dataset.length));
    
    yScale.domain([0, d3.max(dataset)]);
    
    svg.selectAll("rect")
       .data(dataset)
       .join(
      exit => exit
                  .remove()
    )
      .transition()
      .duration(500)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => height - yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d))
      .attr("fill", d => "rgb("+ Math.round(d * 5) +", "+ Math.round(d * 2) +", "+ Math.floor(d * 9) +")");
  
  })
  
  return svg.node()
  
  //This visualization is based on Scott Murray's D3 Book (2nd edition) and https://observablehq.com/@uvizlab/d3-tutorial-4-bar-chart-with-transition
  
}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("select", child1);
  const child2 = runtime.module(define2);
  main.import("slide", child2);
  main.import("slide_style", child2);
  const child3 = runtime.module(define1);
  main.import("slider", child3);
  main.variable(observer("winter_img")).define("winter_img", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("winter-img.jpg")
)});
  return main;
}
