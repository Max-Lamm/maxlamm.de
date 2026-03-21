# UX Improvements Batch Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 8 UX improvements: hero CTA button, homepage category toggle, filter state persistence, contact form i18n, language switcher in header, larger lightbox close button, portrait video overflow fix, and lightbox gallery navigation.

**Architecture:** Mostly independent changes to CSS, JS, and Hugo templates. The nav partial extraction (Task 1) reduces duplication before adding the language switcher. Homepage filter reuses the existing FLIP animation logic from `/work/`. Lightbox navigation extends the existing lightbox code in `baseof.html` and `main.js`.

**Tech Stack:** Hugo templates, vanilla JS, CSS, `history.replaceState`

**Spec:** `docs/superpowers/specs/2026-03-21-ux-improvements-design.md` — Sections 2-9

---

### Task 1: Extract Nav into a Partial

**Files:**
- Create: `layouts/partials/nav.html`
- Modify: `layouts/index.html:7-15`
- Modify: `layouts/projects/single.html:7-16`
- Modify: `layouts/projects/list.html:3-11`
- Modify: `layouts/_default/single.html:3-12`

This reduces duplication before adding the language switcher to all nav instances.

- [ ] **Step 1: Create the nav partial**

Create `layouts/partials/nav.html`:

```html
{{- $isHero := .isHero | default false -}}
{{- $activeWork := .activeWork | default false -}}
<nav class="site-nav{{ if not $isHero }} scrolled{{ end }}{{ if $isHero }} site-nav--hero{{ end }}">
  <div class="site-nav__inner">
    <a class="site-nav__brand" href="{{ if eq .page.Lang "de" }}/{{ else }}/en/{{ end }}">maxlamm</a>
    <div class="site-nav__links">
      <a href="{{ if eq .page.Lang "de" }}/work/{{ else }}/en/work/{{ end }}"{{ if $activeWork }} class="active"{{ end }}>Work</a>
      <a href="{{ if eq .page.Lang "de" }}/#about{{ else }}/en/#about{{ end }}">About</a>
      <a href="{{ if eq .page.Lang "de" }}/#contact{{ else }}/en/#contact{{ end }}">Contact</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Replace nav in index.html (lines 7-15)**

Replace the nav block in `layouts/index.html` with:

```html
{{ partial "nav.html" (dict "page" . "isHero" true) }}
```

- [ ] **Step 3: Replace nav in projects/single.html (lines 7-16)**

Replace the nav block with:

```html
{{ partial "nav.html" (dict "page" . "activeWork" true) }}
```

- [ ] **Step 4: Replace nav in projects/list.html (lines 3-11)**

Replace the nav block with:

```html
{{ partial "nav.html" (dict "page" . "activeWork" true) }}
```

- [ ] **Step 5: Replace nav in _default/single.html (lines 3-12)**

Replace the nav block with:

```html
{{ partial "nav.html" (dict "page" .) }}
```

- [ ] **Step 6: Verify Hugo builds and all pages render navs correctly**

Run: `hugo server -D` and check homepage, /work/, a project page, and a static page (e.g. /impressum/).

Expected: All navs render identically to before.

- [ ] **Step 7: Commit**

```bash
git add layouts/partials/nav.html layouts/index.html layouts/projects/single.html layouts/projects/list.html layouts/_default/single.html
git commit -m "refactor: extract site nav into reusable partial"
```

---

### Task 2: Add Language Switcher to Header Nav

**Files:**
- Modify: `layouts/partials/nav.html`
- Modify: `static/css/style.css`

- [ ] **Step 1: Add language links to nav partial**

Update `layouts/partials/nav.html` — add a language switcher after `.site-nav__links`:

```html
{{- $isHero := .isHero | default false -}}
{{- $activeWork := .activeWork | default false -}}
<nav class="site-nav{{ if not $isHero }} scrolled{{ end }}{{ if $isHero }} site-nav--hero{{ end }}">
  <div class="site-nav__inner">
    <a class="site-nav__brand" href="{{ if eq .page.Lang "de" }}/{{ else }}/en/{{ end }}">maxlamm</a>
    <div class="site-nav__links">
      <a href="{{ if eq .page.Lang "de" }}/work/{{ else }}/en/work/{{ end }}"{{ if $activeWork }} class="active"{{ end }}>Work</a>
      <a href="{{ if eq .page.Lang "de" }}/#about{{ else }}/en/#about{{ end }}">About</a>
      <a href="{{ if eq .page.Lang "de" }}/#contact{{ else }}/en/#contact{{ end }}">Contact</a>
      <span class="site-nav__lang">
        {{- if eq .page.Lang "de" -}}
          <span class="site-nav__lang-active">DE</span>
          <span class="site-nav__lang-sep">|</span>
          {{- if .page.Translations -}}
            <a href="{{ (index .page.Translations 0).RelPermalink }}">EN</a>
          {{- else -}}
            <a href="/en/">EN</a>
          {{- end -}}
        {{- else -}}
          {{- if .page.Translations -}}
            <a href="{{ (index .page.Translations 0).RelPermalink }}">DE</a>
          {{- else -}}
            <a href="/">DE</a>
          {{- end -}}
          <span class="site-nav__lang-sep">|</span>
          <span class="site-nav__lang-active">EN</span>
        {{- end -}}
      </span>
    </div>
  </div>
