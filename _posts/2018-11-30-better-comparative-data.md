---
layout: post
title: Creating a Better System for Comparative Academic Data
date: 2018-11-30
category: data

---

![alt text]({{ '/assets/img/heatmap.gif' | relative_url }} "Dynamic Heat Map Example") *The overview tab of my finished report.*

## The Problem

My job at Success wasn't to make network-wide, python-driven comparative data reports. But our school leadership team wasn't getting the data we needed, and something had to change. In a nutshell:

 * Reports were turned around slowly.
 * Data was irrelevant -- overly detailed or aggregated beyond the point of meaningfullness.
 * Key information was hard to get to.

## What the Solution Needed to Be

* Fast. For data to actually inform instruction in education, the turnaround needs to be fast. Teachers are trying to fit a lot of content into a short period of time. It's not very useful to let a teacher know that only half the class mastered 2-digit multiplication a week after the cumulative assessment, when they've already moved onto multiplication. At that point, the teacher might struggle to find the time to return to concepts their students struggled with. I needed a system that could deliver data reports within 24 hours of the end of an assessment. 
* Relevant. This is in part, extremely obvious. Data that's irrelevant is not useful. One of the challenges of relevancy is giving different people in different roles all the "just right" amount of information they need to make informed decisions. A 5th grade math teacher doesn't care about the results of the 8th grade history final, but the principal needs it all in one place. A second challenge of relevancy relates to the questions that teachers and leaders will ask of the data. Too often we make ad-hoc reports that answer a specific question ("How'd we do on 5th grade math?"), only to need a second report to answer the follow-up questions ("Which of our teachers was stronger? How big was the gap between our school and the highest performing school?"). I needed to build something that could maintain relevance, even as the questions changed.
* Not awful to look at. To make meaningful conclusions from data, you have to spend some time with it, and it's hard to spend much time with an ugly spreadsheet. The existing reports were full of row upon row of values, and even for someone who spends a significant time in Google Sheets, were visually overwhelming. I need to make something that non-data nerds would actually enjoy working with.

## The Result

The result was a dynamic report that was used by 15 schools and upwards of 45 school leaders. It was successful for its fast turnaround time, clear organization, and ability to provide both big-picture and specific data. 

## How I Did It

As it seems is often the case, data wrangling played a major component of this project. I wrote a python script to automate the process of structuring students' assessment data into more analysis-friendly "tidy" datasets. This same program also aggregated the data by school and teacher for higher-level comparisons. It used these aggregations to produce two .CSVs that in a few keystrokes I could copy to my report template. This meant that I could have clean, useable data within minutes; previously, it would have taken the better part of a day.

FILTER, QUERY, and Data Validation. Using [data validation and cell references](https://www.benlcollins.com/spreadsheets/dynamic-charts-google-sheets/) in Google Sheets makes for an easy way to add interactivity. I implemented this little feature to allow users to choose what data to display, for a significantly streamlined experience. We were previously pushed out a different spreadsheet for each of the four core subjects our students study, meaning that even for a high-level view of an assessment school leaders would have to jump between four different tabs. I could do the exact same thing for different grade levels.

![alt text]({{ '/assets/img/data-validation.gif' | relative_url }} "Simple Dynamic Table Example")

Using this technique, I could radically simply the report. Instead of opening 4 different spreadsheets, with 12-15 tabs each, I could use basic principles of dashboarding so that users could easily select the information they wanted to see. This somewhat-pardoically resuts in a report that is more focused and more robust at the same time. I was free to include much more information in my reports, because I wasn't afraid of it being immediately overwhelming. 

Effective Charts
At the end of each round of assessments, there were 16 data points we want to see immediately -- our network rank for each of the four subjects, across each of our four grades. How do you quickly compare 16 values at once, across two different categories? Sounds like a job for a heat map! I standardized the heat map as our first glance review after each assessment. It allowed us to quickly see which grade and content we needed to prioritize and review first. By building the heat map with FILTER and data validation, any other school could use our tool to do the same. 

![alt text]({{ '/assets/img/heatmap.gif' | relative_url }} "Dynamic Heat Map Example")

## Why Google Sheets? 

I like tools, and first looked into Periscope, Mode, Qlik -- you name it. But I realized that the best solution would be on Google Sheets. We already used Google Sheets network-wide, which meant that no one would have to sign up for a new account. This alone was enough for me to put up with the trade-offs. The more my report could meet the organization where it was at, the more widely-used and effective it would be. Using Google Sheets also meant that other non-techy users could easily make a copy of my report, add in their own notes or progress monitoring, and go.




