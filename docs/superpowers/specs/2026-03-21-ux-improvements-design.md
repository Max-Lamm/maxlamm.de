# UX Improvements — Design Spec

## Context

Portfolio site for cinematographer & colorist Maximilian Lamm. Target audience: potential clients searching for a cinematographer/colorist, or people who receive the URL directly. The site should feel minimal, professional, and functional.

This spec covers 8 UX improvements identified through a full-site review, prioritized by client impact.

---

## 1. Mobile Project Navigation — Swipe with Edge Peek Indicators

### Current State
- Fixed bottom bar with ‹/› arrows, 50% width each
- Hides on scroll down (`nav-hidden` class toggled by JS)
- No project context (just arrows), no "back to grid" shortcut
- Conflicts with iOS Safari bottom browser UI

### Design

**Remove the bottom bar entirely on mobile (≤768px).** Replace with:

**Edge indicators:** Thin vertical accent-colored lines (2-3px, ~40% viewport height, centered) on left/right edges of the project page. Opacity ~0.3, subtle enough to not distract but visible enough to hint at swipeable content.

**Swipe-to-peek gesture:**
- Touch start → track horizontal movement
- As user swipes left/right, a preview card slides in from the corresponding edge
- Preview card shows: project thumbnail as background image, project title overlaid (same style as grid card overlay)
- Card width: ~75% of viewport width
- Parallax feel: card position follows finger with slight resistance (e.g., finger moves 100px, card moves 80px)
- **Commit threshold:** If user swipes past 40% of viewport width, navigate to that project on release. Otherwise, snap back with ease-out animation (~300ms)
- On snap-back, card slides back off-screen

**Onboarding animation (first visit only):**
- On page load (after 1.5s delay), the right-edge preview card peeks in ~40px, pauses 600ms, then slides back out
- Use `localStorage` flag (`swipe-nav-seen`) to show only once
- CSS animation with `translateX`, no JS animation loop needed

**Floating grid button:**
- Small grid icon (2×2 squares) positioned in the top nav bar, right side, next to the language switcher area
- Links to `/work/` (or `/en/work/` on EN pages)
- Same styling as nav links: white, uppercase, subtle
- Visible on both mobile and desktop (useful shortcut everywhere)

**Desktop: no changes.** Keep current side-rail prev/next hover areas. They work well on desktop.

### Files to Modify
- `static/css/style.css` — remove mobile `.project-float-nav` bottom bar styles, add edge indicator styles, add swipe card styles, add grid button styles
- `static/js/main.js` — add touch event handlers for swipe gesture, peek animation, localStorage check, commit/snap-back logic
- `layouts/projects/single.html` — add hidden preview card markup (prev/next thumbnail + title), add grid button to nav, add data attributes for prev/next URLs and thumbnails
- `layouts/_default/baseof.html` — possibly add grid button to nav if it should appear site-wide (but only relevant on project pages)

### Technical Notes
- Use `touchstart`, `touchmove`, `touchend` events (passive where possible)
- Preview card markup: render both prev and next cards as hidden elements with thumbnail background and title. Only the relevant one animates in based on swipe direction.
- Use `transform: translateX()` for GPU-accelerated animation
- Threshold detection: calculate `deltaX / viewportWidth` on `touchend`
- Navigation: `window.location.href = targetUrl` after commit animation completes (~200ms)
- Prevent vertical scroll during horizontal swipe (if `|deltaX| > |deltaY|` after 10px movement, call `preventDefault` on touchmove)

---

## 2. Hero CTA Button

### Current State
- Hero shows name + subtitle + bobbing scroll arrow
- No explicit call-to-action for visitors to browse work
- Scroll arrow (`&#8964;`) links to `#projects` but doesn't look like a button

### Design

**Add a "View Work" / "Projekte ansehen" button below the subtitle.**

- Position: centered, below `.hero__subtitle`, above `.hero__scroll`
- Style: ghost button (transparent background, 1px accent border, accent text)
- Hover: filled accent background, white text
- Links to `#projects` (smooth scroll to featured grid on same page)
- Use existing `.btn` class as base, add `.btn--hero` modifier for ghost variant
- Text: use `hugo.toml` language params — add new param `heroButton` per language

