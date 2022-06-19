---
title: 贝叶斯统计之概述
author: 郝鸿涛
date: '2020-01-18'
slug: bayesian-stats-chapter2
categories:
tags: 统计
---

前言：这篇文章是我上约翰.克鲁斯克老师 ([John Kruschke](https://psych.indiana.edu/directory/faculty/kruschke-john.html)) 的《贝叶斯数据分析》 ([P533: Bayesian Data Analysis](https://jkkweb.sitehost.iu.edu/jkkteach/P533/)) 这门课时，在课下看他的教材 *[Doing Bayesian Data Analysis (Second Edition)](https://www.sciencedirect.com/book/9780124058880/doing-bayesian-data-analysis)* 所做的笔记。

贝叶斯的本质是对于可能性[^1](credibility) 的重置 (reallocation)。比如，早上刚出家门，你看到门前地面是湿的。这个有很多种可能的原因：下雨了、小孩子撒尿了、环卫工人刚打扫了、物业洒水车刚洒了水、有人不小心把水杯里的水洒出来了、外星人来过自己的家然后离开的时候不小心留下的痕迹...这些所有的可能，**在我们获得进一步数据之前**，都有着自己的先验概率 (prior probability)。这些先验概率，是我们主观上认为的可能性，比如根据我们往常的生活经验，下雨的可能性要比外星人到访高的多。虽然高得多，我们获得的信息毕竟是有限的，因为我们只是观察了门前的一小块地。因此，这些可能性都是存在的。

然后，我们接着在路上走，发现不仅整条路都是湿的，而且房屋顶都是湿的，那么我们对概率进行重置：下雨的可能性进步一提升，而之前有可能的洒水车洒过水的可能性下降，因为洒水车不可能把水洒到房顶上。

Kruschke 老师的教材中的[图2.1](https://www.sciencedirect.com/science/article/pii/B9780124058880000027#f0010)对这一过程进行了进一步阐释。这张图展示了从一开始认为 A, B, C, D 都有可能是罪犯，而且可能性相同，然后一步一步找到新的线索，最后认定 D 是罪犯的过程。 

{{<figure src="https://ars.els-cdn.com/content/image/3-s2.0-B9780124058880000027-f02-01-9780124058880.jpg" title="图2.1, 来源: Kruschke 老师的教材 p.17">}}

贝叶斯统计中很关键的一步是找到可能的解释情况。比如看到门前的路面是湿的，我们已经想到了很多可能的情况，但是不可能把这些情况穷尽。比如，也有可能是一个人在正好经过你的家门的时候，接到一个电话，然后她就哭了，于是门前的路面就湿了，等等。我们也不用试着去穷尽可能情况，只需要找到我们感兴趣的几个情况就好。通过分析，我们可以看到这几个情况是否很好地解释了我们观察到的数据，如果没有，那么我们再去找别的可能的情况。这一过程叫做 posterior predictive check. 

很多的时候，一种可能性由一个数学公式来代表，然后看哪个公式可以更好得描述观察到的数据（具体来说，是看是否契合数据的*趋势 (trends)*以及*分散度 (spread)* 。从图[2.4](https://www.sciencedirect.com/science/article/pii/B9780124058880000027#f0025)可以看到， 两个数学公式中，明显第一个公式更好地描述了观察到的数据。需要注意的是，数学公式和观察到的数据之间并不存在因果关系。

{{<figure src="https://ars.els-cdn.com/content/image/3-s2.0-B9780124058880000027-f02-04-9780124058880.jpg" title="图2.4, 来源: Kruschke 老师的教材 p.23">}}


Kruschke 老师举了一个身高－体重的例子。[图2.5](https://www.sciencedirect.com/science/article/pii/B9780124058880000027#f0030)左边的图中，小圆圈代表了具体的每个人的身高－体重数据。


{{<figure src="https://ars.els-cdn.com/content/image/3-s2.0-B9780124058880000027-f02-05-9780124058880.jpg" title="图2.5, 来源: Kruschke 老师的教材 p.26">}}


[^1]: 这里，可能性当然也可以看做概率 (probability)，其实，概率是更为准确的说法。




