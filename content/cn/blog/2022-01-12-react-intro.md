---
title: "React 简单知识总结"
date: 2022-01-12T19:38:36-06:00
author: "郝鸿涛"
slug: react
draft: false
toc: true
tags: 编程
---
## 起步

先下载 Node.js

然后，打开命令行：

```bash
npx create-react-app my-react-app 
cd my-react-app
npm start
```

`my-react-app` 你想换别的也行。

运行后，会自动打开 [`localhost:3000`](localhost:3000)。如果没有，手动在浏览器地址栏输入 `localhost:3000`.

## 准备

把 src 文件夹中除 `index.js` 外的文档都删除。让 `index.js` 内容只剩下：

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<p>你好！</p>, document.getElementById('root'));
```

## JSX 介绍


在 `index.js` 中加入以下内容：

```js
const Hello = <p>你好！</p>;
```

把上面的代码放到 `ReactDOM.render()` 上面。然后，把 `ReactDOM.render(<p>你好！</p>, document.getElementById('root'));` 改成：

```js
ReactDOM.render(Hello, document.getElementById('root'));
```

刷新一下浏览器，结果是不是一样的？

像 `const Hello = <p>你好！</p>;` 这样在 JavaScript 中写 HTML 代码，就叫 JSX。JSX 是 [JavaScript XML 的缩写](https://www.w3schools.com/react/react_jsx.asp)。

## JSX 语法

1. JSX 中写 HTML: `const myelement = <h1>I Love JSX!</h1>;`

2. JSX 中写 javascript 用 `{}` 包起来

```js
let text = 'good';
const myElement = <h1>I am {text} enough.</h1>

ReactDOM.render(myElement, document.getElementById('root'))
```

3. JSX: HTML 代码很长时，用 `()` 包起来。

4. JSX 中的 HTML 代码必须只有一个“高层”：

```js
const myelement = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am another paragraph.</p>
  </div>
);
```

也就是说，上面两个段落，你必须用 `<div>` 包起来。如果不想用 `<div>`，用一个空的 html 元素就好：

```js
const myelement = (
  <>
    <p>I am a paragraph.</p>
    <p>I am another paragraph.</p>
  </>
);
```

5. 在 JSX 中用 `className` 而不是 `class`

`const myElement = <h1 classNmae = "myclass">Are you OK?</h1>`

6. JSX 中不能用 if statement. 用的话写在 JSX 外面。换句话说，if statement 里可以包含 JSX，但 JSX 中不能包含 if statement。

与此相关的是，React 官方教程中提到，["JSX is an expression too"](https://reactjs.org/docs/introducing-jsx.html#jsx-is-an-expression-too):

>After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

好好体会下面这句话，很重要：

>This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions. 

## 组件 (Components)

{{<block class="info">}}
组件分成[两类](https://www.w3schools.com/react/react_components.asp)：类组件 (Class components)、函数组件 (Function componnets)。2019 年 [React v16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) 发布后，现在的推荐是使用函数组件+[钩子](https://www.w3schools.com/react/react_hooks.asp) (hooks)。
{{<end>}}

1. 组件名字第一个字母必须大写。

2. 组件的功能和 JavaScript 的 Function 一样，不过组件返回的结果是 HTML:

```js
function Book() {
	return <h1>我是一本书。</h1>
};
```

3. 每一个组件都必须有返回的内容，也就是说，每一个组件在定义时都必须有 `return`。

4. 有类 (Class) 组件和功能 (Function) 组件。现在一般推荐用功能组件 + 钩子 (Hooks)

5. 如何使用组件 `<组件名 />`：

```js
ReactDOM.render(<Book />, document.getElementById('root'));
```

这个知识点非常重要。你现在应该知道，`ReactDOM.render()` 输出的结果是刚才你定义的组件，这个结果放在了 React 已经定义好的 root 里。

你可以想象为有一个已经被定义好的空的 `div`: `<div id='root'></div>`。这个空的 div 被称为 ["root" DOM node](https://reactjs.org/docs/rendering-elements.html#rendering-an-element-into-the-dom)

6. 组件中的属性 (props)

props 是 properties 的缩写。它有点像是 [HTML 中的属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes) (attributes)，比如 `id` 和 `class`。

```js
function Book(props) {
	return <h1>我是一本{props.adj}书。</h1>
};

