# Work Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Work page to use the same design vocabulary as the project detail pages — heading + outline-badge filter replacing the generic centered button bar.

**Architecture:** Replace the `.filter-bar` with a `.work-header` containing a heading ("Ausgewählte Projekte" / "Selected Projects") on the left and badge-style filter buttons on the right. Constrain the page to `max-width: 900px` to match project page content width. Reuse existing `.badge` / `.badge--outline` styles for filter buttons.

**Tech Stack:** Hugo templates, vanilla CSS, vanilla JS (existing filter logic)

---

### Task 1: Add i18n strings to hugo.toml

**Files:**
- Modify: `hugo.toml:13-21` (DE params) and `hugo.toml:43-51` (EN params)

- [ ] **Step 1: Add `workHeading` param to both languages**

In `hugo.toml`, add to `[languages.de.params]`:
```toml
workHeading = "Ausgewählte Projekte"
```

And to `[languages.en.params]`:
```toml
workHeading = "Selected Projects"
```

- [ ] **Step 2: Verify Hugo config is valid**

Run: `cd /Users/maximilianlamm/GitHub/maxlamm.de && hugo config | grep workHeading`
Expected: Both `workheading: Ausgewählte Projekte` and `workheading: Selected Projects` appear.

- [ ] **Step 3: Commit**

```bash
git add hugo.toml
git commit -m "feat(work): add workHeading i18n param for DE/EN"
```

---

### Task 2: Update Work page template (list.html)

**Files:**
- Modify: `layouts/_default/list.html`

- [ ] **Step 1: Replace filter-bar with work-header**

Replace the entire content of `layouts/_default/list.html` with:

```html
{{ define "main" }}

<nav class="site-nav scrolled">
  <div class="site-nav__inner">
    <a class="site-nav__brand" href="{{ if eq .Lang "de" }}/{{ else }}/en/{{ end }}">maxlamm</a>
    <div class="site-nav__links">
      <a href="{{ if eq .Lang "de" }}/work/{{ else }}/en/work/{{ end }}" class="active">Work</a>
      <a href="{{ if eq .Lang "de" }}/#about{{ else }}/en/#about{{ end }}">About</a>
      <a href="{{ if eq .Lang "de" }}/#contact{{ else }}/en/#contact{{ end }}">Contact</a>
    </div>
  </div>
</nav>

<div class="work-page">

  <div class="work-header">
    <h1>{{ .Site.Language.Params.workHeading }}</h1>
    <div class="work-filter">
      <button class="badge filter-badge active" data-cat="all">All</button>
      {{- $cats := slice -}}
      {{- range .Pages -}}{{- range .Params.categories -}}{{- $cats = $cats | append . -}}{{- end -}}{{- end -}}
      {{- range ($cats | uniq) -}}
      <button class="badge badge--outline filter-badge" data-cat="{{ . }}">{{ . }}</button>
      {{- end -}}
    </div>
  </div>

  <div class="project-grid" id="projects-grid">
    {{- range .Pages -}}
    <a class="project-card" href="{{ .RelPermalink }}"
       data-cats="{{ delimit (.Params.categories | default slice) "," }}">
      {{- with .Params.thumbnail -}}
      {{ partial "thumb.html" . }}
      {{- end -}}
      <div class="project-card__overlay">
        {{- with .Params.types -}}
        <span class="project-card__tags">{{ delimit . " · " }}</span>
        {{- end -}}
        <span class="project-card__title">{{ .Title }}</span>
        {{- with .Params.categories -}}
        <span class="project-card__categories">{{ delimit . " · " }}</span>
        {{- end -}}
      </div>
    </a>
    {{- end -}}
  </div>

</div>

{{ end }}
```

Key changes:
- `.filter-bar` → `.work-header` with `<h1>` + `.work-filter`
- `.filter-btn` → `.badge` / `.badge--outline` with class `.filter-badge`
- Added `class="active"` to Work nav link (was missing)

- [ ] **Step 2: Verify template renders**

Run: `cd /Users/maximilianlamm/GitHub/maxlamm.de && hugo --minify --gc 2>&1 | tail -5`
Expected: Build succeeds without errors.

- [ ] **Step 3: Commit**

```bash
git add layouts/_default/list.html
git commit -m "feat(work): replace filter-bar with work-header and badge-filter layout"
```

---

### Task 3: Update CSS — work-header and filter-badge styles