### Files to Modify
- `hugo.toml` — add `heroButton = "Projekte ansehen"` (DE) and `heroButton = "View Work"` (EN)
- `layouts/index.html` — add button element in `.hero__content` after subtitle
- `static/css/style.css` — add `.btn--hero` ghost button variant

---

## 3. Homepage Grid Category Toggle

### Current State
- Homepage shows 9 featured projects (or first 12) without any filtering
- Cinematographer and colorist projects are mixed
- Filtering only available on `/work/` page

### Design

**Add a toggle bar above the homepage project grid.**

- Three options: "All" | "Cinematographer" | "Colorist"
- Style: same as `/work/` filter badges but centered above the grid
- Default: "All" (shows current featured selection)
- Clicking a category filters the displayed cards inline (same FLIP animation as `/work/` page)
- "All" resets to the full featured set

**Implementation approach:** Render ALL featured projects from both categories in the HTML (hidden via CSS class). The toggle shows/hides cards by matching `data-category` attribute on each card. This avoids server-side logic changes.

- Each project card gets a `data-categories` attribute with comma-separated categories
- JS reads the active toggle and applies `card-hidden` class to non-matching cards
- Reuse the existing FLIP animation logic from `main.js` (the `/work/` filter code)

### Files to Modify
- `layouts/index.html` — add toggle markup above `.project-grid`, add `data-categories` to each card, expand display set to include all featured projects from both categories
- `static/css/style.css` — add homepage toggle styles (centered, same badge look)
- `static/js/main.js` — extract FLIP filter logic into reusable function, apply to both `/work/` and homepage toggles

---

## 4. Filter State Persistence on /work/

### Current State
- URL param `?cat=colorist` activates filter on page load (works)
- But navigating to a project and hitting browser back loses the filter state
- JS reads `?cat=` on DOMContentLoaded but doesn't push/replace history state

### Design

**Use `history.replaceState` to persist filter state in the URL.**

- When user clicks a filter badge, update the URL to `/work/?cat=<category>` via `history.replaceState` (no page reload)
- When user clicks "All" / reset, update URL to `/work/` (remove param)
- On back-navigation, the browser restores the URL with `?cat=`, and the existing DOMContentLoaded logic picks it up

This is a minimal change — just add `history.replaceState` calls in the existing filter click handler.

### Files to Modify
- `static/js/main.js` — add `history.replaceState` in filter badge click handler

---

## 5. Contact Form i18n

### Current State
- Button text "Senden" / "Send" is already bilingual (set in Hugo template)
- But JS feedback messages are hardcoded German:
  - `"Sende..."` (sending)
  - `"✓ Gesendet!"` (success)
  - `"Fehler – bitte erneut versuchen"` (error)

### Design

**Read language from `<html lang="...">` attribute and use appropriate strings.**

```js
const lang = document.documentElement.lang || 'de';
const i18n = {
  de: { sending: 'Sende...', sent: '✓ Gesendet!', error: 'Fehler – bitte erneut versuchen' },
  en: { sending: 'Sending...', sent: '✓ Sent!', error: 'Error – please try again' }
};
const t = i18n[lang] || i18n.de;
```

Replace hardcoded strings with `t.sending`, `t.sent`, `t.error`.

### Files to Modify
- `static/js/main.js` — add i18n object, replace hardcoded strings

---

## 6. Language Switcher in Header

### Current State
- Language switcher only in footer (`layouts/partials/footer.html`)
- Uses flag emojis: 🇩🇪 Deutsch | 🇬🇧 English
- No header language toggle on any page

### Design

**Add a compact language toggle to the site nav.**

- Position: right side of `.site-nav__links`, after the last nav link
- Format: "DE | EN" (short, no flags, fits the minimal nav style)
- Current language is accent-colored, other is dim (`--text-light`)
- Links: DE → `/` + current path slug, EN → `/en/` + current path slug
- Use Hugo's `.Translations` to generate the correct URL for the alternate language version

**Applies to all nav instances:** homepage hero nav, project pages scrolled nav, /work/ nav, static pages nav.