</nav>
```

- [ ] **Step 2: Add language switcher CSS**

Add after `.site-nav__links a.active` rule (around line 284 in `style.css`):

```css
.site-nav__lang {
  display: flex;
  align-items: center;
  gap: .4rem;
  margin-left: .5rem;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(255,255,255,.15);
  font-size: .85rem;
  font-weight: 600;
  letter-spacing: .05em;
}
.site-nav__lang a {
  color: var(--text-light);
  font-size: .85rem;
}
.site-nav__lang a:hover {
  color: var(--accent);
}
.site-nav__lang-active {
  color: var(--accent);
  font-size: .85rem;
}
.site-nav__lang-sep {
  color: rgba(255,255,255,.2);
  font-weight: 300;
}
```

- [ ] **Step 3: Test language switcher**

1. Homepage (DE): "DE" is accent-colored, "EN" is dim and links to `/en/`
2. Homepage (EN): "EN" is accent-colored, "DE" links to `/`
3. Project page: language links go to the translated project (via `.Translations`)
4. Static page: same behavior

- [ ] **Step 4: Commit**

```bash
git add layouts/partials/nav.html static/css/style.css
git commit -m "feat: add DE/EN language switcher to header navigation"
```

---

### Task 3: Hero CTA Button

**Files:**
- Modify: `hugo.toml`
- Modify: `layouts/index.html`
- Modify: `static/css/style.css`

- [ ] **Step 1: Add heroButton param to hugo.toml**

Add `heroButton` to both language param blocks:

In `[languages.de.params]` (after line 19):
```toml
heroButton = "Projekte ansehen"
```

In `[languages.en.params]` (after line 51):
```toml
heroButton = "View Work"
```

- [ ] **Step 2: Add button to hero in index.html**

In `layouts/index.html`, after the subtitle line (line 24) and before the scroll arrow (line 26), add:

```html
    <a href="#projects" class="btn btn--hero">{{ .Site.Language.Params.heroButton }}</a>
```

- [ ] **Step 3: Add ghost button CSS**

Add after the `.btn:hover` rule (after line 421 in `style.css`):

```css
.btn--hero {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  margin-top: 1.5rem;
}
.btn--hero:hover {
  background: var(--accent);
  color: #fff;
}
/* Adapt for accent-background hero variant */
.hero--no-video .btn--hero {
  color: var(--bg);
  border-color: var(--bg);
}
.hero--no-video .btn--hero:hover {
  background: var(--bg);
  color: var(--accent);
}
```

- [ ] **Step 4: Verify button appears and scrolls to projects**

Run: `hugo server -D`, load homepage. Button should appear below subtitle, ghost style. Click scrolls smoothly to `#projects`.

