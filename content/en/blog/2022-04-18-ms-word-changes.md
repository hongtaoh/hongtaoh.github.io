---
title: "How to Hightlight Changes in Microsoft Word Documents"
date: 2022-04-18T09:27:16-05:00
author: "Hongtao Hao"
slug: ms-word-highlight-changes
draft: false
toc: false
---

I hate Word. Hate it so much. But I had one paper written in it two years ago and need to revise it according to reviewers' comments. The editor asked me to highlight all the changes I'll have. How to do it?

I am using MacOS (10.14.6) and Word (Version 16.16.27).

On MS Word, click the "Review" button, turn on "Track changes". I prefer "No Markup". Then, on Mac top menu, in "Tools", choose "Macro" -> "Macros". Under "Macro name", enter "Highlight_insertions2", then click "+". 

Then:

```
Sub Highlight_insertions2()
'
' Highlight_insertions2 Macro
'
'
Dim arev As Revision
With ActiveDocument
.TrackFormatting = True
For Each arev In .Revisions
If arev.Type = wdRevisionInsert Then
arev.range.HighlightColorIndex = wdYellow
End If
Next
End With
End Sub
```

The above snippet was from [here](https://arbitweb.wordpress.com/2011/02/23/macro-to-highlight-track-changes-in-word/). The author is KE. 

Run it, and you can see that the changes are highlighted with yellow. 

It looks all good, until you open the document again, which shows all the tracked changes on the right panel. To delete those, under "Reivew" -> "Accept", choose "Accept All Changes".

Next time, after making changes, you only need to "Macro -> Macros", and you'll see "Highlight_insertions2". Simply click "Run". 

{{<block class="note">}}
I found another solution [here](https://xp-song.github.io/posts/trackchange-word/).
{{<end>}}