(function () {
  const root = document.getElementById("blog-root");
  let posts = [];
  let activeTag = null;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function allTags() {
    const set = new Set();
    posts.forEach(p => (p.tags || []).forEach(t => set.add(t)));
    return Array.from(set).sort();
  }

  function renderList() {
    const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
    const visible = activeTag ? sorted.filter(p => (p.tags || []).includes(activeTag)) : sorted;

    const tags = allTags();
    const filtersHtml = tags.length
      ? `<div class="blog-filters">
          <button data-tag="" class="${activeTag ? "" : "active"}">all</button>
          ${tags.map(t => `<button data-tag="${escapeHtml(t)}" class="${t === activeTag ? "active" : ""}">${escapeHtml(t)}</button>`).join("")}
        </div>`
      : "";

    const listHtml = visible.length
      ? visible.map(p => `
          <article class="post-list-item">
            <a href="#/post/${encodeURIComponent(p.slug)}">
              <h3>${escapeHtml(p.title)}</h3>
              <span class="mono">${formatDate(p.date)}${p.tags && p.tags.length ? " · " + p.tags.map(escapeHtml).join(", ") : ""}</span>
              <p>${escapeHtml(p.excerpt || "")}</p>
            </a>
          </article>
        `).join("")
      : `<p class="empty-state">No posts with this tag yet.</p>`;

    root.innerHTML = `
      <h1>Writing</h1>
      <p class="section-intro">Notes and longer pieces, roughly in the order I wrote them.</p>
      ${filtersHtml}
      <div class="post-list">${listHtml}</div>
    `;

    root.querySelectorAll(".blog-filters button").forEach(btn => {
      btn.addEventListener("click", () => {
        activeTag = btn.dataset.tag || null;
        renderList();
      });
    });
  }

  function renderPost(slug) {
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      root.innerHTML = `
        <a class="back-link" href="#/">← Back to writing</a>
        <p class="empty-state">That post doesn't exist, or its slug changed.</p>
      `;
      return;
    }
    root.innerHTML = `
      <article class="post-detail">
        <a class="back-link" href="#/">← Back to writing</a>
        <h1>${escapeHtml(post.title)}</h1>
        <span class="mono">${formatDate(post.date)}${post.tags && post.tags.length ? " · " + post.tags.map(escapeHtml).join(", ") : ""}</span>
        <div class="post-content">${post.content || ""}</div>
      </article>
    `;
  }

  function route() {
    const hash = window.location.hash || "#/";
    const match = hash.match(/^#\/post\/(.+)$/);
    if (match) {
      renderPost(decodeURIComponent(match[1]));
    } else {
      renderList();
    }
  }

  fetch("posts.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load posts.json");
      return res.json();
    })
    .then(data => {
      posts = data;
      window.addEventListener("hashchange", route);
      route();
    })
    .catch(err => {
      root.innerHTML = `
        <h1>Writing</h1>
        <p class="empty-state">Couldn't load posts.json (${escapeHtml(err.message)}). If you're opening this file
        directly from disk, run a local server instead — see the README.</p>
      `;
    });
})();
