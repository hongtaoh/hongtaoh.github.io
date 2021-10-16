---
title: "Qualtrics: How to Make Sure An Audio Can Only Be Played Once"
date: 2021-10-13T16:53:31-05:00
author: "Hongtao Hao"
slug: qualtrics-audio
draft: false
toc: false
---

Choose the question that contains the audio. You'll see "JavaScript" on the left panel.

{{<figure src="/media/enblog/qualtrics-js-panel.png" caption="JavaScript option">}}

Click it and add the following codes 

```js
jQuery('audio').on('ended', function() {
jQuery(this).css("pointer-events","none");
});
```

Within 

```js
Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

```

Like this:

{{<figure src="/media/enblog/qualtrics-js-audio-once.png" caption="Final option after codes insertion">}}

I found the answer [here](https://community.qualtrics.com/XMcommunity/discussion/10870/how-to-restrict-how-many-times-participant-plays-uploaded-audio). It was by rondev. 