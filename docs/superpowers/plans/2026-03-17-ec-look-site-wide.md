# EC-Look Site-Wide Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transfer the Edit-Conform page's visual design language (badges, section labels, note boxes) site-wide via a component-first CSS refactor, then apply to project pages and static pages.

**Architecture:** Rename 3 EC-specific CSS classes to generic utility classes (`section-label`, `note-box`, `warning-box`), add new `.badge` variants and `.credit-row` layout, scope EC-specific overrides back into the EC context, update the Edit-Conform template, and upgrade the project template with badges + new credits markup.

**Tech Stack:** Hugo, plain CSS (`static/css/style.css`), Hugo templates (Go template syntax)

---

## File Map

| File | Change |
|------|--------|
| `static/css/style.css` | Rename 3 classes, add badge variants, add credit-row styles, upgrade `.static-page h2` |
| `layouts/pages/edit-conform.html` | Update 8 class references (ec-step-group-label×5, ec-step-note×2, ec-limitations×1) |
| `layouts/projects/single.html` | Add badges block, replace credits markup, add section-label before gallery |

---

## Task 1: CSS — Rename classes and add utility classes

**Files:**
- Modify: `static/css/style.css`

### 1a — Rename `.ec-step-group-label` → `.section-label`

- [ ] **Replace the definition block** (currently lines ~1334–1341):

```css
/* BEFORE */
.ec-step-group-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-light);
  padding: 32px 0 12px 60px;
  font-weight: 500;
}
```

```css
/* AFTER — generic utility, no EC-specific padding */
.section-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  border-bottom: 1px solid #2a2a2a;
  padding-bottom: 0.3rem;
  margin: 1.5rem 0 0.75rem;
}

/* EC-specific: restore the step-aligned padding inside workflow content */
.ec-workflow-content .section-label {
  border-bottom: none;
  padding-bottom: 0;
  margin: 0;
  padding: 32px 0 12px 60px;
  color: var(--text-light);
}
```

- [ ] **Replace the responsive override** (currently lines ~1409–1411):

```css
/* BEFORE */
.ec-step-group-label {
  padding-left: 52px;
}
```

```css
/* AFTER */
.ec-workflow-content .section-label {
  padding-left: 52px;
}
```

### 1b — Rename `.ec-step-note` → `.note-box`

- [ ] **Replace the definition block** (currently lines ~1318–1332):

```css
/* BEFORE */
.ec-step-note { ... }
.ec-step-note strong { ... }
```

```css
/* AFTER */
.note-box {
  margin-top: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid var(--accent);
  border-radius: 0 6px 6px 0;
  font-size: 13px;
  color: var(--text-light);
  line-height: 1.6;
}

.note-box strong {
  color: var(--accent);
  font-weight: 600;
}
```

### 1c — Rename `.ec-limitations` → `.warning-box`

- [ ] **Replace all sub-selectors** (currently lines ~1344–1388):

```css
/* BEFORE: .ec-limitations, .ec-limitations h3, .ec-limitations h3::before,
           .ec-limitations ul, .ec-limitations li, .ec-limitations li::before */
```

```css
/* AFTER: same rules, selector prefix changed */
.warning-box {
  margin-top: 40px;
  background: #222;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 28px 32px;
}

.warning-box h3 {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-box h3::before {
  content: '⚠';
  font-size: 14px;
}

.warning-box ul {
  list-style: none;
  padding: 0;
}

.warning-box li {
  padding: 8px 0 8px 20px;
  position: relative;
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
}

.warning-box li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
  opacity: 0.5;
}
```

- [ ] **Replace the responsive override** (currently lines ~1413–1415):

```css
/* BEFORE */
.ec-limitations { padding: 20px 24px; }

/* AFTER */
.warning-box { padding: 20px 24px; }
```

### 1d — Add `.badge` utility classes

- [ ] **Add after the `.ec-tab-badge` block** (~line 1233):

```css
/* ---- Generic badge utility ---- */
.badge {
  display: inline-block;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 3px;
  white-space: nowrap;
  background: var(--accent);
  color: #fff;
}

.badge--outline {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}

.badge--muted {
  background: #2a2a2a;
  color: var(--text-light);
  border: none;
}
```

### 1e — Add `.credits-list` / `.credit-row` styles

- [ ] **Replace the existing `.project-credits dl/dt/dd` block** (lines ~787–801):

```css
/* BEFORE */
.project-credits dl { ... }
.project-credits dt { ... }
.project-credits dd { ... }
```

```css
/* AFTER */
.credits-list {
  display: flex;
  flex-direction: column;
}

.credit-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.28rem 0;
  border-bottom: 1px solid #1e1e1e;
  font-size: 0.9rem;
}

.credit-row:last-child {
  border-bottom: none;
}

.credit-role {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-light);
  min-width: 100px;
  flex-shrink: 0;
}

.credit-name {
  color: var(--text-white);
}
```

### 1f — Upgrade `.static-page h2`

- [ ] **Replace the existing `.static-page h2` block** (lines ~1012–1020):

```css
/* BEFORE */
.static-page h2 {
  font-family: 'Raleway', sans-serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  color: var(--text-white);
  margin-top: 2rem;
  margin-bottom: .75rem;
}
```

```css
/* AFTER */
.static-page h2 {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  border-bottom: 1px solid #2a2a2a;
  padding-bottom: 0.3rem;
  margin: 2.5rem 0 0.75rem;
}
```

- [ ] **Verify `.static-page h1` has enough breathing room** — current `margin-bottom: 2rem` is fine, no change needed.

- [ ] **Start dev server and spot-check:**