### Files to Modify
- `layouts/index.html` — add language links to hero nav
- `layouts/projects/single.html` — add language links to nav
- `layouts/projects/list.html` — add language links to nav
- `layouts/_default/single.html` — add language links to nav
- `static/css/style.css` — add `.site-nav__lang` styles (separator, active color)

### Alternative
Consider extracting the nav into a partial (`partials/nav.html`) to avoid duplicating the language switcher across 4+ templates. This would be a minor refactor but reduces maintenance burden.

---

## 7. Larger Lightbox Close Button

### Current State
- Close button is a `×` character at `font-size: 2rem`, positioned top-right
- No explicit padding or tap target sizing
- Hard to hit on mobile with a thumb

### Design

**Increase tap target to 44×44px minimum (Apple HIG recommendation).**

- Add `min-width: 44px; min-height: 44px` to the close button
- Add padding around the `×` character
- Keep visual size roughly the same but expand the clickable area
- Slightly increase font-size to `2.4rem` for better visibility on mobile

### Files to Modify
- `static/css/style.css` — update `.lightbox__close` (or equivalent) styles

---

## 8. Portrait Video Pair Overflow Fix

### Current State
- `.project-video-pair` uses `display: flex` with `gap: 1.5rem`
- Each `.video-wrapper--portrait` has `flex: 0 0 300px` (fixed 300px width)
- Total: 300 + 300 + 24px gap = 624px + padding
- No responsive rule exists for `.project-video-pair`
- On viewports < ~650px, this overflows horizontally

### Design

**Add responsive breakpoint to scale down or stack portrait videos.**

- At ≤768px: change `flex: 0 0 300px` to `flex: 1 1 auto` with `max-width: calc(50% - 0.75rem)` so both videos share available width equally
- This keeps them side-by-side but scaled to fit
- At ≤400px (very narrow phones): consider stacking vertically (`flex-direction: column`) — but this may make portrait videos very tall. Alternative: keep side-by-side even on small screens, just smaller. Test both.
- Add `overflow: hidden` to `.project-video-pair` as a safety net

**Recommended approach:** Keep side-by-side at all sizes, just let them flex. Portrait videos are inherently narrow so two of them fit well even on 375px screens (each gets ~170px width). The 9:16 aspect ratio is preserved by the `aspect-ratio` property.

### Files to Modify
- `static/css/style.css` — add responsive rules for `.project-video-pair` and `.video-wrapper--portrait` inside the `@media (max-width: 768px)` block

---

## 9. Lightbox Gallery Navigation

### Current State
- Lightbox opens a single full-size image on click
- No way to navigate between gallery images while lightbox is open
- User must close lightbox, click next image, repeat
- Escape key closes lightbox (already implemented)
- No keyboard arrow or swipe support

### Design

**Add prev/next navigation to the lightbox.**

**Arrow buttons:**
- Left/right arrow buttons (`‹` / `›`) on either side of the lightbox image
- Style: semi-transparent white, same glassmorphic feel as video play button
- Position: fixed, vertically centered, ~48px diameter tap targets
- Hide the left arrow on first image, right arrow on last image
- On hover: slightly brighter

**Keyboard support:**
- Left arrow key → previous image
- Right arrow key → next image
- Escape key → close (already works)

**Mobile swipe:**
- Swipe left/right on the lightbox image to navigate
- Same gesture logic as project navigation but simpler (no peek, just immediate transition)
- Transition: crossfade or slide (~200ms)

**Implementation:**
- On lightbox open, capture the index of the clicked image within its `.gallery-grid`
- Store reference to all gallery images as an ordered array
- Prev/next buttons and keyboard/swipe update the current index and swap `lightboxImg.src`
- Preload adjacent images (`new Image().src = ...`) for snappy transitions

### Files to Modify
- `static/js/main.js` — add gallery index tracking, prev/next handlers, keyboard arrow listeners, mobile swipe on lightbox
- `static/css/style.css` — add lightbox arrow button styles, transition animation
- `layouts/_default/baseof.html` — add prev/next button markup to lightbox element (or inject via JS)

---

## Out of Scope

- Trust signals / client logos on homepage (deferred)
- Hero video lazy loading optimization
- Form real-time validation
- Server-side filter fallback for `/work/?cat=`
- 404 page i18n
- Gallery responsive column improvements
