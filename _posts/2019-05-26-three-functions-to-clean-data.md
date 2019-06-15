---
layout: post
title: Melting & Pivoting
date: 2019-05-26
category: data

---

## Losing Weight

The first program I made for creating comparative data reports, built between bouts of thanksgiving meals, was pudgy itself. I didn’t save a copy of it and never counted, but I’d bet it was in exces of 1,000 lines of code. It worked, but it didn’t look too pretty.

Not long after, I reworked the program, bringing it down to 117 lines. I revisted it again yesterday, and trimmed it up once more – to 27 lines of code.

## On Preparing Data

Preparing and transforming data is a process that can be frustrating, or exceedingly satisfying. To me, tidying up raw data into a coherent and useful dataframe is an oddly delightful little challenge. I suppose its a bit like the digital counterpart to watching Marie Kondo bring order to chaos.

## Melt

`pandas.melt` is a beautiful little function, that transforms a wide dataset into a long one. We could do this manually by slicing and concatenating dataframes, or we could use this to do it smoothly and easily. 

In the .CSV I pull from our assessment software after a round of testing, each test is listed as a different column in the table, making the data unruly and wide. What’s worse, each grade’s tests are listed distinctly, meaning the grade five literature final gets a separate column from the grade six literature final. This means that four our four grades, and four subjects of testing, we end up with sixteen columns for each student, when each student only took four tests.
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sb</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">read_csv</span><span class="p">(</span><span class="s1">&#39;sample.csv&#39;</span><span class="p">)</span>
<span class="n">sb</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[2]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
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
      <th>School Name</th>
      <th>Grade</th>
      <th>Teacher</th>
      <th>Course</th>
      <th>Student ID</th>
      <th>Student Name</th>
      <th>Gr5 SCI Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr6 SCI Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr7 SCI Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr8 SCI Tri2 Practice Written -Tri2 18-19-SS</th>
      <th>Gr5 MATH Tri2 Final 18-19-Tri 2 18-19-SS</th>
      <th>Gr6 MATH Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr7 MATH Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr7 HIST Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr6 HIST Tri2 Final 18-19-Tri2 18-19-SS</th>
      <th>Gr5 LIT Tri2 Final Day 1 18-19-Tri2 18-19-SS</th>
      <th>Gr6 LIT Tri2 Final Day 1 18-19-Tri2 18-19-SS</th>
      <th>Gr7 LIT Tri2 Final Day 1 18-19-Tri2 18-19-SS</th>
      <th>Gr8 LIT Tri2 Final Day 1 18-19-Tri2 18-19-SS</th>
      <th>Gr5 HIST Tri2 Final 18-19-Tri2 18-19-SS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 0</td>
      <td>Science and Tech Grade 5</td>
      <td>15</td>
      <td>student 0</td>
      <td>79.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>91.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>92.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>80.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 1</td>
      <td>Homeroom Grade 5</td>
      <td>15</td>
      <td>student 0</td>
      <td>79.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>91.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>92.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>80.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 1</td>
      <td>Social Studies Grade 5</td>
      <td>15</td>
      <td>student 0</td>
      <td>79.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>91.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>92.0</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>80.0</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>First, I'll clean up those headers a bit to make them easier to work with.
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sb</span><span class="o">.</span><span class="n">columns</span> <span class="o">=</span> <span class="n">sb</span><span class="o">.</span><span class="n">columns</span><span class="o">.</span><span class="n">str</span><span class="o">.</span><span class="n">lower</span><span class="p">()</span>
<span class="n">sb</span><span class="o">.</span><span class="n">columns</span> <span class="o">=</span> <span class="n">sb</span><span class="o">.</span><span class="n">columns</span><span class="o">.</span><span class="n">str</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="s1">&#39; &#39;</span><span class="p">,</span> <span class="s1">&#39;_&#39;</span><span class="p">)</span>
<span class="n">sb</span><span class="o">.</span><span class="n">rename</span><span class="p">({</span><span class="s1">&#39;school_name&#39;</span><span class="p">:</span> <span class="s1">&#39;school&#39;</span><span class="p">},</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">,</span> <span class="n">inplace</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

</div>

Then, using pandas.melt, we can unpivot the original data, maintaining all indentifier variables, but stacking all score values in one long column called “score”. Next to our “score” column, we’ll place another column, “test”, that specifies which test each score corresponds to.

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[5]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sb</span> <span class="o">=</span> <span class="n">sb</span><span class="o">.</span><span class="n">melt</span><span class="p">(</span><span class="n">id_vars</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;school&#39;</span><span class="p">,</span> <span class="s1">&#39;grade&#39;</span><span class="p">,</span> <span class="s1">&#39;teacher&#39;</span><span class="p">,</span> <span class="s1">&#39;student_id&#39;</span><span class="p">,</span> <span class="s1">&#39;student_name&#39;</span><span class="p">,</span> <span class="s1">&#39;course&#39;</span><span class="p">],</span> 
             <span class="n">var_name</span> <span class="o">=</span> <span class="s1">&#39;test&#39;</span><span class="p">,</span> <span class="n">value_name</span><span class="o">=</span><span class="s1">&#39;score&#39;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[6]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sb</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[6]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
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
      <th>school</th>
      <th>grade</th>
      <th>teacher</th>
      <th>student_id</th>
      <th>student_name</th>
      <th>course</th>
      <th>test</th>
      <th>score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 0</td>
      <td>15</td>
      <td>student 0</td>
      <td>Science and Tech Grade 5</td>
      <td>gr5_sci_tri2_final_18-19-tri2_18-19-ss</td>
      <td>79.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 1</td>
      <td>15</td>
      <td>student 0</td>
      <td>Homeroom Grade 5</td>
      <td>gr5_sci_tri2_final_18-19-tri2_18-19-ss</td>
      <td>79.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 1</td>
      <td>15</td>
      <td>student 0</td>
      <td>Social Studies Grade 5</td>
      <td>gr5_sci_tri2_final_18-19-tri2_18-19-ss</td>
      <td>79.0</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>Ahh, much better! From here, we can easily drop rows that don’t have values (our 5th graders don’t need a row showing NaN for the 8th grade tests they didn’t take). The tidy format also makes it easy to apply functions to otherwise clean up the table.

In the table above, we can see how student 0's score for their science final is show across multiple rows, for each of the courses they're enrolled in. We don't need all this, though -- we won't be interested in aggregating scores for the science final by a student's social studies teacher, for example. Long form data makes it easy to get rid of those unnecessary rows.
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[7]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sb</span><span class="o">.</span><span class="n">course</span> <span class="o">=</span> <span class="n">sb</span><span class="o">.</span><span class="n">course</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="n">to_replace</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;(.*)Literature(.*)&#39;</span><span class="p">,</span> <span class="s1">&#39;(.*)Science(.*)&#39;</span><span class="p">,</span> 
                                          <span class="s1">&#39;(.*)Social(.*)&#39;</span><span class="p">,</span> <span class="s1">&#39;(.*)Mathematics(.*)&#39;</span><span class="p">],</span> 
                                          <span class="n">value</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;lit&#39;</span><span class="p">,</span> <span class="s1">&#39;sci&#39;</span><span class="p">,</span> <span class="s1">&#39;hist&#39;</span><span class="p">,</span> <span class="s1">&#39;math&#39;</span><span class="p">],</span> <span class="n">regex</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
<span class="n">sb</span> <span class="o">=</span> <span class="n">sb</span><span class="p">[</span><span class="n">sb</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="k">lambda</span> <span class="n">row</span><span class="p">:</span> <span class="nb">bool</span><span class="p">(</span><span class="n">re</span><span class="o">.</span><span class="n">findall</span><span class="p">(</span><span class="n">row</span><span class="p">[</span><span class="s1">&#39;course&#39;</span><span class="p">],</span> <span class="n">row</span><span class="p">[</span><span class="s1">&#39;test&#39;</span><span class="p">])),</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)]</span>
<span class="n">sb</span> <span class="o">=</span> <span class="n">sb</span><span class="o">.</span><span class="n">drop</span><span class="p">(</span><span class="n">columns</span><span class="o">=</span><span class="s1">&#39;test&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">dropna</span><span class="p">()</span><span class="o">.</span><span class="n">rename</span><span class="p">(</span><span class="n">columns</span><span class="o">=</span><span class="p">{</span><span class="s1">&#39;course&#39;</span><span class="p">:</span> <span class="s1">&#39;subject&#39;</span><span class="p">})</span>
<span class="n">sb</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[7]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
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
      <th>school</th>
      <th>grade</th>
      <th>teacher</th>
      <th>student_id</th>
      <th>student_name</th>
      <th>subject</th>
      <th>score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>school 0</td>
      <td>5</td>
      <td>teacher 0</td>
      <td>15</td>
      <td>student 0</td>
      <td>sci</td>
      <td>79.0</td>
    </tr>
    <tr>
      <th>11</th>
      <td>school 1</td>
      <td>5</td>
      <td>teacher 8</td>
      <td>71842</td>
      <td>student 1</td>
      <td>sci</td>
      <td>94.0</td>
    </tr>
    <tr>
      <th>16</th>
      <td>school 1</td>
      <td>5</td>
      <td>teacher 8</td>
      <td>71835</td>
      <td>student 2</td>
      <td>sci</td>
      <td>71.0</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>Now our dataframe only shows one row per student, per subject. The teachers represented in the "teacher" column are the only the ones who actually taught the student for the subject they were tested on. Much more useful.

## Pivot Table

Tidy data is excellent to work with for many things, but when it comes to sharing data with a wider audience, I want my data wide. Certain operations are also easier to perform on wide data. It’s easy to make a new column as the sum of two other columns, for example, but performing the same calculation on tidy data – adding a new variable name to identify the sum of two other variable with the same identifiers (!) just sounds complicated.

When I want my data wide again, I use pivot_table. In the application below, I’m aggregating the data by school, grade, subject, and teacher, and counting the number of students that earned an “F”, a “C”, a “B”, or an “A”, for each.
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[9]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sb</span><span class="p">[</span><span class="s1">&#39;level&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">cut</span><span class="p">(</span><span class="n">sb</span><span class="o">.</span><span class="n">score</span><span class="p">,</span> <span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">70</span><span class="p">,</span> <span class="mi">80</span><span class="p">,</span> <span class="mi">90</span><span class="p">,</span> <span class="n">np</span><span class="o">.</span><span class="n">inf</span><span class="p">],</span> 
                     <span class="n">labels</span><span class="o">=</span><span class="p">[</span><span class="s1">&#39;f&#39;</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">,</span> <span class="s1">&#39;a&#39;</span><span class="p">],</span> <span class="n">right</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">include_lowest</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[24]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">s</span> <span class="o">=</span> <span class="n">sb</span><span class="o">.</span><span class="n">pivot_table</span><span class="p">(</span><span class="n">index</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;school&#39;</span><span class="p">,</span> <span class="s1">&#39;grade&#39;</span><span class="p">,</span> <span class="s1">&#39;subject&#39;</span><span class="p">,</span> <span class="s1">&#39;teacher&#39;</span><span class="p">],</span> 
                   <span class="n">columns</span> <span class="o">=</span> <span class="s1">&#39;level&#39;</span><span class="p">,</span> <span class="n">values</span> <span class="o">=</span> <span class="s1">&#39;score&#39;</span><span class="p">,</span> <span class="n">aggfunc</span> <span class="o">=</span> <span class="s1">&#39;count&#39;</span><span class="p">,</span>
                  <span class="n">margins</span> <span class="o">=</span> <span class="kc">True</span><span class="p">,</span> <span class="n">margins_name</span> <span class="o">=</span><span class="s1">&#39;all&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">reset_index</span><span class="p">()</span>
<span class="n">s</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[24]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
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
      <th>level</th>
      <th>school</th>
      <th>grade</th>
      <th>subject</th>
      <th>teacher</th>
      <th>f</th>
      <th>c</th>
      <th>b</th>
      <th>a</th>
      <th>all</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 1</td>
      <td>9.0</td>
      <td>11.0</td>
      <td>22.0</td>
      <td>4.0</td>
      <td>46</td>
    </tr>
    <tr>
      <th>1</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 116</td>
      <td>9.0</td>
      <td>13.0</td>
      <td>17.0</td>
      <td>9.0</td>
      <td>48</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 213</td>
      <td>11.0</td>
      <td>3.0</td>
      <td>11.0</td>
      <td>8.0</td>
      <td>33</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>Now we can easily examine teacher-level data. Which teacher performed best on the 5th grade history test? In order to make clean comparisons, we'll calculated the percentage of each teacher's students that earned a given grade. 
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[26]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">g_levels</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;f&#39;</span><span class="p">,</span><span class="s1">&#39;c&#39;</span><span class="p">,</span><span class="s1">&#39;b&#39;</span><span class="p">,</span><span class="s1">&#39;a&#39;</span><span class="p">]</span>
<span class="k">for</span> <span class="n">level</span> <span class="ow">in</span> <span class="n">g_levels</span><span class="p">:</span>
    <span class="n">s</span><span class="p">[</span><span class="s1">&#39;%&#39;</span> <span class="o">+</span> <span class="n">level</span><span class="p">]</span> <span class="o">=</span> <span class="n">s</span><span class="p">[</span><span class="n">level</span><span class="p">]</span><span class="o">/</span><span class="n">s</span><span class="p">[</span><span class="s1">&#39;all&#39;</span><span class="p">]</span>
<span class="n">s</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[26]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
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
      <th>level</th>
      <th>school</th>
      <th>grade</th>
      <th>subject</th>
      <th>teacher</th>
      <th>f</th>
      <th>c</th>
      <th>b</th>
      <th>a</th>
      <th>all</th>
      <th>%f</th>
      <th>%c</th>
      <th>%b</th>
      <th>%a</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 1</td>
      <td>9.0</td>
      <td>11.0</td>
      <td>22.0</td>
      <td>4.0</td>
      <td>46</td>
      <td>0.195652</td>
      <td>0.239130</td>
      <td>0.478261</td>
      <td>0.086957</td>
    </tr>
    <tr>
      <th>1</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 116</td>
      <td>9.0</td>
      <td>13.0</td>
      <td>17.0</td>
      <td>9.0</td>
      <td>48</td>
      <td>0.187500</td>
      <td>0.270833</td>
      <td>0.354167</td>
      <td>0.187500</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 213</td>
      <td>11.0</td>
      <td>3.0</td>
      <td>11.0</td>
      <td>8.0</td>
      <td>33</td>
      <td>0.333333</td>
      <td>0.090909</td>
      <td>0.333333</td>
      <td>0.242424</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[36]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">s</span><span class="p">[</span>
    <span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">subject</span> <span class="o">==</span> <span class="s1">&#39;hist&#39;</span><span class="p">)</span>
    <span class="o">&amp;</span> <span class="p">(</span><span class="n">s</span><span class="o">.</span><span class="n">grade</span> <span class="o">==</span> <span class="mi">5</span><span class="p">)</span>
<span class="p">]</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="s1">&#39;%a&#39;</span><span class="p">,</span> <span class="n">ascending</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

<div class="prompt output_prompt">Out[36]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
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
      <th>level</th>
      <th>school</th>
      <th>grade</th>
      <th>subject</th>
      <th>teacher</th>
      <th>f</th>
      <th>c</th>
      <th>b</th>
      <th>a</th>
      <th>all</th>
      <th>%f</th>
      <th>%c</th>
      <th>%b</th>
      <th>%a</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>215</th>
      <td>school 8</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 321</td>
      <td>9.0</td>
      <td>16.0</td>
      <td>14.0</td>
      <td>16.0</td>
      <td>55</td>
      <td>0.163636</td>
      <td>0.290909</td>
      <td>0.254545</td>
      <td>0.290909</td>
    </tr>
    <tr>
      <th>216</th>
      <td>school 8</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 62</td>
      <td>13.0</td>
      <td>12.0</td>
      <td>17.0</td>
      <td>16.0</td>
      <td>58</td>
      <td>0.224138</td>
      <td>0.206897</td>
      <td>0.293103</td>
      <td>0.275862</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>teacher 213</td>
      <td>11.0</td>
      <td>3.0</td>
      <td>11.0</td>
      <td>8.0</td>
      <td>33</td>
      <td>0.333333</td>
      <td>0.090909</td>
      <td>0.333333</td>
      <td>0.242424</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

</div>Look at that! Teacher 321 did best in their percentage of A's, and second best was another teacher from the same school. Sounds like school 8 has a 5th grade history program worth looking into.

## Parting Thoughts

Watch out, I may get philosphical.

It’s reported that data wrangling is the most time-intensive and most-disliked part of a data specialist’s work. There’s something particularly satisfying, though, about work that is indefinitely perfectable (c.f. Toqueville), yet clearly measurable. I hope that I will look back on this workflow in a year or two and feel a little embarrassed that I used 27 lines of code to do what I eventually learn to do in 7; but in the meantime, I know (quantifiably!) that I’ve learned how to do something exponentially more efficient than I wouldn’t done just a few months ago. That’s satisfying!

Eternal striving + measurable accomplishments = something pretty nice.