```bash
hugo server -D
```

Open in browser:
- `/edit-conform` — step group labels, step notes, limitations box must look identical to before
- `/impressum` (or `/de/`) — `h2` headings should now appear as small red uppercase section labels

- [ ] **Commit:**

```bash
git add static/css/style.css
git commit -m "refactor(css): generalize ec-* classes to site-wide utilities (badge, section-label, note-box, warning-box)"
```

---

## Task 2: Edit-Conform Template — Update class references

**Files:**
- Modify: `layouts/pages/edit-conform.html`

The template still references the old `ec-*` class names. Replace all occurrences (use find-and-replace, not manual editing).

- [ ] **Replace `ec-step-group-label` → `section-label`** (5 occurrences: lines 39, 84, 100, 128, 187)

- [ ] **Replace `ec-step-note` → `note-box`** (2 occurrences: lines 52, 169)

- [ ] **Replace `ec-limitations` → `warning-box`** (1 occurrence: line 203)

> **Note:** The spec table lists `.ec-badge → .badge` as a fourth rename. In reality, neither `.ec-badge` nor `ec-badge` exists anywhere in this template or in `style.css`. The only badge-like class in the template is `.ec-tab-badge`, which the spec explicitly keeps as EC-specific. The `.badge` utility in Task 1d is a *new* addition, not a rename. No search-and-replace for `ec-badge` is needed here.

- [ ] **Verify in browser** — `/edit-conform` must look exactly as before:
  - "Sequenz vorbereiten / Aufräumen / Export & Übergabe" group labels visible
  - "Ausnahme:" note boxes visible with red left border
  - Flat Quicktime "Einschränkungen" warning box visible with ⚠ header

- [ ] **Commit:**

```bash
git add layouts/pages/edit-conform.html
git commit -m "refactor(edit-conform): update template to use renamed utility classes"
```

---

## Task 3: Project Template — Badges, credits, gallery label

**Files:**
- Modify: `layouts/projects/single.html`

### 3a — Add badges block after `<h1>`

- [ ] **Find the project header block** (around line 26–29):

```html
<!-- Title -->
<div class="project-header">
  <h1>{{ .Title }}</h1>
</div>
```

- [ ] **Replace with:**

```html
<!-- Title + Badges -->
<div class="project-header">
  <h1>{{ .Title }}</h1>
  {{- if or .Params.categories .Params.types -}}
  <div class="project-badges">
    {{- range .Params.categories -}}
    <span class="badge">{{ . }}</span>
    {{- end -}}
    {{- range .Params.types -}}
    <span class="badge badge--outline">{{ . }}</span>
    {{- end -}}
  </div>
  {{- end -}}
</div>
```

- [ ] **Add `.project-badges` CSS** to `style.css`, after `.project-header h1`:

```css
.project-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}
```

### 3b — Replace credits markup

- [ ] **Find the credits block** (lines ~86–95):

```html
{{- with .Params.credits -}}
<div class="project-credits">
  <dl>
    {{- range . -}}
    <dt>{{ index . "role" }}:</dt>
    <dd>{{ index . "name" }}</dd>
    {{- end -}}
  </dl>
</div>
{{- end -}}
```

- [ ] **Replace with:**

```html
{{- with .Params.credits -}}
<div class="project-credits">
  <div class="section-label">Credits</div>
  <div class="credits-list">
    {{- range . -}}
    {{- if index . "name" -}}
    <div class="credit-row">
      <span class="credit-role">{{ index . "role" }}</span>
      <span class="credit-name">{{ index . "name" }}</span>
    </div>
    {{- end -}}
    {{- end -}}
  </div>
</div>
{{- end -}}
```

Note: the current template has no empty-name guard — all credits are rendered unconditionally. The guard added here (`if index . "name"`) is intentional and aligns with the CLAUDE.md convention "Credits-Einträge ohne Namen einfach weglassen".

### 3c — Add section label before gallery

- [ ] **Find the gallery block** (lines ~98–113):

```html
{{- with .Params.gallery -}}
<div class="project-gallery">
```

- [ ] **Replace the opening with:**

```html
{{- with .Params.gallery -}}
<div class="project-gallery">
  <div class="section-label">{{ if eq .Lang "de" }}Galerie{{ else }}Gallery{{ end }}</div>
```

Wait — inside a `with` block, `.` is bound to `.Params.gallery` (a slice). Access the page's `.Lang` via `$` (which must be set before the `with`). Check existing template usage — the template already uses `$.Params` elsewhere, so `$` is the page.

- [ ] **Correct version:**

```html
{{- with .Params.gallery -}}
<div class="project-gallery">
  <div class="section-label">{{ if eq $.Lang "de" }}Galerie{{ else }}Gallery{{ end }}</div>
```

### 3d — Verify and commit

- [ ] **Start dev server and open a project with credits, categories, and a gallery:**

```bash
hugo server -D
```

Check:
- Badges appear below title (solid red for categories, outline for types)
- Credits show as inline rows with `credit-role` / `credit-name` layout
- "Credits" section-label appears above credits list
- "Galerie" / "Gallery" section-label appears above gallery grid
- Empty `name` credits are not rendered

- [ ] **Commit:**

```bash
git add layouts/projects/single.html static/css/style.css
git commit -m "feat(projects): add category badges, inline credit rows, section labels"
```

---

## Final check

- [ ] Run full build with no errors:

```bash
hugo --minify --gc
```

Expected: no errors, `public/` generated cleanly.

- [ ] Open `/edit-conform`, a project page, and `/impressum` — verify all three look correct.

- [ ] Deploy:

```bash
./deploy.sh
```
