# Portfolio Website

A multi-page personal portfolio for a product designer, built as a fully static website using semantic HTML5, modern CSS and JavaScript — no frameworks, no build step.

## Overview

The site presents the designer's work, background and contact details across five pages, with shared navigation, a responsive layout and lightweight interactivity such as filtering, search, an FAQ accordion and a validated contact form.

## Pages

| Page | Purpose |
| --- | --- |
| Home | Hero, key statistics, featured work, services and testimonials |
| Projects | Project grid with category filters and live text search |
| About | Biography, experience timeline, awards and FAQ |
| Contact | Contact details and a validated message form |
| 404 | Friendly fallback for unknown URLs |

## Features

- Responsive layout from mobile to desktop using CSS Grid and Flexbox
- Sticky navigation with active-link indication and a mobile menu
- Live category filter and full-text search on the Projects page
- Single-open FAQ accordion with smooth height transitions
- Scroll-reveal animations powered by `IntersectionObserver`
- Floating back-to-top button and smooth scrolling
- Client-side form validation using native HTML constraints
- Accessible markup with semantic landmarks, labels and ARIA attributes

## Tech stack

- **HTML5** — semantic structure (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** — custom properties (design tokens), Grid, Flexbox, fluid typography with `clamp()`
- **JavaScript (ES6+)** — modular IIFEs, no globals, no dependencies
- **Google Fonts** — Inter typeface
- **Unsplash** — placeholder imagery served via CDN

## Project structure

```
.
├── index.html         # Home
├── projects.html      # Projects listing with filter & search
├── about.html         # About, experience, FAQ
├── contact.html       # Contact details and form
├── 404.html           # Not Found page
├── css/
│   └── style.css      # Design tokens, components, responsive rules
└── js/
    ├── main.js        # Shared: navigation, scroll reveal, back-to-top
    ├── projects.js    # Projects grid: data, rendering, filters, search
    ├── about.js       # FAQ accordion behaviour
    └── contact.js     # Contact form submission and validation
```

## Code conventions

- BEM-style CSS class names (`block__element--modifier`)
- One IIFE per JavaScript module; no globals leak to `window`
- Design tokens defined as CSS custom properties on `:root`
- Mobile-first responsive breakpoints at 640 / 768 / 1024 px

## Running the site

The site is fully static — open `index.html` in any modern browser, or serve the folder with any static file server.
