(() => {
  const minWidth = 1100;
  if (window.innerWidth < minWidth) return;

  const footnotes = document.querySelector(".footnotes");
  if (!footnotes) return;

  const items = footnotes.querySelectorAll("ol > li[id]");
  if (!items.length) return;

  // Map footnote id -> HTML content
  const noteMap = new Map();
  for (const li of items) noteMap.set(li.id, li.innerHTML);

  // Find refs like: <sup id="fnref:1"><a href="#fn:1">1</a></sup>
  const refs = document.querySelectorAll('sup[id^="fnref:"] a[href^="#fn:"]');
  if (!refs.length) return;

  const container = document.querySelector("main.content");
  if (!container) return;

  let made = 0;

  for (const a of refs) {
    const sup = a.closest("sup");
    if (!sup) continue;

    const targetId = a.getAttribute("href").slice(1); // "fn:1"
    const html = noteMap.get(targetId);
    if (!html) continue;

    const rect = sup.getBoundingClientRect();
    const top = window.scrollY + rect.top - 4;

    const aside = document.createElement("aside");
    aside.className = "sidenote";
    aside.style.top = `${top}px`;

    // Remove backref link if present
    aside.innerHTML = html.replace(/<a[^>]*href="#fnref:[^"]+"[^>]*>.*?<\/a>/g, "");

    container.appendChild(aside);
    made++;
  }

  if (made) document.body.classList.add("sidenotes-active");
})();