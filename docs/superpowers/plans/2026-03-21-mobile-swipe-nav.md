# Mobile Swipe Navigation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the clunky mobile bottom-bar prev/next navigation on project pages with a swipe-to-peek gesture, edge indicators, onboarding animation, and a floating grid button.

**Architecture:** Touch gesture handling on the `<article class="project-page">` element drives hidden preview cards in/out from screen edges. Edge indicators are pure CSS. Onboarding peek is a one-time CSS animation gated by localStorage. Grid button is added to the project page nav. Desktop side-rail nav is untouched.

**Tech Stack:** Vanilla JS (touch events), CSS transforms/transitions, Hugo templates, localStorage

**Spec:** `docs/superpowers/specs/2026-03-21-ux-improvements-design.md` — Section 1

**Execution order:** Implement Plan 2 (UX batch) first — specifically the nav partial extraction (Task 1). Then implement this plan, adding the grid button and swipe markup to the nav partial instead of directly to `single.html`.

---

### Task 1: Add Preview Card Markup and Grid Button to Template

**Files:**
- Modify: `layouts/projects/single.html:1-27`

- [ ] **Step 1: Add data attributes to existing float-nav links**

In `layouts/projects/single.html`, replace the floating prev/next block (lines 20-26) to include data attributes for the swipe cards, and add hidden preview card elements and the grid button:

```html
  <!-- Floating Prev / Next (desktop only, hidden on mobile via CSS) -->
  {{- with .PrevInSection -}}
  <a class="project-float-nav project-float-nav--prev" href="{{ .RelPermalink }}" aria-label="Vorheriges Projekt">&#8249;</a>
  {{- end -}}
  {{- with .NextInSection -}}
  <a class="project-float-nav project-float-nav--next" href="{{ .RelPermalink }}" aria-label="Nächstes Projekt">&#8250;</a>
  {{- end -}}

  <!-- Mobile swipe preview cards (hidden, positioned off-screen) -->
  {{- with .PrevInSection -}}
  <div class="swipe-preview swipe-preview--prev" data-href="{{ .RelPermalink }}">
    <div class="swipe-preview__bg" style="background-image:url('{{ partial "img-url.html" (dict "src" (.Params.thumbnail | default (printf "/images/projects/%s/thumb.jpg" .File.ContentBaseName))) }}')"></div>
    <span class="swipe-preview__title">{{ .Title }}</span>
  </div>
  {{- end -}}
  {{- with .NextInSection -}}
  <div class="swipe-preview swipe-preview--next" data-href="{{ .RelPermalink }}">
    <div class="swipe-preview__bg" style="background-image:url('{{ partial "img-url.html" (dict "src" (.Params.thumbnail | default (printf "/images/projects/%s/thumb.jpg" .File.ContentBaseName))) }}')"></div>
    <span class="swipe-preview__title">{{ .Title }}</span>
  </div>
  {{- end -}}

  <!-- Mobile edge indicators -->
  {{- with .PrevInSection -}}<div class="swipe-edge swipe-edge--left"></div>{{- end -}}
  {{- with .NextInSection -}}<div class="swipe-edge swipe-edge--right"></div>{{- end -}}
```

- [ ] **Step 2: Add grid button to the project page nav**

In the same file, update the nav block (lines 7-16) to add a grid icon link:

```html
<nav class="site-nav scrolled">
  <div class="site-nav__inner">
    <a class="site-nav__brand" href="{{ if eq .Lang "de" }}/{{ else }}/en/{{ end }}">maxlamm</a>
    <div class="site-nav__links">
      <a href="{{ if eq .Lang "de" }}/work/{{ else }}/en/work/{{ end }}" class="active">Work</a>
      <a href="{{ if eq .Lang "de" }}/#about{{ else }}/en/#about{{ end }}">About</a>
      <a href="{{ if eq .Lang "de" }}/#contact{{ else }}/en/#contact{{ end }}">Contact</a>
      <a href="{{ if eq .Lang "de" }}/work/{{ else }}/en/work/{{ end }}" class="site-nav__grid" aria-label="All Projects">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/><rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/></svg>
      </a>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: Verify Hugo builds without errors**

Run: `hugo --minify --gc 2>&1 | tail -5`
Expected: Build succeeds, no template errors

- [ ] **Step 4: Commit**

```bash
git add layouts/projects/single.html
git commit -m "feat: add swipe preview card markup, edge indicators, and grid button to project template"
```

---

### Task 2: Style Swipe Preview Cards, Edge Indicators, and Grid Button

**Files:**
- Modify: `static/css/style.css`

- [ ] **Step 1: Add swipe preview card styles**

Add after the existing `.project-float-nav` block (after line 665 in style.css):

```css
/* --- Mobile Swipe Preview Cards --- */
.swipe-preview {
  display: none; /* shown only on mobile via media query */
}

