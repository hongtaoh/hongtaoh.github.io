---
title: "Controlled and Uncontrolled Form in React"
date: 2023-06-10T17:10:12-07:00
author: "Hongtao Hao"
slug: react-form
draft: false
toc: false
tags: front-end
---

There are two ways to create a form in React. One is controlled and the other is uncontrolled. The basic idea behind the controlled method is to use `useState` and `onChange` whereas uncontrolled method use `useRef`.

## Controlled 

Note that the following codes are just prototypes. 

```javascript
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function controlledForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		fetch("https://yoururl.com/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify({
				"username": username,
				"password": password
			})
		}).then(res => {
			if (res.status === 200) {
				alert("Successfully logged in!")
			}
			return res.json()
		})
	}

	return <>
	<Form>
		<Form.Label html="username">Username</Form.Label>
		<Form.Control value={username} onChange={e => setUsername(e.target.value)} />
		<br />
		<Form.Label html="password">Password</Form.Label>
		<Form.Control value={password} onChange={e => setPassword(e.target.value)} />
		<br />
		<Button onClick={handleClick}>Submit!</Button>
	</Form>
	</>
}
```

## Uncontrolled

```javascript
import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function controlledForm() {
	const usernameRef = useRef("")
	const passwordRef = useRef("");

	const handleClick = (e) => {
		e.preventDefault();
		fetch("https://yoururl.com/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify({
				"username": usernameRef.current.value,
				"password": passwordRef.current.value
			})
		}).then(res => {
			if (res.status === 200) {
				alert("Successfully logged in!")
			}
			return res.json()
		})
	}

	return <>
	<Form>
		<Form.Label html="username">Username</Form.Label>
		<Form.Control ref={usernameRef} />
		<br />
		<Form.Label html="password">Password</Form.Label>
		<Form.Control ref={passwordRef} />
		<br />
		<Button onClick={handleClick}>Submit!</Button>
	</Form>
	</>
}
```