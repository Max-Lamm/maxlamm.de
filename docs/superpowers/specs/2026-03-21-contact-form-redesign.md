# Contact Form Visual Redesign

## Context

The current contact form on the homepage looks too plain and generic compared to the rest of the site's cinematic, editorial aesthetic. The form uses basic box-bordered transparent inputs with placeholder text and a simple button. This redesign elevates the form to match the site's premium visual language while keeping the structure minimal.

## Design

### Input Fields

**Bottom-border-only inputs:**
- Remove all box borders, keep only a 1px bottom border in `#444`
- On focus: bottom border transitions to 2px `var(--accent)` coral, growing from center outward via a `::after` pseudo-element on the field wrapper
- Background stays fully transparent
- No border-radius (no box = no radius)

**Floating labels:**
- Labels start positioned over the input at placeholder size (0.95rem, `var(--text-light)` #999)
- On focus or when field has content: label animates up above the field, shrinks to ~0.75rem
- Color: shifts to `var(--accent)` on focus, stays `var(--text-light)` when filled but unfocused
- Transition: 0.2s ease for position, size, and color
- Implementation: CSS-only using `:focus` and `:not(:placeholder-shown)` — no JS needed
- HTML change: add `<label>` elements and wrap each field in a `.form-group` container; use `placeholder=" "` (space) to enable the `:placeholder-shown` selector trick

**Textarea:**
- Same bottom-border and floating label treatment
- Min-height: 200px (up from 150px)
- Padding: 1rem

**Form layout:**
- Max-width: 620px (up from 500px)
- Input vertical padding: 1rem
- Gap between fields: ~2rem
- Section padding stays at 6rem vertical

### Success Animation

**Sending state:**
- Button text → "Sende..." / "Sending..."
- Subtle pulse animation (opacity 0.7 → 1 loop)
- CSS class: `.btn--sending`

**Success state:**
- Button expands to full form width (620px) over 0.4s ease-out
- Text fades to "✓ Gesendet!" / "✓ Sent!"
- Brief scale pulse (1.0 → 1.02 → 1.0)
- After 2.5s: bar slides down and fades out
- Form fields reset and fade back in
- CSS class: `.btn--success`

**Error state:**
- Button shakes (translateX keyframe, 3 quick oscillations)
- Text → error message
- Resets after 3s
- CSS class: `.btn--error`

**Implementation:** State logic in JS (extends existing main.js form handler), all animations in CSS via class toggles.

### Files to Modify

| File | Changes |
|------|---------|
| `layouts/index.html` | Add `<label>` elements, `.form-group` wrappers, `placeholder=" "` on inputs |
| `static/css/style.css` | Floating label styles, bottom-border inputs, focus underline pseudo-element, success/error/sending animations, wider form |
| `static/js/main.js` | Add CSS class toggles for button states, morphing width logic, form fade-out/in on success |

### What stays the same

- Form fields: name, email, message (no new fields)
- Hidden honeypot and timestamp fields
- PHP backend — completely untouched
- Submit button base styling (coral bg, Raleway font)
- Section heading and overall section layout
- Mobile responsiveness (form is fluid, will adapt)

## Verification

1. `hugo server -D` — check form renders correctly
2. Test floating labels: click into field → label floats up; type → label stays up; clear → label returns
3. Test focus underline: coral line grows from center on focus, retracts on blur
4. Test form submission with valid data — verify morphing success bar
5. Test error state — verify shake animation
6. Test on mobile viewport (< 480px) — ensure form remains usable
7. Test both DE and EN language versions
