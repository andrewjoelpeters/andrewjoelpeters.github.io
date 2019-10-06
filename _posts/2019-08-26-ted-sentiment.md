---
layout: post
title: Are More Positive Ted Talks More Popular?
date: 2019-08-26
category: data

---

In a particulary excellent skit on John Oliver's _Last Week Tonight_, a man speaks on what is clearly supposed to be a TED talk stage. He's explaining the nuance of a study in detail, and the audience begins to lose patience with him. He defends himself, "Science is a very slow and rigorous process, which does not lend itself well to sweeping conclusions!" But this just brings more ire to the crown. Another speaker -- a man dressed in a lab coat rushes on the stage, exclaiming, "Woah, take it easy pal!" The skit ends with the audience cheering this same lab-coated man, who has proudly announced to the audience that coffee cures racism, as he explains he's not actually a doctor, the coat just makes people trust him more.  

In _Winners Take All_, Anand Giridharadas offers a yet more pointed critique. He discusses Amy Cuddy's talk on "Power Poses", and provides her as an example of how rigorous and critical research can morph into overreaching optimism on the TED stage. TED talks reward speakers who can provide easy-to-implement ideas and constructive ideas, at the expense of thorough critiques of structural issues. As he put its, the TED is part of a real where on can "[Challenge] to do more good. But never, ever, tell them to do less harm."

So, when I came across a dataset containing the transcripts of 2,686 TED talks, I wanted to take a closer look. Using sentiment analysis, I started with a simple question. _Do TED get more views when they have more positive conclusions?_


```python
import pandas as pd
import numpy as np
from textblob import TextBlob
import matplotlib.pyplot as plt
import seaborn as sns

# import transcripts .csv as ts
path = '/Users/andrewpeters/GitHub/ted-data/transcripts.csv'
ts = pd.read_csv(path)
```

First, will make a function that takes the entire transcript, and returns the sentiment of the last 500 characters. This will serve as a rough way to gauge the ending sentiment of the TED talk.


```python
def end_sentiment(transcript):
    txt = transcript[-500:]
    txt = TextBlob(txt)
    sentiment = txt.sentiment
    return sentiment.polarity

```


```python
ts['sentiment'] = ts['text'].apply(end_sentiment)
ts.describe()
```


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>views</th>
      <th>sentiment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>2.686000e+03</td>
      <td>2686.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>1.841992e+06</td>
      <td>0.172993</td>
    </tr>
    <tr>
      <th>std</th>
      <td>2.762922e+06</td>
      <td>0.156304</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000e+00</td>
      <td>-0.478571</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>8.479082e+05</td>
      <td>0.069881</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>1.207040e+06</td>
      <td>0.171733</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>1.816615e+06</td>
      <td>0.271193</td>
    </tr>
    <tr>
      <th>max</th>
      <td>5.161409e+07</td>
      <td>0.800000</td>
    </tr>
  </tbody>
</table>
</div>



The median sentiment for the last 500 charachters or these TED talks is .17 -- that's slightly positive, which sounds about right. What does that look like in practice? Here's an example:


```python
ts[ts['sentiment'] > .17].sort_values('sentiment').iloc[0]['text'][-500:]
```




    'esign the humor, it doesn\'t make any sense to compare one to the other. It\'s sort of a smorgasbord that\'s made all interesting.    So I want to sum all this up with a caption to a cartoon, and I think this sums up the whole thing, really, about The New Yorker cartoons.    "It sort of makes you stop and think, doesn\'t it."    (Laughter)    And now, when you look at New Yorker cartoons, I\'d like you to stop and think a little bit more about them.    Thank you.    (Applause) Thank you. (Applause)  '



Sounds like a TED Talk!

Here's one of the most negativily concluding talks in the dataset:


```python
ts[ts['sentiment'] < -0.4].sort_values('sentiment').iloc[0]['text'][-500:]
```




    'wheelchairs into cool, electric vehicles?    So plastic, oil and radioactivity are horrible, horrible legacies, but the very worst legacy that we can leave our children is lies. We can no longer afford to shield the kids from the ugly truth because we need their imagination to invent the solutions.    So citizen scientists, makers, dreamers — we must prepare the next generation that cares about the environment and people, and that can actually do something about it.    Thank you.    (Applause)  '



This is a helpful illustration of why sentiment analysis on TED talks could be challenging. While there's certainly a lot that's dark here -- "horrible, horible legacies", "lies", "ugly truth" -- a human reader would also pick up on a call to action that inspires a certain, albeit guarded, optimisim.

On the other end of the spectrum -- what does one of the most positive conclusions look like?


```python
ts[ts['sentiment'] > .75].sort_values('sentiment').iloc[0]['text'][-500:]
```




    "the evidence we have today, he would understand it. He would appreciate it. And most of all, he would teach it.    You, you can teach it. You can touch it. You can understand it. Take it out of this room. Take your skin color, and celebrate it. Spread the word. You have the evolution of the history of our species, part of it, written in your skin. Understand it. Appreciate it. Celebrate it. Go out. Isn't it beautiful? Isn't it wonderful? You are the products of evolution. Thank you. (Applause)  "



With no context, and no real understanding of what the author is speaking about, here's a conclusion that inspires! "Isn't it beautiful? Isn't it wonderful?" The repition of "You can" adds to the positivity. 

