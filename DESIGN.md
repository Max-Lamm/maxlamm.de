---
name: maxlamm
description: Cinematographer & Colorist Portfolio — eine dunkle Grading-Suite, in der das Werk leuchtet und ein einziger Akzent glüht.
colors:
  ink-black: "#1a1a1a"
  ink-black-deep: "#141414"
  surface-card: "#222222"
  text-body: "#d4d4d4"
  text-muted: "#999999"
  text-white: "#f0f0f0"
  accent-ember: "#E8554E"
  accent-ember-deep: "#c94a3f"
  border-hairline: "#2a2a2a"
  border-mid: "#333333"
  border-field: "#444444"
typography:
  display:
    fontFamily: "'Work Sans', sans-serif"
    fontSize: "85px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.06em"
  headline:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  title:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
  body:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "'Raleway', sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "3px"
rounded:
  none: "0"
  sm: "2px"
  md: "3px"
  lg: "6px"
  xl: "8px"
spacing:
  label: "0.3rem"
  sm: "0.75rem"
  md: "1.5rem"
  gap: "2rem"
  gutter: "4rem"
  section: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-ember}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-ember-deep}"
    textColor: "{colors.ink-black}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent-ember}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  button-outline-hover:
    backgroundColor: "{colors.accent-ember}"
    textColor: "{colors.ink-black}"
  filter-badge:
    backgroundColor: "transparent"
    textColor: "{colors.accent-ember}"
    rounded: "{rounded.md}"
    padding: "3px 9px"
  filter-badge-active:
    backgroundColor: "{colors.accent-ember}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.md}"
    padding: "3px 9px"
  section-label:
    textColor: "{colors.accent-ember}"
    typography: "{typography.label}"
---

# Design System: maxlamm

## Overview

**Creative North Star: "The Grading Suite"**

Das System denkt wie ein abgedunkelter Colorist-Raum. Die Wände sind fast schwarz,
damit nichts vom Bild ablenkt; das Werk (Video, Stills) trägt die Seite, und das
Interface zieht sich bewusst zurück. Genau ein warmer Akzent glüht durch dieses
Dunkel, ein sattes Ember-Rot, das für Aktion, Aktivität und Handschrift steht.
Diese Sparsamkeit ist der Punkt: Ein Raum, in dem nur eine Lichtquelle brennt,
lenkt den Blick verlässlich dorthin, wo er hin soll.

Typografie führt, nicht Dekoration. Raleway trägt fast alles (Fließtext,
Navigation, Überschriften, Labels), Work Sans kommt ausschließlich für den großen
Hero-Moment. Flächen sind flach und ruhig; Tiefe entsteht durch abgestufte
Schwarztöne und dunkle Verläufe über Medien, nicht durch schwebende Karten oder
Schlagschatten. Media-Kacheln laufen randlos, ohne Radius; der Rahmen ist das Bild.

Bewusst abgelehnt wird die generische „AI-Ästhetik": Pastellverläufe als
Deko-Flächen, alles rund, Emoji-Bullets, mehrere konkurrierende Akzentfarben. Das
hier ist präzise, dunkel, kontrastreich und zurückgenommen.

**Key Characteristics:**
- Dark-only: ein durchgehend dunkler Raum, kein Light-Theme auf der Live-Seite.
- Genau ein Akzent (Ember-Rot `#E8554E`), sparsam eingesetzt.
- Typografiegetrieben, near-white statt reinweiß, viel Weißraum (hier: Schwarzraum).
- Medien randlos und flach; Tiefe nur über tonale Abstufung und Verläufe.

## Colors

Eine near-black Bühne mit einer einzigen warmen Lichtquelle. Kein zweiter Farbton
konkurriert; die gesamte Hierarchie entsteht aus Schwarzabstufungen und Grauwerten.

### Primary
- **Ember-Rot** (`#E8554E`): Der einzige Akzent. CTAs, Links, aktive Zustände,
  Section-Labels, Kategorie-Marker, Fokus-Unterstriche im Formular. Bewusst selten.
- **Ember Tief** (`#c94a3f`): Ausschließlich der Hover-/Active-Zustand des Akzents.

### Neutral
- **Ink Black** (`#1a1a1a`): Basis-Seitenhintergrund.
- **Ink Black Tief** (`#141414`): Tiefere Sektionen (About, Contact, Footer).
- **Surface Card** (`#222222`): Karten, Modals, Lightbox, erhöhte Flächen.
- **Text White** (`#f0f0f0`): Überschriften und wichtigster Text. Nie reines `#fff`.
- **Text Body** (`#d4d4d4`): Fließtext.
- **Text Muted** (`#999999`): Sekundärtext, Captions, Metadaten.
- **Hairline** (`#2a2a2a`), **Mid Border** (`#333`), **Field Border** (`#444`):
  Divider, Karten- und Box-Ränder, Formular-Unterstriche (dunkel → heller je näher
  am Eingabefeld).

### Named Rules
**The One Ember Rule.** `#E8554E` ist die einzige Akzentfarbe, in jeder Komposition
maximal ein bis zwei Elemente. Seine Seltenheit ist die Wirkung. Nie einen zweiten
Akzentton einführen.