- [ ] **Step 5: Commit**

```bash
git add hugo.toml layouts/index.html static/css/style.css
git commit -m "feat: add hero CTA button linking to projects grid"
```

---

### Task 4: Homepage Grid Category Toggle

**Files:**
- Modify: `layouts/index.html`
- Modify: `static/js/main.js`
- Modify: `static/css/style.css`

- [ ] **Step 1: Add toggle markup and data attributes to index.html**

Replace the projects grid section (lines 30-58) in `layouts/index.html`:

```html
<section class="projects-section" id="projects">
  {{- $projects := where .Site.RegularPages "Section" "projects" -}}
  {{- $featured := where $projects ".Params.featured" true -}}
  {{- $display := $featured -}}
  {{- if eq (len $featured) 0 -}}
    {{- $display = first 12 $projects -}}
  {{- end -}}

  {{- /* Collect unique categories from displayed projects */ -}}
  {{- $cats := slice -}}
  {{- range $display -}}{{- range .Params.categories -}}{{- $cats = $cats | append . -}}{{- end -}}{{- end -}}
  {{- $cats = $cats | uniq -}}

  {{- if gt (len $cats) 1 -}}
  <div class="home-filter">
    <button class="badge home-filter-badge active" data-cat="all">{{ if eq .Lang "de" }}Alle{{ else }}All{{ end }}</button>
    {{- range $cats -}}
    <button class="badge badge--outline home-filter-badge" data-cat="{{ . }}">{{ . }}</button>
    {{- end -}}
  </div>
  {{- end -}}

  <div class="project-grid" id="home-projects-grid">
    {{- range $display -}}
    {{- $title := .Title -}}
    <a class="project-card" href="{{ .RelPermalink }}"
       data-cats="{{ delimit (.Params.categories | default slice) "," }}">
      {{- with .Params.thumbnail -}}
      {{ partial "thumb.html" (dict "src" . "alt" $title) }}
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
  <div class="more-projects">
    <a class="btn" href="{{ if eq .Lang "de" }}/work/{{ else }}/en/work/{{ end }}">{{ .Site.Language.Params.moreProjects }}</a>
  </div>
</section>
```

- [ ] **Step 2: Add homepage filter CSS**

Add after the `.work-filter` styles (around line 974 in `style.css`):

```css
.home-filter {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 var(--gap) 1.5rem;
}

button.home-filter-badge {
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: background .2s ease, border-color .2s ease, color .2s ease;
}
button.home-filter-badge.badge--outline {
  border: 1px solid var(--accent);
}
.home-filter-badge:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.home-filter-badge.badge--outline.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
```

- [ ] **Step 3: Extract FLIP filter into reusable function in main.js**

In `static/js/main.js`, replace the project category filter section (lines 163-245) with a reusable function and two initializations:

