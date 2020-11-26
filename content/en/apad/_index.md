---
title: A Paper A Day
type : apad
---
{{<block class="note">}}
I was inspired by the story of [*This scientist read a paper every day for 899 days. Here’s what she learned*](https://www.natureindex.com/news-blog/this-scientist-read-research-academic-paper-every-day-what-she-learned), so I decided to try it myself: Dedicating half an hour everyday to reading papers. 
{{<end>}}

## 2020-11-26
1. Finished Gilbert & Karahalios (2009)


2. Salganik et al (2020). Measuring the predictability of life outcomes with a scientific mass collaboration. *Proceedings of the National Academy of Sciences, 117*(15), 8398-8403.

Study design:

Data about family and children were available only for waves 1-5 (from child birth to age 9) but not available yet for wave 6 (child age 15). Researcher tried to predict the results (child GPA, child grit, household eviction, household material hardship, caregive layoff, and caregiver participation in job training) of wave 6 based on the whole data for waves 1-5 and half of the data for wave 6. 

Result:

Scientists leveraging complicated machine learning algorithms could not predict those outcomes correctly. If a score of 1 means perfectly accurate, and 0 not accurate at all, the best preditions got a score of 0.2 for material hardship and child GPA, and only 0.05 for other four outcomes. Also note that a linear regression or logistic regression model with only four variables chosen by domain experts were only slightly worse than the best submission, and were much better than most of other submissions. 

>... the submissions were much better than predicting each other than predicting the truth. 


## 2020-11-25
Continued with Gilbert & Karahalios (2009)

## 2020-11-24

Gilbert, E., & Karahalios, K. (2009, April). Predicting tie strength with social media. In *Proceedings of the SIGCHI conference on human factors in computing systems* (pp. 211-220).

### Key question: 

1. Can dimensions of tie strength predict tie strength? How?
2. Limitations of this model?

### Methods
Participants on Facebook answered five tie strength questions for as many friends as possible within half an hour, ending up with 2184 Facebook friendships rated. 

The five questions are: How strong is the relationship, how comfortable to ask for a loan, how helpful if looking for job, how upset if unfriended, and how important to bring friend to a new channel if need be. (See Table 2)

Independent variables: The researchers then used 74 Facebook variables (such as Wall and words in the *inbox*) to predict intensity, intimacy, duration, reciprocal services, structure, emotional support, and social distance. (See Table 1) Participants also answered questions regarding demographic ans Facebook usage on them selfies and their friends.

Dependent variables: answers from participants for the five questions mentioned above. 

PP. 1-4

## 2020-11-23

1. Finished Weng et al. (2018)

Links between people can be categorized into two types based on reciprocity: social links and informational links. 

Second result: Weak ties attracted attention as much as, or even more than strong ties. 

>... people interact along strong ties due to their social relationships, while looking for novel information through weak ties. 

2. Finished Lilian Weng's article of [*Attention? Attention!*](https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html). Couldn't understand it. 


## 2020-11-22
Weng, L., Karsai, M., Perra, N., Menczer, F., & Flammini, A. (2018). Attention on weak ties in social and communication networks. In *Complex Spreading Phenomena in Social Systems* (pp. 213-228). Springer, Cham.

Many papers on the strength of weak ties do not answer the question of whether weak ties carry **important** or **novel** information.

To answer this question, we can test whether users pay more attention to information travelled through a weak tie. But how can we measure "attention"? A reasonable proxy is the number of friends a user has in a social network. 

Result:

1. Strong tie carry more traffic, confirming that people communication more with close friends.

PP. 1-12

## 2020-11-21
Centola, D. (2019). *Influential networks. Nature human behaviour, 3*(7), 664-665.

Ordinary people, instead of influencers ("hubs), are more likely to propagate complex contagions because they offer more social reinforcement. 

## 2020-11-20
Guilbeault, D., Becker, J., & Centola, D. (2018). Social learning and partisan bias in the interpretation of climate trends. *Proceedings of the National Academy of Sciences, 115*(39), 9714-9719.

### Central question
Does information exchange in bipartisan communication networks increase or decrease partisan bias?

### Literature
What is the drawback of previous studies: people had conversations, so that researchers could not distinguish between the effect of partisan priming, and that of opposing views. 

### Design & Procedure

Four groups:

A control group in which participants had **the same** political ideology;

Group 2, 3, and 4 are all structured social networks with an equal number of conservatives and liberals. Group 2 were only shown the average of their 4 network neighbors, without any other information exhibited. Group 3 were shown the average of their neighbors plus the logos of political parties. Group 4 were shown the average as well, along with the neighbors political identity. 

Each group provided estimates for three times. For the first round, each member estimated independently. 

In Round 2 and Round 3, the control group revised their answers independently. Group 2 revised their answers while being exposed to their neighbors' average answer. Group 3 revised their answer while bing exposed to Republican and Democratic party logo below their neighbors' average estimate. Group 4 revised their response while bing were shown the usernames, political identification, and the average of each of their four neighbors, and the average of these four neighbors' answers.

### Results
Group 2: both liberals and conservatives improved their trend accuracy, with an elimination of partisan bias in interpreting climate change data. Even conservatives in this group predicted trend significant more accurately than liberals in the control condition. 

Group 3: there was no effect of social learning, and belief polarization in Round 1 was maintained. 

Group 4: trend accuracy improved but moderate belief polarization remained. 

(Belief polarization means that liberals significantly outperformed conservatives in predicting climate change trend.) 

- Exposure to logos of political parties had a stronger effect on decreasing the impact of social learning than exposure to neighbors' political identity. 

- Both conservatives and liberals improved their prediction accuracy thanks to information exchange in networks, even when exposed to their network neighbors' political identification. 

### Robustness check
Can social learning reduce polarization in homogeneous networks (i.e., networks that not bipartisan)? Robustness tests showed that **the effect of social learning was reduced in politically homogeneous networks**: by Round 3, trend accuracy of conservatives in these echo chambers did not differ significantly from conservatives in the control condition. 

{{<block class="reminder">}}
Considering this result, instead of saying the effec of social learning was **reduced**, I think it's more accurate to say it was **removed**.
{{<end>}}

Another question is whether the effect of social learning remains if participants in Group 4 were shown individual answers rather than an average. Results showed that the effect of social learning was robust to exposure to individual responses.

{{<block class="reminder">}}
I am very puzzled by the result. It showed that the effect of social learning was eliminated in homogeneous networks, but the paper of *the wisdom of partisan crowds* showed exactly [the opposite result](/en/apad/#2020-11-16-edited-on-2020-11-19-and-2020-11-20). 
{{<end>}}

### Conclusion & suggestion
It's better to have political discussions in biparsition networks without partisan cues.

## 2020-11-19
Continue with Guilbeault, Becker, & Centola. (2018)

- Complex contagions require a critical mass to start a large-scale cascade and critical mass is dependent on network topology, nodes degree distribution, and adoption thresholds. 

New directions:

1. Ecologies of complex contagions: how several contagions interact with each other within a network and across networks. 

{{<block class="note">}}

The following were added on 2020-11-22

2. Heterogeneity of thresholds

Thresholds of contagions vary. Different people and different activities may have different thresholds. 

3. Homophily and diversity in diffusion

Identity-based diversity means one's neighbors have different characteristics. Structural diversity means one's neighbors belong to different components of the network. The first kind of diversity **reduces** the spreading of complex contagions whereas the second one **amplifies** it.

If one has too many friends, he or she might not be an ideal target of complex contagions. This is because complex contagions need multiple reinforcement. When you have too many friends, you receive fewer repeated exposure. Therefore, "clustered, homophilous networks" are conducive to complex contagions. 

  - How do people infer global structure from their local interactions?
  - How do future social media networks faciliate (or reduce?) these inferences by giving people more (or less?) information about their broader ego network?

{{<end>}}

## 2020-11-18
Continue with Guilbeault, Becker, & Centola. (2018)
- When social networks get smaller, it becomes easier to spread for simple contagions but harder for complex contagions. 
- Research in complex contagions: health, innovation, social media, and politics
- Peer characteristics, such as homophily and diversity, influenced how likely behavior changes. 
- Diffusion of innovations is characterized by complex contagions. 
  - Dynamics of adoption might be different from that of termination. 
- Which has more effects on the likelihood of spreading through social influence: the influence of the source person, or the quality of the contagion?

PP. 7-14.

## 2020-11-17
1. Continue with Becker, Porter, & Centola. (2019)

Conclusion: Homogeneous networks do not necessarily lead to polarization. In fact, polarization is decreased and accuracy increased. 

Then why do we still have polarized public opinions? This is because popular social media are centralized networks, which make influencers able to exert disproportional effects on other people in the network. 

Future directions: 
- Any other reasons why "echo chambers" and polarization coexist in reality? 
- Is it possible to replicate this study in real-life networks? For example, in Facebook or Twitter, where information exchange is not limited to numeric estimates?
- How could we eliminate, or at least reduce the effects of influencers in a network, if ever possible? 

2. Guilbeault, Becker, & Centola. (2018). Complex contagions: A decade in review. In *Complex spreading phenomena in social systems* (pp. 3-25). Springer, Cham.

PP. 1-7

## 2020-11-16 (Edited on 2020-11-19 and 2020-11-20)
Continue with Becker, Porter, & Centola. (2019)

Results of Experiment 1: Information exchange in homogeneous networks increased accuracy for both party memebers and decreased belief polarization. 

Individual learning (being able to edit their answers in Round 2 and 3) was not the reason for increased accuracy because **the decrease in truth-centered mean (absolute distance from the mean) in the social group was significantly larger than that in the control group**. Therefore, the change should be attributed to information from others. 

Another possible reason is that the increased accuracy for groups as a whole obscured the decreased accuracy at an individual level, for example, when the standard deviation of truth-centered mean in a group increased. Results showed that for social groups, the standard deviation of responses in Round 3 was significantly smaller than that in Round 1. This change did not occur in the control group, indicating that **similarity within social groups increased**. 


**Replication study design** has some differences than Experiment 1:

1. More controversial questions;
2. Participants were required to confirm their political preference before participating in the study;
3. The experiment interface included an image of an elephant and a donkey;
4. The answer from four other connected participants were accompanied by their political orientation;
5. Subjects knew that they were participating in a study related to "Politics Challenge". 

Items 2 - 5 were partisan primes intended to "enhance the effects of partisan bias on social information processing" (p. 4).

Results of the replication study: same as in Experiment 1, social learning increased participants' answer accuracy for both Democrats and Republicans. Participants within each group became more similar over time. 

So, 

>... social learning is robust to partisan priming for both group-level improvement and individual improvement. 

But how about the difference between Democrats and Republicans? The above results showed "within group" changes but not between group changes. Results showed that between-group similarity also increased for participants in the social condition (37% for Experiment 1 and 46% for the replication study), which means that polarization decreased. 

**To recap**: social information exchange within homogeneous networks helped people make more accurate estimates. Similarity within and between groups increased, indicating that people within social groups got similar, and that polarization diminished. And this result withstood partisan priming. 

My question: Will the result stay the same if information exchange is not confined to numeric estimates? Why don't we allow people to chat? Is it because of lack of technical support or that there is theoretical consideration against it?

## 2020-11-15
Becker, Porter, & Centola. (2019). The wisdom of partisan crowds. *Proceedings of the National Academy of Sciences, 116*(22), 10717-10722.

**Aim**: to see whether there is "wisdom of crowds" in politically homogeneous networks. 

**Experiment design**: 

Participants were randomly assigned to two conditions: control condition vs social condition. They were asked to provide an answer to a question for three times (rounds):

- Participants in the control condition provided the answer independently for three times. 

- Those in the social condition answered independently in Round 1. In Round 2, they were shown the average answer of four other participants connected to them in a social network and then updated their answer. In Round 3, they were shown the average of the updated answers of four other participants connected to them (same in Round 2) and provided a final answer to the question. 

- A network consists of 35 participants who shared the same political orientation (either Democrats or Republicans). Participants in the network **did not** know that other people in the network had the same partisan preference as theirs. 

- The researchers tested four question. Each question was answered by 3 network groups and 1 control group for each political party. 

## 2020-11-14
Continue with Popp, T. (2019)

The experiment comparing the effects of two different network structures (clustered vs random) on the behavior spread was concluded in my [earlier post](/en/apad/#2020-09-12).

Another experiment involves an 11-week fitness initiative among 800 graduate students at Penn. The experiment consisted of four groups:
  1. Group 1: Control group. Participants were allowed to sign up for fitness classes through an online portal. 
  2. Group 2: Same as the control group, but participants were also divided into groups based on their similarities. On the online portal, class attendance of anonymized "health buddies" was displayed. Communication with each was not possible.
  3. Group 3: Access to the online portal + groups based on similarities + communication between health buddies
  4. Group 4: Conditions in Group 3 with scores of other groups displayed on the portal. 

In Group 1 and 2, individuals completing the most classes were promised to get monetary rewards. In Group 3 and 4, health buddy groups completing the most classes got the monetary rewards. 

Results: 1). Exercise rate in group 2 & 4 were much higher; 2). Group 3 did worse than the control group. 

## 2020-11-13
Popp, T. (2019). The Virality Paradox. *The Pennsylvania Gazette*. Retrieved from [https://ndg.asc.upenn.edu/wp-content/uploads/2019/05/Virality-Paradox.pdf](https://ndg.asc.upenn.edu/wp-content/uploads/2019/05/Virality-Paradox.pdf)

- Even without digital tools to communicate with each other, rebel activities became more widespread in Syria. This is surprising because without telecommunication, Syrian rebels lost long ties that bridge groups far away from each other. That is, they had to rely on face-to-face communication to coordinate. How did it happen? When you get to understand that the way behaviors spread is different from that information diffuses, the answer will become clearer.

- Information, messages, and ideas spread like epidemic whereas human behaviors don't. Contagions can be classified into two types: simple and complex. A single contact can start a simple contagion, but won't do the same for complex contagions, which involve efforts and costs, and require confirmation or reinforcement from multiple sources. 

- Long ties are enough for simple contagions whereas complex contagions favor wide ties. How wide should a tie be for a behavior to spread varies. If reputation is at stake, the threshold will be higher. That's where complex contagions are very different from simple ones. In simple contagions, hubs get infected early and then it spreads the infections to many others. In a complex contagion, however, hubs usually have reputation at stake, so they are less, rather than more, likely to get infected. 

## 2020-11-12
Finished Guilbeault & Centola. (2020)

>... allowing smokers and nonsmokers to exchange views while aware of each other's smoking status effectively reduced bias both in their evaluation of health risks, and in their beliefs about each other's capacity to accurately interpret scientific data about the health risks of tabaco use. 

An interesting finding in this study is that after interacting with each other in social networks (which was limited to numeric estimates in the study), smokers and nonsmokers did not differ significantly in their perceptions of smokers' ability to understand health information associated with smoking. This means that biases were reduced. 

## 2020-11-11
Continue with Guilbeault & Centola. (2020)

Study design: 

1,600 people were recruited via Amazon’s Mechanical Turk. There are 10 independent trials in the experiment. Each trial involves 160 participants who were randomly assigned to the following three groups:

1. Control group: 40 smokers / 40 non-smokers, so 80 people in each trail. 

2. Anonymous network group: 40 people (20 smokers and 20 nonsmokers) were embedded into a random social network that is decentralized and anonymous.

3. Informative network group: 40 people (20 smokers and 20 nonsmokers) were put into a social network where they could see the usernames and the smoking status of their four network neighbors. 

Procedure: 

Participants were shown an [anti-smoking advertisement](https://journals.plos.org/plosone/article/figure?id=10.1371/journal.pone.0227813.g002) and were asked to estimate the health risk of smoking by answering this question: How many people (in millions) are predicted to die from tobacco use in developed countries, in 2030? 

Participants were incentivized by monetary reward awarded based on the accuracy of their final answer. Changes in answers' accuracy were measured by the difference between Round 1 and Round 3. 

- Round 1: Participants in all group provided the answer independently. 

- Round 2: Group 1 revised their estimates with independent reflection. Group 2 were shown the average response of their contacts and then revised their estimates. Group 3 were also shown the average response by their four contacts. They were also shown the usernames and the smoking status of their contacts. 

- Round 3: Same as in Round 2. 

Results:

- In Round 1, both smokers and nonsmokers were equaly inaccurate at estimating the health risk of smoking;
- No significant improvement in estimate accuracy in the control group. 
- The decrease in estimate error in group 2 was significantly greater than both smoker and nonsmokers in the control group;
- The decrease in estimate error in group 3 was significantly greater than group 2. Specifically, this decrease is ten times greater than both smoker and nonsmoker in the control group. 


## 2020-11-10
Guilbeault, D., & Centola, D. (2020). Networked collective intelligence improves dissemination of scientific information regarding smoking risks. *Plos one, 15*(2), e0227813.

PP. 1-6

## 2020-11-09

Centola (2020). Why Social Media Makes Us More Polarized and How to Fix It. Retrieved from [https://www.scientificamerican.com/article/why-social-media-makes-us-more-polarized-and-how-to-fix-it/](https://www.scientificamerican.com/article/why-social-media-makes-us-more-polarized-and-how-to-fix-it/).

>The more equity in people's social networks, the less biased and more informed groups will become--even when those groups start off with highly partisan opinions. 

- We believed that if we are put in a group consists of like-minded people (so called "echo chambers"), we probably won't develop ideas that are in the opposite side of the spectrum. However, two social media experiments found the opposite results. In a study, Democrats and Republicans were put into "echo chambers", and discussed polarizing issues such as gun control, unemployment rate, and immigration. Both groups ended up moving toward a more moderate view of the topics. 

- In another study, smokers and nonsmokers estimated the risks of cigarette smoking. After the study, both groups had a more accurate understanding of the topic, and a higher opinion of the other group.

- Social media of our time exacerbates rather than eradicates partisan bias, because it's centralized, rather than egalitarian. In a centralized network, influencers filter or even block information. For example, if an influencer spreads a piece of wrong information, it might end up becoming an entrenched false belief in the whole community, whereas in an egalitarian network, each person has an equal say, and ideas are weighed by its own quality rather than the influence of the people behind them. 

## 2020-11-08
1. Finished Salehi & Bernstein (2018)

This paper is a little bit too long. I skimmed through the last 2/3 of it. 

2. Ahn, Y. Y., Ahnert, S. E., Bagrow, J. P., & Barabási, A. L. (2011). Flavor network and the principles of food pairing. *Scientific reports, 1,* 196.

Main Takeaway: North American and European cuisine tends to combine ingredients with shared flavor but East Asian dishes don't. 

## 2020-11-07
Continue with Salehi & Bernstein (2018)

- To boost cooperative work, intermix people, not ideas. 

PP. 1-10

## 2020-11-06
1. Finished Ahn et al. (2007) 

The second half of the paper is difficult for me, so I skimmed through it. 

2. Schich et al. (2014). A network framework of cultural history. *Science, 345*(6196), 558-562.

I skimmed through it. 

3. Salehi, N., & Bernstein, M. S. (2018). Hive: Collective design through network rotation. *Proceedings of the ACM on Human-Computer Interaction, 2*(CSCW), 1-26.

P. 1.

## 2020-11-05
Continue with Ahn et al. (2007)

It's insightful to examine the distribution of clustering coefficient of different degrees. The clustering coefficient of degree `$ k $` is represented as `$ C(k) $`.

Degree of separation is the mean distance between two nodes.

It surprised me that Professor YY used red and green for visualizations, which is unfriendly for color blind people. 

PP. 4-9

## 2020-11-04 [Complted on 2020-11-05]
Continue with Ahn et al. (2007)

- Three network sampling methods: node sampling, link sampling, and snowball sampling. 
  - Node sampling: select randomly several nodes, and links between these selected nodes are included in the sample;
  - Link sampling: similar to node sampling, select randomly a bunch of links, and nodes attached to these links are included in the sample;
  - Randomly select a seed node and do a breath-first-search until the number of selected nodes reaches expectation. Only links between selected nodes are included in the sample. 

{{<block class="reminder">}}
I need to brush up on Breadth-First-Search. Forgot its algorithm already. 
{{<end>}}

- Power-law degree distribution usually is plotted as a CCDF (complementary cumulative probability function). Yeah, I missed this point when I first learned power-law. 

- Clustering coefficient of a node: 

`$$\frac{Number \ of \ existing \ links \ between \ its \ neighbors}{Number \ of \ all \ possible \ links \ between \ its \ neighbors}$$`

Its describes how well its neighbors are connected.

The clustering coefficient of a network is the mean of all nodes' clustering coefficient. It stands for the probability of a link between two randomly selected nodes that share a neighbor. 

## 2020-11-03
1. Finished Steegen et al. (2016)

>In a more complete analysis, the multiverse of data sets could be crossed with the multiverse of models to further reveal the multiverse of statistical results. 

This is so true. I have several thoughts about this point:

First, it shows how arbitrary the choices in data processing and model picking are, and therefore, how arbitrary the statistical results might be. When I was doing research on selfie, I also had the same feeling. When I was doing the content analysis study comparing the differences in White women's selfies on Twitter and Chinese women's selfies on Weibo, I had to made so many arbitrary choices: whether to drop an item from a construct, whether to combine items, should I use a *t* test or nonparametric test, etc. 

Second, doing multiverse analysis reporting is very methodologically challenging. I cannot imagine a Master student after attending one statistics class doing a project involving more than 200 choice combinations. 

Finally, scholars will find it more difficult to cite others' studies. Right now, it's fairly easy to cite because almost all research papers generate a **certain** result. With multiverse analysis, almost all studies will involve many **uncertainties**. This complicates how people interpret the statistical results. 

That said, statistics is about **uncertainties**. It's certainly good to show these **uncertainties**. I think the science community, and the public, should be accustomed to seeing **uncertainties** in statistical results in the coming years. 

2. Ahn, Y. Y., Han, S., Kwak, H., Moon, S., & Jeong, H. (2007, May). Analysis of topological characteristics of huge online social networking services. In *Proceedings of the 16th international conference on World Wide Web* (pp. 835-844).

PP. 1-2

## 2020-11-02

Continue with Steegen et al. (2016)

>We suggest that, if several processing choices are defensible, researchers should perform a multiverse analysis instead of a single data set analysis. 

>A multiverse analysis is a way to avoid or at least reduce the problem of selective reporting by making the fragility or robustness of the results transparent, and it helps the identification of the most consequential choices. 

>Even when confronted with only one arbitrary data processing choice, researchers should be transparent about it and reveal the sensitivity of the result to this choice. 

>Increasing transparency in reporting through a multiverse analysis is valuable, regardless of the inferential framework (frequentist or Bayesian), and regardless of the specific way uncertainty is quantified: a *p* value, an effect size, a confidence (Cumming, 2013) or credibility (Kruschke, 2010) interval, or a Bayes Factor (Morey & Rouder, 2011).

The authors argued that "preregistration or blind analysis are not useful strategies for deflating the multiverse" (p. 709). I totally agree. I am not familiar with blind analysis, so I'll just talk about preregistration. As the authors noted, even the study is preregistered, the result is still just one of the many possible choice combinations, albeit preregistered made. Therefore, the results of a preregistered study are still arbitrary, if the research involves arbitrary, or "whimsical" choices in data construction. 

The authors also talked about "model multiverse" at the end of the article. 

Something I don't understand yet in this paper:

{{< reminder >}}
When participants are excluded based on reported or computed cycle length, we do not consider next menstrual onset based on computed or reported cycle length, respectively.
{{< end >}}

{{< reminder >}}
When only one choice is clearly and unambiguously the most appropriate one, variation across this choice is uninformative. 
{{< end >}}

## 2020-11-01
Steegen, S., Tuerlinckx, F., Gelman, A., & Vanpaemel, W. (2016). Increasing transparency through a multiverse analysis. *Perspectives on Psychological Science, 11*(5), 702-712.

- Some common measures to solve the reproducibility crisis in social sciences: high power, adjusting the `$\alpha$` level, focusing on estimation not on testing, using Bayesian statistics.

- How can we increase transparency in research: pre-registration, sharing data & research materials. 

- I agree that there are so many choices to make when dealing with raw data. So the same raw data might end up becoming many different datasets ready for analysis if it was processed by many researchers. This is what multiverse is trying to do: **to list all possible (and reasonable) datasets derived from the raw data, and show all possible statistical results**. 

>A multiverse analysis displays the stability or robustness of a finding, ... across different options for all steps in data processing. (p. 703)

PP. 702-707


## 2020-10-31

[Fig. 1](https://www.pnas.org/content/pnas/112/8/2389/F1.large.jpg?width=800&height=600&carousel=1) shows the happiness distribution of words in each language, but how each word varies in their happiness score between languages. Google Translate is used. The result can be found in [Fig. 2](https://www.pnas.org/content/pnas/112/8/2389/F2.large.jpg?width=800&height=600&carousel=1). As can be seen, the order changed a little bit, but the overall patter remained. Spanish is the "happiest", and Chinese is the "saddest" (I highly doubt so, though).

Another interesting question to ask is whether a word's happiness score is associated with its frequency of use. As can be see in [Fig. 3](https://www.pnas.org/content/pnas/112/8/2389/F3.large.jpg?width=800&height=600&carousel=1). It turns out they are not associated. 


## 2020-10-30
Dodds et al. (2015). [Human language reveals a universal positivity bias](https://www.pnas.org/content/112/8/2389). *Proceedings of the National Academy of Sciences, 112*(8), 2389-2394.

PP.1-2

Purpose: To study the positivity of human language

Material: 24 corpora of 10 languages, including Chinese (simplified), Korean and Arabic

Measure: a word's importance is measured by its frequency

Procedure:

1. For each language, obtain the most frequently used words (around 10K)
2. Invite (and pay) native speakers to rate "how they felt in response to" (p.2390) each word on a 9-point Likert scale, with 1 representing the most negative or saddest, 5 neutral, and 9 the most positive or happiest. Each word receives 50 ratings, so there are 5 million human assessments in total. 

Results:
1. The result can be found in [Fig. 1](https://www.pnas.org/content/pnas/112/8/2389/F1.large.jpg?width=800&height=600&carousel=1).

## 2020-10-29
Finished Kramer et al. (2014)

>You can see my summary of this paper in [HTML](https://hongtaoh.com/files/apad/emotion_contagions.html) or [PDF](https://hongtaoh.com/files/apad/emotion_contagions.pdf)

Implication-2. Seeing fewer friends' positive posts led people to produce fewer positive words in their own posts, rather than the opposite. 

### Drawbacks
- The effect size is quite small. 

### Thought
As the *Editorial Expression of Concern and Correction* said, it is "a matter of concern" that what we see on social media is to such a large extent manipulated by tech giants. As the study found, the content we see has an effect on our well-being. Even if they don't, users should be able to know what they are going through, rather than becoming a subject in an experiment we are ignorant of. 

## 2020-10-28 [Completed on 2020-10-29]
Continue with Kramer et al. (2014)

### Measurements & Measures
- To test the hypotheses, how are negativity and positivity measured: The percentage of the words as either positive or negative produced by a person.
- A check before running the experiment: all four groups did not differ in emotional expression in the week prior to the experiment. 
- Why using a weighted linear regression:  It was described in the Study Design that the chance a post being omitted is not fixed. However, an effect was found that when people see fewer posts (i.e., more omission), they in turn posted fewer words. Therefore, we need to account for this effect by assigning weights to people. Specifically, people having more omission were given a higher weight in the regression. See details on p. 8789. 

### Results
Both H1 and H2 were supported. As can be seen in [the figure](https://www.pnas.org/content/pnas/111/24/8788/F1.large.jpg?width=800&height=600&carousel=1), when negativity is reduced, people generate more positive words and fewer negative words, compared to the control group. The opposite patter occurred when positivity is reduced. It shows that **emotions expressed by our friends through online social networks influenced our own mood status**.  

Some implications:
1. Direct interactions were not necessary for emotional contagion. 

## 2020-10-27
Continue with Kramer et al. (2014)

### Study design
- Why are two (separate) control conditions needed? Because the percentage (46.8%) of posts containing at least one positive word is much larger than that (22.4%) of posts containing at least one negative word. Suppose that for a person, 10% of his **positive** News Feed is omitted, and there is only **one** control group, what should be the corresponding percentage of a person's **random** News Feed being omitted in this control group? I don't know. Why? For example, if there are three people in experiment A (positivity reduction group), and their content reduction rate is 12%, 13%, and 14% respectively. Accordingly, we assume that the content reduction rate in the control group should be 12% times 46.8%, 13% times 46.8%, and 14% times 46.8%.  **No**. Why? Because there is also experiment B, whose content reduction rate might be different that that of experiment A. **Therefore, each experiment needs a separate control condition**.

### Hypotheses
- H1: If emotions are contagious via pure exposure to verbal expressions, then compared to their control group, Group A will be less positive, reflected by posting fewer positive content than before) and Group B will be less negative, reflected by posting fewer negative content than before).

- H2: "Opposite emotion should be inversely affected" (p. 8789): Group A should express increased negativity, and Group B should express increased positivity. 

### Thoughts
- It's interesting that in people's own status updates during the experimental period, only 3.6% were positive and 1.6% negative. However, for posts in people's News Feed, 46.8% were positive and 22.4% were negative. Why was it that News Feed posts were so much more **emotional** than people's own status updates? Is it because Facebook's algorithms likes to show more emotional contents to its users? I guess so. 

## 2020-10-26

Continue with Kramer et al. (2014)

### Why is this study needed?
Correlational studies cannot answer this question since it cannot support causality. Controlled experiments can support causality, but they have these problems:
  1. Exposure is not equal to interaction. In a controlled experiment, mood change might come from interacting with a happy/sad person, rather than simply being exposed to that person's mood;
  2. Nonverbal cues are unavoidable in a controlled experiment, thus making it impossible for us to disentangle the effect of verbal cues.

Therefore, this study makes unique contributions to answering this question. 

### Study design
- Two parallel experiments: In experiment A, people see less positive emotional content whereas in experiment B, people see less negative emotional content. Both had a control condition, in which posts had an equal chance (see below) of being omitted, randomly (i.e., without considering their emotional valence).
  - How much less? Good question! According to the authors, "each emotional post had between a 10% to 90% change (based on their User ID) of being omitted from their News Feed ..."
  - Well, how do you categorize a post as positive or negative? Awesome question. If a post contains at least one positive word as defined by LIWC2007, then it is a **positive** post. The same is for negative posts. 


## 2020-10-25
Kramer, A. D., Guillory, J. E., & Hancock, J. T. (2014). Experimental evidence of massive-scale emotional contagion through social networks. *Proceedings of the National Academy of Sciences, 111*(24), 8788-8790.

### Key question
The key question this paper was trying to answer: does exposure to mood expressed in the News Feed on FB change the content people post (that reflects their mood changes)? Or in the authors own words, "whether exposure to verbal affective expressions lead to similar verbal expressions, a form of emotional contagion."


## 2020-10-24
Continue reading Lawrence (2007).

### What problems can these measures cause:

- Authors might 1) complicate their methods section so that it's difficult for reviewers to fault it; 2) hide results that do not fit with their arguments; 3) split the findings into multiple papers even if one paper is enough to cover all the results; 4) compress the results to meet the requirements of top journals like *Nature* or *Science*; 5) hype their work.

  - I would add one: p-hacking.
  - The point that authors might complicate their methods section resonate with me strongly. After reading papers each day for over 6 weeks, I felt that the methods section of some papers is so dense and complicated that, if I were the reviewer, I didn't have that much time and efforts and decode it! This, I think, is really a problem. As I mentioned multiple times, I feel the most ideal studies are those with **simple methodology** and yet **impactful results**. A perfect example is Professor Duncan Watts and Steven Strogatz's masterpiece of [*Collective dynamics of 'small world' networks*](http://materias.df.uba.ar/dnla2019c1/files/2019/03/watts-collective_dynamics-nature_1998.pdf).

- Students have fewer opportunities to learn and fail. Since publication is so important, group leaders may end up writing students' work. 

  - I don't think this is true in social sciences. 

- Scientists spend a large portion of their time networking, which might bring them more co-authors, and leave a positive impression on journal editors. 

## 2020-10-23

Lawrence, P. A. (2007).

### How science and scientists are assessed today:

- Impact factors: Journals are evaluated based on their impact factors. Schools, departments and scientists "are assessed according to the impact factors of the journals they published in" (p. R583). 

- Number of citations: Scientists are evaluated according to the number of citations their publications receive.

### Why these measures are flawed:

- Impact factors (IFs): IFs reflect how many times, on average, each paper in a given journal gets cited in the two years following its publication. There are two problems with this measurement: 1) IF is about the journal, not about your paper. Even if your paper is flawed, or even wrong, it's still something you can boast, if it gets published in a top journal; 2) Important findings may receive very few citations within two years since its publication. 

- Number of citations: 1) People may cite papers simply because of convenience or visibility, not because of the significant of the studies. Many people don't even need read the papers they cite. 2) Because citations are so important these days, there might be unethical behavior involved. For instance, gatecrashing names by providing a reagent or data without actually participating in the study, or simply by power or authority. 

### What problems can these measures cause:

- Paper chase: Scientists spend so much time on writing and reviewing for, and submitting to top journals that they don't have much time left on solving scientific problems;

- Scientists will dodge uncharted areas and unpopular topics which are too risky. 


## 2020-10-22

1. Finished Guo et al. (2014)

I admire this piece of research very much. Again, it's the ideal kind I am striving for: simple, straightforward, easy to understand, and yet impactful. 

2. Lawrence, P. A. (2007). The mismeasurement of science. *Current Biology, 17*(15), R583-R585.

pp. 1-2.

>It is not so funny that, in the real world of science, dodgy evaluation criteria such as impact factors and citations are dominating minds, distorting behaviour and determining careers. 

>Citations are determined more by visibility and convenience than by the content or quality of the work. 

## 2020-10-21
Guo, P. J., Kim, J., & Rubin, R. (2014, March). How video production affects student engagement: An empirical study of MOOC videos. In *Proceedings of the first ACM conference on Learning@ scale conference* (pp. 41-50).

pp. 1-7.

### If I am asked to design a course for Coursera, I'd better:

1. Segment videos into short chunks (< 6 minutes);
2. Have my head recorded. Presentations should be inserted at opportune times or simply be presented with a picture-in-picture view;
3. Film in an informal setting where I can make eye contact with the potential audience, just like in an office hour talk;
4. If I don't want my head to be filmed, I'd better use Khan-style tutorials rather than slides;
5. Plan my lessons "specifically for an online video format" (p. 10) [**Edited on 2020-10-22**].

## 2020-10-20 

Börner et al. (2018). Skill discrepancies between research, education, and jobs reveal the critical need to supply soft skills for the data economy. *Proceedings of the National Academy of Sciences, 115*(50), 12630-12637.

Main takeaway: Soft skills are in high demand by the industry. 

My issue: I like data viz. However, I feel visualizations in this paper are a little bit too much. 

## 2020-10-19

Fei-Fei, L., & Perona, P. (2005, June). A bayesian hierarchical model for learning natural scene categories. In *2005 IEEE Computer Society Conference on Computer Vision and Pattern Recognition (CVPR'05)* (Vol. 2, pp. 524-531). IEEE.

It's all Greek to me. 

## 2020-10-18

Larivière, Ni, Gingras, Cronin, & Sugimoto. (2013). Bibliometrics: Global gender disparities in science. *Nature News, 504*(7479), 211.

> Barriers to women in science remain widely spread worldwide. 

Main takeaways:

- In the most productive countries, papers with women in dominant author positions, i.e., sole author, first author, and last author, are cited less than those with men in the same positions;

- South America and Eastern Europe had greater gender parity in terms of proportion of authorships. 

- Disciplines dominated by women all have to do with "care", for example, nursing; speech, language, and hearing; education.

- Natural sciences and humanities are dominated by men. Social sciences had a higher proportion of female authors. 

- "Female collaborations are more domestically oriented than are the collaborations of males from the same country"  (p. 213)


My issue: How did the authors assign gender to each author? It seems to me a very daunting task, especially when the names are of a non-Western origin. 

## 2020-10-17

Geman, D., & Geman, S. (2016). Opinion: Science in the age of selfies. *Proceedings of the National Academy of Sciences, 113*(34), 9384-9387.

My thoughts are [here](/en/2020/10/17/science-selfies/).

## 2020-10-16
Lazer, D., Kennedy, R., King, G., & Vespignani, A. (2014). The parable of Google Flu: traps in big data analysis. *Science, 343*(6176), 1203-1205.

Major takeaway: Big data research can learn from, and collaborate with small data research, which offers data that is not contained in big data. 

I started to think about my selfie studies. Specifically, I looked at 1) whether there are cultural differences between Chinese women's selfies on China's Weibo, and White Women's selfies on Twitter. For example, is it true that Chinese women focus on their face whereas White women focus on their body in their selfies? Do Chinese women's selfies show more cuteness? 

I also looked at 2) whether there are gender differences between men's selfies and women's selfies. For example, do women show more self-touching in selfies? 

I used a small-data approach. Although I downloaded over 30,000 images from Twitter and 8,000 images from Weibo, I only selected 200 from each platform for analysis, simply because I didn't have that much man power to analyze them all. 

Talking about dig data and small data research, I think I can combine the two here. Human content analysis can offer some insights and then directions for bid data research. After all, there are so many things to detect in a selfie: the gender of the person, his or her mood, surroundings, posture, facial expressions, etc. Deep learning algorithms need some directions so that they can give us the analysis we need. 

## 2020-10-15

Finished Bollen, Mao, & Zeng. (2011)

## 2020-10-14

1. Finished Giles (2012). 

Thoughts: Professor Granovetter is right in pointing out that data itself might not help us have a deeper understanding of our society. After all, his seminal paper on "weak ties" is based on theoretical thinking rather than data. 

What are most of the data in research papers used for? To test theories. But theories arise from thinking, not data. Data is limited. It's extremely difficult for most scholars to get high-quality large-scale data. That shouldn't become a barrier to theoretical advances. Scholars who cannot get access to quality data can focus on theoretical thinking. 

2. Bollen, J., Mao, H., & Zeng, X. (2011). Twitter mood predicts the stock market. *Journal of computational science, 2*(1), 1-8.

## 2020-10-13
1. Finished Sarma & Kay (2020). 

Major take-aways:

- "Weakly informed priors" are popular among scholars practicing Bayesian inferences. However, scholars might have different interpretations of this concept and different strategies to implement it. 

- Innovative prior elicitation interfaces can assist novice Bayesian practitioners set priors. 

2. Giles, J. (2012). Making the links. *Nature, 488*(7412), 448-450.

pp. 448-449.

## 2020-10-12 [Completed on 2020-10-13]

Sarma & Kay. (2020, April). Prior Setting In Practice: Strategies and rationales used in choosing prior distributions for Bayesian analysis. In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems (pp. 1-12).

pp. 1-8

## 2020-10-11
Shen & Williams (2011). Unpacking time online: Connecting internet and massively multiplayer online game use with psychosocial well-being. *Communication Research, 38*(1), 123-149.

Main Takeaway: The psychological impacts of Internet activities are nuanced. 


## 2020-10-10
Finished Centola & Macy. (2007). Main Takeaway:

The strength of weak ties should not be simply generalized to complex contagions, which requires affirmation from multiple sources. Therefore, not only the length, but also, and maybe more importantly, the width of the ties influences complex contagions.

## 2020-10-09
Centola, D., & Macy, M. (2007). Complex contagions and the weakness of long ties. *American journal of Sociology, 113*(3), 702-734.

p. 702 - p.711

## 2020-10-08
### Centola, D. (2010).

1. Within the unstructured condition, there are more non-obese adopters than obese adopter, both in terms of number and percentage;

2. Across conditions: homophily boosted adoption among both the obese (*P* < 0.01) and the non-obese people (*P* < 0.05), using Mann-Whitney U test. 

We can see that homophily had a significant effect on adoption of healthy behaviors. However, is it because obese people are more likely to be **exposed** to the behavior, or those who are exposed are more likely to adopt these behaviors in a homophilous group?

3. It turns out that within both conditions, the relative percentage of the obese and the non-obese **did not** differ significantly. 

4. Across conditions: homophily boosted both the number and the fraction of the obese who were exposed to the behavior (*P* < 0.05), using Mann-Whitney U test. This happened despite that obese people initially had greater exposure in the unstructured networks. 

5. Did homophily affect the adoption rate among those exposed? The effect was significant among the exposed obese people (*P* < 0.01), using Mann-Whitney U test, but not among the exposed non-obese individuals. 

I like this study: simple, and impactful. 

{{<block class="note">}}
Re-reading on 2020-11-22

### Literature
Homophily is defined as "the tendency of social contacts to be similar to one another". Although research on diffusion, and that on social influence differ over the effects of homophily on behavior spreading at the dyadic level, both agree that homophily decreases adoption at the network level. This is because, obviously, the more homophilous one's network is, he is she is less likely to be exposed to individuals of a different characteristic. If you are a less healthy person, and you find yourself in a homophilous network, it's less likely for you to be aware of what those healthy guys are doing. 

### Purpose
To study the effect of homophily on the adoption of healthy behavior

### Design
710 participants are randomly put into two conditions: homophilous population condition, and unconstructed population condition. Homophilous population condition consists of people having similar individual characteristics (gender, age, and BMI) whereas people in the other condition are random and mixed. 

All networks in the study have the same size (= 72), clustering coefficient (= 0.4), and degree distribution (= 6). The only differece is the level of homophily. 

The study consisted of five trials, each having two social networks. All these trials ran at the same time, for seven weeks. The healthy behavior to be adopted is to write diet diary online. 

The seed of the behavior in all networks is a "healthy" individual. At the start of Week 1, the author activated the seed nodes simultaneously. Once an individual signs up, their neighbors will be notified via email. 

### Results
Across all five trials, people in homophilous condition had a higher adoption rate than those in unconstructed condition. 

Comparing adoption among obese and nonobese individuals: Within homophilous condition, a greater percentage of obese individuals adopted the behavior than that of nonobese people. In unconstructed condition, both the number of and percentage of nonobese adopters were larger than obese adopters. In fact, there was **no** obese adopters in the unconstructed group at all. 

Comparing the two conditions: homophily increased the adoption among both the obese and nonobese people. 

However, from these results, we cannot say for sure that **homophily** is the reason. For example, it may be that in the homophilous condition, obese people have more neighbors who sign up and thus have more exposure. It may also because that homophily increases the likelihood for people to sign up once they are exposed. Therefore, we need to compare 1.) **exposure**, and 2.) **the likelihood to adopt once exposed** in the two conditions. 

It showed that, **within each of the two conditions**, the percentage of exposed obese people (num. of exposed obese / total num. of obese ppl) and that of exposed nonobese people (num. of exposed nonobese / total num. of nonobese ppl) do not differ significantly. **Across conditions**, homophily significantly increased the percentage of exposed obese people. See Fig. 2D.

How about the liklihood? **within conditions**, the likelihood to adopt after exposure was much higher for the obesed than for the nonobesed. **Acorss conditions**, homophily significantly increased obese people's likelihood to adopt after exposure. 

Therefore, homophily increased obese people's **access** to, and the **likelihood** to adopt, health behavior. 

>... low adoption levels of health innovations among less healthy individuals may be a function of social environment rather than a baseline reluctance for adoption. 

{{<end>}}

## 2020-10-07

1. Finished Eubank et al. (2004)

>Time of withdrawal to the home is by far the most important factor (in a disease outbreak in cities), followed by delay in response. This indicates that targeted vaccination is feasible when combined with fast detection. Ironically, the actual strategy used is much less important than either of these factors. -- Eubank et al. (2004)

2. Centola, D. (2011). An experimental study of homophily in the adoption of health behavior. *Science, 334*(6060), 1269-1272.

  - Within the homophilous condition, a higher **percentage** of obese people than non-obese people adopted the behavior (*P* < 0.05).

  P.1270

## 2020-10-06
1. Finished Schmälzle et al. (2017).

Main findings:

- Social exclusion correlates increased connectivity in the brain's mentalizing system;

- When excluded, people whose friends are sparsely connected with each other showed increased connectivity within key brain systems. 

Overall, social exclusion / inclusion is related to connectivity within one's brain networks. Also, the density of one's friendship network has an effect on the connectivity change. 

2. Eubank et al.(2004). Modelling disease outbreaks in realistic urban social networks. *Nature, 429*(6988), 180-184.

## 2020-10-05
Schmälzle et al. (2017). Brain connectivity dynamics during social interaction reflect social network structure. *Proceedings of the National Academy of Sciences, 114*(20), 5153-5158.

p. 5153 -p.5156

## 2020-10-04

Finished Chambliss. (1989). 

## 2020-10-03

>Superlative performance is really a confluence of dozens of small skills or activities, each one learned or stumbled upon, which have been carefully drilled into habit and then are fitted together in a synthesized whole. — Chambliss, D. F. (p. 81)

### Excellence requires qualitative differentiation. 

Those who are more successful are doing **different** things, rather than **more of the same** things. Quantitative changes do bring success, but only **within** the world you are currently in. You cannot go to **another world** by doing more of what you have been doing. Those who are top performers are better to be seen as **different** rather than as **better**. 

### Talent is not the reason for excellence. 

1. First of all, factors other than talent predict success more precisely. 

2. Second, you cannot distinguish talent from its effects, i.e., you cannot realize there is talent until someone succeeds. 

3. Third, the amount of talent needed for excellence is surprisingly small. 

### Excellence is mundane.

1. Success is ordinary. Success is simply doing small tasks consistantly and correctly.

**Note** : Below are the notes on 2020-10-04 

2. Motivation is also ordinary. Gold medalists did not think too far ahead. Instead, they focused on the most immediate goals, the so-called "small wins". For example, Steve Lundquist, who won two gold medals in swimming in the Los Angeles Olympics, set a goal that he would win every single swim in every single practice. **Small wins added up to excellence and success**. 

3. Don't take what you do as too important. You should maintain mundanity. If you are going to deliver a commencement speech in front of an audience of thousands, you should know that almost nobody cares about nor remembers what you have to say. When you are writing your doctoral thesis, you should also be aware that few people will read what you write. 


## 2020-10-02
Chambliss. (1989). 

p7-p12. 

## 2020-10-01
1. Finished Bullmore & Sporns. (2009)

2. Chambliss, D. F. (1989). The mundanity of excellence: An ethnographic report on stratification and Olympic swimmers. *Sociological theory, 7*(1), 70-86. 

p2 -p7.

## 2020-09-30
Bullmore & Sporns. (2009). p6-p9.

## 2020-09-29

Bullmore, E., & Sporns, O. (2009). Complex brain networks: graph theoretical analysis of structural and functional systems. *Nature reviews neuroscience, 10*(3), 186-198.

p1-p6.

## 2020-09-28

Stivers et al. (2009)

There is a universal patter for turn-taking. People aim to minimize gap and overlap in conversations. 

- Slower:

  1. Nonanswer responses
  2. Disconfirmation responses
  3. Responses ithout a visible component (e.g., head nods shrugs, head shakes, blinks, or eyebrow flashes)

- Faster: Questions with gaze from the questioner

## 2020-09-27

1. Stivers et al. (2009). Universals and cultural variation in turn-taking in conversation. *Proceedings of the National Academy of Sciences, 106*(26), 10587-10592.

2. Liljeros et al. (2001)

  - For both males and females, the cumulative distribution of the number of partners in the previous 12 months almost perfectly followed a straight line, indicating scale-free power-law characteristics;

  - For both genders, the cumulative distribution of the total number sexual partners in the entire lifetime followed a straight line only when `$k > 20$`. 

  - The network of sexual partners is a scale-free one, meaning that you cannot assume, for example, 90% of the individuals have 3 - 10 partners. This is simply because there is no inherent scale. It's a crazy world, literally. I cannot believe that there are people who have over 100, even 1000 partners in their lifetime. Isn't this a crazy world?

Other notes:

  - Thanks to this paper, I now know that for a power-law distribution to show a straight line, I need to use CDF (cumulative distribution function)

  - One thing I didn't understand is that how could the authors conclud that "the rich get richer" by simply looking at Figure 2a? I don't think it a rigorous remark. 

## 2020-09-26
1. Del Vicario et al. (2016).

This piece is a little bit too technical for me, especially the second part that involve modeling. Also, I had difficulty understanding the conceptualization of "homogeneity" and "polarization".

Major takeaways from this paper:

  - Information on social media quickly reaches in 2 hours around 20% of the people it can reach in the end, and reach in 5 hours around 40%. This is true for both science and rumors. 

  - Science news is usually quickly diffused. However, long-lasting interest doesn't correspond to the size of the interest. This means, even though people keep sharing it, not a lot of people will be interested in it. 

  - Conspiracy rumors diffused slowly and its cascade size is positively correlated with its lifetime. Meaning that the longer it lasts, the more people become interested in it. 

2. Liljeros, F., Edling, C. R., Amaral, L. A. N., Stanley, H. E., & Åberg, Y. (2001). The web of human sexual contacts. *Nature, 411*(6840), 907-908.

This is the kind of study I admire: short, interesting, and impactful. 

## 2020-09-25
Del Vicario et al. (2016).



## 2020-09-24
1. Bakshy, E., Messing, S., & Adamic, L. A. (2015). Exposure to ideologically diverse news and opinion on Facebook. *Science, 348*(6239), 1130-1132.

- Among 7 million distinct URLs shared by 10 million Facebook users in the US, 13% were hard news;

- Around 20% of a person's friends had the opposite political affiliation;

- Liberals had fewer friends who shared news from the other side;

- Controlling for the position of the news feed, it seemed conservatives were more likely to click on cross-cutting content, i.e., news that came from the other side; This result surprised me. 

2. Del Vicario et al. (2016). The spreading of misinformation online. *Proceedings of the National Academy of Sciences, 113*(3), 554-559.


## 2020-09-23

Finished Kay et al. (2016). 

Helping researchers in different fields set priors might be something worth doing in the future. 

## 2020-09-22

1. Hullman et al. (2017)

2. Kay, M., Nelson, G. L., & Hekler, E. B. (2016, May). Researcher-centered design of statistics: Why Bayesian statistics better fit the culture and incentives of HCI. In *Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems* (pp. 4521-4532).

- Bayesian approaches make knowledge accrual possible without meta-analysis approaches

- Even though scholars use effect size and confidence intervals, the ultimate goal of looking for small *p*s will ruin everything. 

(p.4)

## 2020-09-21
Hullman, J., Kay, M., Kim, Y. S., & Shrestha, S. (2017). Imagining replications: Graphical prediction & discrete visualizations improve recall & estimation of effect uncertainty. *IEEE transactions on visualization and computer graphics, 24*(1), 446-456.

Continue from 2nd para. of 3.2 (Evaluations with Users) tomorrow. 

## 2020-09-20
Vosoughi et al. (2018)

The work is indeed significant. It compared the spreading of true and false news on Twitter and concluded that the false spread faster, deeper, and farther than the truth. False political news, in particular, is diffused especially broadly and deeply. 

- Was it because those who spread the false were more influential or active?

Not really. Those who spread false news had fewer followers, followed fewer people on Twitter, are less likely to be verified, and had been on Twitter for less time. 

- Was it because false news was more noval and users are more likely to retweet information with more novelty?

  - False rumors were indeed more novel than the truth;
  - False news was objectively more novel, but did users get it? 
    - Yes, replies to false news showed greater surprise and disgust, whereas the truth inspired more sadness and joy. 

- Was it because of selection bias? I mean, the tweets from the six organizations might not be representative of all tweets. 
  - The authors verified a second sample of Tweets, which were labeled by three undergraduates students as true, false, or mixed. Again, the results were the same. 

- Did false news spread faster, deeper, farther, and more broadly because of bot activities? I mean, was it because bot crazily retweeted and replied to false news?
  - Two bot-detection algorithms were applied independently to detect and remove bots before data analysis. Results were the same. This has significant implications: that false news traveled faster and farther not because of bots, but because of humans. 

### I had several issues:
1. Bad data visualization

At first glance, data visualization in this article is good. However, most of the figures used only red and green and therefore are not friendly to color-blinded people.

2. Content analysis

They should report Krippendorff's alpha rather than an agreement of 90%, I believe. 

3. No hypotheses beforehand

## 2020-09-19
Vosoughi, S., Roy, D., & Aral, S. (2018). The spread of true and false news online. *Science, 359*(6380), 1146-1151.

## 2020-09-18

Ferrara, E., Varol, O., Davis, C., Menczer, F., & Flammini, A. (2016). The rise of social bots. *Communications of the ACM, 59*(7), 96-104.

## 2020-09-17
Hilbert, M., & López, P. (2011). The world’s technological capacity to store, communicate, and compute information. *Science, 332*(6025), 60-65.

## 2020-09-16

González-Bailón, S., Borge-Holthoefer, J., Rivero, A., & Moreno, Y. (2011). The dynamics of protest recruitment through an online network. *Scientific reports, 1*, 197.

- Study goal: Study whether and how social network sites encourage recruitment in social movements.

- Why wasn't it published on *Nature* or *Science*: A first look at this paper made me feel that it should have published on *Nature* or *Science*. I believe the authors must have tried. After reading the whole paper, I concluded that lack of sufficient evidence might have been the reason why it didn't manage to do so. As the authors have mentioned in their limitations part, there were so many factors other than Twitter that influenced the movement in question, and it was impossible to single them out. 

## 2020-09-15
Lazer et al. (2009). Life in the network: the coming age of computational social science. *Science, 323*(5915), 721.

The potential of computational social science and how to make preparations for its future. 

## 2020-09-14

p 1-3. Lazeret et al. (2018). The science of fake news. *Science, 359*(6380), 1094-1096.

- Increasing partisan preferences in the US created a context for fake news to attract huge audiences;

- We don't know the exact ratio of fake news against real news, and we don't know the medium-to-long-run effect of exposure to fake news on people's attitudes. 

- Bots on social media are hard to detect. Once a detecting technique is developed, bots will upgrade themselves. 

- Possible interventions:

  1. Encouraging people to use fact checking. However, we are not sure whether this is useful or not, partly due to people's confirmation bias and desirability bias. 
  2. Internet oligopolies should collaborate with academia to understand how pervasive fake news is. Also, these oligopolies' power should be contained by, for example, legal systems. 

## 2020-09-13
Lazer et al. (2020)

- Definition:
  - Computational social science: language, location, movement, networks, images, and video, using statistical models that capture multifarious dependencies.

- Problems
  1. Interdisciplinary research not encouraged enough, especially that involve cooperation between social and computer scientists, due to unfavorable policies at universities;
  2. Proprietary data unavailable to researchers.
  3. Available data is not intended for research and won't be shared with other researchers, which impedes reproducibility.
  4. Lack of regulatory guidance from university IRBs about collecting nd analyzing sensitive data. 

- Recommendations
  1. Collaborate and negotiate with private companies for data;
  2. Build infrastructures that provide data as well as preserve participants' privacy;
  3. Develop new ethical guidelines;
  4. Reorganize universities so that 1) multi-disciplinary collaboration is professionally or financially rewarded, and 2) enforce ethical research
  5. Researchers make sure that they do public good.



## 2020-09-12

1. p1. Lazer et al. (2020). Computational social science: Obstacles and opportunities. *Science, 369*(6507), 1060-1062.

2. Recapping Centola (2010):

- Contribution: An experimental design that ran contrary to previous findings regarding the strength of weak ties. 
- Conclusion: networks with local clustering are conducive to behavioral diffusion. 
- Method: An experiment with two groups. One group found themselves in a random network, and the other group in a clustered-lattice network. **Degree distribution of the two networks is identical**.
- Why could it be published on *Science*: Maybe the first empirical test of two competing hypotheses regarding the effect of network topology on behavior spreading.
- My question: I didn't see many long ties in the "small-world network" in Figure 1.
- Improvements: I didn't know all of the statistical tests used in this paper. I know Mann-Whitney U test but I don't know Kolmogorov-Smirnov. I am wondering whether the study could be conducted using Bayesian statistics. 

## 2020-09-11
1. p5-p12. Cha et al. (2007, October).
2. p1-p4. Centola, D. (2010). The spread of behavior in an online social network experiment. *Science, 329*(5996), 1194-1197.

## 2020-09-10
- p1-p4. Cha et al. (2007, October). I tube, you tube, everybody tubes: analyzing the world's largest user generated content video system. In *Proceedings of the 7th ACM SIGCOMM conference on Internet measurement* (pp. 1-14).