**The Not-Quite-White Rule.** Überschriften und Highlight-Text sind `#f0f0f0`, nie
reines Weiß. Reinweiß existiert nur in wenigen Overlay-Sonderfällen über Medien.

## Typography

**Display Font:** Work Sans (Fallback: sans-serif) — nur Hero-Skala.
**Body Font:** Raleway (Fallback: sans-serif) — alles andere.

Beide self-hosted, kein CDN. Raleway in 300/400/600/700, Work Sans in 600/700/800.

**Character:** Ruhig, geometrisch, kontrastreich. Raleway Light trägt luftigen
Fließtext (line-height 1.7–1.8), die großen Momente kommen in Versalien mit weitem
Tracking. Der Reiz liegt im Sprung von zarter Leichtschrift zu massiver Versalie.

### Hierarchy
- **Display** (Work Sans 600, `85px`, line-height 1.05, `letter-spacing 0.06em`,
  uppercase): nur der Hero-Titel.
- **Headline** (Raleway 600, `36px`, line-height 1.5, uppercase, `#f0f0f0`):
  Section-Headings (About, Contact).
- **Title** (Raleway 700, `1.1rem`, `letter-spacing 0.06em`, uppercase, `#f0f0f0`):
  Projekt-/Kartentitel.
- **Body** (Raleway 400, `16px`, line-height 1.7): Fließtext; About-Absätze 1.8.
- **Label** (Raleway 600, `11px`, `letter-spacing 3px`, uppercase, Ember): das
  Section-Label, das Signatur-Element (siehe Components).
- **Subtitle** (Raleway 300 *italic*, Ember): Hero-Untertitel, Footer-Subtitle.

### Named Rules
**The Uppercase Signal Rule.** Überschriften, Titel und Labels stehen in Versalien.
Fließtext bleibt gemischt. Versalien markieren Struktur, nie ganze Absätze.

**The Two-Voice Rule.** Work Sans spricht ausschließlich in Hero-Größe. Alles unter
dem Hero gehört Raleway. Work Sans nie für Fließtext oder kleine Headings einsetzen.

## Layout

Zentrierte Spalte, großzügig atmend. Container `max-width 1100px` für volle
Sektionen, `900px` für Artikel-/Projektdetail-Text, jeweils mittig, seitliches
Padding `2rem` (`--gap`). Vertikaler Sektionsrhythmus `6rem` (96px) für die großen
Blöcke (About, Contact, Footer), knapper (3–4rem) für Listen/Filter.

About als 2-Spalten-Grid (`1fr 1fr`, Gap `4rem`). Das Portfolio-Grid ist gemischt:
Landscape-Karten spannen 2 Spalten (`aspect-ratio 16/9`), Portrait-Karten 1 Spalte
(`aspect-ratio 9/16`); Homepage 3–4 Spalten Desktop, 2 mobil.

Navigation ist `position: fixed`. Über dem Hero sitzt sie am unteren Rand und
slidet ein; beim Scrollen wird sie zur oben fixierten Leiste.

**Breakpoints:** `768px`, `640px`, `480px`. Grids kollabieren zu 2 bzw. 1 Spalte,
About wird einspaltig.

## Elevation & Depth

Flach als Grundzustand. Tiefe entsteht **tonal** (Schichtung `#1a1a1a` → `#141414`
→ `#222`) und über **dunkle Verläufe** auf Medien, nicht über Schlagschatten.
Schatten treten nur als Reaktion auf Zustand oder als echtes Overlay auf.

### Shadow Vocabulary
- **Scrolled Nav** (`box-shadow: 0 1px 20px rgba(0,0,0,.4)` + `backdrop-filter:
  blur(10px)`): die einzige Chrome-Erhebung, erscheint erst beim Scroll.
- **Lightbox** (`box-shadow: 0 8px 32px rgba(0,0,0,.5)`): modales Medien-Overlay.
- **Cookie Modal** (`box-shadow: 0 4px 24px rgba(0,0,0,.6)`): Klaro-Consent.

### Named Rules
**The Flat-Until-State Rule.** Flächen ruhen flach. Schatten erscheint nur bei
Zustand (gescrollte Nav) oder bei echten Overlays (Lightbox, Modal). Keine
schwebenden Karten, keine Deko-Schatten im Ruhezustand.

## Shapes

Zweierlei Formensprache nach Funktion. **Medien laufen randlos, ohne Radius**
(`aspect-ratio`-Boxen, `overflow: hidden`), der Bildrahmen ist die Form. **Interaktive
Elemente** tragen weiche kleine Radien: Buttons/Badges `3px`, About-Bild `2px`.
**Erhöhte Modals** etwas mehr: Lightbox `8px`, Cookie-Modal `6px`. **Formularfelder**
haben Radius `0` und sind reine Unterstriche statt Boxen.

### Named Rules
**The Edge-to-Edge Frame Rule.** Projekt-Medien haben keinen Radius und keinen
sichtbaren Rahmen. Titel und Kategorie leben als Overlay im unteren Bildverlauf.