The examples above give a sense of what different sentiment scores imply in real examples. Now for the chart I was looking forward to. How does the sentiment of the last 500 characters of a talk correlate with the total number of views?


```python
sns.set()
ax=sns.scatterplot(x='views', y='sentiment', data=ts)
```

![alt text]({{ '/assets/img/ted-sentiment/output_13_0.png' | relative_url }} "# of Views vs. Conclusion Sentiment")


Turns out, not very much. It's noteworthy, though, that only a single talk has gathered more than 20 million views with a negative concluding sentiment, and even than one is hovering just barely below 0. While the most popular talks aren't the ones that end with the most positivity, they're still the positive ones.

This gave me one more idea, though. Maybe what we pick up on as listeners of an inspirational TED talk isn't just the sentiment of the conclusion, but a change in sentiment over the course of the talk. Some of the most engaging TED talks take serious and emotional issues, but find a way to conclude with hope.

To look closer at this, I split each transcript into five equal segments, and looked how the sentiment of the talks changed between each segment. I'll give less explanation on my process to do this, so if you're not interested in the code, just skip to the bottom.


```python
a, b, c, d, e = [], [], [], [], []  # create lables for the five segments
for t in ts.text: # split the text in the 'text' column of my dataframe into 5 equal segments, and assign each segment to the labels above
    length = len(t)
    cnk = round(length/5)
    a.append(t[0:cnk])
    b.append(t[cnk:cnk*2])
    c.append(t[cnk*2:cnk*3])
    d.append(t[cnk*3:cnk*4])
    e.append(t[cnk*4:cnk*5])
    
ts['a'] = a
ts['b'] = b
ts['c'] = c
ts['d'] = d
ts['e'] = e

```


```python
def sentiment(txt): # make a function to more easily return the sentiment with 'apply'.
    txt = TextBlob(txt)
    sentiment = txt.sentiment
    return sentiment.polarity

for letter in ['a', 'b', 'c', 'd', 'e']: # perform a sentiment analysis on each of the five segments
    col = letter+'-sent'
    ts[col] = ts[letter].apply(sentiment)

```


```python
letters = ['a', 'b', 'c', 'd', 'e']
for idx, letter1 in enumerate(letters): # probably an overly verbose way of finding the change in sentiment over the course of the talk
    try:
        letter2 = letters[idx + 1]
        col1 = letter1 + '-sent'
        col2 = letter2 + '-sent'
        label = 'd_sent_' + letter1 + letter2
        ts[label] = ts[col2] - ts[col1]
    except IndexError: # there is no segment after segment 'e', so the code above throws an indexerror. This is a workaround that should probably be improved.
        continue

```


```python
swarm_data = pd.melt(ts, value_name="change in sentiment", # make the dataframe 'tidy' for easier graphing
    value_vars = ['d_sent_ab', 'd_sent_bc', 'd_sent_cd', 'd_sent_de'],
    id_vars='views')

```

All the data is now prepared, so here's our moment of truth. I'll make a plot that shows the change in sentiment between each section of a talk, for every single talk in the datebase. Maybe we'll see that throughout a talk the _change in positivity_ is decidely greater than zero.


```python
sns.boxplot(data = swarm_data, x = 'variable', y = 'change in sentiment')
sns.stripplot(data = swarm_data, x = 'variable', y = 'change in sentiment', jitter=True)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x1a1dc932b0>



![alt text]({{ '/assets/img/ted-sentiment/output_21_1.png' | relative_url }} "How Does Sentiment Change Throughout a TED Talk?")


And...Nope!

Here's how to read this graph. "d_sent_ab" on the x-axis shows the change in sentiment from the first fifth of a talk (segment A in my nomenclature) to the second fifth (segment b). While there's a wide range in this data, the medians are consistently around 0. The central tendency points to the idea that the sentiment of TED talks does not change much over the course of the talk. If a talk has a grand and optimisted conclusion, it likely was grand and optimistic throughout. 

One noteworthy piece -- the lower outliers. Between the first and second segments, the second and third, and the third and fourth, there is a small crew of talks that become more _negative_ by a significant degree. The positive of these talks is decreasing by .5 or more -- represented by the dots that are below -.5 on the y axis. But between the four and final segment, not a single talk is decreasing by .5 or more in its positivity score. Even the least-optimistic talks tone it down for the conclusion!

One last idea. What if we look at the same graph, but only for the top 20 most popular talks of all time?


```python
top_20 = ts.sort_values('views', ascending = False).head(20)

top_swarm_data = pd.melt(top_20, value_name="change in sentiment", # make the dataframe 'tidy' for easier graphing
    value_vars = ['d_sent_ab', 'd_sent_bc', 'd_sent_cd', 'd_sent_de'],
    id_vars='views')

sns.stripplot(data = top_swarm_data, x = 'variable', y = 'change in sentiment', jitter=True)
```




    <matplotlib.axes._subplots.AxesSubplot at 0x1a1db59be0>



![alt text]({{ '/assets/img/ted-sentiment/output_24_1.png' | relative_url }} "Change in Sentiment, Most Popular Talks")

Pretty similar. 

Positivity isn't a panacea for a popular talk. Then again, maybe that's obvious. There are many different ways to engage an audience, and one can offer the sweeping conclusion John Oliver speaks of without positivity. [^1]

[1] cf. Fox News
