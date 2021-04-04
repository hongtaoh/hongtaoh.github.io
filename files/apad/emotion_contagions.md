# Analysis of *Experimental evidence of massive-scale emotional contagion through social networks*

Kramer, A. D., Guillory, J. E., &  Hancock, J. T. (2014). Experimental evidence of massive-scale emotional  contagion through social networks. *Proceedings of the National Academy of Sciences*, *111*(24), 8788-8790.

## Key question
The key question this paper was trying to answer: does exposure to mood expressed in the News Feed on FB change the content people post (that reflects their mood changes)? Or in the authors own words, "whether exposure to verbal affective expressions lead to similar verbal expressions, a form of emotional contagion."

## Why do we need this study?
Correlational studies cannot answer this question since it cannot support causality. Controlled experiments can support causality, but they have these problems:
  1. Exposure is not equal to interaction. In a controled experiment, mood change might come from interacting with a happy/sad person, rather than simply being exposed to that person's mood;
  2. Nonverbal cues are unavoidable in a controlled experiment, thus making it impossible for us to disentangle the effect of verbal cues.

Therefore, this study makes unique contributions to answering this question. 

## Study design
- Two parallell experiments: In experiment A, people see less positive emotional content whereas in experiment B, people see less negative emotional content. Both had a control condition, in which posts had an equal chance (see below) of being omitted, randomly (i.e., without considering their emotional velence).
  - How much less? Good question! According to the authors, "each emotional post had between a 10% to 90% change (based on their User ID) of being omitted from their News Feed ..."
  - Well, how do you categorize a post as positive or negative? Awesome question. If a post contains at least one positive word as defined by LIWC2007, then it is a **positive** post. The same is for negative posts. 

- Why are two (separate) control condistions needed? 
  - Because the percentage (46.8%) of posts containing at least one positive word is much larger than that (22.4%) of posts containing at least one negative word. Suppose that for a person, 10% of his **positive** News Feed is omitted, and there is only **one** control group, what should be the corresponding percentage of a person's **random** News Feed being omitted in this control group? I don't know. 
  - Why? For example, if there are three people in experiment A (positivity reduction group), and their content reduction rate is 12%, 13%, and 14% respectively. Accordingly, we assume that the content reduction rate in the control group should be 12% times 46.8%, 13% times 46.8%, and 14% times 46.8%.  **No**. Why? Because there is also experiment B, whose content reduction rate might be different that that of experiment A. **Therefore, each experiment needs a separate control condition**.

## Hypotheses
- H1: If emotions are contagious via pure exposure to verbal expressions, then compared to their control group, Group A will be less positive, reflected by posting fewer positive content than before) and Group B will be less negative, reflected by posting fewer negative content than before).

- H2: "Opposite emotion should be inversely affected" (p. 8789): Group A should express increased negativity, and Group B should express increased positivity. 

## Measurements & Methods
- To test the hypothese, how are negativity and positivity measured: The percentage of the words as either positive or negative produced by a person.
- A check before running the experiment: all four groups did not differ in emotional expression in the week prior to the experiment. 
- Why using a weighted linear regression:  It was described in the Study Design that the chance a post being omitted is not fixed. However, an effect was found that when people see fewer posts (i.e., more ommission), they in turn posted fewer words. Therefore, we need to account for this effect by assigning weights to people. Specifically, people having more ommission were given a higher weight in the regression. See details on p. 8789. 

## Results
Both H1 and H2 were supported. As can be seen in [the figure](https://www.pnas.org/content/pnas/111/24/8788/F1.large.jpg?width=800&height=600&carousel=1), when negativity is reduced, people generate more positive words and fewer negative words, compared to the control group. The opposite patter occurred when positivity is reduced. It shows that **emotions expressed by our friends through online social networks influenced our own mood status**.  

Some implications:
1. Direct interactions were not necessary for emotional contagion. 
2. Seeing fewer friends' positive posts led people to produce fewer positive words in their own posts, rather than the opposite. 

## Drawbacks
- The effect size is quite small. 

## My thoughts
1. It's interesting that in people's own status updates during the experimental period, only 3.6% were positive and 1.6% negative. However, for posts in people's News Feed, 46.8% were positive and 22.4% were negative. Why was it that News Feed posts were so much more **emotional** than people's own status updates? Is it because Facebook's algorithms likes to show more emotional contents to its users? I guess so. 

2. As the *Editorial Expression of Concern and Correction* said, it is "a matter of concern" that what we see on social media is to such a large extent manipulated by tech giants. As the study found, the content we see has an effect on our well-being. Even if they don't, users should be able to know what they are going through, rather than becoming a subject in an experiment we are ignorant of. 