**The Underline Field Rule.** Eingabefelder sind Unterstriche (`border-bottom`), nie
umrandete Boxen. Beim Fokus wächst der Ember-Unterstrich aus der Mitte auf volle
Breite.

## Components

### Buttons
- **Shape:** weich, `3px` Radius (`--rounded-md`).
- **Outline (`.btn--outline`):** der gemeinsame Button-Look der Startseite (Hero-CTA,
  „weitere Projekte", Kontakt-Submit). Transparent, Ember-Text und `1px` Ember-Rand,
  Padding `0.75rem 2rem`, Raleway 600, `letter-spacing 0.03em`.
- **Hover:** füllt Ember (`#E8554E`), Text wird near-black (`#1a1a1a`),
  `translateY(-1px)`, `transition .2s`. Nie reinweißer Text auf der Füllung.
- **Primary solid (`.btn` ohne Modifier):** solide Ember-Füllung mit near-black Text.
  Basisklasse, außerhalb der Startseite verfügbar.
- **`.btn--hero`:** trägt nur noch die Position über dem Still (`margin-top`).
- **State-Varianten (Formular):** `--sending` (pulse), `--success` (volle Breite +
  scalePulse), `--error` (shake).

### Chips / Filter Badges
- **Style:** `padding 3px 9px`, `font-size 10px`, `letter-spacing 1.5px`, Radius
  `3px`, uppercase. Base solide Ember-Füllung (`.badge`); `.badge--outline` invertiert
  zu transparentem Grund mit Ember-Rand.
- **State:** Hover und `.active` → solide Ember-Füllung, dunkler Text. Filter für
  `colorist` / `cinematographer`, aktiver Filter wird in der URL persistiert.

### Cards / Containers
- **Corner Style:** Medien-Karten randlos, Radius `0`; erhöhte Panels `6–8px`.
- **Background:** Karten/Modals `#222`.
- **Shadow Strategy:** flach (siehe Elevation), Overlay-Schatten nur bei Lightbox.
- **Project Card:** `aspect-ratio`-Medienkachel, `img` skaliert bei Hover auf 1.05,
  unterer Verlauf `linear-gradient(to top, rgba(0,0,0,.8) 0%, … transparent 100%)`,
  Titel Raleway 700 uppercase. Home-Variante blendet das Overlay erst bei Hover ein,
  zentriert.

### Inputs / Fields
- **Style:** transparent, `border-bottom: 1px #444`, Radius `0`, kein Kasten.
- **Floating Label:** liegt im Feld, wandert bei Fokus/Befüllung nach oben (`.75rem`).
- **Focus:** Ember-Unterstrich wächst aus der Mitte auf 100% (`::after`, `.3s ease`),
  Label und Randfarbe wechseln auf Ember.

### Navigation
- **Style:** `position: fixed`, transparent über dem Hero (unten sitzend, slidet
  ein), beim Scroll `rgba(20,20,20,.95)` + `backdrop-filter: blur(10px)` + Schatten.
- **Links:** Raleway, gedämpft, Ember bei Hover/`.active`. DE/EN-Sprachumschalter.

### Footer
- **Style:** `#141414`, zentriert. Wortmarke „maxlamm" in Ember (Raleway 700),
  Subtitle Raleway 300 italic. Social- und Rechts-Links gedämpft, Ember bei Hover.
- **Logo-Fallback (`.footer-logo__icon`, aktuell ungenutzt):** 50px-Quadrat,
  Ember-Grund, Radius `4px`, `rotate(-5deg)`, weißes Glyph zentriert.

### Section Label (Signature Component)
Kleines Versal-Label in Ember mit dünnem unterem Rand (`border-bottom: 1px #2a2a2a`),
`font-size 11px`, `letter-spacing 3px`, Raleway 600. Das wiederkehrende Signatur-
Element, das Sektionen und Blöcke markiert.

## Do's and Don'ts

### Do:
- **Do** den Akzent `#E8554E` maximal ein- bis zweimal pro Komposition setzen (The
  One Ember Rule).
- **Do** Überschriften in `#f0f0f0` statt reinweiß halten (The Not-Quite-White Rule).
- **Do** Work Sans nur in Hero-Größe verwenden, Raleway für alles andere.
- **Do** Medien randlos und flach zeigen, Titel als Overlay im unteren Verlauf.
- **Do** Eingabefelder als Unterstriche gestalten, Fokus wächst aus der Mitte.
- **Do** Tiefe tonal aufbauen (`#1a1a1a`/`#141414`/`#222`), Schatten nur bei Zustand.

### Don't:
- **Don't** einen zweiten Akzentton einführen oder mehrere Farben konkurrieren lassen.
- **Don't** schwere Schlagschatten oder „schwebende Karten" im Ruhezustand verwenden.
- **Don't** Medienkacheln abrunden oder mit sichtbarem Rahmen versehen.
- **Don't** reines `#fff` für Überschriften nutzen.
- **Don't** Emoji, Deko-Icons, Pastellverläufe oder Textur-Hintergründe einsetzen.
- **Don't** einen hellen Modus auf der Live-Seite mischen (dark-only; Light lebt nur
  im maxlamm-brand-Skill für Tools/Dokumente).
