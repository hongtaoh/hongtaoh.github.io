---
title: "Introduction to React useContext"
date: 2023-06-10T17:26:44-07:00
author: "Hongtao Hao"
slug: usecontext
draft: false
toc: false
tags: react
---

The first step is to create the context, for example, `UsernameContext.js`:

```js
import { createContext } from 'react';

const UsernameContext = createContext("");

export default UsernameContext;
```

The second step is (1) initiate the context values and (2) use the context provider. Note that this should be done at the parent level. 

```js
import { useState, useContext } from 'react';
import UsernameContext from './UsernameContext'

const [username, setUsername] = useState("")

return (
	<UsernameContext.Provider value={[username, setUsername]}>
		<ComponentA />
		<ComponentB />
	</UsernameContext.Provider>
)
```

The third step is to use the context in child components. 

```js
import UsernameContext from './UsernameContext'

const [username, setUsername] = useContext(UsernameContext)

// do your tasks below using username and setUsername:

````