ReactDOM.render(<Book adj="极好的" />, document.getElementById('root'));
```

即，在创建组件时，写上 props，在返回的 HTML 中放上 props，在具体输出时，写明 props 的内容。这里的 adj 你可以随便换成别的，不过在使用时，即 `props.adj` 也相应地换成你用的词。

另外，你不一定非要用 `props` 这个词，换成任何你想要的都可以，比如 `shuxing`。不过用 `props` 或者 `prop` 别人一眼就知道是啥，因为通用。

7. 组件中使用别的组件

```js
function Book() {
	return <h1>我是一本书。</h1>
};

function Question() {
	return (
	  <>
	    <Book />
	    <h2>那你呢？</h2>
	  </>
	);
}

ReactDOM.render(<Question />, document.getElementById('root'))
```

8. 重复使用组件

React 的核心思想是让代码可以重复使用。刚才我们定义了 Book 组件，但如果你在 `src` 文件夹中另一个 js 文件中也需要用到 Book 组件怎么办？

如果 Book 组件你会在两个或者两个以上 js 文件中用到，你可以把它单独弄成一个 js 文件。新建一个 js 文件，记得命名时首字母要大写，比如：`Book.js`，把以下代码放进去：

```js
function Book() {
	return <h1>我是一本书。</h1>
};

export default Book;
```

`export default Book` 是指明之后如何用这个组件。如果你想深究 `export default` 的用法，请看[这里](https://stackoverflow.com/q/36426521)。

然后把 `Book.js` 放到 `src` 文件夹，以后用到 Book 组件就这样用它：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Book from './Book.js';

ReactDOM.render(<Book />, document.getElementById('root'));
```

## 属性 props

props 的基本用法上面讲过了，这里不重复。这里主要讲一下，props 也可以在另一个组件中使用，这和它在 `ReactDOM.render()` 中的基础用法是一样：

```js
function Book(props) {
	return <h1>我是一本{props.adj}书。</h1>
};

function Question() {
	return (
	  <>
	    <Book adj="极好的"/>
	    <h2>那你呢？</h2>
	  </>
	);
}

ReactDOM.render(<Question />, document.getElementById('root'))
```

<!-- 
	以下的我不懂

function Book(props) {
	return <h1>我是一本 {props.adj1.adj2} 书。</h1>
};

function Question() {
	const bookDescr = {subject: "语文", adj1: "参考", adj2: "教学用"};
	return (
	  <>
	    <Book adj1={ bookDescr }/>
	    <h2>那你呢？</h2>
	  </>
	);
}

ReactDOM.render(<Question />, document.getElementById('root')) -->

## 事件 Events

通常我们在 HTML 中这样写：

```html
<button onclick="hitme()">你打我呀</button>
```

但是在 React 中我们这样写：

```js
<button onClick={hitme}>你打我呀</button>
```

有两个不同：

  1. 在 React 中是 `onClick` 而不是 `onclick`;
  2. 在 React 中用 `{hitme}` 而不是 `"hitme()"`

具体怎么用呢？

把这个事件和事件中用到的函数都放到一个组件中：

```js
function TryHitme() {
	const hitme = () => {
		alert("你打不着");
	}

	return (
		<button onClick={hitme}>你打我呀</button>
		);
}

ReactDOM.render(<TryHitme />, document.getElementById('root'));
```

