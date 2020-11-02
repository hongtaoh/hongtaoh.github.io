---
title: "How to Display Full Width Images in Hugo"
date: 2020-11-02T15:13:05-05:00
author: Hongtao Hao
slug: full-width-image-hugo
draft: false
toc: false
---
I originally thought it must be super difficult to have full width images in Hugo because the width of my body text is already defined and yet all figures have to be within body. I stumbled upon a very easy solution [here](https://visionscarto.net/observable-jekyll/).

Add the following[^1] to your website stylesheet:

```css
.fullwidth {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
```

Then, when using Hugo's default `figure` shortcode, include `class="fullwidth"`:

{{< rawhtml >}}
<p class="speshal-fancy-custom">
    This is <strong>raw HTML</strong>, inside Markdown.
  </p>
{{< /rawhtml >}}

{{<figure src="/media/sgs/sgs-hostel.jpg" caption="At a hostel in Interlaken, Switzerland, May 2017, by Hongtao Hao" class="fullwidth">}}


[^1]: It's not my creation, but the codes from [this tutorial](https://visionscarto.net/observable-jekyll/).