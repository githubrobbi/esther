# Esther Nio

A static site: `index.html`, `projects.json` (one entry per project card), `assets/`.

## How to publish

1. Edit `projects.json` (add a card: name, tagline, stack, repo, live, image, notes) or `index.html`.
2. Commit and push to `main`. Cloudflare Pages deploys it within a minute; a pull request gets its own preview URL.

No build step, no framework. Images go into `images/` and are referenced by relative path.
