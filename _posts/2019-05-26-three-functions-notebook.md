---
layout: post
title: The Two.5 Most Helpful Functions to Clean Data in Python -- Full Notebook
date: 2019-05-26
category: data

---



```python
import pandas as pd
import numpy as np
import re
```


```python
sb = pd.read_csv('sample.csv')
```


```python
sb.head(3)
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




```python
sb.columns = sb.columns.str.lower()
sb.columns = sb.columns.str.replace(' ', '_')
```


```python
sb = sb.melt(id_vars = ['school_name', 'grade', 'teacher', 'student_id', 'student_name', 'course'], 
             var_name = 'test', value_name='score')
```


```python
sb.head(3)
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
      <th>school_name</th>
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




```python
sb.course = sb.course.replace(to_replace=['(.*)Literature(.*)', '(.*)Science(.*)', 
                                          '(.*)Social(.*)', '(.*)Mathematics(.*)'], 
                                          value=['lit', 'sci', 'hist', 'math'], regex=True)
sb = sb[sb.apply(lambda row: bool(re.findall(row['course'], row['test'])), axis=1)]
sb = sb.drop(columns='test').dropna().rename(columns={'course': 'subject'})
sb.head(3)
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
      <th>school_name</th>
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




```python
sb['level'] = pd.cut(sb.score, [0, 70, 80, 90, np.inf], 
                     labels=['f', 'c', 'b', 'a'], right=False, include_lowest=False)
```


```python
p = sb.pivot_table(index = ['school_name', 'grade', 'subject'],
                       columns = 'level', values='score', aggfunc='count',
                      margins = True, margins_name = 'all').reset_index()
p.fillna(value=0, inplace=True)
p.head(3)
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
      <th>level</th>
      <th>school_name</th>
      <th>grade</th>
      <th>subject</th>
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
      <td>29.0</td>
      <td>27.0</td>
      <td>50.0</td>
      <td>21.0</td>
      <td>127</td>
    </tr>
    <tr>
      <th>1</th>
      <td>school 0</td>
      <td>5</td>
      <td>lit</td>
      <td>3.0</td>
      <td>33.0</td>
      <td>51.0</td>
      <td>40.0</td>
      <td>127</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>math</td>
      <td>12.0</td>
      <td>21.0</td>
      <td>52.0</td>
      <td>42.0</td>
      <td>127</td>
    </tr>
  </tbody>
</table>
</div>




```python
for level in ['f','c','b','a']:
    p['%' + level] = p[level]/p['all']
```


```python
p['cr'] = p['%a'] + p['%b']
```


```python
p['pr'] = p['%c'] + p['%b'] + p['%a']
```


```python
p['cr_rank'] = p.groupby(['grade', 'subject'])['cr'].rank(ascending=False, method='dense')
p['pr_rank'] = p.groupby(['grade', 'subject'])['pr'].rank(ascending=False, method='dense')
```


