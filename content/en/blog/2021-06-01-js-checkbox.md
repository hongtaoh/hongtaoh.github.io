---
title: "How to Validate Checkbox in JavaScript"
date: 2021-06-01T08:53:27-04:00
author: "Hongtao Hao"
slug: js-checkbox
draft: false
toc: false
---

I saw the question by TheLettuceMaster [here](https://stackoverflow.com/questions/11234622/simple-javascript-checkbox-validation). It's a very good question. The [solution by PleaseStand](https://stackoverflow.com/a/11234728) works like a charm. But there is a much simpler way, as [indicated by PrestaShark](https://stackoverflow.com/a/29027761): adding `required` anywhere in the `<input />`.

If the checkbox is unchecked, the browser will say "Please check this box if you want to proceed."

This method, i.e., form validation, is [supported by all modern browsers](https://caniuse.com/form-validation), as [mentioned by charliepark](https://stackoverflow.com/a/29027761). 