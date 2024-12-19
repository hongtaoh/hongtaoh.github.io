---
title: "大模型时代我们还需要译者吗？"
date: 2024-12-18T22:13:33-06:00
author: "郝鸿涛"
slug: llm
draft: false
toc: true
tags: 思考
---
我先说我的看法：对于大部分非文学类的翻译，大模型已经可以胜任。非政府类的同声传译我觉得将来大模型会比人做的更好。文学翻译以及容错率很低的同声传译，依然要人来做。

我自己好奇试了试，把《追风筝的人》最开始的部分分别让 ChatGPT 4o、Claude 3.5 Sonnet 和 Google Gemini 翻译。提示词都是一样的：

## 提示词

以下是 The Knite Runner 的开篇，请把它翻译成中文。如果你的训练数据里有原文和对应的译文，请忽略它们，请你自己翻译。这是小说题材。

December 2001

I became what I am today at the age of twelve, on a frigid overcast day in the winter of 1975. I remember the precise moment, crouching behind a crumbling mud wall, peeking into the alley near the frozen creek. That was a long time ago, but it's wrong what they say about the past, I've learned, about how you can bury it. Because the past claws its way out. Looking back now, I realize I have been peeking into that deserted alley for the last twenty-six years.

One day last summer, my friend Rahim Khan called from Pakistan. He asked me to come see him. Standing in the kitchen with the receiver to my ear, I knew it wasn't just Rahim Khan on the line. It was my past of unatoned** sins. After I hung up, I went for a walk along Spreckels Lake on the northern edge of Golden Gate Park. The early-afternoon sun sparkled on the water where dozens of miniature boats sailed, propelled by a crisp breeze. Then I glanced up and saw a pair of kites, red with long blue tails, soaring in the sky. They danced high above the trees on the west end of the park, over the windmills, floating side by side like a pair of eyes looking down on San Francisco, the city I now call home. And suddenly Hassan's voice whispered in my head: For you, a thousand times over. Hassan the harelipped kite runner.

I sat on a park bench near a willow tree. I thought about something Rahim Khan said just before he hung up, almost as an afterthought. There is a way to be good again. I looked up at those twin kites. I thought about Hassan. Thought about Baba. Ali. Kabul. I thought of the life I had lived until the winter of 1975 came and changed everything. And made me what I am today.

## 结果

### ChatGPT

2001年12月

我在十二岁那年，成了今天的我。那是1975年冬天一个寒冷而阴沉的日子。我清楚地记得那个瞬间：蹲在一堵破旧的泥墙后面，悄悄窥视着靠近冰冻溪流的小巷。那是很久以前的事了，但他们说的关于过去的那些话是错的，我明白了，他们说你可以埋葬过去。但过去会挣扎着爬出来。回头看，我意识到过去的二十六年里，我一直在窥视那条荒凉的小巷。

去年夏天的一天，我的朋友拉希姆·汗从巴基斯坦打来电话。他让我去看他。我站在厨房里，耳朵贴着听筒，知道电话里不止是拉希姆·汗的声音，还有我那些未曾赎罪的过往。在挂断电话后，我沿着金门公园北边的斯普雷克尔斯湖散步。下午的阳光在水面上闪烁着，几十艘微型帆船在清爽的微风推动下航行。我抬头看见了两只风筝，一红一蓝，长长的蓝色尾巴在天际翩翩起舞。它们在公园西端的树木上空跳跃，掠过风车，并肩漂浮，就像一双眼睛俯视着我现在称之为家的旧金山。

突然间，哈桑的声音在我脑海中低语：“为你，千千万万次。”哈桑，那位兔唇的追风筝人。

我坐在一棵柳树旁的公园长椅上，想着拉希姆·汗在挂电话前几乎漫不经心地提到的一句话：“总有办法变得再好一点。”我抬头看着那对风筝，想着哈桑，想着巴巴，想着阿里，想着喀布尔，想着我所度过的那些岁月，直到1975年的冬天到来，改变了一切，也造就了今天的我。

### Claude

2001年12月
我成为今天的我，是在12岁那年，1975年冬天的一个阴冷的日子。我清楚地记得那一刻，我蜷缩在一堵残破的泥墙后面，窥视着靠近结冰小溪的那条小巷。那是很久以前的事了，但人们对过去的说法是错的，我明白了这一点，关于你能把过去埋葬。因为过去总会挣扎着浮现。现在回想起来，我意识到我这二十六年来一直在窥视着那条荒废的小巷。

去年夏天的一天，我的朋友拉希姆·汗从巴基斯坦打来电话。他请我去看他。站在厨房里，握着话筒贴在耳边，我知道电话那头不仅仅是拉希姆·汗。那是我未曾赎回的过往罪责。

挂断电话后，我沿着金门公园北边的斯普雷克尔斯湖散步。午后初阳在湖面上闪烁，数十艘微型帆船在清爽的微风推动下航行。这时我抬头看见一对风筝，红色的风筝拖着蓝色的长尾，在天空翱翔。它们在公园西端的树梢上方高舞，越过风车，并排漂浮着，仿佛一双俯瞰旧金山的眼睛，这座我如今称之为家的城市。

突然间，哈桑的声音在我脑海中低语："为你，千千万万遍。"哈桑，那个兔唇的放风筝的人。我坐在柳树旁的公园长椅上。我想起拉希姆·汗挂电话前说的话，几乎像是随口一提："还有重新做好人的机会。"