.swipe-edge {
  display: none; /* shown only on mobile via media query */
}

.site-nav__grid {
  display: flex;
  align-items: center;
  opacity: .7;
  transition: opacity .2s, color .3s;
}
.site-nav__grid:hover {
  opacity: 1;
  color: var(--accent);
}
```

- [ ] **Step 2: Add mobile-specific styles in the responsive block**

Inside the `@media (max-width: 768px)` block (after the existing `.project-float-nav` rules around line 1211), replace the mobile float-nav styles:

```css
  /* Hide desktop float-nav on mobile */
  .project-float-nav {
    display: none;
  }

  /* Swipe edge indicators */
  .swipe-edge {
    display: block;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 40vh;
    background: var(--accent);
    opacity: .25;
    border-radius: 2px;
    z-index: 50;
    pointer-events: none;
    transition: opacity .3s;
  }
  .swipe-edge--left { left: 4px; }
  .swipe-edge--right { right: 4px; }

  /* Swipe preview cards */
  .swipe-preview {
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 75vw;
    z-index: 200;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    pointer-events: none;
    will-change: transform;
    transition: none; /* JS controls transitions */
  }
  .swipe-preview--prev {
    left: 0;
    transform: translateX(-100%);
    border-radius: 0 12px 12px 0;
  }
  .swipe-preview--next {
    right: 0;
    transform: translateX(100%);
    border-radius: 12px 0 0 12px;
  }
  .swipe-preview__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(.5);
  }
  .swipe-preview__title {
    position: relative;
    z-index: 1;
    padding: 2rem 1.5rem;
    color: var(--text-white);
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: .03em;
  }

  /* Onboarding peek animation */
  @keyframes swipePeek {
    0%   { transform: translateX(100%); }
    30%  { transform: translateX(calc(100% - 40px)); }
    70%  { transform: translateX(calc(100% - 40px)); }
    100% { transform: translateX(100%); }
  }
  .swipe-preview--next.peek-onboard {
    animation: swipePeek 1.8s ease-in-out forwards;
  }

  /* Snap-back transition class (added by JS after release) */
  .swipe-preview.snap-back {
    transition: transform .3s ease-out;
  }
```

- [ ] **Step 3: Remove old mobile float-nav styles**

Delete the existing mobile `.project-float-nav` rules (lines 1180-1211 approximately — the block that sets `bottom: 0`, `width: 50%`, etc.) since we replaced them above.

- [ ] **Step 4: Verify Hugo builds and CSS is valid**

Run: `hugo server -D &` then check a project page on mobile viewport in browser.

- [ ] **Step 5: Commit**

```bash
git add static/css/style.css
git commit -m "style: add swipe preview cards, edge indicators, grid button, remove old mobile bottom bar"
```

---

### Task 3: Implement Swipe Gesture Handler

**Files:**
- Modify: `static/js/main.js:7-16` (replace mobile float-nav auto-hide code)

- [ ] **Step 1: Remove old mobile float-nav auto-hide code**

Delete lines 7-16 in `main.js` (the `floatNavs` block):

```js
  /* --- Mobile project nav auto-hide --- */
  const floatNavs = document.querySelectorAll('.project-float-nav');
  if (floatNavs.length && window.innerWidth <= 768) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      floatNavs.forEach(el => el.classList.toggle('nav-hidden', currentY > lastY && currentY > 80));
      lastY = currentY;
    }, { passive: true });
  }
