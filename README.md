# Zubair Ahmed — Portfolio

A static portfolio site. No build step, no dependencies — plain HTML, CSS and one small JS file,
so it can be dropped straight onto GitHub Pages.

## Structure

```
.
├── index.html                  # home: hero, work, research, experience, about, contact
├── projects/
│   ├── aqua-boundary.html      # case study 01 — pond boundary detection
│   ├── shrimp-index.html       # case study 02 — spectral index research
│   └── siras-ewis.html         # case study 03 — early warning system
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── img/                    # figures pulled from the project docs
│   └── Zubair_Ahmed_Resume.pdf
├── .nojekyll                   # stops GitHub Pages running Jekyll on the files
└── README.md
```

## Publish it on GitHub Pages

**1. Create the repository.** Name it `zubair9703.github.io` — a repo named
`<username>.github.io` is served at the root domain, so the site lands on
`https://zubair9703.github.io`. Any other name works too, it just gets served from a
subpath instead (`https://zubair9703.github.io/<repo-name>`).

**2. Push the files.** From inside this folder:

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/zubair9703/zubair9703.github.io.git
git push -u origin main
```

**3. Turn Pages on.** In the repo: **Settings → Pages → Build and deployment**.
Set *Source* to **Deploy from a branch**, branch **main**, folder **/ (root)**. Save.
The first build takes a minute or two, then the URL appears at the top of that same page.

To update anything later, edit the file, then `git add . && git commit -m "..." && git push`.
Pages redeploys on every push to `main`.

## Custom domain (optional)

Buy a domain, add a file named `CNAME` at the repo root containing just the domain
(`zubairahmed.com`, no `https://`), then point the domain's DNS at GitHub:

- Four `A` records on the apex: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- One `CNAME` record on `www` → `zubair9703.github.io`

Then set the domain under Settings → Pages and tick **Enforce HTTPS** once the certificate is issued.

## Editing notes

- **Colours and type** are all CSS custom properties at the top of `assets/css/style.css`.
  Change `--nir` to reskin the accent everywhere.
- **The hero chart** is inline SVG in `index.html`. The per-band text that appears when you hover
  is the `NOTES` object at the top of `assets/js/main.js`.
- **Adding a project**: copy one of the files in `projects/`, swap the content, then add a matching
  `<a class="card">` block to the `work` section in `index.html`.
- **Figures** live in `assets/img/`. They were extracted from the source `.docx` files and
  resized to 1600 px on the long edge.