我抬头望着那对孪生的风筝。我想起哈桑。想起巴巴。阿里。喀布尔。我想起在1975年冬天来临之前的生活，那个改变了一切的冬天。也造就了今天的我。

### Gemini

2001年12月

我在十二岁那年，一个1975年寒冷阴沉的冬日，变成了今天的我。我记得那个确切的时刻，蜷缩在一堵破败的泥墙后面，窥视着冰冻小溪附近的巷子。那是很久以前的事了，但我已经了解到，关于过去，他们说的都是错的，关于你可以把它埋葬。因为过去会不断地浮现出来。现在回想起来，我意识到我已经窥视着那条荒芜的小巷二十六年了。

去年夏天的一天，我的朋友拉希姆·汗从巴基斯坦打电话来。他让我去看他。站在厨房里，拿着听筒贴在耳边，我知道电话里不仅仅是拉希姆·汗。是我的过去，未赎的罪。

挂了电话后，我沿着金门公园北端的斯普雷克尔斯湖散步。初午的阳光在水面上闪闪发光，数十艘微型船只在清风吹拂下航行。然后我抬头，看到一对红色的风筝，长着蓝色的尾巴，在空中翱翔。它们在公园西端的树梢上空翩翩起舞，在风车上空飘荡，像一对眼睛俯瞰着旧金山，这座我现在称之为家的城市。

突然，哈桑的声音在我脑海中低语：“为了你，一千次。”哈桑，那个唇裂的风筝放飞者。

我坐在柳树附近的一张公园长椅上。我想起拉希姆·汗在挂电话前几乎是随口说的一句话：“有一种方法可以再次变得善良。”我抬头看着那两只风筝。我想起了哈桑。想起巴巴。阿里。喀布尔。我想起了我在1975年冬天到来之前的生活，改变了一切。并把我变成了今天的我。

## 李继宏的译作

2001年12月

我成为今天的我，是在1975年某个阴云密布的寒冷冬日，那年我十二岁。我清楚地记得当时自己趴在一堵坍塌的泥墙后面，窥视着那条小巷，旁边是结冰的小溪。许多年过去了，人们说陈年旧事可以被埋葬，然而我终于明白这是错的，因为往事会自行爬上来。回首前尘，我意识到在过去二十六年里，自己始终在窥视着那荒芜的小径。

今年夏季的某天，朋友拉辛汗从巴基斯坦打来电话，要我回去探望他。我站在厨房里，听筒贴在耳朵上，我知道电话线连着的，并不只是拉辛汗，还有我过去那些未曾赎还的罪行。挂了电话，我离开家门，到金门公园北边的斯普瑞柯湖边散步。骄午的骄阳照在波光粼粼的水面上，数十艘轻舟在和风的吹拂中漂行。我抬起头，望见两只红色的风筝，带着长长的蓝色尾巴，在天空中冉冉升起。它们舞动着，飞越公园西边的树林，飞越风车，并排飘浮着，如同一双眼睛俯视着旧金山，这个我现在当成家园的城市。突然间，哈桑的声音在我脑中响起：为你，千千万万遍。哈桑，那个兔唇的哈桑，那个追风筝的人。

我在公园里柳树下的长凳坐下，想着拉辛汗在电话中说的那些事情，再三思量。那儿有再次成为好人的路。我抬眼看着那比翼齐飞的风筝。我忆起哈桑。我缅怀爸爸。我想到阿里。我思念喀布尔。我想起曾经的生活，想起1975年那个改变了一切的冬天。那造就了今天的我。

## 评价

首先，大语言模型的三个版本，我觉得 ChatGPT 的最好，Claude 和 Gemini 在这里的翻译质量实差别很小。

ChatGPT 有一处明显的错误：

>我抬头看见了两只风筝，一红一蓝，长长的蓝色尾巴在天际翩翩起舞。

Gemini 翻译对了而且描述得很棒：

>然后我抬头，看到一对红色的风筝，长着蓝色的尾巴，在空中翱翔。

这个「长着」比李继宏的「带着长长的蓝色尾巴」更出彩。但是，原文中的「长长的尾巴」这个意思 Gemini 选择了忽略。

这一句很明显看出 ChatGPT 处理得比较好：

>它们在公园西端的树木上空跳跃，掠过风车，并肩漂浮，就像一双眼睛俯视着我现在称之为家的旧金山。

对比一下 Claud:

>它们在公园西端的树梢上方高舞，越过风车，并排漂浮着，仿佛一双俯瞰旧金山的眼睛，这座我如今称之为家的城市。

后半句明显有语病。

再来看 Gemini:

>它们在公园西端的树梢上空翩翩起舞，在风车上空飘荡，像一对眼睛俯瞰着旧金山，这座我现在称之为家的城市。

李继宏的翻译：

>它们舞动着，飞越公园西边的树林，飞越风车，并排飘浮着，如同一双眼睛俯视着旧金山，这个我现在当成家园的城市。

我觉得这句 ChatGPT 的翻译和人工翻译不相上下。我试了一下 DeepL，感觉质量也很高，而且很快。比 ChatGPT 稍微差一点，但是比 Gemini 好。

## 总结

我的结论还是一样的。非文学翻译我觉得大模型已经可以胜任了。像一般的社科类的书籍，用大模型翻译，然后人工校对就可以了。文学类的翻译，我个人还是倾向于看人工翻译。




