## Intro

## Issue

At any given moment, a teacher could tell you much more about a particular student than I could. But I saw the aggregated data. I saw the comparisons. So, for example, while I knew exactly which homerooms had the best and worst attendance rates, the teachers were unaware. 

I needed to figure out away to communicate this information in a way that stuck. I dug up an example from another school, of a Google Sheets workbook with five or so tabs and hundreds of rows on each. I took the idea, trimmed it down to just what was needed, and added queries based off dropdowns so each teacher could select their name, displaying only what was pertinent to them. I had just finished reading _Nudge_, so naturally, I added an ```IF``` statement to show different emojis depending on how teachers were doing against the KPIs. It was a start.

Teachers gave it good feebback and seemed to be using it. But there is a lot of competition for the attention of teachers at a high-performing Charter School, and I began to lose it. 

[picture of dashboard]
I needed to meet teachers where they were at. Sharing a Google Sheets full of data required significant engagement from a teacher that is likely exhausted, already pulled in a few directions too many. Instead, I began emails. 

The first iteration was a mail merge in MS Word, sending personalized data from a linked CSV via Outlook. Eventually, I got put together a "real" system using python and Sendgrid. It would automatically gather student data, sort & aggregate it by teacher, compare it to their grade team, chart progress since the previous week and the begining of the school year, and send it to teachers. Every teacher school opens that email, every week.

[picture of email]
[Picture of Open Rate]

The result is a school in which the people that matter most -- the teachers -- are aware of the larger trends of our organization, and have a better conception of their own performance. 