**Files:**
- Modify: `static/css/style.css`

- [ ] **Step 1: Replace `.filter-bar` and `.filter-btn` CSS blocks**

Find the CATEGORY / ARCHIVE PAGE section (around line 911-958). Replace the `.filter-bar`, `.filter-btn`, and `.filter-btn:hover/.active` rules with:

```css
.work-header {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem var(--gap) 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.work-header h1 {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-white);
  letter-spacing: .03em;
}

.work-filter {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.filter-badge {
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, color .2s ease;
}

.filter-badge:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.filter-badge.badge--outline.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
```

- [ ] **Step 2: Constrain the project grid to 900px on the work page**

Add after the `.work-header` rules:

```css
.work-page .project-grid {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--gap) 4rem;
}
```

- [ ] **Step 3: Update mobile responsive styles**

In the `@media (max-width: 768px)` block, add:

```css
.work-header {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
```

- [ ] **Step 4: Verify build and visual check**

Run: `cd /Users/maximilianlamm/GitHub/maxlamm.de && hugo server -D`
Check: Open `localhost:1313/work/` — heading left, badge-filters right, grid at 900px.

- [ ] **Step 5: Commit**

```bash
git add static/css/style.css
git commit -m "feat(work): style work-header with heading + badge-filter, constrain grid to 900px"
```

---

### Task 4: Update JS filter logic for new class names

**Files:**
- Modify: `static/js/main.js:160-173`

- [ ] **Step 1: Update selector from `.filter-btn` to `.filter-badge`**

Replace the existing filter block (lines 159-173) with:

```js
/* --- Project category filter --- */
const filterBtns = document.querySelectorAll('.filter-badge');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        if (!b.classList.contains('badge--outline')) {
          b.classList.add('badge--outline');
        }
      });
      btn.classList.add('active');
      btn.classList.remove('badge--outline');
      const cat = btn.dataset.cat;
      document.querySelectorAll('#projects-grid .project-card').forEach(card => {
        const cats = card.dataset.cats ? card.dataset.cats.split(',') : [];
        card.style.display = (cat === 'all' || cats.includes(cat)) ? '' : 'none';
      });
    });
  });
}
```

Key change: When a filter is clicked, it becomes a filled `.badge` (remove `badge--outline`), and all others become `.badge--outline`. This matches the visual design — active = filled, inactive = outline.

- [ ] **Step 2: Verify filter works**

Run: `cd /Users/maximilianlamm/GitHub/maxlamm.de && hugo server -D`
Test: Click filter badges on `/work/` — active badge should fill with accent color, others should show outline. Grid should filter correctly.

- [ ] **Step 3: Commit**

```bash
git add static/js/main.js
git commit -m "feat(work): update filter logic for badge toggle (filled/outline)"
```

---

### Task 5: Clean up dead CSS

**Files:**
- Modify: `static/css/style.css`

- [ ] **Step 1: Remove old `.filter-bar`, `.filter-btn`, `.project-filter` rules**

Delete these rule blocks if they still exist (they may have been partially replaced in Task 3):
- `.filter-bar { ... }`
- `.project-filter { ... }`
- `.filter-btn { ... }`
- `.filter-btn:hover, .filter-btn.active { ... }`

- [ ] **Step 2: Verify nothing breaks**

Run: `cd /Users/maximilianlamm/GitHub/maxlamm.de && hugo server -D`
Check: Work page, homepage, and a project page all render correctly.

- [ ] **Step 3: Commit**

```bash
git add static/css/style.css
git commit -m "fix(css): remove dead filter-bar and filter-btn styles"
```

---

### Task 6: Final visual verification

- [ ] **Step 1: Check desktop layout**

Open `localhost:1313/work/` — verify:
- Heading "Ausgewählte Projekte" left-aligned
- Badge filters right-aligned, "All" filled, others outline
- Grid is 3 columns at 900px max-width
- Clicking a filter toggles filled/outline state and filters grid

- [ ] **Step 2: Check EN version**

Open `localhost:1313/en/work/` — verify heading says "Selected Projects".

- [ ] **Step 3: Check mobile layout**

Resize to < 768px — verify:
- Heading stacks above filter badges
- Grid switches to 2 columns
- Filter still works

- [ ] **Step 4: Check navigation consistency**

Click from Work page into a project, then back — verify the visual rhythm feels consistent (same max-width, same design language).
