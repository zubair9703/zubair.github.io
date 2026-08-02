# Zubair Ahmed — Portfolio

A static portfolio site. No build step, no dependencies — plain HTML, CSS and one small JS file,
so it can be dropped straight onto GitHub Pages.

## Structure

```
.
├── index.html                      # home: hero, about, services, portfolio grid, featured, contact
├── projects/
│   ├── aqua-boundary.html          # pond boundary detection
│   ├── aerator-detection.html      # aerator detection & on/off classification
│   ├── water-quality.html          # water quality estimation
│   ├── shrimp-index.html           # spectral index research
│   └── siras-ewis.html             # early warning system
├── assets/
│   ├── css/alt.css                 # homepage
│   ├── css/project.css             # case study pages
│   ├── js/alt.js                   # portfolio filters + reveal
│   ├── img/                        # figures from the project docs
│   └── Zubair_Ahmed_Resume.pdf
├── .nojekyll                       # stops GitHub Pages running Jekyll on the files
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

- **Colours and type** are CSS custom properties at the top of `assets/css/alt.css` and
  `assets/css/project.css`. Change `--accent` in both to reskin the site.
- **Portfolio filters**: each tile carries `data-cats="..."`. Add a category by adding a
  `<button class="filter" data-filter="your-cat">` and tagging tiles with the same string.
- **Adding a project**: copy a file from `projects/`, swap the content, then add a matching
  `<a class="tile">` to the grid in `index.html`.
- **Figures** live in `assets/img/`, extracted from the source `.docx` files and resized to
  1600 px on the long edge.
- **The hero background** is the Sentinel-2 false colour composite, set in `alt.css` under
  `.hero::before`. Replace `assets/img/fcc-delta-light.jpg` to swap the scene.
