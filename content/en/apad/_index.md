---
title: A Paper A Day
type: apad
---
{{<block class="reminder">}}
I am applying for PhD positions for 2021 Fall. To be fair for other applicants, I am considering temporarily suspeding updating this page until my application results are out.
{{<end>}}

{{<block class="note">}}
I was inspired by the story of [*This scientist read a paper every day for 899 days. Here’s what she learned*](https://www.natureindex.com/news-blog/this-scientist-read-research-academic-paper-every-day-what-she-learned), so I decided to try it myself: Dedicating half an hour everyday to reading papers. 
{{<end>}}

## 2021-02-26

Kim, Y. S., Hofman, J. M., & Goldstein, D. G. (2020). Effectively Communicating Effect Sizes. In *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems (CHI’20). Association for Computing Machinery, New York, NY, USA.*

- Outcome uncertainty is more useful for individuals than inferential uncertainty. The former is predicting what an individual outcome is likely to be, whereas the latter one shows the average for a large group. It might well be that the group with a larger mean has more variability, whereas the other group (with a smaller mean) is more reliable. Wise people will choose the second rather than the first.

   - Cohen's *d*, expressed as `$d = \frac{\mu_1 - \mu_2}{\sigma}$`, conveys information about both the treatment effect and the variability in individual outcomes. 

- Probability of superiority: how often a randomly chosen individual in one group scores higher (or slower) than a randomly chosen individual in another group. 

PP. 1-3

## 2021-02-25

Finished Hofman et al. (2020)

- People tend to overestimate the effect size and understated the variability in outcomes when presented 95% confidence intervals that show *inferential* uncertainty, compared to when presented 95% prediction intervals that show *outcome* uncertainty. 

  For example, suppose we are comparing heights of men with those of women: 

    - *Inferential* uncertaity is how confident we are about our estimation of **each group's average height**, based on **our measurement**. So error bars will extend 1.96 (sometimes 1.0) *standard error* above and below the mean. 

    - *Outcome* uncertainty is the variability of **each individual's height around their group's mean**. Therefore, error bars will extend 1.96 (sometimes 1.0) *standard deviation* above and below the mean. 

  See Fig. 1 for illustration. 

- People have the largest misperceptions when the effect size is small. Unfortunately, small effect sizes are the norm in scientific studies, which use 95% CI more often than 95% PI. This indicates that readers are likely to exaggerate the scientific results they encounter. 

{{<block class="note">}}
I like this study pretty much. It's a little long but worth the reading. 
{{<end>}}

## 2021-02-24

Contined with Hofman et al. (2020)

PP. 4-7

## 2021-02-23

Hofman, J. M., Goldstein, D. G., & Hullman, J. (2020, April). [How visualizing inferential uncertainty can mislead readers about treatment effects in scientific results](http://jakehofman.com/pdfs/visualizing-inferential-uncertainty.pdf). In *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems* (pp. 1-12).

PP. 1-4

## 2021-02-22

Hao, K. (2019). [We analyzed 16,625 papers to figure out where AI is headed next](https://www.technologyreview.com/2019/01/25/1436/we-analyzed-16625-papers-to-figure-out-where-ai-is-headed-next/). *MIT Technology Review*. 

Artificial intelligence is powered by deep learning, which are algorithms that use statistics to identify patterns in data. This capability enables computers to mimick human skills, and to provide recommendations to users (for example, in Google, Facebook, and Netflix).

Papers in arXiv's artificial intelligence section focused on machine learning in around 1995-2005, on neural networks in around 2010-2015, and on reinforcement learning in around 2015-2019. 

Before around 2005, papers in arXiv's AI section focused on "knowledge-based reasoning", trying to recreate human seasoning using man-made rules. After around 2005, the attention changed to machine learning, which is a parent term that includes deep learning. Rather than writing rules, machine learning trains computer programs to extract rules from a sea of data.

Besides neural networks, there are other machine learning methods, for example, "bayesian networks", "markov methods", and "support vector machines", but nueral networks dominated the playground since around 2016. 

Three types of machine learning: supervised, unsupervised, and reinforcement learning. Reinforcement learning wasn't a new idea, but it didn't gain much momentum until AlphaGo's groundbreaking success.

## 2021-02-21

Continued with Kim et al. (2020)

## 2021-02-20

Continued with Kim et al. (2020)

People overestimated both error and variance of effect size when only told the mean differences. 95% confidence intervals with visualizations led to the largested overestimation, as shown in Figure 2. Presending the mean differences in absolute or percentage terms, or simply telling people difference exists, made people overestimate the effect size as well, but to a lesser degree.

Informing people the variability helped alleviate this issue, with directly telling people the probablity of superiority performing the best (although the difference did not reach statistical significance).

{{<block class="reminder">}}
I do not really understand this paper. Will come back later. 
{{<end>}}


## 2021-02-19 (completed on 2021-02-20)

Kim, Y. S., Hofman, J. M., & Goldstein, D. G. (2020). [Effectively Communicating Effect Sizes](https://cj2021.northeastern.edu/files/2020/02/CJ_2020_paper_7.pdf). In *[Computation + Journalism Symposium 2021](https://cj2021.northeastern.edu/)*. 

PP 1-4


## 2021-02-18

Completed Sekara et al. (2018)

- As Fig. 1(B) shows, the percentage of publications in both *Nature* and *Physical Review D* by new PIs have been deceasing in the past two decades. The figure also shows that different types of journals have different patterns regarding the share of papers by different categories of PIs. 

- Chaperone effect `$C$` is measured as

   `$$ c / c_random $$`

   where `$c$` is the ratio of **the number of authors who became last authors from nonlast authors** to **the number of those who never made this transition**. `$c_random$` is the same ratio but in a system where the order of authors is randomly permuted. This randomnization is necessary if we want to compare the chaperone effect of different scientific fields. If we measure chaperone effect by `$c$` rather than `$C$`, we fail to consider the fact that `$c$` might be influenced by individual productivity, team size, or simply random factors. 

   If `$C$` is larger one 1, then the chaperone effect exists. 

- Fig. 2 shows that the chaperone effect is strongest in interdisciplinary fields, biology, and medicine, and weakest in Mathematics. 

- An interesting question to ask is whose papers have more impacts, those by new PIs, or those by chaperoned and established PIs. The authors assumed that those by new PIs have more impact because it is difficult to publish in a journal, say, in *Nature*, if you didn't have a pubication record there. However, results show that papers by established and chaperoned PIs receive more citations. 

- The chaperone effect is stronger in prestigious, interdisciplinary journals with a general audience than in field-specific journals. 

## 2021-02-17 (completed on 2021-02-18)

Sekara, V., Deville, P., Ahnert, S. E., Barabási, A. L., Sinatra, R., & Lehmann, S. (2018). The chaperone effect in scientific publishing. *PNAS, 115*(50), 12603-12607.

- Three kinds of principle investigators (PIs, last author in a paper):
  
  1. New PIs have never published in a specific journal.
  2. Chaperoned PIs have published in a journal previously as nonlast authors.
  3. Established PIs have published in a journal before as last authors. 

## 2021-02-16 (completed on 2021-02-17)

Continued with Strother et al. (2021)

Understanding the methodology:

- Whether students' political ideology changed significantly: compare the ideology score in [Table 1](https://www.pnas.org/content/118/2/e2015514117#T1) using a two-tailed *t* test. 

- Whether roommoates' ideology predicted students' ideology changes: using OLS regressions with roommates' ideology at wave 1 as the independent variable, students' ideology at wave 2 as the dependent variable, and students ideology at wave 1 as the control variable. The authors also included other control variables in different models, as can be seen in [Table 3](https://www.pnas.org/content/118/2/e2015514117#T3). The range of *p* values was (0.012, 0.069). The association is significant, was its effect size is small. 

{{<block class="reminder">}}
I did not understand the method which focuses on "students assigned to roommates who had different baseline political views" (P. 4)

Will come back to review later. 
{{<end>}}

## 2021-02-15 (completed on 2021-02-16)

Strother, L., Piston, S., Golberstein, E., Gollust, S. E., & Eisenberg, D. (2021). College roommates have a modest but significant influence on each other’s political ideology. *PNAS, 118*(2).

- Table 1 shows that first-year college students tend to be liberal (compared to conservative), which is consistent with common understanding. However, contrary to popular claims, after the first year, these stendents became a little bit more **conservative**, rather than libral. 

- Living with a roommate of different ideology has statistically influence on students' ideology change (moved closer to their roommnates).

PP. 1-4

## 2021-02-14

Finished Kubin et al. (2021)

- Perceptions of rationality mediated the relationship between stance based on personal experiences and increased respect. 

- When someone disagrees with you on topics related to morality or politics, he or she has more doubts about your argument if it is based on facts (compared to personal experiences).

## 2021-02-13

Kubin, E., Puryear, C., Schein, C., & Gray, K. (2021). [Personal experiences bridge moral and political divides better than facts](https://www.pnas.org/content/118/6/e2008389118.full). *PNAS, 118*(6).

- People who base their viewpoints on personal experiences (rather than on facts) are considered more rational and are respected more by the opponents. Opponents are also more willing to interact with them. 

- To increase perceived rationality, personal experiences are better to be relevant, and harm-based. 

- To foster respect, personal experiences are better to be "personal". 

PP. 1-4

## 2021-02-12

Gates, A., Gysi, D., Kellis, M., & Barabási, A. L. (2021). [A wealth of discovery built on the Human Genome Project — by the numbers](https://www.nature.com/articles/d41586-021-00314-6). *Nature*.

   - 22% of publications on genes referenced only 1% of all genes. This might be due to **preferential attachment** ("rich-gets-richer"). Risk-averse researchers and funders might have been afraid of exploring uncharted territories. 

   - Complexity laies in the interactions of individual components. Understanding components is necessary, but not sufficient, to know a system. 

## 2021-02-11

Schulz, L., Rollwage, M., Dolan, R. J., & Fleming, S. M. (2020). [Dogmatism manifests in lowered information search under uncertainty](https://www.pnas.org/content/117/49/31527.full). *PNAS, 117*(49), 31527-31534.

I did not really understand the details of this paper. That said, the conclusion is clear:

Dogmatic individuals are less likely to seek out additional information, especially when their initial decisions are uncertain. This is worrisome because after dogmatic people encounter fake news, they are less likely to seek out correcting pieces. 

## 2021-02-10

Choi, S. H., Rao, V. D., Gernat, T., Hamilton, A. R., Robinson, G. E., & Goldenfeld, N. (2020). [Individual variations lead to universal and cross-species patterns of social behavior](https://www.pnas.org/content/117/50/31754). *PNAS, 117*(50), 31754-31759.

I could not understand the details in this paper. 

## 2021-02-09

Finished Killingsworth (2020)

- As can be seen in [Fig. 1](https://www.pnas.org/content/pnas/118/4/e2016976118/F1.large.jpg), both current happiness (experienced well-being) and remembered happiness (evaluative well-being) grow linearly with **log(income)**, **without a plateau**. 

- Larger household income below $80,000 had a stronger correlation with decreased negative feelings compared to people having household income above $80,000. Positive feelings grow evenly aross the income range. 

- Sense of control of one's life explained 74% of the relationship between income and experienced well-being. 

- People having smaller household income were happier if they attributed less importance to money; Those who earn a lot were happier if they attributed more importance to moeny. 

- Across the income range, the more people equated money and success, the less happier they felt. 

- The main difference of this study is that 1) respondents responded in real time when they saw the prompts from the app; 2) happiness was measured using a continuous rather than dichotomous scale. 

I like this study. 

{{<block class="note">}}
See [this](https://lindeloev.net/new-pnas-paper-income-is-a-poor-way-to-improve-well-being/) criticism.
{{<end>}}

## 2021-02-08

1. Finished Stockard et al. (2021)

- Non-URM (underrepresented minorities) men reported the greatest professional support from peers and postdocs, followed by non-URM women. 

- URM students were twice as likely to report that they did not receive enough financial support for living. 

- Men were more likely than women to express greater commitment to completing the PhD and continuing research in the chemistry field. **Amazingly, within each gender group, URM students were more likely to do so.**

- When we do not consider other factors, students having a supportive advisor were more likely to finish the PhD, find a postdoc, and have an academic career at a research institute. However, this positive effect on women is not found in bigger and more renowned chemistry departments. 

2. Killingsworth, M. A. (2021). Experienced well-being rises with income, even above $75,000 per year. *PNAS, 118*(4).

PP. 1-2

## 2021-02-07

1. Finished Chen at el. (2020)

I skimmed through the rest of this paper. 

2. Stockard, J., Rohlfing, C. M., & Richmond, G. L. (2021). Equity for women and underrepresented minorities in STEM: Graduate experiences and career plans in chemistry. *PNAS, 118*(4).

- Women who are underrepresented minorities (URM) were the least satisfied with their advisor-student relationship. Other women were the next least satisfied. URM men were were the most satisfied with the relationship. 

PP. 1-3

## 2021-02-06

Chen, Y., Jiang, M., & Kesten, O. (2020). [An empirical evaluation of Chinese college admissions reforms through a natural experiment](https://www.pnas.org/content/117/50/31696.full). *PNAS, 117*(50), 31696-31705.

PP. 1-5

## 2021-02-05

Finished Sterling et al. (2020)

### Results

- Prior to graduation, the level of self-efficacy of women is lower than that of men.

- Without considering any other factors, self-efficacy is positively related to salary in initial jobs. 

- For engineering and CS undergraduates, in their first jobs after they graduate, women's salaries are lower than men's. 

- Gender does not predict how important salary is important to a person. 

- Women do emphasize workplace culture more, but this emphasis is associated with higher rather than lower compensation. 

- Self-efficacy is a significant mediator for the relationship between being female and the salary. (See [Figure S5](https://www.pnas.org/content/pnas/suppl/2020/11/11/2010269117.DCSupplemental/pnas.2010269117.sapp.pdf))

- Self-efficacy influences whether a person intends to enter jobs related to engineering and computer science. 


## 2021-02-04

Sterling, A. D., Thompson, M. E., Wang, S., Kusimo, A., Gilmartin, S., & Sheppard, S. (2020). The confidence gap predicts the gender pay gap among STEM graduates. *PNAS, 117*(48), 30303-30308.

This paper investigates why there is a gender pay gap among STEM graduates. They hypothesized that engineering self-efficacy (ESE) is the reason. To test this hypothesis, they surveyed 559 college students majoring in engineering and computer science in 2015 (when students are still enrolled in the program), 2016, and later in 2017 when students just graduated and entered the workforce. 

### Theories 

Two possible reasons why women earn less: 1) women are socialized to believe money is not as important as family; 2) women prefer inclusive environments to competitive ones, with the latter more favorable to higher salaries. 


## 2021-02-03

Andrasfay, T., & Goldman, N. (2021). Reductions in 2020 US life expectancy due to COVID-19 and the disproportionate impact on the Black and Latino populations. *PNAS, 118*(5).

- The COVID-19 pandemic is projected to cause a decline in 2021 US life expectancy by 1.13 y. This decline is larger than that in other developed countries, which already had higher life expectancy than the US before the pandemic. 

- The reduction in life expectancy in the US is not the same for each racial group. The reduction for Black (2.10 y) and Latino (3.05 y) is much larger than that for Whites (0.68 y). 

- For Black and Latino populations, younger people face higher burden of mortality related to the COVID-19. This might be because their jobs are less compatible with remote working and therefore they have to expose themselves to virus to earn money during the pandemic. 

- These racial differences in reduction in life expectancy will result in 39% increase in the life expectancy gap between the Black population and Whites (from 3.6 y in 2017 to 5.06 y in 2020). The life expectancy advantage that Latino population has relative to Whites will decrease from 3.3 y in 2017 to 0.93 y in 2020, a 70% plunge.  

## 2021-02-02

Finished Luhrmann et al. (2021)

This study tries to answer **why some people are more likely than others to experience the presence of gods and spirits**. In four studies, the authors, possibly among others, interviewed and surveyed local residents having faith (in charismatic evangelical Christianity or the local religion) and urban undergraduate students in four places: US, Ghana, Thailand and China. 

The study found that **porosity** and **absorption** played distinct roles in people's spiritual experiences across different cultures and religions. 

**Porosity** is a cultural attribution that defines the boundary between "mind" and the "world". People living in cultures of different levels of porosity might different viewpoints on whether their mental experiences come from and have influences on, the outside world. 

**Absorption** is a personal tendency to be immersed in their own minds. 

## 2021-02-01

Luhrmann, T. M., Weisman, K., Aulino, F., Brahinsky, J. D., Dulin, J. C., Dzokoto, V. A., ... & Smith, R. E. (2021). Sensing the presence of gods and spirits across cultures and faiths. *PNAS, 118*(5).

PP. 1-4

## 2021-01-31

McDermott, A. (2021). [Science and Culture: At the nexus of music and medicine, some see treatments for disease](https://www.pnas.org/content/118/4/e2025750118.short). *PNAS, 118*(4).

Music seems to have medical benefits. Musical treatment might alleviate pain, and help delirium patients and those suffering from Parkinson's. 

Early studies of music therapy were not necessarily "scientific" in the sense that many of them were not properly blind trials. Right now, there are some ongoing studies funded by NIH.
 

## 2021-01-30

1. Skimmed through the rest of [Fienberg (2006)](https://projecteuclid.org/download/pdf_1/euclid.ba/1340371071). Too difficult for me to grasp now. 

2. [Should You Go To Grad School?](https://www.buzzfeed.com/duncanwatts/should-you-go-to-grad-school) by Duncan Watts

1/4 on 2021-01-30 (completed on 2021-01-31, but not at the APAD time period)

## 2021-01-29

1. Finished West et al. (2013)

Representation of women increased in general: in published academic papers from 1665-1989, 15.1% of the authors were women. This number increased to 27.2% for papers from 1990-2012. 

Figure 3 shows that the percentage of women as first authors increased but they are much less likely than men to be the last authors.

2. Fienberg, S. E. (2006). [When did Bayesian inference become" Bayesian"?](https://projecteuclid.org/download/pdf_1/euclid.ba/1340371071). *Bayesian analysis, 1*(1), 1-40.

PP. 1-2

## 2021-01-28

1. Zhao, Z. D., Yang, Z., Zhang, Z., Zhou, T., Huang, Z. G., & Lai, Y. C. (2013). [Emergence of scaling in human-interest dynamics](https://www.nature.com/articles/srep03472). *Scientific reports, 3*(1), 1-7.

I skimmed through it. 

2. West, J. D., Jacquet, J., King, M. M., Correll, S. J., & Bergstrom, C. T. (2013). [The role of gender in scholarly authorship](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0066212). *PloS one, 8*(7), e66212.

PP. 1-3


## 2021-01-27

Dodds, P. S., Muhamad, R., & Watts, D. J. (2003). An experimental study of search in global social networks. *Science, 301*(5634), 827-829.

- 98,847 people registered to participate in a "global search" task. They were to reach the person assigned to them via email. To do so, they were asked to relay the message to people they think are "closer" to their target. Receivers of the relayed message were asked to do the same thing. 18 targets were from the US, Estonia, Indian, Australia and Norway. 

- 61,168 people from 166 countries relayed the message, generating 24,163 message chains. More than half of these people were middle class and college educated North Americans. (Background information: the study was published in 2003.)

- Two reasons stood out when people were asked why they sent a message to specific receipients: geographical proximity, and similar occupation. 

- Hubs were not important for success of searches.

- Weak ties are important. 

- It is important that people have incentives to proceed or confidence in the search; otherwise, it's difficult to reach the target.  

## 2021-01-26 (Completed on 2021-01-27)

Finished Zhang et al. (2006)

E-learning with non-interactive videos did not allow students to score higher or to experience more satisfaction than that without video at all. This means that to make the best of e-learning, interactivity in videos is necessary. 

Examples of interactivity: the ability to see slides alongside instructional videos; to control the scroll bar of videos; to take notes while watching the video; keyword search of the slides; etc. 

## 2021-01-25

1. Finished Mei (2014)

2. Ross, J., Irani, L., Silberman, M. S., Zaldivar, A., & Tomlinson, B. (2010). [Who are the crowdworkers? Shifting demographics in Mechanical Turk](https://d1wqtxts1xzle7.cloudfront.net/43592369/Who_are_the_crowdworkers_shifting_demogr20160310-18708-cv9zu3.pdf?1457633224=&response-content-disposition=inline%3B+filename%3DWho_are_the_crowdworkers.pdf&Expires=1611618299&Signature=GSdKfyzUVPe0B17iNsnrzPJSegBUu4xxMLTWCebwK2IzBgCWTgwUO~TG415-PM7UNMbUuWdjc3Ng8ISS7~h1PQL~OvtsqaF23PWqV0gSxa63N-RejLrj48LeF5n3aQ3T3BZTS-SGLgzxMzKvqB0rT9m-zRA~7ozd-~sVegU2LWwoeEWMBvYZLAtk2-zy3516J1vyhZl5GvRqZjOsSIvtd4H~GXL-fKkr2e5n0dEnwllPfF2OgIKYcLns68lKxWa7yMCHXeAvPzvTdyPlB5nbbXN-sZ2oANxLr6GzkjvxAzMbYeQR4E~2MGpgutPrsUs3chQ5fgDSE-f7BdH8S4TGVw__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA). In *CHI'10 extended abstracts on Human factors in computing systems* (pp. 2863-2872).

3. Zhang, D., Zhou, L., Briggs, R. O., & Nunamaker Jr, J. F. (2006). [Instructional video in e-learning: Assessing the impact of interactive video on learning effectiveness](https://www.sciencedirect.com/science/article/pii/S0378720605000170?casa_token=SDbKo_-6K_oAAAAA:XFgAlkvzC-fZ5Ti1pwaVhashhqrTH0O44B7XfZEitDUEipSGtkHGT5Hsacqu4ifbQ6FJpj6TZg). *Information & management, 43*(1), 15-27.

PP. 1-4

## 2021-01-24

1. Finished Miao et al. (draft)

2. Mei, H. (2014). [Women's property within the structure of marriage in the Neo-Babylonian Period](https://search.proquest.com/openview/6654abfcb1812c734d3f96ff87d0ac88/1?pq-origsite=gscholar&cbl=237823). *Journal of Sino-Western Communications, 6*(2), 153.

PP. 1-8

## 2021-01-23

Miao, L., Murray, D., Jung, W-S., Lariviere, V., Sugimoto, C., & Ahn, Y-Y. (draft). The Universal structure of national scientific development

- Compared to 1973-1977, countries in the world during 2013-2017 are more specialized in one of three research clusters (Natural, Physical, and Societal). This means that most countries' scientific research is becoming less diversified. 

- The scientific diversity of a country highly correlates with its GDP. 

- Scientific diversity is very predictive of future economic growth of a country; more so than Economic Complexity Index (ECI). 

PP. 1-18. 

## 2021-01-22

Finished Alessandretti et al. (2020)

The authors proposed a model: "container model". This model, if given the trajectories of an individual, can infer the hierarchical levels of the mobility traces, and the size of each level. Based on the mobility traces of more than 700K people, the authors found that the mobility of these people has four hierarchical levels. This means that day-to-day human mobilty is not scale-free. However, when we aggregate displacements across containers (I do not fully understand what this means, though), human mobility is scale-free. 

Fig. 2 shows that container models does a much better job than other models in predicting mobility traces. 

{{<block class="reminder">}}
I do have a question, and this is partly because this article is too technical for me: if we can infer the results in Fig. 2 from **real** data, what is the use of this container model, which has to feed on **real** data?
{{<end>}}

## 2021-01-21

1. Zhang, R. (2017). [The stress-buffering effect of self-disclosure on Facebook: An examination of stressful life events, social support, and mental health among college students](https://www.sciencedirect.com/science/article/pii/S0747563217303643?casa_token=JdvXJVVAWoUAAAAA:NJuSV64wLomjzXcTS7oXdpvdx8GTaGVmOJE6s9iSGzzeEbZRtV2EKer9KRR1-lgschogVYckpQ). *Computers in Human Behavior, 75*, 527-537.

560 surveyed undergraduate students in Hong Kong tend to open up when in stress and their self-disclosure on Facebook moderates the relationship between stress and mental health. Facebook disclosure seems to be positively related to decreased depression. 

2. Alessandretti, L., Aslak, U., & Lehmann, S. (2020). [The scales of human mobility](https://sci-hub.st/10.1038/s41586-020-2909-1). *Nature, 587*(7834), 402-407.

PP. 1-2

## 2021-01-20

Piwowar, H., Priem, J., Larivière, V., Alperin, J. P., Matthias, L., Norlander, B., ... & Haustein, S. (2018). [The state of OA: a large-scale analysis of the prevalence and impact of Open Access articles](https://peerj.com/articles/4375/?utm_source=TrendMD&utm_campaign=PeerJ_TrendMD_0&utm_medium=TrendMD). *PeerJ, 6*, e4375.

- What is the share of open access journal articles

   Around 27.9% of all articles with a DOI. Recent articles are more likely to be open access (See [Fig. 2B](https://peerj.com/articles/4375/#fig-2)). 

- Open access articles received 18% more citation than if it were not open access. This is only correlation, not causation. It might well be that authors only made their most impactful work open access. 

## 2021-01-19

1. Skimmed through the rest of Ogden et al. (2014)

Key findings: Obesity has been prevelent among American youths and adults from 2003 to 2012. No significant changes in the prevelence were found. This means that obesity is still a problem for the United States. 

2. Blumenstock, J., Cadamuro, G., & On, R. (2015). Predicting poverty and wealth from mobile phone metadata. *Science, 350*(6264), 1073-1076.

The authors got access to detailed cell records data of 1.5 million subscribers in Rwanda. They did a phone survey involving 856 individuals, who were among the 1.5 million subscribers. The authors built a model that can predict an individual's wealth based on these 856 individuals' answers and their cell records. The authors used this model to predict the wealth of Rwanda by district and found that it very well matched the actual wealth index as computed from a national survey of over 10k households in Rwanda. 

The authors argued that administering a national survey is very slow and costly. Predicting wealth from cell phone data is fast and relatively cheap. This method is accessible because a considerable number of people in developing countries are using cell phones now. 

## 2021-01-18

1. Finished Bail et al. (2018)

2. Ogden, C. L., Carroll, M. D., Kit, B. K., & Flegal, K. M. (2014). [Prevalence of childhood and adult obesity in the United States, 2011-2012](https://jamanetwork.com/journals/jama/articlepdf/1832542/joi140013.pdf). *Jama, 311*(8), 806-814.

PP. 1-4

## 2021-01-17

Bail, C. A., Argyle, L. P., Brown, T. W., Bumpus, J. P., Chen, H., Hunzaker, M. F., ... & Volfovsky, A. (2018). Exposure to opposing views on social media can increase political polarization. *PNAS, 115*(37), 9216-9221.

Does exposure to social media increase or decrease belief polarization? This study tries to answer this question via a field experiment lasting for one and a half months on Twitter. The authors hired a company to recruit Twitter users who identify themselves as Republicans and Democrats. 1652 people participated in the study (901 Democrats and 751 Republicans). 

Later, participants were invited to follow a Twitter bot that would retweet 24 messages/day for a month. The bot were designed to retweet counterattitudinal messages to the participants, i.e., Democrats would be assigned to a conservative bot and Republicans to a liberal bot. Participants did not know what types of bots they were going to be assigned to. Among those invited to follow a bot, 64.9% of Democrats and 57.2% of Republicans accepted the invitation. 

[Fig. 1](https://www.pnas.org/content/pnas/115/37/9216/F1.large.jpg) provides an excellent summary of the experiment procedure. 

Results: Treated Democrats became slightly more liberal but the effects were not statistically significant. Republicans became significantly more conservative posttreatment. 

PP. 1-5

## 2021-01-16 (completed on 2021-01-17)

Finished Park et al. (2021)

- Social networks of those following pages of Places of Worship, Community Amenities, Bars and Pubs, Indoor Recreation, and Performing Arts had two types of members: core members who are closely connected with each other, and other members who are loosely-connected. This is called a "core-periphery structure". A network with this structure indicates that there are "regulars" who visit the place often. Non-regulars tend to be friends of a "regular". 

- The fact that people do similar things in two places does not mean that the two social networks have more similarities. For example, the friendship network of Bars and Pubs is closer to that of Community Amenities than to that of Restaurants. 

## 2021-01-15 (completed on 2021-01-16)

1. Finished Fire, M., & Guestrin, C. (2019).

2. Park, J., State, B., Bhole, M., Bailey, M., & Ahn, Y-Y. (2021). [People, Places, and Ties: Landscape of social places and their social network structures](https://arxiv.org/abs/2101.04737). arXiv.

The authors treated Facebook Pages as physical "third places" and studied the network structure of these Pages' followers. They found networks of those following pages of Outdoor Recreation, Indoor Recreation, Restaurant, Parks and Monuments had many independent dyads and triads. This indicates that people visit these places in small groups and they tend to be existing friends. 


## 2021-01-14 (completed on 2021-01-15)

Continued with Fire, M., & Guestrin, C. (2019).

### Publication trends

- The use of question or exclamation marks in paper titles is increasing (< 1% in 1950 to >3% in 2013).

- The percentage of papers with authors listed in an alphabetical order more than halved, from 21.0% in 1950 to 43.5% in 2014.

- Paper abstracts are getting longer, from a mean of 116.3 words in 1970 to 179.8 words in 2014.

- Self-citation: both the number of self-citations and the percentage of papers containing self-citations increased. 

- The mean and median length of academic papers decreased: 14.4 pages in 1950, 10.1 in 1990, and 8.4 in 2014. 

### Author trends

- Early-career scientists now are publishing more papers but are less likely to be the first authors, compared to those decades ago. 

### Journal trends

- Both the number of journals and the number of papers published per journal each year increased. 

- For papers in top journals, the mean career age of first and last authors and the percentage of returning authors increased. 

### Discussions

- The majority of the observed changes mentioned above are correlated with more academic citations. 

{{<block class="reminder">}}
Here, the two authors said that "These results support our hypothesis that the citation number has become a target." 

I am a little bit doubtful of this conclusion. Although it seems true instinctively, it does call for casual data. I do not think they can reach this conclusion only by observing a correlation between the discussed trends and the number of citations. 
{{<end>}}

## 2021-01-13

Continued with Fire, M., & Guestrin, C. (2019).

- Changes in scientific publication:
   3. Author lists are getting longer, i.e., "hyperauthorship", from a mean of 1.41 authors in 1900 to a mean fo 4.51 authors in 2014. 
   4. Paper titles lengths are increasing.
   5. Reference lists are getting longer. Few papers had over 20 references back in 1960 but now it is common to have papers with more than 40 references. 

### Material

As mentioned before, MAG (Microsoft Academic Graph) was used. The MAG dataset contains 120.7 million papers but many of them are news papers, comments, and responses. The two authors filtered these out, analyzing only around 22 million papers that have a DOI and at least five references. Only authors of these 22 million papers were analyzed. 

The authors of this paper also used the AMiner open academic graph dataset, which is relatively new.

### Results

- Table 1 clearly shows that papers' median citations after 5 years of publication vary considerably across different fields and subfields. 

- Fig.1 shows how the number of papers has been increasing.

PP. 2-6

## 2021-01-12

Fire, M., & Guestrin, C. (2019). [Over-optimization of academic publishing metrics: observing Goodhart’s Law in action](https://academic.oup.com/gigascience/article/8/6/giz053/5506490). *GigaScience, 8*(6), giz053.

- What have been increasing: 
  - number of published papers yearly (from fewer than 1 million in 1980 to more than 7 million in 2014)
  - speed of sharing papers (researchers can share their studies via non-traditional channels such as preprint servers)
  - number of peer-reviewed journals
  - number of published researchers

- What haven't been changed for decades: measures of scientific success (number of publications, impact factor, h-index)

- Goodhart's Law: 

> When a measure becomes a target, it ceases to be a good measure

- **Study Material**: The two authors of this paper analyzed over 120 million published papers with 528 million references and 35 million authors, since the early 1800s. The data came from the Microsoft Academic Graph (MAG) dataset. 

- **Study Purpose**: Are researchers focusing on attaining success metrics rather than the quality of research?

- Changes in scientific publication:
  1. Popularity of preprint servers such as arXiv, bioRxiv, SSRN, and RePEc
  2. Mega-journals that value scientific trustworthiness rather than novelty. Prime examples are *PloS One* and *Scientific Reports*.

PP. 1-2.

## 2021-01-11

Finished Yin et al. (2021)

- Scientific papers that appeared in policy documents received on average 40 times more citations from other scientific papers than those not found in policy documents. This indicates that papers referenced in government policy documents were also well received and respected in the scientific community. 

- Although preprint servers (medRxiv, bioRxiv, and SSRN) released much more papers on the COVID-19, papers published in peer-reviewed journals appeared more frequently in policy documents. See Fig. 2.3. 

- Policy documents grounded in rigorous scientific findings received more citations from other policy documents. 

- National governments produced more policy documents than think tanks and intergovernmental organizations (IGOs), but they cited science the least. IGOs, especially WHO, used science the most. 

I like this paper. Short and practical. It uses inferential statistics sparingly, so its findings seem more robust to me. 


## 2021-01-10

1. Finished Myers et al. (2020)

2. Yin, Y., Gao, J., Jones, B., & Wang, D. (2021). [Coevolution of policy and science during the pandemic](https://science.sciencemag.org/content/371/6525/128/). *Science*

- The growth of the share of COVID-19 policy documents mirrored that of total confirmed cases of COVID-19.

- In the beginning, COVID-19 policy documents were mostly about science & health. Later, the share of topics related to science & health fell whereas that of those regarding the societal and economical impacts of the pandemic grew. This pattern remained for other types of policy documents. 

- 20% of all the scientific papers cited in COVID-19 policy documents were those uploaded or published in 2020. 

- COVID-19 policy documents cited biomedical literature in the beginning of the pandemic. Later, the share of papers in the fields of economy, society and others grew. 

PP. 1-2

## 2021-01-09

1. Continued with Frank et al. (2019)

To better predict the impact of AI on the labor market, we need better data collection which is detailed, reflects real-time changes in the market, and contains regional differences. 

2. Myers, K. R., Tham, W. Y., Yin, Y., Cohodes, N., Thursby, J. G., Thursby, M. C., ... & Wang, D. (2020). Unequal effects of the COVID-19 pandemic on scientists. *Nature human behaviour, 4*(9), 880-883.

- On average, working hours of scientists dropped from 61h/w pre-pandemic to 54h post-pandemic (April 2020)

- Bench scientists, such as those working on biochemistry, biology, chemistry, and chemical engineering, saw the biggest declines (around 30% - 40%) in research time. By contrast, mathematicians, statisticians, computer scientists, and economists, had the lowest decline in research time. 

- Female scientists with young children have much less time for research during the pandemic. 

PP. 1-3

## 2020-01-08

Frank, M. R., Autor, D., Bessen, J. E., Brynjolfsson, E., Cebrian, M., Deming, D. J., ... & Rahwan, I. (2019). Toward understanding the impact of artificial intelligence on labor. *PNAS, 116*(14), 6531-6539.

People have always had concerns over the negative effects of automation and machines, from Plato worrying about writing displacing memory, to Wassily Leontief, winner of the Nobel Prize in Economics of 1973 had the concern that machines will displace human labor. 

PP. 1-3

## 2021-01-07

### Aim of the study
To explain why success in cultural market is different from average performance and yet very difficult to anticipate even for experts. 

### Study design:

- 14,341 participants were recruited from a teen-interest website. They were randomly assigned to two conditions (independent vs. social influence) and rated 48 songs by different bands. 
  - In the independent condition, participants were only shown the name of the bands and the songs. After listening to a song, they were asked to rate it; the rating ranged from 1 to 5. After rating, they were given the choice to download the song, although they were not required to do so. 

  - In the social influence condition, participants also saw how many times a song has been downloaded by previous participants. 

  - There were eight "worlds" to which participants in the social influence condition were assigned to. Each world is parallel to each other, meaning that the number of downloads in one world does not affect other worlds. 

- The authors of this paper conducted two experiments. 

  - In experiment 1, 48 songs were presented in a `$16 \times 3$` grid where the order of the songs was random. In experiment 1, participants in the social condition saw the number of downloads along with the name of the band whereas participants in the independent condition did not see this information. 

  - In experiment 2, songs were presented in a single column. For participants in the social condition in experiment 2, the songs were shown in descending order of current downloaded counts, whereas the order was random for participants in the independent condition in experiment 2. 

  - Why did the authors conducted two experiments? Through this design, in each experiment, the authors can see the effects of social influence on the success of each song. Furthermore, they can see the effect of increased "strength" of related information signal (i.e., downloaded numbers) by comparing the results of two experiments (for the social influence condition). 

### Results

Social influence, i.e., information about the choice of others, contributed to both **inequality** and **unpredictability** of the songs. 

  - Fig. 1 shows that there is more inequality when social influence is present. This is because, as we can see, the dark bars are consistently taller than the light bars. It also show sthat increased level of social influence leads to increased level of inequality. 

{{<figure src="https://science.sciencemag.org/content/sci/311/5762/854/F1.large.jpg" caption="Salganik et al(2006)">}}


## 2021-01-06

1. Finished Gelman, A., & Loken, E. (2013).

2. Salganik, M. J., Dodds, P. S., & Watts, D. J. (2006). Experimental study of inequality and unpredictability in an artificial cultural market. science, 311(5762), 854-856.

Finished reading but need to re-read it to recap the main steps & findings. 

## 2021-01-05

Continued with Gelman, A., & Loken, E. (2013).

>The researchers are not trying multiple tests to see which has the best p-value; rather, they are using their scientific common sense to formulate their hypotheses in reasonable way, given the data they have. The mistake is in thinking that, if the particular path that was chosen yields statistical significance, that this is strong evidence in favor of the hypothesis. 

>... The result remains, as we have written elsewhere, a sort of machine for producing and publicizing random patterns. 

PP. 5-13

## 2021-01-04

1. Finished Lu et al. (2016)

- In individualism-oriented countries, expressing happiness is encouraged whereas experssing sadness is not. 

> It would be interesting to explore whether emojis can be leveraged to predict public opinions and sentiment of a country. 

- Brazilian users have similar emoji usage patterns to those in South America, whereas they differ from users in Portugal even if the two nations speak the same language. 

> ...whether emojis are really consistent with sentiments presented in texts. 

2. Gelman, A., & Loken, E. (2013). [The garden of forking paths: Why multiple comparisons can be a problem, even when there is no “fishing expedition” or “p-hacking” and the research hypothesis was posited ahead of time](https://osf.io/n3axs/download). Department of Statistics, Columbia University.

PP. 1-5

## 2021-01-03

Continued with Lu et al. (2016)

- Top 20 emojis are related to face, heart and hand, which implies that facial expressions and body signals are the most important when people express themselves through emojis.

- The frequency of emoji usage has a power-law distribution. 😂 is by far the most popular emoji, accounting for 15.4% of the total emoji usage.

- France stands out because 1) 19.8 of all messages sent using Kika keyboard by French users contained at least on emoji; and 2) the most commonly used emoji is ❤️‍. How romantic!

PP. 2-9

## 2021-01-02

1. Finished Palchykov et al. (2012). 

I really like this study. The methodology is clear, visualizations informative, and conclusions easy to understand. 

2. Lu, X., Ai, W., Liu, X., Li, Q., Wang, N., Huang, G., & Mei, Q. (2016, September). Learning from the ubiquitous language: an empirical analysis of emoji usage of smartphone users. In *Proceedings of the 2016 ACM International Joint Conference on Pervasive and Ubiquitous Computing* (pp. 770-780).

PP. 1-2

## 2021-01-01

Palchykov, V., Kaski, K., Kertész, J., Barabási, A. L., & Dunbar, R. I. (2012). [Sex differences in intimate relationships](https://www.nature.com/articles/srep00370?message-global=remove&viewType=Print&viewClass=Print). *Scientific reports, 2*(1), 1-5.

PP. 1-3

## 2020-12-31

Shneiderman, B. (2018). Twin-Win Model: A human-centered approach to research success. *PNAS, 115*(50), 12590-12594.

- Some research questions are more useful than others. Research that solves a real-world problem has more impacts and should be encouraged. Good research should lead to both new knowledge and solutions to societal problems. 

>... researchers need to work with professionals who have authentic problems. 


## 2020-12-30

Finished 汪小帆. (2020)

## 2020-12-29
1. Continued with Kraemer et al. (2020)

- Is it possible that the above mentioned epidemiological patterns were due to increasing testing capacity rather than travel restrictions?

The authors of the paper introduced a binary variable of testing capacity, whose value was "low" before 2020-01-20, the date when COVID-19 was categorized as a class B notifiable disease, and "high" after 2020-01-20. Compared to the naive model (see the end of p.1 of the paper for detail regarding this model), inclusion of human mobility data from Wuhan alone led to improvements in the model's prediction for 12 provinces (among 27 provinces that reported cases through 2020-02-06). In 10 other provinces, both testing capacity and human mobility from Wuhan improved prediction. Only for Hunan did testing along contributed the most to model's prediction. Therefore, the authors concluded that although testing capacity is important, in the early stage of the epidemic, Wuhan lockdown was the most important "driver of spread" (p. 3).

I admire this work. 

2. 汪小帆. (2020). [无标度网络研究纷争: 回顾与评述](http://www.juestc.uestc.edu.cn/article/doi/10.12178/1001-0548.2020274). 电子科技大学学报, 49(4), 499-510.

PP. 1-3

## 2020-12-28

Continued with Kraemer et al. (2020)

- The volume and frequency of human movement from Wuhan to other places in China predicted the size of the early epidemic in other provinces.

- After 2020-02-01, daily case counts became less correlated with human movement from Wuhan. This indicates that variability among different places in daily case counts was more likely due to factors other than human mobility from Wuhan before the Wuhan lockdown. This also indicates that travel restrictions are important in the early phase of epidemic control, but later, the importance of other local mitigation methods increased. 

- From 2020-01-09 to 2020-01-22, variation in the epidemic's growth rate in provinces outside of Hubei was almost entirely explained by human mobility from Wuhan. After drastic control measures were taken across China, growth rates became negatively correlated with human movement from Wuhan; that is to say, provinces with more human mobility from Wuhan before the lockdown saw smaller growth rates.

- Is it possible that the above mentioned epidemiological patterns were due to increasing testing capacity rather than travel restrictions?

## 2020-12-27

1. Finished Fried et al. (2020)

People now are able to rotate their face, add makeups, turn closed eyes or mouth open, change hair style or wardrobe, change age, and produce synthetic videos. These methods allow people to experiment changing appearances, but might have negative effects such as increasing body dissatisfaction or making falsified content more prevalent on the Internet. 

2. Kraemer et al. (2020). The effect of human mobility and control measures on the COVID-19 epidemic in China. *Science, 368*(6490), 493-497.

P. 1

## 2020-12-26

Fried, O., Jacobs, J., Finkelstein, A., & Agrawala, M. (2020). Editing self-image. *Communications of the ACM, 63*(3), 70-79.

PP. 1-6

## 2020-12-25
1. Finished Sinatra et al. (2016)

2. Wang, D., Song, C., & Barabási, A. L. (2013). Quantifying long-term scientific impact. *Science, 342*(6154), 127-132.

I skimmed through it. 

## 2020-12-24
Continued with Sinatra et al. (2016)

The *Q*-model corrected the two shortcomings of the *R*-model. 

According to the Q-model:

- A paper's potential impact `$p_\alpha$` is independent of a scientist's productivity `$N_i$` and parameter `$Q_i$`, which means that there is luck behind impact. 

- High *Q* is only slightly correlated with higher *N*. 

Then the question is, what the hidden parameter of *Q* is, and what it indicates? According to the authors, *Q* is a constant ability to turn a project with randomly picked impact into high-impact. For each scientist, this ability is **a constant** (for 76% of all scientists); it does not grow with the development of career stage. 

PP. 5-7

## 2020-12-23
Continued with Sinatra et al. (2016)

So, what is the role of a scientist's ability in impact generation?

The authors first created a **Random-impact model (R-model)**. This model assumes that no matter for whom, the impact of each scientific paper is randomly chosen from the same impact distribution `$P(c_{10})$`. Then, the only difference scientists is **productivity `$N$`**: how many papers she gets published in her career. This model accurately predicts the cumulative function of `$P(\ge N^*/N)$` (Fig. 2E). However, this model has two problems:

1. If each paper's impact is randomly selected from a universal distribution of `$P(c_{10})$`, then a scientist with a higher `$N$` will be more likely to have a higher `$c^*_{10}$`, i.e., the citation of the highest impact paper. However, R-model fails to predict this. See Fig. 3C. 

2. Scientists with a higher average impact without `$c^*_{10}$` will also score higher on `$c^*_{10}$`. That is to say, high impact papers are more likely to be produced by a scientist with a constently high impact. Again, the R-model fails to predict this. See Fig. 3D. 

The authors then proposed an alternative model, **Q-model**. This model assumes that (1) as in the R-model, each paper's impact is randomly selected from a universal distribution of `$P(c_{10})$`, and (2) each scientist `$i$` has a unique value `$Q_i$` that modulates impact. `$Q_i$` is a constant throughout a scientist's career. The impact of a paper published by a scientist `$i$` is the product of `$Q_i$`, and `$p_\alpha$` randomly drawn from the distribution `$P(p)$` which is the same for all scientists .

PP. 3-4

## 2020-12-22
Continued with Sinatra et al. (2016)

- Fig. 2E: The random impact rule is futher confirmed by Fig. 2E. This figure captures the cumulative distribution of `$P(\ge N^*/N)$`, where `$N^*/N$` denotes when the highest-impact paper of a scientist occurs. The fact that it is a straight line indicates that the highest-impact factor can appear anytime within a scientist's career. 

- Fig. 2A: We can clearly see the differences in impacts across three levels impact scientists. What's the reason behind it: increasing productivity or increasing creativity? The authors again randomized the papers' impact while keeping scientists' productivity unchanged. The results for both high- and low- impact scientists remained unchanged. Therefore, differences in scientists can be better explained by productivity (see Fig. 1E)

P. 3

## 2020-12-21
Continued with Sinatra et al. (2016)

- A first look at Fig. 2D might tell us that the chance to publish the highest-impact paper drops with age. However, when the impact of papers was randomized, while keeping a scientist's productivity each year unchanged, the distribution of the timing of `$t^*$` remains almost the same. This is a very important finding, as it means that a scientist can produce her highest impact paper **anytime** in her career. 

P.3 

{{<block class="note">}}
I am not sure of whether it's only the order of a scientist's papers was randomized or that the order remains unchanged but papers' `$c_{10}$` was randomized. The authors did not make this point crystal clear. 
{{<end>}}

## 2020-12-20

Sinatra, R., Wang, D., Deville, P., Song, C., & Barabási, A. L. (2016). Quantifying the evolution of individual scientific impact. *Science, 354*(6312).

- Productivity and impact are metrics to gauge a scientist's performance. 

- Fig. 1B: Only 5% of all the scientists analyzed have at least one paper that received 200 or more citations after its publication. 

- Fig. 1C and 1E: High impact scientists are also much more productive. Medium impact scientists started with more publications than the other two groups (high and low impact). In the first three years following the first publication, medium impact scientists have more publications than the other two groups, but high impact scientists quickly catch up: it took ten more years for the medium impact scientists to have the same number of publications as high impact scientists, and the figure for low impact scientists is 40 more years. 

- For a scientist, the timing of the highest-impact paper is truely uniform within the career, meaning that he or she can do ground-breaking work anytime within his or her academic career. 

P. 2

## 2020-12-19

Zha, Y., Zhou, T., & Zhou, C. (2016). Unfolding large-scale online collaborative human dynamics. *PNAS, 113*(51), 14627-14632.

This study introduces a model that precisely fits the update history of hundreds of Wikipedia articles, which follows a double-power-law distribution. The model is based on Wikipedia but it might depict other forms of huamn collaborative ativities that involve initiations and responses, such as communications via short messages and emails. 

So What? With this model, we can better detect abnormal activities in online collaborative systems. 

## 2020-12-18

1. Spiegelhalter, D. J. (2014). [The future lies in uncertainty](http://pages.stat.wisc.edu/~wahba/stat860public/pdf3/spiegelhalter.science2014.pdf). *Science, 345*(6194), 264-265.

2. McNutt, M. (2014). [Reproducibility](https://science.sciencemag.org/content/343/6168/229.summary). *Science*.

## 2020-12-17

Finished Singh et al. (2020)

One point worth noticing is that the negative effect of suceptibility to believing in false rumors on vaccine acceptance is stronger than the possitive effect of exposure to fact-checked vaccination-related information.

## 2020-12-16

Continued with Singh et al. (2020)

### Research question

Whether (1) exposure to false rumors, (2) exposure to these false rumors' fact-checks, and (3) the perceived believability of each rumor ("believability") are related to the willingness to get vaccinated ("vaccine acceptance"). 

### Methods 

From 2020-06-18 to 2020-07-13, the study survey was promoted in five languages (English, Spanish, French, Portuguese, and Arabic) on Facebook Advertisement Platform. More than 44k Facebook users from 152 countries did the survey. The authors discarded (1) incomplete and duplicated responses, and (2) responses from countries with fewer than 30 respondents. The final dataset is over 805k responses from over 18k people in 40 countries. 

The survey was quite simple, as it only comprised of three questions:

>1. Have you seen or heard this information in the past month? 
>2. Have you ever seen an official source confirming or denying this claim?
>3. How believable does this information seem to you?

At the end of the survey, the respondents were also asked to provide demographic information, and to indicate the extent they saw the coronavirus as a threat ("perceived threat").

### Results

1. Exposure to misinformation, and perceived threat are positively related to believability. 

2. Exposure to misinformation alone is not strongly correlated with vaccine acceptance. However, the believability of false information is **negatively** correlated with vaccine acceptance. 

3. Exposure to **vaccine-related misinformation** is positively correlated with vaccination hesitancy, and the believability of false **vaccine-related rumors**. Exposure to fact-checked vaccination-related information is positively correlated with vaccine acceptance. 

4. Exposure, believability, and fact-checking of other types of false rumors are not correlated with vaccine acceptance. 

5. Perceived threat is positively correlated with vaccine acceptance. 

P. 4

## 2020-12-15

1. Finished Peterson et al. (2011)

Key takeaway: If you want to have a successful career that is long, for example, being able to publish in top journals for many times rather than just once, it's important that you make progress in the beginning of your career. 

2. Singh et al. (2020). COVID-19 Misinformation, Believability, and Vaccine Acceptance Over 40 Countries. Preprint. 

PP. 1-3

## 2020-12-14

Continued with Peterson et al. (2011)

PP. 2-4

## 2020-12-13

1. Finished Evans (2008)

Major findings: 1) Even though more journal articles published long ago became available online, scientists tend to cite more recent papers; 2) Even though more articles are becoming online, fewer journals and articles are being cited, and citation become concentrated on fewer journals and articles.

Evans (2008) explains that this might be because scholars find it easier to locate prevailing opinions if they search online. Journals and articles that scholars might skim in the print age now are overlooked, pushing the citation to newer and fewer articles. This is alarming because it indicates that as online journals become more available, scientific studies are building upon fewer, rather than more, ideas. 

2. Petersen, A. M., Jung, W. S., Yang, J. S., & Stanley, H. E. (2011). Quantitative and empirical demonstration of the Matthew effect in a study of career longevity. *PNAS, 108*(1), 18-23.

PP. 1-2

## 2020-12-12

1. Finished Wu et al. (2019)

The title of this paper well explains the main finding. One point worth noticing is that, as the authors mentioned at the end of the paper, fundings from government for individuals or small teams do not enable smaller teams to produce disruptive results. This is because small teams funded by government don't want to take the risk of entering uncharted areas. 

This paper well explains my intuition: more and more scientists, and more and more money invested in research, do not necessarily mean more ground-breaking results. Also, I don't believe large teams should always dominate the sciecne community. I also don't think it's a good idea to always promote publications with a massive number of individuals. Team work is great, but does not always produce distruptive work. 

2. Evans, J. A. (2008). Electronic publication and the narrowing of science and scholarship. *Science, 321*(5887), 395-399.

PP. 1-5

## 2020-12-11

1. Finished Simmons et al. (2011)

2. Wu, L., Wang, D., & Evans, J. A. (2019). Large teams develop and small teams disrupt science and technology. *Nature, 566*(7744), 378-382.

PP. 1-4

## 2020-12-10

Somers, J. (2018). [The scientific paper is obsolete](https://www.theatlantic.com/science/archive/2018/04/the-scientific-paper-is-obsolete/556676/). *The Atlantic, 4.*


## 2020-12-09

1. Ioannidis, J. P. (2005). Why most published research findings are false. *PLoS medicine, 2*(8), e124.

I skimmed through it. Couldn't understand it. 

2. Simmons, J. P., Nelson, L. D., & Simonsohn, U. (2011). False-positive psychology: Undisclosed flexibility in data collection and analysis allows presenting anything as significant. *Psychological science, 22*(11), 1359-1366.

PP. 1-6

## 2020-12-08
Bohannon, J. (2016). Who's downloading pirated papers? Everyone. *Science*. Retrieved from [https://www.sciencemag.org/news/2016/04/whos-downloading-pirated-papers-everyone](https://www.sciencemag.org/news/2016/04/whos-downloading-pirated-papers-everyone)

## 2020-12-07

1. Finihsed Fernandes et al. (2018)

Key points: the title explains everything. I love the title. 

2. Grabowicz, P. A., Ramasco, J. J., Moro, E., Pujol, J. M., & Eguiluz, V. M. (2012). Social features of online networks: The strength of intermediary ties in online social media. *PloS one, 7*(1), e29358.

## 2020-12-06

Fernandes, M., Walls, L., Munson, S., Hullman, J., & Kay, M. (2018, April). Uncertainty displays using quantile dotplots or CDFs improve transit decision-making. In *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems* (pp. 1-12).

PP. 1-6

## 2020-12-05

Ai, W., Chen, R., Chen, Y., Mei, Q., & Phillips, W. (2016). Recommending teams promotes prosocial lending in online microfinance. *PNAS, 113*(52), 14944-14948.

Key questions: 

1. Which recommendations increase people to join online teams on a crowdlending platform?

2. After people join a team, will they lend more money?

Key findings:

1. Recommendation emails did increase the probability of one person to join a team;

2. People receiving an recommendation email containing location similarity explanation are more likely to join a team;

3. People are more likely to join teams that have similar location and higher status;

4. After joining a team, members lend more money in the subsequent week. 

## 2020-12-04
1. Meier, A., Gilbert, A., Börner, S., & Possler, D. (2020). Instagram Inspiration: How Upward Comparison on Social Network Sites Can Contribute to Well-Being. *Journal of Communication, 70*(5), 721-743.

Skimmed through it. Didn't like it. 

2. Hilbert, M., & Darmon, D. (2020). Large-Scale Communication is More Complex and Unpredictable with Automated Bots. *Journal of Communication, 70*(5), 670-692.

Skimmed through it. 

3. Danescu-Niculescu-Mizil, C., Cheng, J., Kleinberg, J., & Lee, L. (2012, July). You had me at hello: How phrasing affects memorability. In *Proceedings of the ACL.*

>... memorable quotes consist of unusual word sequences built on common syntactic scaffolding. 

PP. 1-8

{{<block class="note">}}
Forgot about this paper (*You had me at hello*) on 2020-12-05. Finished it on 2020-12-19. 
{{<end>}}

## 2020-12-03
 
Finished Hosseinmardi et al. (2020)

Main findings:

1. Consumption of radical political news content on YouTube is smaller but more engaging than other contents, and its popularity has been rising. 

2. This consumption reflects the broader social trend, and perheps is not due to the recommendation algorithms by YouTube. 

## 2020-12-02

1. Service, R. ‘The game has changed.’ AI triumphs at solving protein structures. From [Sciencemag](https://www.sciencemag.org/news/2020/11/game-has-changed-ai-triumphs-solving-protein-structures).

2. Hosseinmardi, H., Ghasemian, A., Clauset, A., Rothschild, D. M., Mobius, M., & Watts, D. J. (2020). Evaluating the scale, growth, and origins of right-wing echo chambers on YouTube. *arXiv preprint arXiv:2011.12843.*

PP. 1-2

## 2020-12-01 (completed on 2020-12-02)

Yang, T., Majo-Vazquez, S., Nielsen, R. K., & González-Bailón, S. (2020). Exposure to news grows less fragmented with an increase in mobile access. From [https://www.pnas.org/content/117/46/28678](https://www.pnas.org/content/117/46/28678).

Key question: technologies give people more choices regarding consuming news. How does this affect the overall news consumption pattern? Do audiences become more fragmented (i.e., "audiences disperse among the higher number of choices")?

Conclusions:

1. Selective exposure exists but it does not grow in magnitude amongst increasing choices of news content.

2. The pattern and effect of consuming news on desktop are different than that of consuming news on mutiplatform, with the later reaching increasingly larger audiences, attracting more time spent on news consumption, and making audiences less fragmented. 

3. More than half of the US population access little to no news. These people might also be susceptible to misinformation. 

## 2020-11-30
1. Finished Huberman et al. (2008)

- The number of friends, rather than that of followers, more accurately reflects someone's Twitter activity. 

- A link between two users on social media like Twitter does not imply there is interaction in them. 

2. Forbush, E., & Foucault-Welles, B. (2016). Social media use and adaptation among Chinese students beginning to study in the United States. *International Journal of Intercultural Relations, 50*, 1-12.

I skimmed through it. 

## 2020-11-29
1. Finished Donoho (2015)

In the future science, a scientific paper is not the scholarship itself, but the "advertising" of the work. The scholarship will be data and codes, which, of course, are "universally citable and programmatically retrievable".

2. Huberman, B. A., Romero, D. M., & Wu, F. (2008). Social networks that matter: Twitter under the microscope. *arXiv preprint arXiv:0812.1045*.

Hypothesis: the number of contacts (followers and friends) is positively related to the intensity of Twitter activity. 

PP. 1-5

## 2020-11-28 (Completed on 2020-11-29)
Continue Donoho (2015).

PP. 10-18

## 2020-11-27
1. Blumenstock, J. E. (2008, April). Size matters: word count as a measure of quality on wikipedia. In *Proceedings of the 17th international conference on World Wide Web* (pp. 1095-1096).

This study is really fun. 

2. David Donoho (2015). [50 years of Data Science](http://courses.csail.mit.edu/18.337/2015/docs/50YearsDataScience.pdf).

PP. 1-9

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


**Replication study design** has some differences from Experiment 1:

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

{{<block class="reminder">}}
When participants are excluded based on reported or computed cycle length, we do not consider next menstrual onset based on computed or reported cycle length, respectively.
{{<end>}}

{{<block class="reminder">}}
When only one choice is clearly and unambiguously the most appropriate one, variation across this choice is uninformative. 
{{<end>}}

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