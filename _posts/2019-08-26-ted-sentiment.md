---
layout: post
title: Are More Positive Ted Talks More Popular?
date: 2019-08-26
category: data

---

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>In a particulary excellent skit on John Oliver's <em>Last Week Tonight</em>, a man speaks on what is clearly supposed to be a TED talk stage. He's explaining the nuance of a study in detail, and the audience begins to lose patience with him. He defends himself, "Science is a very slow and rigorous process, which does not lend itself well to sweeping conclusions!" But this just brings more ire to the crown. Another speaker -- a man dressed in a lab coat rushes on the stage, exclaiming, "Woah, take it easy pal!" The skit ends with the audience cheering this same lab-coated man, who has proudly announced to the audience that coffee cures racism, as he explains he's not actually a doctor, the coat just makes people trust him more.</p>
<p>In <em>Winners Take All</em>, Anand Giridharadas offers a yet more pointed critique. He discusses Amy Cuddy's talk on "Power Poses", and provides her as an example of how rigorous and critical research can morph into overreaching optimism on the TED stage. TED talks reward speakers who can provide easy-to-implement ideas and constructive ideas, at the expense of thorough critiques of structural issues. As he put its, the TED is part of a real where on can "[Challenge] to do more good. But never, ever, tell them to do less harm."</p>
<p>So, when I came across a dataset containing the transcripts of 2,686 TED talks, I wanted to take a closer look. Using sentiment analysis, I started with a simple question. <em>Do TED get more views when they have more positive conclusions?</em></p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[1]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="nn">pd</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">from</span> <span class="nn">textblob</span> <span class="k">import</span> <span class="n">TextBlob</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">seaborn</span> <span class="k">as</span> <span class="nn">sns</span>

