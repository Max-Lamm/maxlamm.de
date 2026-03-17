# maxlamm.de — Hugo Portfolio Site

Zweisprachige (DE/EN) Portfolio-Website für Cinematographer & Colorist Maximilian Lamm. Gebaut mit Hugo, deployed auf Uberspace via rsync.

## Commands

```bash
hugo server -D          # Dev-Server auf localhost:1313 (inkl. Drafts)
hugo --minify --gc      # Production Build → public/
./deploy.sh             # Build + rsync zu Uberspace (test.maxlamm.de)
hugo new projects/xyz.md  # Neues Projekt anlegen (nutzt archetypes/projects.md)
```

## Projektstruktur

```
├── hugo.toml                     # Haupt-Config (Sprachen, Menüs, Params)
├── archetypes/projects.md        # Template für neue Projekte
├── content/
│   ├── de/
│   │   ├── _index.md             # Homepage About-Text (DE)
│   │   ├── projects/             # Projekte (DE) — Permalink: /work/<slug>/
│   │   └── pages/                # Impressum, AGB, Datenschutz, Edit Conform
│   └── en/                       # Gleiche Struktur für EN
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # Base-Wrapper (head, body, Klaro Cookie-Banner, scripts)
│   │   ├── single.html           # Statische Seiten (pages/)
│   │   └── list.html             # Kategorie/Tag-Archive
│   ├── partials/
│   │   ├── footer.html           # Globaler Footer
│   │   ├── img-url.html          # Bildpfad-Helper (Hugo-Assets vs. static)
│   │   ├── thumb.html            # Thumbnail-Rendering mit Image Processing
│   │   └── vimeo-src.html        # Vimeo-URL-Extraktion aus Embed-Links
│   ├── pages/
│   │   └── edit-conform.html     # Edit Conform Seite (Custom Layout)
│   ├── projects/
│   │   ├── list.html             # /work/ Portfolio-Grid
│   │   └── single.html           # Projekt-Detailseite
│   └── index.html                # Homepage
├── static/
│   ├── css/style.css             # Gesamtes CSS (kein SCSS!)
│   ├── js/
│   │   ├── main.js               # Scroll-Verhalten, Lightbox, Kontaktformular
│   │   └── klaro-config.js       # Cookie-Consent Konfiguration (Klaro.js)
│   ├── fonts/                    # Lokal gehostete Webfonts (Raleway, Work Sans)
│   ├── contact/                  # Kontaktformular-Backend (PHP)
│   ├── email-handler/            # E-Mail-Versand-Backend (PHP)
│   └── images/
│       ├── portrait.jpg
│       ├── favicon.svg
│       └── projects/<slug>/      # Pro Projekt ein Unterordner
│           ├── thumb.jpg         # Grid-Thumbnail (768×432)
│           └── 01.jpg, 02.jpg…   # Galerie-Bilder
├── deploy.sh                     # Build + rsync zu Uberspace
└── migrate.sh                    # Erstellt Markdown-Templates aus WP-Slug-Liste
```

## Neues Projekt anlegen

1. Markdown-Datei in `content/de/projects/` (und ggf. `content/en/projects/`) erstellen
2. Bilder nach `static/images/projects/<slug>/` legen
3. `thumb.jpg` (768×432) als Grid-Thumbnail
4. `translationKey` in DE und EN auf denselben Wert setzen → verbindet Sprachversionen

### Front-Matter-Referenz

```yaml
---
title: "Projekttitel"
date: 2024-01-01          # Sortierreihenfolge im Grid (neuere = weiter oben)
draft: false
featured: false           # true = erscheint im Featured-Bereich der Homepage
thumbnail: "/images/projects/<slug>/thumb.jpg"
orientation: landscape    # landscape (default) | portrait (für Hochformat-Video-Paare)
categories:
  - colorist              # colorist | dop | weitere
types:
  - commercial            # commercial | documentary | branded-content | social media
videos:
  - "https://vimeo.com/VIDEOID/hash"
  - "https://www.youtube.com/watch?v=VIDEOID"
video_posters:            # Optional: individuelle Poster pro Video (sonst thumb.jpg)
  - "/images/projects/<slug>/poster-01.jpg"
video_size: large         # large (default) | medium | small — nur bei landscape, einzelnem Video
credits:
  - role: Kunde
    name: Firmenname
  - role: Grading
    name: Maximilian Lamm
gallery:
  - "/images/projects/<slug>/01.jpg"
gallery_columns: 3        # Spaltenanzahl im Galerie-Grid (default: 3)
translationKey: "project-slug"  # Verknüpft DE/EN-Version miteinander
---
```

## Video-Logik (projects/single.html)

| Konstellation | Darstellung |
|---|---|
| `orientation: portrait` | Alle Videos nebeneinander als Hochformat-Paar |
| `orientation: landscape` + 4 Videos | 2×2 Grid (`project-video-grid`) |
| `orientation: landscape` + 1–3 Videos | Untereinander, Breite per `video_size` |

Videos werden als Poster-Bild gerendert und erst beim Klick geladen (Privacy-freundlich). YouTube nutzt `youtube-nocookie.com`.

## Konventionen

- **CSS**: Alles in `static/css/style.css` — kein SCSS, kein Build-Step
- **Bilder**: Immer unter `/images/projects/<slug>/`, Thumbnails 768×432px
- **Permalinks**: Projekte erscheinen unter `/work/<slug>/` (konfiguriert in `hugo.toml`)
- **Sprachen**: DE ist Default (kein `/de/`-Prefix), EN unter `/en/`
- **Credits**: Leere `name`-Felder werden im Template übersprungen — Credits-Einträge ohne Namen einfach weglassen
- **Cookie-Banner**: Klaro.js, Fonts werden lokal eingebunden (kein CDN)

## /new-project — Automatisierter Projekt-Workflow

Neues Projekt per `/new-project` Skill erstellen. Der Skill enthält alle Details zu Textgenerierung, Front-Matter-Regeln und Instagram-Captions.

**Kurzablauf:** `new-project-input.md` ausfüllen → `/new-project` → Review → Commit + Deploy

**Dateien:**
- `new-project-input.md` — Eingabe-Template (wiederverwendbar)
- `crew-handles.md` — Name → Instagram-Handle Mapping

## Gotchas

- **Hugo Module Mounts**: `hugo.toml` mountet `static/images` zusätzlich nach `assets/images` — dadurch funktioniert Hugo Image Processing auf statische Bilder. Beim Ändern der Mounts darauf achten, dass beide Pfade konsistent bleiben.
- **`resources/_gen/`**: Enthält gecachte Ergebnisse von Hugo Image Processing. Kann gelöscht werden, wird beim nächsten Build neu generiert.
- **Fonts sind self-hosted**: Raleway + Work Sans liegen in `static/fonts/` — kein CDN, kein externer Request. Neue Font-Weights dort ablegen und in `baseof.html` referenzieren.

## Workflow

Nach jeder abgeschlossenen Aufgabe automatisch:
1. `git add` der geänderten Dateien (gezielt, keine Binaries/`public/`)
2. `git commit` mit sinnvoller Commit-Message
3. `git push origin master`
4. `./deploy.sh` (Hugo Build + rsync zu Uberspace)

Ausnahme: Reine Recherche/Analyse ohne Dateiänderungen → kein Commit.