```js
  /* --- Reusable FLIP category filter --- */
  function initCategoryFilter(filterBtns, gridSelector) {
    if (!filterBtns.length) return;

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
        const cards = document.querySelectorAll(`${gridSelector} .project-card`);

        /* FIRST — record current positions */
        const firstRects = new Map();
        cards.forEach(c => firstRects.set(c, c.getBoundingClientRect()));

        /* fade-out + zoom-out cards to hide */
        const toHide = [];
        cards.forEach(card => {
          const cats = card.dataset.cats ? card.dataset.cats.split(',') : [];
          if (cat !== 'all' && !cats.includes(cat)) {
            card.classList.add('card-hidden');
            toHide.push(card);
          }
        });

        /* after fade-out: reflow grid, then FLIP visible cards */
        setTimeout(() => {
          toHide.forEach(c => c.style.display = 'none');
          cards.forEach(card => {
            const cats = card.dataset.cats ? card.dataset.cats.split(',') : [];
            const show = cat === 'all' || cats.includes(cat);
            if (show) {
              card.style.display = '';
              card.classList.remove('card-hidden');
            }
          });

          /* LAST — record new positions & INVERT */
          cards.forEach(card => {
            if (card.style.display === 'none') return;
            const first = firstRects.get(card);
            const last = card.getBoundingClientRect();
            const dx = first.left - last.left;
            const dy = first.top - last.top;
            if (dx === 0 && dy === 0) return;
            card.style.transform = `translate(${dx}px, ${dy}px)`;
            card.style.transition = 'none';
          });

          /* PLAY — animate to final position */
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              cards.forEach(card => {
                if (card.style.display === 'none') return;
                card.style.transform = '';
                card.style.transition = 'transform .35s ease, opacity .25s ease';
              });
              setTimeout(() => {
                cards.forEach(card => {
                  card.style.transition = '';
                  card.style.transform = '';
                });
              }, 400);
            });
          });
        }, 250);

        return cat; // return for callers that need the value
      });
    });
  }

  /* --- /work/ page filter --- */
  const workFilterBtns = document.querySelectorAll('.filter-badge');
  initCategoryFilter(workFilterBtns, '#projects-grid');

  // Auto-activate filter from URL param (/work/ page)
  if (workFilterBtns.length) {
    const urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) {
      const target = [...workFilterBtns].find(b => b.dataset.cat === urlCat);
      if (target) target.click();
    }
  }

  /* --- Homepage filter --- */
  const homeFilterBtns = document.querySelectorAll('.home-filter-badge');
  initCategoryFilter(homeFilterBtns, '#home-projects-grid');
```

- [ ] **Step 4: Test homepage filter**

1. Homepage shows "All | Cinematographer | Colorist" toggle (if both categories exist)
2. Clicking "Colorist" hides non-colorist projects with FLIP animation
3. Clicking "All" shows everything again
4. `/work/` filter still works identically

- [ ] **Step 5: Commit**

```bash
git add layouts/index.html static/js/main.js static/css/style.css
git commit -m "feat: add category toggle filter to homepage projects grid"
```

---

### Task 5: Filter State Persistence on /work/

**Files:**
- Modify: `static/js/main.js`

- [ ] **Step 1: Add history.replaceState to filter handler**

In the `/work/ page filter` section (just added in Task 4), wrap the click handler to also update the URL. Update the workFilterBtns block:

```js
  /* --- /work/ page filter with URL persistence --- */
  const workFilterBtns = document.querySelectorAll('.filter-badge');
  initCategoryFilter(workFilterBtns, '#projects-grid');

  if (workFilterBtns.length) {
    // Add URL persistence on click
    workFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        const url = cat === 'all'
          ? window.location.pathname
          : `${window.location.pathname}?cat=${cat}`;
        history.replaceState(null, '', url);
      });
    });

    // Auto-activate filter from URL param
    const urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) {
      const target = [...workFilterBtns].find(b => b.dataset.cat === urlCat);
      if (target) target.click();
    }
  }
```

- [ ] **Step 2: Test filter persistence**

1. Go to `/work/`, click "Colorist" → URL changes to `/work/?cat=colorist`
2. Click a project → navigate to detail page
3. Hit browser back → `/work/?cat=colorist` loads with filter active
4. Click "All" → URL changes to `/work/` (no param)

- [ ] **Step 3: Commit**

```bash
git add static/js/main.js
git commit -m "feat: persist category filter state in URL via history.replaceState"
```

---

### Task 6: Contact Form i18n

**Files:**
- Modify: `static/js/main.js:92-126`

- [ ] **Step 1: Add i18n strings and update form handler**

