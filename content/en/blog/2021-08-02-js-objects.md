---
title: "JavaScript Ojbects: Add and Change Name:Value Pairs"
date: 2021-08-02T15:53:55-04:00
author: "Hongtao Hao"
slug: js-objects
draft: false
toc: false
---
Take the following as an example

```javascript
data = [
  { "date" : '2013-01-01', "value" : 45 },
  { "date" : '2013-02-01', "value" : 50 },
  { "date" : '2013-03-01', "value" : 55 },
  { "date" : '2013-04-01', "value" : 50 },
  { "date" : '2013-05-01', "value" : 45 },
  { "date" : '2013-06-01', "value" : 50 },
  { "date" : '2013-07-01', "value" : 50 },
  { "date" : '2013-08-01', "value" : 52 }
]
```

## How to add new name:value pairs

```javascript
data.map(function(d) {
  d.valuePlus = d.value + 1;
  return d;
})
```

Or:

```javascript
data.map(d => {
  d.valuePlus = d.value + 1;
  return d;
})
```

## How to change names in the object's name:value pairs

This is basically to create a new object or a new array of objects

```javascript
data.map(function(d) {return {
  "newdate": d.date,
  "newvalue": d.value,
}})
```

Or 

```js
data.map(d => ({
  "newdate": d.date,
  "newvalue": d.value,
}))
```

Note that in the second arrow function (right above), we use parentheses around object literals to let the function return "a single value", which is an object. 

We don't need parenthese in the first arrow function because "curly braces are execuating multiple lines of codes", quoting [david](https://stackoverflow.com/a/39629982/13716814).