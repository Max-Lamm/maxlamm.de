# Design Spec: Edit-Conform Look — Site-Wide

**Date:** 2026-03-17
**Scope:** maxlamm.de Hugo Portfolio Site
**Approach:** Component-First (Option 1)

---

## Ziel

Den visuellen Look der Edit-Conform-Seite (`/edit-conform`) auf die gesamte Site übertragen. Konkret: aus Edit-Conform-spezifischen `ec-*` CSS-Klassen ein allgemeines Design-System machen und auf Projektseiten sowie statische Seiten anwenden.

---

## Betroffene Bereiche

| Bereich | Dateien |
|---------|---------|
| CSS-Architektur | `static/css/style.css` |
| Edit-Conform Template | `layouts/pages/edit-conform.html` |
| Projektseiten | `layouts/projects/single.html` |
| Statische Seiten (CSS only) | `static/css/style.css` |

---

## Teil 1: CSS-Architektur

### Umbenennungen (ec-* → generisch)

Vier Klassen werden aus dem `ec-`-Namespace herausgelöst und site-weit verfügbar gemacht:

| Alt | Neu | Verwendung |
|-----|-----|------------|
| `.ec-badge` | `.badge` | Kategorie/Typ-Tags auf Projektseiten, Edit-Conform-Tabs |
| `.ec-step-note` | `.note-box` | Hervorhebungsboxen (roter linker Rand) überall |
| `.ec-step-group-label` | `.section-label` | Abschnitts-Überschriften auf Projekt- und statischen Seiten |
| `.ec-limitations` | `.warning-box` | Warnungs-/Einschränkungs-Boxen |

**Badge-Varianten:**
- `.badge` (solid, rot) — Hauptrolle z.B. "Colorist", "DOP"
- `.badge.badge--outline` — Typ z.B. "Commercial"
- `.badge.badge--muted` — weitere Kategorien, grau

### Edit-Conform-spezifisch (bleiben als `ec-*`)

Diese Klassen sind eng mit dem Tab-Switcher und dem Step-Layout verknüpft und werden nicht verallgemeinert:

`.ec-page`, `.ec-workflow-nav`, `.ec-workflow-tab`, `.ec-workflow-content`, `.ec-workflow-section`, `.ec-step`, `.ec-step-number`, `.ec-step-body`, `.ec-step-text`, `.ec-tab-badge`, `.ec-tab-title`, `.ec-tab-desc`

### Neue Klasse: `.info-card` (für Credits entfällt — stattdessen Inline-Rows)

Kein separates Card-Grid — stattdessen schlanke Inline-Zeilen (siehe Teil 2).

---

## Teil 2: Projektseiten (`layouts/projects/single.html`)

### 1. Kategorie-Badges unter dem Titel

Aus `categories` und `types` Front Matter werden Badges gerendert:
- `categories` → `.badge` (solid rot)
- `types` → `.badge.badge--outline` (outline rot)

Platzierung: direkt nach `<h1>`, vor der Beschreibung.

### 2. Credits: Inline-Zeilen statt `dl/dt/dd`

**Vorher:** Definition-Liste, kaum Struktur.

**Nachher:** Schlanke zweispaltige Zeilen mit subtiler Trennlinie:
```html
<div class="project-credits">
  <div class="section-label">Credits</div>
  <div class="credits-list">
    <div class="credit-row">
      <span class="credit-role">Kunde</span>
      <span class="credit-name">Porsche AG</span>
    </div>
    ...
  </div>
</div>
```

CSS: `.credit-role` — uppercase, grau, feste Mindestbreite. `.credit-name` — hell. `.credit-row` — border-bottom: 1px solid #1e1e1e, padding 0.28rem 0.

### 3. Section-Label vor Galerie

`.section-label` vor der Galerie-Section hinzufügen — sofern eine Galerie vorhanden ist. Label-Text hartcodiert im Template: `{{ if eq .Lang "de" }}Galerie{{ else }}Gallery{{ end }}`.

### Unverändert

Video-Logik, Galerie-Grid, Related Projects, Nav, Prev/Next-Navigation.

---

## Teil 3: Statische Seiten (CSS only)

**Keine Template- oder Markdown-Änderungen.**

In `style.css` bekommt `.static-page h2` das visuelle Treatment von `.section-label`:
- `color: var(--accent)`
- `text-transform: uppercase`
- `letter-spacing: 0.1em`
- `font-size: 0.7rem`
- `font-weight: 600`
- `border-bottom: 1px solid #2a2a2a`
- `padding-bottom: 0.3rem`
- `margin: 2rem 0 0.75rem`

Zusätzlich `.static-page h1` etwas mehr `margin-bottom` für klare Absetzung zum Lead-Text.

Betrifft: Impressum, AGB, Datenschutz — alle rendern Markdown mit `h2` für Abschnitte.

---

## Implementierungsreihenfolge

1. **`style.css`** — Klassen umbenennen (`ec-badge → badge` etc.), Badge-Varianten, `.section-label` / `.note-box` / `.warning-box` / `.badge` als generische Klassen definieren; `.credit-row` / `.credits-list` neu hinzufügen; `.static-page h2` upgraden.
2. **`layouts/pages/edit-conform.html`** — 4 Klassenamen ersetzen (`ec-badge`, `ec-step-note`, `ec-step-group-label`, `ec-limitations`), jeweils alle Vorkommen im File (mehrere pro Klasse).
3. **`layouts/projects/single.html`** — Badges-Block nach `<h1>` einfügen; Credits-Block auf neue Inline-Rows umbauen; Section-Label vor Galerie.

---

## Nicht in Scope

- Homepage Hero / About-Bereich
- Navigation
- Projektgrid / Thumbnails
- Neue Seiten oder Hugo-Partials
- JavaScript-Änderungen