```python
p
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
      <th>level</th>
      <th>school_name</th>
      <th>grade</th>
      <th>subject</th>
      <th>f</th>
      <th>c</th>
      <th>b</th>
      <th>a</th>
      <th>all</th>
      <th>%f</th>
      <th>%c</th>
      <th>%b</th>
      <th>%a</th>
      <th>cr</th>
      <th>pr</th>
      <th>cr_rank</th>
      <th>pr_rank</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>school 0</td>
      <td>5</td>
      <td>hist</td>
      <td>29.0</td>
      <td>27.0</td>
      <td>50.0</td>
      <td>21.0</td>
      <td>127</td>
      <td>0.228346</td>
      <td>0.212598</td>
      <td>0.393701</td>
      <td>0.165354</td>
      <td>0.559055</td>
      <td>0.771654</td>
      <td>3.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>school 0</td>
      <td>5</td>
      <td>lit</td>
      <td>3.0</td>
      <td>33.0</td>
      <td>51.0</td>
      <td>40.0</td>
      <td>127</td>
      <td>0.023622</td>
      <td>0.259843</td>
      <td>0.401575</td>
      <td>0.314961</td>
      <td>0.716535</td>
      <td>0.976378</td>
      <td>11.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>school 0</td>
      <td>5</td>
      <td>math</td>
      <td>12.0</td>
      <td>21.0</td>
      <td>52.0</td>
      <td>42.0</td>
      <td>127</td>
      <td>0.094488</td>
      <td>0.165354</td>
      <td>0.409449</td>
      <td>0.330709</td>
      <td>0.740157</td>
      <td>0.905512</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>school 0</td>
      <td>5</td>
      <td>sci</td>
      <td>38.0</td>
      <td>57.0</td>
      <td>26.0</td>
      <td>6.0</td>
      <td>127</td>
      <td>0.299213</td>
      <td>0.448819</td>
      <td>0.204724</td>
      <td>0.047244</td>
      <td>0.251969</td>
      <td>0.700787</td>
      <td>8.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>school 0</td>
      <td>6</td>
      <td>hist</td>
      <td>6.0</td>
      <td>30.0</td>
      <td>49.0</td>
      <td>14.0</td>
      <td>99</td>
      <td>0.060606</td>
      <td>0.303030</td>
      <td>0.494949</td>
      <td>0.141414</td>
      <td>0.636364</td>
      <td>0.939394</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>school 0</td>
      <td>6</td>
      <td>lit</td>
      <td>0.0</td>
      <td>14.0</td>
      <td>50.0</td>
      <td>35.0</td>
      <td>99</td>
      <td>0.000000</td>
      <td>0.141414</td>
      <td>0.505051</td>
      <td>0.353535</td>
      <td>0.858586</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>school 0</td>
      <td>6</td>
      <td>math</td>
      <td>31.0</td>
      <td>27.0</td>
      <td>30.0</td>
      <td>11.0</td>
      <td>99</td>
      <td>0.313131</td>
      <td>0.272727</td>
      <td>0.303030</td>
      <td>0.111111</td>
      <td>0.414141</td>
      <td>0.686869</td>
      <td>5.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>school 0</td>
      <td>6</td>
      <td>sci</td>
      <td>1.0</td>
      <td>18.0</td>
      <td>39.0</td>
      <td>41.0</td>
      <td>99</td>
      <td>0.010101</td>
      <td>0.181818</td>
      <td>0.393939</td>
      <td>0.414141</td>
      <td>0.808081</td>
      <td>0.989899</td>
      <td>1.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>school 0</td>
      <td>7</td>
      <td>hist</td>
      <td>12.0</td>
      <td>50.0</td>
      <td>49.0</td>
      <td>20.0</td>
      <td>131</td>
      <td>0.091603</td>
      <td>0.381679</td>
      <td>0.374046</td>
      <td>0.152672</td>
      <td>0.526718</td>
      <td>0.908397</td>
      <td>4.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>school 0</td>
      <td>7</td>
      <td>lit</td>
      <td>0.0</td>
      <td>18.0</td>
      <td>69.0</td>
      <td>44.0</td>
      <td>131</td>
      <td>0.000000</td>
      <td>0.137405</td>
      <td>0.526718</td>
      <td>0.335878</td>
      <td>0.862595</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>10</th>
      <td>school 0</td>
      <td>7</td>
      <td>math</td>
      <td>32.0</td>
      <td>19.0</td>
      <td>49.0</td>
      <td>31.0</td>
      <td>131</td>
      <td>0.244275</td>
      <td>0.145038</td>
      <td>0.374046</td>
      <td>0.236641</td>
      <td>0.610687</td>
      <td>0.755725</td>
      <td>1.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>11</th>
      <td>school 0</td>
      <td>7</td>
      <td>sci</td>
      <td>2.0</td>
      <td>28.0</td>
      <td>47.0</td>
      <td>54.0</td>
      <td>131</td>
      <td>0.015267</td>
      <td>0.213740</td>
      <td>0.358779</td>
      <td>0.412214</td>
      <td>0.770992</td>
      <td>0.984733</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>12</th>
      <td>school 0</td>
      <td>8</td>
      <td>lit</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>52.0</td>
      <td>54.0</td>
      <td>111</td>
      <td>0.009009</td>
      <td>0.036036</td>
      <td>0.468468</td>
      <td>0.486486</td>
      <td>0.954955</td>
      <td>0.990991</td>
      <td>3.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>13</th>
      <td>school 0</td>
      <td>8</td>
      <td>sci</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>57.0</td>
      <td>55.0</td>
      <td>112</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.508929</td>
      <td>0.491071</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>14</th>
      <td>school 1</td>
      <td>5</td>
      <td>hist</td>
      <td>18.0</td>
      <td>41.0</td>
      <td>53.0</td>
      <td>26.0</td>
      <td>138</td>
      <td>0.130435</td>
      <td>0.297101</td>
      <td>0.384058</td>
      <td>0.188406</td>
      <td>0.572464</td>
      <td>0.869565</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>15</th>
      <td>school 1</td>
      <td>5</td>
      <td>lit</td>
      <td>3.0</td>
      <td>23.0</td>
      <td>51.0</td>
      <td>62.0</td>
      <td>139</td>
      <td>0.021583</td>
      <td>0.165468</td>
      <td>0.366906</td>
      <td>0.446043</td>
      <td>0.812950</td>
      <td>0.978417</td>
      <td>3.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>16</th>
      <td>school 1</td>
      <td>5</td>
      <td>math</td>
      <td>52.0</td>
      <td>30.0</td>
      <td>39.0</td>
      <td>17.0</td>
      <td>138</td>
      <td>0.376812</td>
      <td>0.217391</td>
      <td>0.282609</td>
      <td>0.123188</td>
      <td>0.405797</td>
      <td>0.623188</td>
      <td>6.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>17</th>
      <td>school 1</td>
      <td>5</td>
      <td>sci</td>
      <td>15.0</td>
      <td>44.0</td>
      <td>51.0</td>
      <td>29.0</td>
      <td>139</td>
      <td>0.107914</td>
      <td>0.316547</td>
      <td>0.366906</td>
      <td>0.208633</td>
      <td>0.575540</td>
      <td>0.892086</td>
      <td>1.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>18</th>
      <td>school 1</td>
      <td>6</td>
      <td>hist</td>
      <td>42.0</td>
      <td>30.0</td>
      <td>16.0</td>
      <td>2.0</td>
      <td>90</td>
      <td>0.466667</td>
      <td>0.333333</td>
      <td>0.177778</td>
      <td>0.022222</td>
      <td>0.200000</td>
      <td>0.533333</td>
      <td>10.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>19</th>
      <td>school 1</td>
      <td>6</td>
      <td>lit</td>
      <td>1.0</td>
      <td>17.0</td>
      <td>42.0</td>
      <td>28.0</td>
      <td>88</td>
      <td>0.011364</td>
      <td>0.193182</td>
      <td>0.477273</td>
      <td>0.318182</td>
      <td>0.795455</td>
      <td>0.988636</td>
      <td>9.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>20</th>
      <td>school 1</td>
      <td>6</td>
      <td>math</td>
      <td>44.0</td>
      <td>17.0</td>
      <td>16.0</td>
      <td>13.0</td>
      <td>90</td>
      <td>0.488889</td>
      <td>0.188889</td>
      <td>0.177778</td>
      <td>0.144444</td>
      <td>0.322222</td>
      <td>0.511111</td>
      <td>7.0</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>21</th>
      <td>school 1</td>
      <td>6</td>
      <td>sci</td>
      <td>9.0</td>
      <td>24.0</td>
      <td>27.0</td>
      <td>30.0</td>
      <td>90</td>
      <td>0.100000</td>
      <td>0.266667</td>
      <td>0.300000</td>
      <td>0.333333</td>
      <td>0.633333</td>
      <td>0.900000</td>
      <td>10.0</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>22</th>
      <td>school 1</td>
      <td>7</td>
      <td>hist</td>
      <td>7.0</td>
      <td>20.0</td>
      <td>17.0</td>
      <td>12.0</td>
      <td>56</td>
      <td>0.125000</td>
      <td>0.357143</td>
      <td>0.303571</td>
      <td>0.214286</td>
      <td>0.517857</td>
      <td>0.875000</td>
      <td>5.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>23</th>
      <td>school 1</td>
      <td>7</td>
      <td>lit</td>
      <td>1.0</td>
      <td>11.0</td>
      <td>20.0</td>
      <td>24.0</td>
      <td>56</td>
      <td>0.017857</td>
      <td>0.196429</td>
      <td>0.357143</td>
      <td>0.428571</td>
      <td>0.785714</td>
      <td>0.982143</td>
      <td>5.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>24</th>
      <td>school 1</td>
      <td>7</td>
      <td>math</td>
      <td>17.0</td>
      <td>15.0</td>
      <td>11.0</td>
      <td>13.0</td>
      <td>56</td>
      <td>0.303571</td>
      <td>0.267857</td>
      <td>0.196429</td>
      <td>0.232143</td>
      <td>0.428571</td>
      <td>0.696429</td>
      <td>6.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>25</th>
      <td>school 1</td>
      <td>7</td>
      <td>sci</td>
      <td>2.0</td>
      <td>18.0</td>
      <td>14.0</td>
      <td>22.0</td>
      <td>56</td>
      <td>0.035714</td>
      <td>0.321429</td>
      <td>0.250000</td>
      <td>0.392857</td>
      <td>0.642857</td>
      <td>0.964286</td>
      <td>6.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>26</th>
      <td>school 1</td>
      <td>8</td>
      <td>lit</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>9.0</td>
      <td>16.0</td>
      <td>26</td>
      <td>0.000000</td>
      <td>0.038462</td>
      <td>0.346154</td>
      <td>0.615385</td>
      <td>0.961538</td>
      <td>1.000000</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>27</th>
      <td>school 1</td>
      <td>8</td>
      <td>sci</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>5.0</td>
      <td>21.0</td>
      <td>26</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.192308</td>
      <td>0.807692</td>
      <td>1.000000</td>
      <td>1.000000</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>28</th>
      <td>school 11</td>
      <td>5</td>
      <td>hist</td>
      <td>63.0</td>
      <td>43.0</td>
      <td>15.0</td>
      <td>3.0</td>
      <td>124</td>
      <td>0.508065</td>
      <td>0.346774</td>
      <td>0.120968</td>
      <td>0.024194</td>
      <td>0.145161</td>
      <td>0.491935</td>
      <td>14.0</td>
      <td>14.0</td>
    </tr>
    <tr>
      <th>29</th>
      <td>school 11</td>
      <td>5</td>
      <td>lit</td>
      <td>5.0</td>
      <td>37.0</td>
      <td>57.0</td>
      <td>24.0</td>
      <td>123</td>
      <td>0.040650</td>
      <td>0.300813</td>
      <td>0.463415</td>
      <td>0.195122</td>
      <td>0.658537</td>
      <td>0.959350</td>
      <td>15.0</td>
      <td>13.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>129</th>
      <td>school 7</td>
      <td>5</td>
      <td>sci</td>
      <td>29.0</td>
      <td>59.0</td>
      <td>19.0</td>
      <td>5.0</td>
      <td>112</td>
      <td>0.258929</td>
      <td>0.526786</td>
      <td>0.169643</td>
      <td>0.044643</td>
      <td>0.214286</td>
      <td>0.741071</td>
      <td>11.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>130</th>
      <td>school 7</td>
      <td>6</td>
      <td>hist</td>
      <td>9.0</td>
      <td>38.0</td>
      <td>30.0</td>
      <td>5.0</td>
      <td>82</td>
      <td>0.109756</td>
      <td>0.463415</td>
      <td>0.365854</td>
      <td>0.060976</td>
      <td>0.426829</td>
      <td>0.890244</td>
      <td>7.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>131</th>
      <td>school 7</td>
      <td>6</td>
      <td>lit</td>
      <td>0.0</td>
      <td>12.0</td>
      <td>37.0</td>
      <td>33.0</td>
      <td>82</td>
      <td>0.000000</td>
      <td>0.146341</td>
      <td>0.451220</td>
      <td>0.402439</td>
      <td>0.853659</td>
      <td>1.000000</td>
      <td>6.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>132</th>
      <td>school 7</td>
      <td>6</td>
      <td>math</td>
      <td>16.0</td>
      <td>29.0</td>
      <td>26.0</td>
      <td>11.0</td>
      <td>82</td>
      <td>0.195122</td>
      <td>0.353659</td>
      <td>0.317073</td>
      <td>0.134146</td>
      <td>0.451220</td>
      <td>0.804878</td>
      <td>4.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>133</th>
      <td>school 7</td>
      <td>6</td>
      <td>sci</td>
      <td>0.0</td>
      <td>23.0</td>
      <td>40.0</td>
      <td>19.0</td>
      <td>82</td>
      <td>0.000000</td>
      <td>0.280488</td>
      <td>0.487805</td>
      <td>0.231707</td>
      <td>0.719512</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>134</th>
      <td>school 8</td>
      <td>5</td>
      <td>hist</td>
      <td>22.0</td>
      <td>28.0</td>
      <td>31.0</td>
      <td>32.0</td>
      <td>113</td>
      <td>0.194690</td>
      <td>0.247788</td>
      <td>0.274336</td>
      <td>0.283186</td>
      <td>0.557522</td>
      <td>0.805310</td>
      <td>4.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>135</th>
      <td>school 8</td>
      <td>5</td>
      <td>lit</td>
      <td>0.0</td>
      <td>19.0</td>
      <td>43.0</td>
      <td>50.0</td>
      <td>112</td>
      <td>0.000000</td>
      <td>0.169643</td>
      <td>0.383929</td>
      <td>0.446429</td>
      <td>0.830357</td>
      <td>1.000000</td>
      <td>2.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>136</th>
      <td>school 8</td>
      <td>5</td>
      <td>math</td>
      <td>36.0</td>
      <td>28.0</td>
      <td>33.0</td>
      <td>18.0</td>
      <td>115</td>
      <td>0.313043</td>
      <td>0.243478</td>
      <td>0.286957</td>
      <td>0.156522</td>
      <td>0.443478</td>
      <td>0.686957</td>
      <td>4.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>137</th>
      <td>school 8</td>
      <td>5</td>
      <td>sci</td>
      <td>34.0</td>
      <td>48.0</td>
      <td>19.0</td>
      <td>14.0</td>
      <td>115</td>
      <td>0.295652</td>
      <td>0.417391</td>
      <td>0.165217</td>
      <td>0.121739</td>
      <td>0.286957</td>
      <td>0.704348</td>
      <td>7.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>138</th>
      <td>school 8</td>
      <td>6</td>
      <td>hist</td>
      <td>17.0</td>
      <td>39.0</td>
      <td>28.0</td>
      <td>14.0</td>
      <td>98</td>
      <td>0.173469</td>
      <td>0.397959</td>
      <td>0.285714</td>
      <td>0.142857</td>
      <td>0.428571</td>
      <td>0.826531</td>
      <td>6.0</td>
      <td>7.0</td>
    </tr>
    <tr>
      <th>139</th>
      <td>school 8</td>
      <td>6</td>
      <td>lit</td>
      <td>1.0</td>
      <td>7.0</td>
      <td>40.0</td>
      <td>50.0</td>
      <td>98</td>
      <td>0.010204</td>
      <td>0.071429</td>
      <td>0.408163</td>
      <td>0.510204</td>
      <td>0.918367</td>
      <td>0.989796</td>
      <td>1.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>140</th>
      <td>school 8</td>
      <td>6</td>
      <td>math</td>
      <td>47.0</td>
      <td>22.0</td>
      <td>15.0</td>
      <td>14.0</td>
      <td>98</td>
      <td>0.479592</td>
      <td>0.224490</td>
      <td>0.153061</td>
      <td>0.142857</td>
      <td>0.295918</td>
      <td>0.520408</td>
      <td>8.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>141</th>
      <td>school 8</td>
      <td>6</td>
      <td>sci</td>
      <td>6.0</td>
      <td>14.0</td>
      <td>34.0</td>
      <td>43.0</td>
      <td>97</td>
      <td>0.061856</td>
      <td>0.144330</td>
      <td>0.350515</td>
      <td>0.443299</td>
      <td>0.793814</td>
      <td>0.938144</td>
      <td>2.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>142</th>
      <td>school 8</td>
      <td>7</td>
      <td>hist</td>
      <td>7.0</td>
      <td>10.0</td>
      <td>12.0</td>
      <td>8.0</td>
      <td>37</td>
      <td>0.189189</td>
      <td>0.270270</td>
      <td>0.324324</td>
      <td>0.216216</td>
      <td>0.540541</td>
      <td>0.810811</td>
      <td>3.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>143</th>
      <td>school 8</td>
      <td>7</td>
      <td>lit</td>
      <td>0.0</td>
      <td>8.0</td>
      <td>20.0</td>
      <td>9.0</td>
      <td>37</td>
      <td>0.000000</td>
      <td>0.216216</td>
      <td>0.540541</td>
      <td>0.243243</td>
      <td>0.783784</td>
      <td>1.000000</td>
      <td>6.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>144</th>
      <td>school 8</td>
      <td>7</td>
      <td>math</td>
      <td>4.0</td>
      <td>13.0</td>
      <td>14.0</td>
      <td>6.0</td>
      <td>37</td>
      <td>0.108108</td>
      <td>0.351351</td>
      <td>0.378378</td>
      <td>0.162162</td>
      <td>0.540541</td>
      <td>0.891892</td>
      <td>3.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>145</th>
      <td>school 8</td>
      <td>7</td>
      <td>sci</td>
      <td>3.0</td>
      <td>6.0</td>
      <td>16.0</td>
      <td>12.0</td>
      <td>37</td>
      <td>0.081081</td>
      <td>0.162162</td>
      <td>0.432432</td>
      <td>0.324324</td>
      <td>0.756757</td>
      <td>0.918919</td>
      <td>2.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>146</th>
      <td>school 9</td>
      <td>5</td>
      <td>hist</td>
      <td>41.0</td>
      <td>25.0</td>
      <td>19.0</td>
      <td>3.0</td>
      <td>88</td>
      <td>0.465909</td>
      <td>0.284091</td>
      <td>0.215909</td>
      <td>0.034091</td>
      <td>0.250000</td>
      <td>0.534091</td>
      <td>12.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>147</th>
      <td>school 9</td>
      <td>5</td>
      <td>lit</td>
      <td>3.0</td>
      <td>20.0</td>
      <td>45.0</td>
      <td>24.0</td>
      <td>92</td>
      <td>0.032609</td>
      <td>0.217391</td>
      <td>0.489130</td>
      <td>0.260870</td>
      <td>0.750000</td>
      <td>0.967391</td>
      <td>9.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>148</th>
      <td>school 9</td>
      <td>5</td>
      <td>math</td>
      <td>55.0</td>
      <td>18.0</td>
      <td>14.0</td>
      <td>4.0</td>
      <td>91</td>
      <td>0.604396</td>
      <td>0.197802</td>
      <td>0.153846</td>
      <td>0.043956</td>
      <td>0.197802</td>
      <td>0.395604</td>
      <td>10.0</td>
      <td>11.0</td>
    </tr>
    <tr>
      <th>149</th>
      <td>school 9</td>
      <td>5</td>
      <td>sci</td>
      <td>35.0</td>
      <td>45.0</td>
      <td>10.0</td>
      <td>2.0</td>
      <td>92</td>
      <td>0.380435</td>
      <td>0.489130</td>
      <td>0.108696</td>
      <td>0.021739</td>
      <td>0.130435</td>
      <td>0.619565</td>
      <td>13.0</td>
      <td>12.0</td>
    </tr>
    <tr>
      <th>150</th>
      <td>school 9</td>
      <td>6</td>
      <td>hist</td>
      <td>9.0</td>
      <td>24.0</td>
      <td>29.0</td>
      <td>9.0</td>
      <td>71</td>
      <td>0.126761</td>
      <td>0.338028</td>
      <td>0.408451</td>
      <td>0.126761</td>
      <td>0.535211</td>
      <td>0.873239</td>
      <td>3.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>151</th>
      <td>school 9</td>
      <td>6</td>
      <td>lit</td>
      <td>4.0</td>
      <td>9.0</td>
      <td>28.0</td>
      <td>31.0</td>
      <td>72</td>
      <td>0.055556</td>
      <td>0.125000</td>
      <td>0.388889</td>
      <td>0.430556</td>
      <td>0.819444</td>
      <td>0.944444</td>
      <td>8.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>152</th>
      <td>school 9</td>
      <td>6</td>
      <td>math</td>
      <td>22.0</td>
      <td>23.0</td>
      <td>20.0</td>
      <td>7.0</td>
      <td>72</td>
      <td>0.305556</td>
      <td>0.319444</td>
      <td>0.277778</td>
      <td>0.097222</td>
      <td>0.375000</td>
      <td>0.694444</td>
      <td>6.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>153</th>
      <td>school 9</td>
      <td>6</td>
      <td>sci</td>
      <td>8.0</td>
      <td>17.0</td>
      <td>21.0</td>
      <td>25.0</td>
      <td>71</td>
      <td>0.112676</td>
      <td>0.239437</td>
      <td>0.295775</td>
      <td>0.352113</td>
      <td>0.647887</td>
      <td>0.887324</td>
      <td>9.0</td>
      <td>10.0</td>
    </tr>
    <tr>
      <th>154</th>
      <td>school 9</td>
      <td>7</td>
      <td>hist</td>
      <td>1.0</td>
      <td>7.0</td>
      <td>5.0</td>
      <td>6.0</td>
      <td>19</td>
      <td>0.052632</td>
      <td>0.368421</td>
      <td>0.263158</td>
      <td>0.315789</td>
      <td>0.578947</td>
      <td>0.947368</td>
      <td>2.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>155</th>
      <td>school 9</td>
      <td>7</td>
      <td>lit</td>
      <td>0.0</td>
      <td>6.0</td>
      <td>9.0</td>
      <td>4.0</td>
      <td>19</td>
      <td>0.000000</td>
      <td>0.315789</td>
      <td>0.473684</td>
      <td>0.210526</td>
      <td>0.684211</td>
      <td>1.000000</td>
      <td>8.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>156</th>
      <td>school 9</td>
      <td>7</td>
      <td>math</td>
      <td>6.0</td>
      <td>8.0</td>
      <td>0.0</td>
      <td>4.0</td>
      <td>18</td>
      <td>0.333333</td>
      <td>0.444444</td>
      <td>0.000000</td>
      <td>0.222222</td>
      <td>0.222222</td>
      <td>0.666667</td>
      <td>8.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th>157</th>
      <td>school 9</td>
      <td>7</td>
      <td>sci</td>
      <td>3.0</td>
      <td>2.0</td>
      <td>6.0</td>
      <td>8.0</td>
      <td>19</td>
      <td>0.157895</td>
      <td>0.105263</td>
      <td>0.315789</td>
      <td>0.421053</td>
      <td>0.736842</td>
      <td>0.842105</td>
      <td>3.0</td>
      <td>8.0</td>
    </tr>
    <tr>
      <th>158</th>
      <td>all</td>
      <td></td>
      <td></td>
      <td>4219.0</td>
      <td>2625.0</td>
      <td>2640.0</td>
      <td>3414.0</td>
      <td>12898</td>
      <td>0.327105</td>
      <td>0.203520</td>
      <td>0.204683</td>
      <td>0.264692</td>
      <td>0.469375</td>
      <td>0.672895</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
<p>159 rows × 16 columns</p>
</div>


