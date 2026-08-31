# Your personal site

Plain HTML/CSS/JS. No build step, no framework — edit the files directly and
it works.

## Structure

```
index.html      Home page
cv.html         CV / résumé
projects.html   Projects list
links.html      Contact / social links
blog.html       Blog — list view and single-post view
blog.js         Renders blog.html from posts.json
posts.json      Your blog posts — edit this to add new writing
styles.css      All styling (shared across every page)
```

## Editing content

- **Name, tagline, bio:** replace the placeholder text in `index.html`.
- **CV:** edit the entries directly in `cv.html`. Each role/degree is a
  `.entry` block — copy one to add another.
- **Projects:** same pattern in `projects.html`.
- **Links:** edit the `<a>` tags in `links.html`.
- **Blog posts:** add a new object to the array in `posts.json`:

```json
{
  "slug": "a-unique-url-safe-id",
  "title": "Post title",
  "date": "2026-09-01",
  "tags": ["notes"],
  "excerpt": "One sentence shown in the list view.",
  "content": "<p>Full post body as HTML. Use <p> tags for paragraphs.</p>"
}
```

Newest post should go first, or don't worry about order — the page sorts by
`date` automatically. `slug` becomes the URL (`blog.html#/post/your-slug`), so
keep it short, lowercase, and unique.

## Previewing locally

Opening `blog.html` directly as a file (`file://...`) will fail to load
`posts.json` in some browsers due to local file restrictions. Run a tiny local
server from inside the folder instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Every other page works
fine even without a server.

## Deploying

Any static host works. Two easy free options:

- **Netlify** (netlify.com) — drag the whole folder onto their dashboard, or
  connect a GitHub repo for auto-deploys on every push.
- **GitHub Pages** — push this folder to a GitHub repo, enable Pages in the
  repo settings, pick the branch, done.
- **Vercel** (vercel.com) — similar to Netlify, connect a repo or drag-and-drop.

## Connecting your domain

1. Buy the domain (Porkbun, Namecheap, or Cloudflare Registrar are all solid).
2. In your host's dashboard (Netlify/Vercel/GitHub Pages), add your domain
   under "custom domains."
3. The host will give you either an A record + IP, or a CNAME target. Add
   that record in your domain registrar's DNS settings.
4. DNS changes can take anywhere from a few minutes to ~24 hours to propagate.