```

- [ ] **Step 2: Add swipe gesture handler**

Add the following in place of the removed code:

```js
  /* --- Mobile swipe navigation between projects --- */
  const prevCard = document.querySelector('.swipe-preview--prev');
  const nextCard = document.querySelector('.swipe-preview--next');

  if ((prevCard || nextCard) && window.innerWidth <= 768) {
    const page = document.querySelector('.project-page');
    if (!page) return;

    let startX = 0, startY = 0, deltaX = 0, tracking = false, locked = false;
    const LOCK_THRESHOLD = 10; // px before deciding horizontal vs vertical
    const COMMIT_RATIO = 0.4; // swipe 40% of viewport to commit
    const DAMPING = 0.8; // parallax resistance

    page.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      deltaX = 0;
      tracking = true;
      locked = false;
      // Remove snap-back transition for immediate finger tracking
      prevCard?.classList.remove('snap-back');
      nextCard?.classList.remove('snap-back');
    }, { passive: true });

    page.addEventListener('touchmove', (e) => {
      if (!tracking) return;
      const touch = e.touches[0];
      deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (!locked) {
        if (Math.abs(deltaX) > LOCK_THRESHOLD || Math.abs(deltaY) > LOCK_THRESHOLD) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            locked = true; // horizontal swipe locked
          } else {
            tracking = false; // vertical scroll, bail out
            return;
          }
        } else {
          return; // not enough movement yet
        }
      }

      e.preventDefault(); // prevent vertical scroll during horizontal swipe

      const dampedDelta = deltaX * DAMPING;
      const card = deltaX > 0 ? prevCard : nextCard;
      if (!card) { tracking = false; return; }

      // Move the card: from off-screen toward center
      if (deltaX > 0 && prevCard) {
        // Swiping right → prev card slides in from left
        const offset = Math.max(-prevCard.offsetWidth, -prevCard.offsetWidth + dampedDelta);
        prevCard.style.transform = `translateX(calc(-100% + ${Math.max(0, dampedDelta)}px))`;
      } else if (deltaX < 0 && nextCard) {
        // Swiping left → next card slides in from right
        nextCard.style.transform = `translateX(calc(100% - ${Math.max(0, -dampedDelta)}px))`;
      }

      // Fade edge indicators while swiping
      const edges = document.querySelectorAll('.swipe-edge');
      edges.forEach(el => el.style.opacity = '0');
    }, { passive: false });

    page.addEventListener('touchend', () => {
      if (!tracking || !locked) { tracking = false; return; }
      tracking = false;

      const vw = window.innerWidth;
      const committed = Math.abs(deltaX) / vw >= COMMIT_RATIO;
      const card = deltaX > 0 ? prevCard : nextCard;

      if (committed && card) {
        // Commit: slide card fully in, then navigate
        card.classList.add('snap-back');
        card.style.transform = 'translateX(0)';
        const href = card.dataset.href;
        setTimeout(() => { window.location.href = href; }, 200);
      } else {
        // Snap back
        if (prevCard) { prevCard.classList.add('snap-back'); prevCard.style.transform = 'translateX(-100%)'; }
        if (nextCard) { nextCard.classList.add('snap-back'); nextCard.style.transform = 'translateX(100%)'; }
        // Restore edge indicators
        setTimeout(() => {
          document.querySelectorAll('.swipe-edge').forEach(el => el.style.opacity = '');
        }, 300);
      }
    }, { passive: true });
  }
```

- [ ] **Step 3: Test swipe gesture on mobile viewport**

Open a project page in Chrome DevTools mobile emulation (iPhone 14 Pro). Verify:
- Swipe right shows prev project card sliding in from left
- Swipe left shows next project card from right
- Release before 40% snaps back
- Release after 40% navigates to the project
- Vertical scrolling still works normally
- Edge indicators fade during swipe

- [ ] **Step 4: Commit**

```bash
git add static/js/main.js
git commit -m "feat: add swipe-to-peek gesture handler for mobile project navigation"
```

---

### Task 4: Implement Onboarding Peek Animation

**Files:**
- Modify: `static/js/main.js` (add after the swipe handler)

- [ ] **Step 1: Add onboarding animation logic**

Add this block right after the swipe handler's closing `}`:

```js
  /* --- Swipe onboarding peek (first visit only) --- */
  if (nextCard && window.innerWidth <= 768 && !localStorage.getItem('swipe-nav-seen')) {
    setTimeout(() => {
      nextCard.classList.add('peek-onboard');
      nextCard.addEventListener('animationend', () => {
        nextCard.classList.remove('peek-onboard');
        localStorage.setItem('swipe-nav-seen', '1');
      }, { once: true });
    }, 1500);
  }
```

- [ ] **Step 2: Test onboarding animation**

1. Clear localStorage: `localStorage.removeItem('swipe-nav-seen')` in DevTools console
2. Reload a project page on mobile viewport
3. After 1.5s, the right preview card should peek in ~40px, pause, slide back
4. Reload again — animation should NOT play (localStorage flag set)

- [ ] **Step 3: Commit**

```bash
git add static/js/main.js
git commit -m "feat: add one-time onboarding peek animation for swipe navigation"
```

---

### Task 5: Final Testing and Cleanup

**Files:**
- All modified files

- [ ] **Step 1: Test full flow on mobile**

On Chrome DevTools mobile emulation (375px width):
1. Open homepage → navigate to a project
2. Verify edge indicators visible on sides
3. First visit: onboarding peek animation plays
4. Swipe right → prev card peeks in with thumbnail + title
5. Release early → snap back
6. Swipe left past 40% → navigates to next project
7. Grid icon in nav → goes to /work/
8. Vertical scroll works without triggering horizontal swipe

- [ ] **Step 2: Test desktop is unaffected**

On desktop viewport (>768px):
1. Side-rail prev/next hover areas still work
2. No swipe preview cards visible
3. No edge indicators visible
4. Grid icon in nav works

- [ ] **Step 3: Test edge cases**

1. First project in list: no left edge indicator, no prev card, right swipe does nothing
2. Last project in list: no right edge indicator, no next card, left swipe does nothing
3. Project with only one neighbor: only one direction works

- [ ] **Step 4: Production build**

Run: `hugo --minify --gc 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 5: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: mobile swipe nav cleanup and final polish"
```