Replace the contact form section (starting at `/* --- Contact Form ---*/`) in `main.js`:

```js
  /* --- Contact Form --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    const lang = document.documentElement.lang || 'de';
    const i18n = {
      de: { sending: 'Sende...', sent: '\u2713 Gesendet!', error: 'Fehler \u2013 bitte erneut versuchen' },
      en: { sending: 'Sending...', sent: '\u2713 Sent!', error: 'Error \u2013 please try again' }
    };
    const t = i18n[lang] || i18n.de;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = t.sending;
      btn.disabled = true;

      const data = new FormData(form);

      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (resp.ok) {
          btn.textContent = t.sent;
          form.reset();
          setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
        } else {
          throw new Error('Send failed');
        }
      } catch (err) {
        btn.textContent = t.error;
        btn.disabled = false;
        setTimeout(() => { btn.textContent = originalText; }, 3000);
      }
    });
  }
```

- [ ] **Step 2: Test on both languages**

1. `/` (DE): submit shows "Sende...", success shows "✓ Gesendet!"
2. `/en/` (EN): submit shows "Sending...", success shows "✓ Sent!"

- [ ] **Step 3: Commit**

```bash
git add static/js/main.js
git commit -m "fix: make contact form feedback messages language-aware"
```

---

### Task 7: Larger Lightbox Close Button

**Files:**
- Modify: `static/css/style.css:1158-1168`

- [ ] **Step 1: Update lightbox close button styles**

Replace the `.lightbox__close` rule (lines 1158-1168):

```css
.lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #fff;
  font-size: 2.4rem;
  cursor: pointer;
  background: none;
  border: none;
  line-height: 1;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
```

- [ ] **Step 2: Test on mobile**

Open lightbox on mobile viewport. Close button should be easy to tap with a thumb.

- [ ] **Step 3: Commit**

```bash
git add static/css/style.css
git commit -m "fix: increase lightbox close button tap target to 44px minimum"
```

---

### Task 8: Portrait Video Pair Overflow Fix

**Files:**
- Modify: `static/css/style.css`

- [ ] **Step 1: Add responsive rules for portrait video pair**

Inside the `@media (max-width: 768px)` block, add:

```css
  .project-video-pair {
    overflow: hidden;
  }
  .video-wrapper--portrait {
    flex: 1 1 auto;
    max-width: calc(50% - 0.75rem);
  }
```

- [ ] **Step 2: Test on mobile viewports**

1. Open a project with portrait videos (e.g., BMW Island) on 375px width
2. Both videos should appear side-by-side, scaled to fit
3. No horizontal scrollbar
4. Aspect ratio preserved

- [ ] **Step 3: Commit**

```bash
git add static/css/style.css
git commit -m "fix: prevent portrait video pair horizontal overflow on mobile"
```

---

### Task 9: Lightbox Gallery Navigation

**Files:**
- Modify: `layouts/_default/baseof.html:101-105`
- Modify: `static/js/main.js`
- Modify: `static/css/style.css`

- [ ] **Step 1: Add prev/next buttons to lightbox markup**

In `layouts/_default/baseof.html`, update the lightbox block (lines 101-105):

```html
  <!-- Lightbox -->
  <div class="lightbox">
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__prev" aria-label="Previous image">&#8249;</button>
    <img src="" alt="">
    <button class="lightbox__next" aria-label="Next image">&#8250;</button>
  </div>
```

- [ ] **Step 2: Add lightbox nav button CSS**

Add after the `.lightbox__close` rule in `style.css`:

```css
.lightbox__prev,
.lightbox__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.15);
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .2s, opacity .2s;
  z-index: 10;
  line-height: 1;
}
.lightbox__prev { left: 1.5rem; }
.lightbox__next { right: 1.5rem; }
.lightbox__prev:hover,
.lightbox__next:hover {
  background: rgba(255,255,255,.2);
}
.lightbox__prev.hidden,
.lightbox__next.hidden {
  opacity: 0;
  pointer-events: none;
}
```

