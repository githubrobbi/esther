// Renders projects.json into <section class="cards" data-projects="projects.json">.
// A card: { "name", "tagline", "stack": ["Rust", ...], "repo": url, "live": url, "image": path, "notes": "one paragraph" }
async function renderCards() {
  for (const section of document.querySelectorAll("[data-projects]")) {
    let projects = [];
    try { projects = await (await fetch(section.dataset.projects)).json(); }
    catch (error) { section.textContent = "projects.json could not be loaded: " + error; continue; }
    section.innerHTML = "";
    for (const p of projects) {
      const card = document.createElement("article"); card.className = "card";
      if (p.image) { const img = document.createElement("img"); img.src = p.image; img.alt = p.name; card.appendChild(img); }
      const h = document.createElement("h3"); h.textContent = p.name; card.appendChild(h);
      if (p.tagline) { const t = document.createElement("p"); t.textContent = p.tagline; card.appendChild(t); }
      if (p.notes) { const n = document.createElement("p"); n.className = "muted"; n.textContent = p.notes; card.appendChild(n); }
      if (p.stack && p.stack.length) { const s = document.createElement("div"); s.className = "stack"; s.textContent = p.stack.join(" · "); card.appendChild(s); }
      const links = document.createElement("div"); links.className = "links";
      for (const [label, href] of [["source", p.repo], ["live", p.live], ["more", p.more]]) {
        if (!href) continue; const a = document.createElement("a"); a.href = href; a.textContent = label; a.rel = "noopener"; links.appendChild(a);
      }
      card.appendChild(links); section.appendChild(card);
    }
  }
}
document.addEventListener("DOMContentLoaded", renderCards);
