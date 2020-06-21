---
layout: default
title: Photos
---
# Photos

 Fun fact: when I was in 7th grade I wanted to be a photojournalist. I spent late nights in high school processing film in the bathroom of my dad's house. I don't want to be a photojournalist anymore, but I still enjoy cameras. A few of my more recent photos:

<div class="image-gallery">
  {% comment %}
    Get all "photo_set" pages and display a list with links to them.
  {% endcomment %}
  {% assign photo_pages = site.pages | where: "layout", "photo_set" %}
  {% for photo_page in photo_pages %}
        <a href="{{ photo_page.url | prepend: site.baseurl }}" title="{{ photo_page.title }}">
            <h2>{{ photo_page.title}}</h2>
            <img src="{{ site.baseurl }}/assets/photos/{{ photo_page.photos.set }}-{{ 1 }}.jpg" alt="Photo {{ 1 }} from {{ page.photos.set | capitalize }}">
        </a>
  {% endfor %}
</div>

