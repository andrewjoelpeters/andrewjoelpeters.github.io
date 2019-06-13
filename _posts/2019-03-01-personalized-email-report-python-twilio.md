---
layout: post
title: Building a Pesonalized Email Report for Teachers Using Python & Twilio
date: 2010-03-01
category: data

---

![alt text]({{ '/assets/img/open-rate.png' | relative_url }} "Email Report Example") *The open rate of the finished email report.*

## Data Divide -- Depth vs. Breadth

At any given moment, a teacher could tell you much more about a particular student than I could. But I saw the aggregated data, and I knew the big picture. So, for example, while I knew exactly which homerooms had the best and worst attendance rates, the teachers were unaware. This matters. In education, of all things, it can be hard to know how you're doing with comparisons. A homeroom teacher with 90% attendance might think they're doing a good job of engaging parents and getting kids to school, until they realize that the rest of the school averages 97%. The same goes for comparison with past data -- long-term perspective. For a teacher that's frustrated that their students are only completing 85% of homework, it's insightful to know that they started the year at closer to 70%, and have been climbing steadily since then. I wanted to figure out how to share the perspective I had with our teaching staff -- to append breadth to depth.

## Bringing Breadth

In order to do this, I needed to figure out how communicate more abstract data points in way that would stick. I dug up an example from another school, of a Google Sheets workbook with five or so tabs and hundreds of rows on each. It was information overload, but it was a start. I took the idea, trimmed it down to just what was needed, and added queries based off data validation dropdowns so each teacher could select their name, displaying only what was pertinent to them. I had just finished reading _Nudge_, so naturally, I added an ```IF``` statement to show different emojis depending on how teachers were doing against the KPIs[^1]. It was a start.

Teachers gave it good feedback and seemed to be using it. But there is a lot of competition for the attention of teachers at a high-performing Charter School, and I began to lose it. 

## Automated Data Reports via Python & SendGrid

I needed to meet teachers where they were at. Sharing a Google Sheets full of data required significant engagement from a teacher was likely exhausted, already pulled in a few directions too many. Instead, I began emails. 

The first iteration was a mail merge in MS Word, sending personalized data from a linked CSV via Outlook. Eventually, I got put together a "real" system using Python, Sendgrid, and S3. It would automatically gather student data, sort & aggregate it by teacher, compare it to their grade team, chart progress since the previous week and the begining of the school year, and send it to teachers. Every teacher in the school opens that email, every week.

![alt text]({{ '/assets/img/email.png' | relative_url }} "Email Report Example") *The finished email report.*

The result is a school in which the people that matter most -- the teachers -- are aware of the larger trends of our organization, and have a better conception of their own performance. Using this awareness, we improved school-wide homework rates by over 7% between the first and second trimesters. We also held our attendance rate steady between February and June, even though it becomes more difficult to get kids in school as the year winds down. Giving breadth and historical perspective to teachers was instrumental in both achievements.

![alt text]({{ '/assets/img/email-graph.png' | relative_url }} "Email Graph Example") *An example of a personalized attendance chart, included in the email report.*

[^1]: Anecdotally, this seemed somewhat effective. Multiple teachers told me they wanted to improve their data to avoid the frowny emoji. 