<span class="c1"># import transcripts .csv as ts</span>
<span class="n">path</span> <span class="o">=</span> <span class="s1">&#39;/Users/andrewpeters/GitHub/ted-data/transcripts.csv&#39;</span>
<span class="n">ts</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">read_csv</span><span class="p">(</span><span class="n">path</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>First, will make a function that takes the entire transcript, and returns the sentiment of the last 500 characters. This will serve as a rough way to gauge the ending sentiment of the Ted talk.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">end_sentiment</span><span class="p">(</span><span class="n">transcript</span><span class="p">):</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="n">transcript</span><span class="p">[</span><span class="o">-</span><span class="mi">500</span><span class="p">:]</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="n">TextBlob</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span>
    <span class="n">sentiment</span> <span class="o">=</span> <span class="n">txt</span><span class="o">.</span><span class="n">sentiment</span>
    <span class="k">return</span> <span class="n">sentiment</span><span class="o">.</span><span class="n">polarity</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">ts</span><span class="p">[</span><span class="s1">&#39;sentiment&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">ts</span><span class="p">[</span><span class="s1">&#39;text&#39;</span><span class="p">]</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">end_sentiment</span><span class="p">)</span>
<span class="n">ts</span><span class="o">.</span><span class="n">describe</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[3]:</div>



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
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>The median sentiment for the last 500 charachters or these TED talks is .17 -- that's slightly positive, which sounds about right. What does that look like in practice? Here's an example:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">ts</span><span class="p">[</span><span class="n">ts</span><span class="p">[</span><span class="s1">&#39;sentiment&#39;</span><span class="p">]</span> <span class="o">&gt;</span> <span class="o">.</span><span class="mi">17</span><span class="p">]</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="s1">&#39;sentiment&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">0</span><span class="p">][</span><span class="s1">&#39;text&#39;</span><span class="p">][</span><span class="o">-</span><span class="mi">500</span><span class="p">:]</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[4]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;esign the humor, it doesn\&#39;t make any sense to compare one to the other. It\&#39;s sort of a smorgasbord that\&#39;s made all interesting.    So I want to sum all this up with a caption to a cartoon, and I think this sums up the whole thing, really, about The New Yorker cartoons.    &#34;It sort of makes you stop and think, doesn\&#39;t it.&#34;    (Laughter)    And now, when you look at New Yorker cartoons, I\&#39;d like you to stop and think a little bit more about them.    Thank you.    (Applause) Thank you. (Applause)  &#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Sounds like a TED Talk!</p>
<p>Here's one of the most negativily concluding talks in the dataset:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[5]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">ts</span><span class="p">[</span><span class="n">ts</span><span class="p">[</span><span class="s1">&#39;sentiment&#39;</span><span class="p">]</span> <span class="o">&lt;</span> <span class="o">-</span><span class="mf">0.4</span><span class="p">]</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="s1">&#39;sentiment&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">0</span><span class="p">][</span><span class="s1">&#39;text&#39;</span><span class="p">][</span><span class="o">-</span><span class="mi">500</span><span class="p">:]</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[5]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#39;wheelchairs into cool, electric vehicles?    So plastic, oil and radioactivity are horrible, horrible legacies, but the very worst legacy that we can leave our children is lies. We can no longer afford to shield the kids from the ugly truth because we need their imagination to invent the solutions.    So citizen scientists, makers, dreamers — we must prepare the next generation that cares about the environment and people, and that can actually do something about it.    Thank you.    (Applause)  &#39;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>This is a helpful illustration of why sentiment analysis on TED talks could be challenging. While there's certainly a lot that's dark here -- "horrible, horible legacies", "lies", "ugly truth" -- a human reader would also pick up on a call to action that inspires a certain, albeit guarded, optimisim.</p>
<p>On the other end of the spectrum -- what does one of the most positive conclusions look like?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[6]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">ts</span><span class="p">[</span><span class="n">ts</span><span class="p">[</span><span class="s1">&#39;sentiment&#39;</span><span class="p">]</span> <span class="o">&gt;</span> <span class="o">.</span><span class="mi">75</span><span class="p">]</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="s1">&#39;sentiment&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">0</span><span class="p">][</span><span class="s1">&#39;text&#39;</span><span class="p">][</span><span class="o">-</span><span class="mi">500</span><span class="p">:]</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[6]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#34;the evidence we have today, he would understand it. He would appreciate it. And most of all, he would teach it.    You, you can teach it. You can touch it. You can understand it. Take it out of this room. Take your skin color, and celebrate it. Spread the word. You have the evolution of the history of our species, part of it, written in your skin. Understand it. Appreciate it. Celebrate it. Go out. Isn&#39;t it beautiful? Isn&#39;t it wonderful? You are the products of evolution. Thank you. (Applause)  &#34;</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>With no context, and no real understanding of what the author is speaking about, here's a conclusion that inspires! "Isn't it beautiful? Isn't it wonderful?" The repition of "You can" adds to the positivity.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>The examples above give a sense of what different sentiment scores imply in real examples. Now for the chart I was looking forward to. How does the sentiment of the last 500 characters of a talk correlate with the total number of views?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[7]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sns</span><span class="o">.</span><span class="n">set</span><span class="p">()</span>
<span class="n">ax</span><span class="o">=</span><span class="n">sns</span><span class="o">.</span><span class="n">scatterplot</span><span class="p">(</span><span class="n">x</span><span class="o">=</span><span class="s1">&#39;views&#39;</span><span class="p">,</span> <span class="n">y</span><span class="o">=</span><span class="s1">&#39;sentiment&#39;</span><span class="p">,</span> <span class="n">data</span><span class="o">=</span><span class="n">ts</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Turns out, not very much. It's noteworthy, though, that only a single talk has gathered more than 20 million views with a negative concluding sentiment, and even than one is hovering just barely below 0. While the most popular talks aren't the ones that end with the most positivity, they're still the positive ones.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>This gave me one more idea, though. Maybe what we pick up on as listeners of an inspirational TED talk isn't just the sentiment of the conclusion, but a change in sentiment over the course of the talk. Some of the most engaging TED talks take serious and emotional issues, but find a way to conclude with hope.</p>
<p>To look closer at this, I split each transcript into five equal segments, and looked how the sentiment of the talks changed between each segment. I'll give less explanation on my process to do this, so if you're not interested in the code, just skip to the bottom.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[8]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">a</span><span class="p">,</span> <span class="n">b</span><span class="p">,</span> <span class="n">c</span><span class="p">,</span> <span class="n">d</span><span class="p">,</span> <span class="n">e</span> <span class="o">=</span> <span class="p">[],</span> <span class="p">[],</span> <span class="p">[],</span> <span class="p">[],</span> <span class="p">[]</span>  <span class="c1"># create lables for the five segments</span>
<span class="k">for</span> <span class="n">t</span> <span class="ow">in</span> <span class="n">ts</span><span class="o">.</span><span class="n">text</span><span class="p">:</span> <span class="c1"># split the text in the &#39;text&#39; column of my dataframe into 5 equal segments, and assign each segment to the labels above</span>
    <span class="n">length</span> <span class="o">=</span> <span class="nb">len</span><span class="p">(</span><span class="n">t</span><span class="p">)</span>
    <span class="n">cnk</span> <span class="o">=</span> <span class="nb">round</span><span class="p">(</span><span class="n">length</span><span class="o">/</span><span class="mi">5</span><span class="p">)</span>
    <span class="n">a</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">cnk</span><span class="p">])</span>
    <span class="n">b</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">[</span><span class="n">cnk</span><span class="p">:</span><span class="n">cnk</span><span class="o">*</span><span class="mi">2</span><span class="p">])</span>
    <span class="n">c</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">[</span><span class="n">cnk</span><span class="o">*</span><span class="mi">2</span><span class="p">:</span><span class="n">cnk</span><span class="o">*</span><span class="mi">3</span><span class="p">])</span>
    <span class="n">d</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">[</span><span class="n">cnk</span><span class="o">*</span><span class="mi">3</span><span class="p">:</span><span class="n">cnk</span><span class="o">*</span><span class="mi">4</span><span class="p">])</span>
    <span class="n">e</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">[</span><span class="n">cnk</span><span class="o">*</span><span class="mi">4</span><span class="p">:</span><span class="n">cnk</span><span class="o">*</span><span class="mi">5</span><span class="p">])</span>
    
<span class="n">ts</span><span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">a</span>
<span class="n">ts</span><span class="p">[</span><span class="s1">&#39;b&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">b</span>
<span class="n">ts</span><span class="p">[</span><span class="s1">&#39;c&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">c</span>
<span class="n">ts</span><span class="p">[</span><span class="s1">&#39;d&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">d</span>
<span class="n">ts</span><span class="p">[</span><span class="s1">&#39;e&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">e</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[9]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">sentiment</span><span class="p">(</span><span class="n">txt</span><span class="p">):</span> <span class="c1"># make a function to more easily return the sentiment with &#39;apply&#39;.</span>
    <span class="n">txt</span> <span class="o">=</span> <span class="n">TextBlob</span><span class="p">(</span><span class="n">txt</span><span class="p">)</span>
    <span class="n">sentiment</span> <span class="o">=</span> <span class="n">txt</span><span class="o">.</span><span class="n">sentiment</span>
    <span class="k">return</span> <span class="n">sentiment</span><span class="o">.</span><span class="n">polarity</span>

<span class="k">for</span> <span class="n">letter</span> <span class="ow">in</span> <span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">,</span> <span class="s1">&#39;d&#39;</span><span class="p">,</span> <span class="s1">&#39;e&#39;</span><span class="p">]:</span> <span class="c1"># perform a sentiment analysis on each of the five segments</span>
    <span class="n">col</span> <span class="o">=</span> <span class="n">letter</span><span class="o">+</span><span class="s1">&#39;-sent&#39;</span>
    <span class="n">ts</span><span class="p">[</span><span class="n">col</span><span class="p">]</span> <span class="o">=</span> <span class="n">ts</span><span class="p">[</span><span class="n">letter</span><span class="p">]</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">sentiment</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[10]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">letters</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;a&#39;</span><span class="p">,</span> <span class="s1">&#39;b&#39;</span><span class="p">,</span> <span class="s1">&#39;c&#39;</span><span class="p">,</span> <span class="s1">&#39;d&#39;</span><span class="p">,</span> <span class="s1">&#39;e&#39;</span><span class="p">]</span>
<span class="k">for</span> <span class="n">idx</span><span class="p">,</span> <span class="n">letter1</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">letters</span><span class="p">):</span> <span class="c1"># probably an overly verbose way of finding the change in sentiment over the course of the talk</span>
    <span class="k">try</span><span class="p">:</span>
        <span class="n">letter2</span> <span class="o">=</span> <span class="n">letters</span><span class="p">[</span><span class="n">idx</span> <span class="o">+</span> <span class="mi">1</span><span class="p">]</span>
        <span class="n">col1</span> <span class="o">=</span> <span class="n">letter1</span> <span class="o">+</span> <span class="s1">&#39;-sent&#39;</span>
        <span class="n">col2</span> <span class="o">=</span> <span class="n">letter2</span> <span class="o">+</span> <span class="s1">&#39;-sent&#39;</span>
        <span class="n">label</span> <span class="o">=</span> <span class="s1">&#39;d_sent_&#39;</span> <span class="o">+</span> <span class="n">letter1</span> <span class="o">+</span> <span class="n">letter2</span>
        <span class="n">ts</span><span class="p">[</span><span class="n">label</span><span class="p">]</span> <span class="o">=</span> <span class="n">ts</span><span class="p">[</span><span class="n">col2</span><span class="p">]</span> <span class="o">-</span> <span class="n">ts</span><span class="p">[</span><span class="n">col1</span><span class="p">]</span>
    <span class="k">except</span> <span class="ne">IndexError</span><span class="p">:</span> <span class="c1"># there is no segment after segment &#39;e&#39;, so the code above throws an indexerror. This is a workaround that should probably be improved.</span>
        <span class="k">continue</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[11]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">swarm_data</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">melt</span><span class="p">(</span><span class="n">ts</span><span class="p">,</span> <span class="n">value_name</span><span class="o">=</span><span class="s2">&quot;change in sentiment&quot;</span><span class="p">,</span> <span class="c1"># make the dataframe &#39;tidy&#39; for easier graphing</span>
    <span class="n">value_vars</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;d_sent_ab&#39;</span><span class="p">,</span> <span class="s1">&#39;d_sent_bc&#39;</span><span class="p">,</span> <span class="s1">&#39;d_sent_cd&#39;</span><span class="p">,</span> <span class="s1">&#39;d_sent_de&#39;</span><span class="p">],</span>
    <span class="n">id_vars</span><span class="o">=</span><span class="s1">&#39;views&#39;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>All the data is now prepared, so here's our moment of truth. I'll make a plot that shows the change in sentiment between each section of a talk, for every single talk in the datebase. Maybe we'll see that throughout a talk the <em>change in positivity</em> is decidely greater than zero.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[12]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">sns</span><span class="o">.</span><span class="n">boxplot</span><span class="p">(</span><span class="n">data</span> <span class="o">=</span> <span class="n">swarm_data</span><span class="p">,</span> <span class="n">x</span> <span class="o">=</span> <span class="s1">&#39;variable&#39;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="s1">&#39;change in sentiment&#39;</span><span class="p">)</span>
<span class="n">sns</span><span class="o">.</span><span class="n">stripplot</span><span class="p">(</span><span class="n">data</span> <span class="o">=</span> <span class="n">swarm_data</span><span class="p">,</span> <span class="n">x</span> <span class="o">=</span> <span class="s1">&#39;variable&#39;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="s1">&#39;change in sentiment&#39;</span><span class="p">,</span> <span class="n">jitter</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[12]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&lt;matplotlib.axes._subplots.AxesSubplot at 0x1a1dc932b0&gt;</pre>
</div>

</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>And...Nope!</p>
<p>Here's how to read this graph. "d_sent_ab" on the x-axis shows the change in sentiment from the first fifth of a talk (segment A in my nomenclature) to the second fifth (segment b). While there's a wide range in this data, the medians are consistently around 0. The central tendency points to the idea that the sentiment of TED talks does not change much over the course of the talk. If a talk has a grand and optimisted conclusion, it likely was grand and optimistic throughout.</p>
<p>One noteworthy piece -- the lower outliers. Between the first and second segments, the second and third, and the third and fourth, there is a small crew of talks that become more <em>negative</em> by a significant degree. The positive of these talks is decreasing by .5 or more -- represented by the dots that are below -.5 on the y axis. But between the four and final segment, not a single talk is decreasing by .5 or more in its positivity score. Even the least-optimistic talks tone it down for the conclusion!</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>One last idea. What if we look at the same graph, but only for the top 20 most popular talks of all time?</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[20]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">top_20</span> <span class="o">=</span> <span class="n">ts</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="s1">&#39;views&#39;</span><span class="p">,</span> <span class="n">ascending</span> <span class="o">=</span> <span class="kc">False</span><span class="p">)</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">20</span><span class="p">)</span>

<span class="n">top_swarm_data</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">melt</span><span class="p">(</span><span class="n">top_20</span><span class="p">,</span> <span class="n">value_name</span><span class="o">=</span><span class="s2">&quot;change in sentiment&quot;</span><span class="p">,</span> <span class="c1"># make the dataframe &#39;tidy&#39; for easier graphing</span>
    <span class="n">value_vars</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;d_sent_ab&#39;</span><span class="p">,</span> <span class="s1">&#39;d_sent_bc&#39;</span><span class="p">,</span> <span class="s1">&#39;d_sent_cd&#39;</span><span class="p">,</span> <span class="s1">&#39;d_sent_de&#39;</span><span class="p">],</span>
    <span class="n">id_vars</span><span class="o">=</span><span class="s1">&#39;views&#39;</span><span class="p">)</span>

<span class="n">sns</span><span class="o">.</span><span class="n">stripplot</span><span class="p">(</span><span class="n">data</span> <span class="o">=</span> <span class="n">top_swarm_data</span><span class="p">,</span> <span class="n">x</span> <span class="o">=</span> <span class="s1">&#39;variable&#39;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="s1">&#39;change in sentiment&#39;</span><span class="p">,</span> <span class="n">jitter</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[20]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&lt;matplotlib.axes._subplots.AxesSubplot at 0x1a1db59be0&gt;</pre>
</div>

</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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P3++qqqqmpSUpC5btkxVVVX97LPP1MmTJ9f+RtQRX72faWlpavv27dXt27erqqqqr776qjpr1izVYrGo/fr1Uw8cOKCqqqrOnTtX/c9//lMn96Iu+Or93L17tzps2DD1woULqtVqVe+9915179696p/+9Cd10aJFqqqq6pIlS9SkpKS6uhW15qv3cs+ePeqIESPUoqIi1Ww2q6NHj1bfeecdNTc3Vx07dqyan5+vqqqqpqSkqM8880xd3Y4qyRNFJX766SduuukmjEYj0dHRDBw4sMpr27Vrx8mTJ3nwwQcZOHAgTz75JABbtmzhxIkTvPPOOwDYbDbn42afPn0ICAggJiaGyMhICgsLqxVXixYteOqpp/jyyy85efIku3btonnz5gAEBgYyduxYAMaNG8dbb71V45+/rvnq/QRo1aoVvXr1Asrv2/Tp0zl8+DAJCQl07NgRgKlTp9bo564vvno/t2/fzuDBgwkLCwPKny4uxvv6668DMHbsWGbMmFGjn7s++Oq9/Omnn7jhhhsICQkBYMSIETgcDnbv3s25c+e45557AHA4HERERNT4568uSRSVUBQF9bJtOgyGqm9TVFQUX3/9NZs3b2bDhg3ccsstfP311zgcDv79738TGRkJQFZWFjExMaxZswaTyVTlZ7mzb98+pk6dyn333cfw4cPR6XTO1+p0l4abVFV1G7O3+er9/G0sF++b0WhEUS5t5FJYWIjZbCYxMbHa71uffPV+GgwGl/uWmZlJUFAQgPM9FEVx+beqNV+9l5XFVVZWht1up0ePHnz44YdAedep2Wy+op+5Jnznv5gP6devH9988w1lZWUUFBSwadOmKq9du3Yt06ZNY9CgQcyYMYPg4GDOnTtH3759+fzzzwE4duwYY8aMoaSkpMr30ev12Gw2t3Ft376d3r1784c//IGWLVuyfv167HY7AMXFxaxduxaA//73vyQnJ1/pj11vfPV+Ahw/fpwDBw4Al+5bq1atyM3N5dixY0B5X3FKSsqV/Mj1ylfvZ69evdiwYQNmsxmbzcbUqVPZt28fycnJLF++HIDVq1djsVhq8FPXD1+9l/369WPdunUUFhZisVj47rvvAOjWrRu7du3i5MmTAHzwwQfMmTPnSn/sK+Y7Xzt9yI033sjevXsZPXo0sbGxtGnTpsprBw4cyOrVq/nd736HyWRi7NixtG/fnhkzZjBz5kzGjBkDwJw5c9wOhrZp04bCwkKmTZvGa6+9Vuk1o0aN4tFHH3W+Z5cuXThz5gwA4eHhrFmzhrfffpuEhARmz55d0x+/zvnq/QRo3rw577//PqmpqSQlJTFlyhRMJhOvvfYaTz75JFarlebNm3vll7G6fPV+du7cmbvuuos77rgDh8PBsGHDSE5Opk2bNkybNo2FCxfSpUsXZ3eKL/DVe9mxY0fuvfdeJkyYQHh4uHNiSlxcHK+88gpPPPEEDoeDhIQEt/++64pshSqEEMIteaKohtLSUm6//fZKzz322GMMHTq0zj4rNTWVv/zlL5Wee/nll7nmmmvq7LO0Ivezbsn9rDtyLysnTxRCCCHcksFsIYQQbkmiEEII4ZYkCiHqydtvv83SpUvdXrN48WIeeuihSs/dfffdrFq1qj5CE+KKyGC2EPXk8ccf1zoEIeqEJAohqjB16lQ6d+7MAw88AMDnn3/Ojz/+SHx8PLt378ZsNqOqKi+//DI9e/Zk+vTp5Ofnk5aWxqBBg8jNzaVdu3Y8+OCDfPXVVyxcuBCr1UpBQQGTJk1i4sSJAGRnZ/Pggw+SlZVFkyZNeOmll4iLi3OJ5eeff2bu3LmUlJSg0+l49NFHGTx4sNfvibg6SdeTEFW49dZbWbJkifN4yZIltG/fnqysLBYuXMjKlSu55ZZb+Oijj5zXlJaW8vXXXzNt2jRnm9ls5ssvv2TevHksXbqUN99802WR1MmTJ5k5cyYrVqwgKSmJWbNmucRRUFDA008/zZw5c1iyZAkffPABL7zwAmfPnq3Hn16IS+SJQogq9OnTB4vFwt69ewkKCiIvL4/Jkydz8uRJvvjiC9LS0ti2bZvLSuOePXtWeJ+QkBA+/PBDNmzYwKlTpzh06BDFxcXO88nJybRo0QKACRMmMGHCBJfX79q1i+zsbP785z872xRF4fDhwz5TSl40bJIohKiCoihMmDCBZcuWYTQamTBhAhs2bGDWrFncf//9DB06lNatWzvrGAEEBwdXeJ+MjAxuv/12brvtNnr27MmIESNYt26d87xer3f+f4fDUaEwnd1up02bNnz55ZfOtszMTKKjo+vyxxWiStL1JIQbt9xyC99//z3ffvst48ePZ/PmzQwePJiJEyfSpUsX1qxZ4yzMWJV9+/YRHR3N5MmTuf76651J4uLrtm3b5uxG+uKLLyqUuu7evTunT59m+/btABw8eJDhw4eTmZlZ1z+uEJWSJwoh3IiLi6NTp07YbDYSEhK44447mDp1KmPGjMFms9G/f39Wr16Nw+Go8j369+/PV199xYgRI1AUhd69exMdHc3p06cBSEpK4plnniEnJ4fWrVvz17/+1eX10dHRvPPOO8yZMweLxYKqqsyZM4emTZvW688uxEVSwkMIIYRb0vUkhBDCLUkUQggh3JJEIYQQwi1JFEIIIdySRCGEEMItSRRCCCHckkQhhBDCLUkUQggh3Pr/aQIv9uyigQYAAAAASUVORK5CYII=
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Pretty similar.</p>
<p>Positivity isn't a panacea for a popular talk. Then again, maybe that's obvious. There are many different ways to engage an audience, and one can offer the sweeping conclusion John Oliver speaks of without positivity. [^1]</p>
<p>[1] cf. Fox News</p>

</div>
</div>
</div>
 

