# Napaa Gifting — Standalone Website

This folder is the standalone version of the Napaa Gifting website. It contains only HTML, CSS, JavaScript, and local image assets. It does not require React, Vite, Node.js, npm packages, a database, or a server-side API.

## Pages

- `index.html` — main Napaa Gifting homepage
- `collections.html` — collection catalogue and filters

## Run locally

The pages can be opened directly in a browser by double-clicking `index.html`. For the most reliable local experience, serve this folder with any static web server. Python is usually already available:

```bash
cd napaa-gifting-standalone
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. The Collections page is available at <http://localhost:8000/collections.html>.

## Included interactions

The JavaScript files keep the existing navigation, enquiry dialog, mailto brief flow, responsive mobile menus, catalogue filtering, corporate and occasion background selectors, and the What We Do physical card flip. The card reverse face reveals the collage-only artwork and resets after ten seconds, outside interaction, or Escape.

The enquiry form opens the visitor's email application; this standalone export does not send form submissions to a backend.

The editorial typeface is loaded from Google Fonts when internet access is available. If it is unavailable, the CSS fallback fonts keep the layout usable.
