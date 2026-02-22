---
layout: none
---

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{ site.title }}</title>
  <meta name="description" content="A simple repository of links, PDFs, videos, and notes." />
  <link rel="stylesheet" href="/assets/style.css" />
</head>
<body>
  <header class="site-header">
    <h1 class="site-title">{{ site.title }}</h1>
    <p class="site-subtitle">Links, PDFs, videos, and notes.</p>
  </header>

  <main class="content">
    {% for section in site.data.library.sections %}
      <section class="section">
        <h2>{{ section.title }}</h2>

        {% assign vids = section.items | where: "type", "youtube" %}
        {% assign nonvids = section.items | where_exp: "i", "i.type != 'youtube'" %}

        {% if nonvids.size > 0 %}
        <ul class="list">
          {% for item in nonvids %}
            <li class="list-item">
              {% if item.type == "pdf" %}
                <span class="tag">PDF</span>
                <a href="{{ item.url }}">{{ item.title }}</a>
              {% elsif item.type == "md" %}
                <span class="tag">NOTE</span>
                <a href="{{ item.url }}">{{ item.title }}</a>
              {% else %}
                <span class="tag">LINK</span>
                <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
              {% endif %}

              {% if item.note %}
                <span class="note">— {{ item.note }}</span>
              {% endif %}
            </li>
          {% endfor %}
        </ul>
        {% endif %}

        {% if vids.size > 0 %}
        <div class="video-grid" aria-label="Videos">
          {% for v in vids %}
          <figure class="video">
            <div class="video-frame">
              <iframe
                src="https://www.youtube.com/embed/{{ v.id }}"
                title="{{ v.title }}"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
            </div>
            <figcaption>{{ v.title }}</figcaption>
          </figure>
          {% endfor %}
        </div>
        {% endif %}
      </section>
    {% endfor %}
  </main>

  <footer class="site-footer">
    <p>Updated: {{ "now" | date: "%Y-%m-%d" }}</p>
  </footer>
</body>
</html>