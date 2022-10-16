---
title: "How to Display Full Width Images in Hugo"
date: 2020-11-02T15:13:05-05:00
author: Hongtao Hao
slug: full-width-image-hugo
draft: false
toc: false
---

I thought it must be super difficult to have full width images in a Hugo post because the width of my body text is already defined and yet all figures have to be within the body. I stumbled upon a very easy solution [here](https://visionscarto.net/observable-jekyll/).

Add the following CSS codes[^1] to your website stylesheet:

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

{{<block class="tip">}}
Thanks to [Yihui's post](https://yihui.org/en/2021/06/css-full-width/), I now know that the above snippet can be shortened to only two lines of CSS:

```css
width: 100vw;
margin-left: calc(50% - 50vw);
``` 
{{<end>}}

Then, when using Hugo's [built-in `figure` shortcode](https://gohugo.io/templates/shortcode-templates/#single-named-example-image), include `class="fullwidth"` :

{{&lt;figure src=&quot;/media/cnblog/sgs/sgs-hostel.jpg&quot; caption=&quot;On the balcony of a hostel in Interlaken, Switzerland, by Hongtao Hao in May 2017&quot; class=&quot;fullwidth&quot;&gt;}}

The result is like this:

{{<figure src="/media/cnblog/sgs/sgs-hostel.jpg" caption="On the balcony of a hostel in Interlaken, Switzerland, by Hongtao Hao in May 2017" class="fullwidth">}}


[^1]: It's not my creation, but the codes from [this tutorial](https://visionscarto.net/observable-jekyll/).