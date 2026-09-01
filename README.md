# Alexander Rubin — Portfolio

A 5-page site: `index.html` (About/home), `work.html`, `projects.html`,
`resume.html`, `contact.html` — all sharing `styles.css` and `script.js`.
No build tools, no frameworks — open any `.html` file directly in a browser.

## Why separate files instead of one page?
Plain HTML has no "shared header" feature — each page is a fully independent
file. That means the nav bar and footer are copy-pasted into every page
(you'll see the identical `<header>` and `<footer>` blocks in each `.html`
file). If you ever change the nav (add a page, rename a link), you'll need
to update it in all 5 files. That's a normal trade-off for a simple site
like this — the alternative is a build tool, which is more setup than a
5-page portfolio needs.

## What's already done for you
- 5 linked pages with a shared nav, active-page underline, and mobile menu
- A video hero on the About page (see below to add your own clip)
- Casual, personality-driven copy on the About page (Strengths/Weaknesses)
- A Resume page with a download button + embedded PDF preview
- Fully responsive (phone/tablet/desktop)

## Adding your hero video
The About page hero looks for `assets/hero-video.mp4`. Until that file
exists, it just shows a clean gradient background instead — nothing looks
broken either way. To add one:
1. Get a short clip (10-20 seconds, loops cleanly, no audio needed since
   it plays muted) — a CAD spin, a machine running, a print timelapse, etc.
2. Compress it if it's large — under 5-10MB keeps the page fast. Handbrake
   (free, à handbrake.fr) or an online compressor both work.
3. Name it exactly `hero-video.mp4` and drop it in the `assets/` folder.
4. Optional: add a `hero-poster.jpg` still frame too — it shows briefly
   while the video loads.

## What you need to edit
Search each `.html` file for the word `EDIT` — every spot marked with an
`<!-- EDIT: ... -->` comment needs your real info: bio text, project details,
work history, contact links, and your real `resume.pdf` in `assets/`.

## Hosting it on GitHub Pages (free)

1. **Create a repository** on github.com (New repository).
2. **Upload the files** — either drag-and-drop everything (all `.html`
   files, `styles.css`, `script.js`, `assets/`) via "Add file → Upload files,"
   or use git:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. **Turn on Pages**: Settings → Pages → Source: "Deploy from a branch" →
   branch `main`, folder `/ (root)` → Save.
4. Wait about a minute, refresh that settings page, and it'll show your live
   URL (e.g. `https://your-username.github.io/your-repo/`).
5. Every push to `main` updates the live site within a minute or two.