- [ ] **Step 3: Update lightbox JS for gallery navigation**

Replace the entire lightbox section in `main.js` (from `/* --- Lightbox for gallery images ---*/` through the `keydown` handler):

```js
  /* --- Lightbox for gallery images --- */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
  const lightboxNext = lightbox?.querySelector('.lightbox__next');

  let galleryImages = [];
  let currentIndex = 0;

  function updateLightbox(index) {
    currentIndex = index;
    const img = galleryImages[index];
    lightboxImg.src = img.dataset.full || img.src;
    // Hide arrows at boundaries
    lightboxPrev?.classList.toggle('hidden', index === 0);
    lightboxNext?.classList.toggle('hidden', index === galleryImages.length - 1);
    // Preload adjacent images
    if (index > 0) { new Image().src = galleryImages[index - 1].dataset.full || galleryImages[index - 1].src; }
    if (index < galleryImages.length - 1) { new Image().src = galleryImages[index + 1].dataset.full || galleryImages[index + 1].src; }
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    updateLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Bind gallery images
  galleryImages = [...document.querySelectorAll('.gallery-grid img')];
  galleryImages.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  // Close handlers
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
  });

  // Prev/next button clicks
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex > 0) updateLightbox(currentIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentIndex < galleryImages.length - 1) updateLightbox(currentIndex + 1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && currentIndex > 0) updateLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) updateLightbox(currentIndex + 1);
  });

  // Mobile swipe on lightbox
  if (lightbox) {
    let lbStartX = 0, lbDeltaX = 0;
    lightboxImg?.addEventListener('touchstart', (e) => {
      lbStartX = e.touches[0].clientX;
      lbDeltaX = 0;
    }, { passive: true });
    lightboxImg?.addEventListener('touchmove', (e) => {
      lbDeltaX = e.touches[0].clientX - lbStartX;
    }, { passive: true });
    lightboxImg?.addEventListener('touchend', () => {
      const SWIPE_THRESHOLD = 50;
      if (lbDeltaX > SWIPE_THRESHOLD && currentIndex > 0) {
        updateLightbox(currentIndex - 1);
      } else if (lbDeltaX < -SWIPE_THRESHOLD && currentIndex < galleryImages.length - 1) {
        updateLightbox(currentIndex + 1);
      }
    }, { passive: true });
  }
```

- [ ] **Step 4: Test lightbox gallery navigation**

1. Open a project with gallery images
2. Click an image → lightbox opens
3. Click right arrow → next image, left arrow → previous
4. First image: left arrow hidden. Last image: right arrow hidden
5. Keyboard: ArrowLeft/ArrowRight navigates, Escape closes
6. Mobile: swipe left/right navigates between images

- [ ] **Step 5: Commit**

```bash
git add layouts/_default/baseof.html static/js/main.js static/css/style.css
git commit -m "feat: add prev/next navigation, keyboard arrows, and swipe to lightbox"
```

---

### Task 10: Final Verification

**Files:**
- All modified files

- [ ] **Step 1: Full production build**

Run: `hugo --minify --gc 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 2: Cross-page testing checklist**

- Homepage DE: hero CTA visible, category toggle works, nav has DE/EN switcher
- Homepage EN: hero CTA says "View Work", EN active in nav
- `/work/`: filter works, URL updates with `?cat=`, back-navigation preserves filter
- Project page: lightbox gallery nav works (arrows, keyboard, swipe)
- Project with portrait videos: no horizontal overflow on mobile
- Static page (Impressum): nav partial renders correctly with language switcher
- Contact form DE: "Sende...", "Gesendet!" feedback
- Contact form EN: "Sending...", "Sent!" feedback
- Lightbox close button: large enough tap target on mobile

- [ ] **Step 3: Commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: final polish for UX improvements batch"
```
