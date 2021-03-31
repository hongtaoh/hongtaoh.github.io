---
title: "How to Understand D3.js scaleBand paddingInner"
date: 2021-03-28T11:04:55-04:00
author: "Hongtao Hao"
slug: d3-innerpadding
draft: true
toc: false
---

I was very puzzled by how D3's [`.paddingInner`](https://github.com/d3/d3-scale/blob/v3.2.2/README.md#band_paddingInner) is calculated. The official documentation mentions that "The inner padding specifies the proportion of the range that is reserved for blank space between bands", but the calculation is not specified. 

Suppose I have an SVG whose `width` is 600px, and I want to plot 5 vertical bars. Let's say `.paddingInner = 0.6`. Is it that 60% of the `width` is reserved for four pieces of inner padding or that 60% of the `.bandwidth` is reserved for each piece of inner padding? 

Let's try.

<script src="https://d3js.org/d3.v6.min.js"></script>

<div id="div"></div>

<script type="text/javascript">
	const w = 600;
	const h = 400;
	const margin = ({top: 100, right: 15, bottom: 20, left: 25})
	const numBars = 5;

	let dataset = [];

	for (let i = 0; i < numBars; i++) {
		let randomNum = Math.random() * 1000;
		dataset.push(randomNum)
	};

	const xScale = d3.scaleBand()
	                 .domain(d3.range(dataset.length))
	                 .range([0, w])
	                 .paddingInner(0.6);

	const yScale = d3.scaleLinear()
	                 .domain([0, d3.max(dataset)])
	                 .range([0, h - margin.top]);

	const svg = d3.select("#div")
	              .append("svg")
	              .attr("width", w)
	              .attr("height", h)
	              .style("background-color", "pink");

	svg.append("text")
	   .attr("x", 100)
	   .attr("y", 20)
	   .text("bandwidth: "+ xScale.bandwidth() +" ")

	svg.selectAll("rect")
	   .data(dataset)
	   .join("rect")
	   .attr("x", (d, i) => xScale(i))
	   .attr("y", d => h - yScale(d))
	   .attr("width", xScale.bandwidth())
	   .attr("height", d => yScale(d))
	   .style("fill", "steelblue")

</script>