值得讲一下的是上面的那个[箭头函数 (Arrow Function)](https://www.w3schools.com/react/react_es6_arrow.asp)，这是 ES6 之后才有的。上面那个箭头函数等同于：

```js
const hitme = function() {
	return alert('你打不着')
}
```

`return` 后面的内容只能[在同一行写](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return#automatic_semicolon_insertion)，如果内容过多，你可以把内容放在括号 () 里：

```js
const hitme = function() {
	return (
		alert('你打不着啊打不着，打不着啊打不着，你打不着啊打不着，打不着啊打不着，你打不着啊打不着，打不着啊打不着，你打不着啊打不着，打不着啊打不着，你看你就是打不着')
		)
}
```

## 条件 Conditions

上面讲过，一个组件中可以用另一个组件，根据这一规则，我们可以让内容有变化。

比如，我有一个参数，`isHappy`。当这个参数为真时，我想显示“今儿呀嘛真高兴啊”，当参数为假时显示 “今天好衰啊”。如何实现呢？就用上面这个规则。有以下几种方法

### If statement

```js
function Happy() {
	return <h2>今儿呀嘛真高兴啊</h2>
}

function Sad() {
	return <h2>今天好衰啊</h2>
}

function MyMood(props) {
	const HappyOrNot = props.isHappy;

	if (HappyOrNot) {
		return <Happy />;
	} else {
		return <Sad />;
	}
}

ReactDOM.render(<MyMood isHappy={false} />, document.getElementById('root'))
```

你可以把 `<MyMood isHappy={false} />` 改成 `<MyMood isHappy={true} />` 看结果有啥变化。

上面那个 if statement 可以[简化为](https://www.w3schools.com/react/react_es6_ternary.asp)：
```js
function Mood(props) {
	const HappyOrNot = props.isHappy;
	return (
		HappyOrNot ? <Happy/> : <Sad/>
		);
}
```

### && 

```js
function Happy() {
	return <h2>今儿呀嘛真高兴啊</h2>
}

function Sad() {
	return <h2>今天好衰啊</h2>
}

function MyMood(props) {
	const HappyOrNot = props.isHappy;
	return (
		<>
		  <h1>今天怎么样啊？</h1>
		  {HappyOrNot && 
		      Happy()
	      }
		  {!HappyOrNot &&
			  Sad()
		  }
		 </>
	)
}

ReactDOM.render(<MyMood isHappy={false}/>,
  document.getElementById('root')
)
```

别忘了加 `<></>`。

## 名单：Lists

我们会用到 [map 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。

一个简单的例子：

```js
function Lessons(props) {
	return <li>我学了 {props.subject}。</li>
}

function WhatILearned() {
	const subjects = ['语文', '数学', '英语'];
	return (
	  <>
	    <h1>小明，你今天在学校都学了什么呀？</h1>
	     <ul>
	       {subjects.map((s) => <Lessons subject={s}/>)}
	     </ul>
	  </>
	)
}

ReactDOM.render(<WhatILearned/>, document.getElementById('root'))
```

{{<block class="info">}}
每一个函数 (function) 都要有 return 的内容，别忘了加 `return`。
{{<end>}}

为了让名单便于管理，比如，便于删除和更新，我们可以给每一个名单中的项目加上一个索引，这里用 `id`:

```js
function Lessons(props) {
	return <li>我学了 {props.name}。</li>
}

function WhatILearned() {
	const subjects = [
	  {id: 1, name: '语文'},
	  {id: 2, name: '数学'},
	  {id: 3, name: '英语'},
	];
	return (
	  <>
	    <h1>小明，你今天在学校都学了什么呀？</h1>
	     <ul>
	       {subjects.map((s) => <Lessons key={s.id} name={s.name}/>)}
	     </ul>
	  </>
	)
}

ReactDOM.render(<WhatILearned/>, document.getElementById('root'))
```

## 钩子 Hooks

### 状态钩子：useState()

```js
import { useState } from "react";
import ReactDOM from "react-dom";

function ClickOrNot() {
	const [click, setClick] = useState("anything")

	return (
	  <>
	  <p>I am {click}.</p>
	  <button
	    type="button"
	    onClick={() => setClick("clicked")}
	  >Click me!</button>
	  <button
	    type="button"
	    onClick={() => setClick("unclicked")}
	  >Unclick me</button>
	  </>
	)
}

ReactDOM.render(<ClickOrNot />, document.getElementById('root'));
```

我们想要这样一种结果：初始状态是一段简单文本："I am anything"。当用户点 "click me" 时，内容变成 “I am clicked”。当用户点 "unclick me" 时，内容变为 “I am unclicked”。上面的代码就是实现这种效果。怎么实现的呢？

`ClickOrNot` 是一个函数组件，其返回的结果是 `<p>I am {click}.</p>`，就这么简单。比较特别的是，`{click}` 是一个“变量”。

我们来看 `useState` 怎么用。

```js
function ClickOrNot() {
	const [click, setClick] = useState("anything")
}
```

{{<block class="info">}}
你不一定非要用 "setClick" 这个词，你改为 "setclick"、"updateClick"、"upclick"、"likeclick"、"likeClick" 等等都是可以的。不过约定俗成的起名法是 "setXxxx"，即用 "set" 打头，之后的首字母大写。
{{<end>}}

这段代码的意思是，`click` 是当前的“状态” (state)，`setClick` 是一个函数，用来更新状态。`useState("anything")` 代表的是初始状态为 "anything"。需要注意的是，初始状态可为空：`useState("")`

`onClick={() => setClick("clicked")` 的意思是把状态变为 "clicked"。同样的道理，`onClick={() => setClick("unclicked")` 的意思是把状态变为 "unclicked"。

说了这么多，到底什么是“状态”？

在我们这个例子中，`{click}` 就是状态。我们刚刚提到，`ClickOrNot` 这个函数组件返回的结果是 `<p>I am {click}.</p>`。因为初始状态是 "anything" (上面刚讲过，`useState("anything")` 代表初始状态)，所以初始的文本是 "I am anything"。当用户点击 "Click me!" 时，状态变为 "clicked"，所以文本变为 "I am clicked"。当用户点击 "Unclick" 时，状态变为 "unclicked"，所以文本变为 "I am unclicked"。

#### 练习

做出一个场景。有一行文字：“我已经被打了 __ 下”。初始值为 0. 当用户点击 “你打我啊“，数值增一。当用户点击”复原“，数值回复到初始值。

参考：

```js
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function ClickPlus() {
  const [count, setCount] = useState(0);

  return(
    <>
      <p>我被打了 {count} 下。</p>
      <button type="button" onClick={() => setCount(count + 1)}
      >你打我啊</button>
      <button type="button" onClick={() => setCount(0)}
      >复原</button>
    </>
  )
}

ReactDOM.render(<ClickPlus />, document.getElementById('root'));
```

### 副作用钩子：useEffect

上面那个练习中，每按一下“你打我啊”，数值加一。那现在我们想让数值每秒自动加一，怎么办？

要实现这样的效果，我们要用到副作用钩子 (useEffect)。我们还需要用到一个 JavaScript 函数：[`setTimeout`](https://www.w3schools.com/jsref/met_win_settimeout.asp)。


```js
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>我被打了 {count} 下。</h1>;
}

ReactDOM.render(<Timer />, document.getElementById('root'));
```

上面的代码看起来很复杂，其实并不复杂，我们来分析。

首先，setTimeout() 函数比较基本的句法是 `setTimeout(function, milliseconds)`。也就是，你规定的 milliseconds 过去后，setTimeout 函数会运行你写的 function。所以

```js
setTimeout(() => {
	setCount((count) => count + 1)
}, 1000)
```

这段代码表达的意思是，当 1000 毫秒，也就是 1 秒过去后，运行 `() => {setCount((count) => count + 1)}` 这个函数。因为这个函数里还包含着另外一个函数，所以我们用 `{}` 把它包起来。这个里面的函数是：

```js
setCount((count) => count + 1) 
// (count) 直接省略为 count 也是可以的，因为只有一个参数，即 count
```

也就是把 `count` 变为 `count + 1`。

{{<block class="reminder">}}
其实，直接简化为 `setCount(count + 1)` 也是可以的，你可以试试。 但我不知道为什么可以。你如果知道原因，可以在底下评论。
{{<end>}}

`useEffect` 是一个函数，因为里面还有一个函数，即 `setTimeout`，所以我们用 `{}` 把 `setTimeout` 这部分包起来。

### 运行顺序

阮一峰老师[讲到](https://www.ruanyifeng.com/blog/2020/09/react-hooks-useeffect-tutorial.html)：

>`useEffect()` 的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。

这句话很重要。听起来很容易理解，但其实并非那么容易。

为了充分理解这句话，我举一个例子。这个例子取自 Ben Ilegbodu 的博客文章 [*Object & array dependencies in the React useEffect Hook*](https://www.benmvp.com/blog/object-array-dependencies-react-useEffect-hook/)。

```js
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function ClickPlus() {
  const [count, setCount] = useState(0);

  useEffect(() => {
  	document.title = `我被打了 ${count} 下。`
  });

  return(
    <>
      <p>我被打了 {count} 下。</p>
      <button type="button" onClick={() => setCount(count + 1)}
      >你打我啊</button>
    </>
  )
}

ReactDOM.render(<ClickPlus />, document.getElementById('root'));
```

首先，`count` 初始值是 0。网页第一次渲染，网页标题 (document title) 和网页内的文本内容都是 0 下。然后，按“你打我啊”，`count` 值加一，组件渲染一次，网页内文本内容先变化，接着 `useEffect` 内的副效应函数运行一次，网页标题内容变化。不过这个过程很快，给你的感觉是它俩同时改变。


<!-- 如何正确理解第二个参数？dependency -->

https://maxrozen.com/react-components-hooks-functions-vs-classes

https://www.pluralsight.com/guides/fetching-data-updating-state-hooks

---
# React 小书 & Functional components 改写

## 组件的 state 和 setState

https://hyf.js.org/react-naive-book/lesson10

```js
// 这组我不懂的是，什么时候用 `componentDidMount` 或者 `componentDidUpdate`?

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class LikeButton extends Component{
  constructor(props){
    super(props)
    this.state = {isLiked: false}
    this.handleClickButton = this.handleClickButton.bind(this)
  }

  handleClickButton() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return(
      <button onClick={this.handleClickButton}>
      {this.state.isLiked? "取消" : "点赞"}👍
      </button>
    )
  }
}

ReactDOM.render(<LikeButton/>, document.getElementById('root'))
```

用状态钩子：

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

export default function LikeButton() {

  const [isLiked, setIsliked] = useState(false);

  return(
    <button onClick={() => {setIsliked(!isLiked)}}>
    {isLiked? "取消" : "点赞"}👍
    </button>
  )

}

ReactDOM.render(<LikeButton/>, document.getElementById('root'))
```

## 渲染列表数据

https://hyf.js.org/react-naive-book/lesson13

```js
import React from 'react'
import ReactDOM from 'react-dom'

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

export default function Index() {
  const usersElements = []
  for (let user of users){
    usersElements.push(
      <>
        <div>姓名: {user.username}</div>
        <div>年龄: {user.age}</div>
        <div>性别: {user.gender}</div>
        <hr/>
      </>
    )
  }

  return(
    <div>{usersElements}</div>
  )
}

ReactDOM.render(<Index/>, document.getElementById("root"))
```

用 `map` 函数：

```js
import React from 'react'
import ReactDOM from 'react-dom'

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

export default function Index() {
  return(
      users.map(user => 
        <>
        <div>姓名: {user.username}</div>
        <div>年龄: {user.age}</div>
        <div>性别: {user.gender}</div>
        <hr/>
        </>
        )
       )
}

ReactDOM.render(<Index/>, document.getElementById("root"))
```

注意上面这段代码中，JSX 如何内嵌到 `map` 函数的表达式中。这是因为，上面第四点提到的，[可以把 JSX 当成 JavaScript 表达式来用](https://reactjs.org/docs/introducing-jsx.html#jsx-is-an-expression-too)。这里，`map` 函数的输出值是 JSX，这也就是官方文档中提到的 ["return it from functions"](https://reactjs.org/docs/introducing-jsx.html#jsx-is-an-expression-too).