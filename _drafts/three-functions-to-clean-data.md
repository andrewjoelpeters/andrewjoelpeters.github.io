---
layout: post
title: The Three Most Helpful Functions to Clean Data in Python
date: 2019-05-26
category: data

---

## Losing Weight

(Full example notebook here)[link goes here!]

The first program I made for creating comparative data reports, built between bouts of thanksgiving meals, was pudgy itself. I didn't save a copy of it and never counted, but I'd bet it was in exces of 1,000 lines of code. It worked, but it didn't look too pretty. 

Not long after, I reworked the program, bringing it down to 117 lines. I revisted it again yesterday, and trimmed it up once more -- to 27 lines of code. 

## On Wrangling

Wrangling data is a process that can be frustrating, or exceedingly satisfying. To me, tidying up raw data into a coherent and useful dataframe is an oddly delightful little challenge. I suppose its a bit like the digital counterpart to watching Marie Kondo bring order to chaos. 

## Melt

`pandas.melt` is a beautiful little function, that transforms a wide dataset into a long one. We could do this manually by slicing and concatenating dataframes, or we could use this to do it smoothly and easily. 

In the .CSV I pull from our assessment software after a round of testing, each test is listed as a different column in the table, making the data unruly and wide. What's worse, each grade's tests are listed distinctly, meaning the grade five literature final gets a separate column from the grade six literature final. This means that four our four grades, and four subjects of testing, we end up with sixteen columns for each student, when each student only took four tests. 

Using `pandas.melt`, we can unpivot the original data, maintaining all indentifier variables, but stacking all score values in one long column called "score". Next to our "score" column, we'll place another column, "test", that specifies which test each score corresponds to. 

Ahh, much better! From here, we can easily drop rows that don't have values (our 5th graders don't need a row showing NaN for the 8th grade tests they didn't take). The tidy format also makes it easy to apply functions to otherwise clean up the table. 

## Pivot Table

Tidy data is excellent to work with for many things, but when it comes to sharing data with a wider audience, I want my data wide. Certain operations are also easier to perform on wide data. It's easy to make a new column as the sum of two other columns, for example, but performing the same calculation on tidy data -- adding a new variable name to a column that is the sum of two other variable with the same identifiers just sounds complicated. 

When I want my data wide again, I use `pivot_table`. In the application below, I'm aggregating the data by school, grade, then subject, and counting the number of students that earned an "F", a "C", a "B", or an "A", for each. 

Having done this, I can easily calculate the _percentage_ of students at each tier as well -- something I wouldn't know how to do if the same data were in a long format.

Last, I'll apply a groupby to determine how each school did compared to the rest of our network for each grade and subject. 

## Parting Thoughts

Watch out, I may get philosphical. 

It's reported that data wrangling is the most time-intensive and most-disliked part of a data specialist's work. There's something particularly satisfying, though, about work that is indefinitely perfectable (c.f. [Toqueville](http://xroads.virginia.edu/~HYPER/DETOC/ch1_08.htm)), yet clearly measurable. I hope that I will look back on this workflow in a year or two and feel a little embarrassed that I used 27 lines of code to do what I eventually learn to do in 7; but in the meantime, I know (quantifiably!) that I've learned how to do something exponentially more efficient than I wouldn't done just a few months ago. That's satisfying! 

Eternal striving + measurable accomplishments = something pretty nice. 