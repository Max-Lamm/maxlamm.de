# maxlamm.de — Hugo Portfolio Site

Zweisprachige (DE/EN) Portfolio-Website für Cinematographer & Colorist Maximilian Lamm. Gebaut mit Hugo, deployed auf Uberspace via rsync.

## Commands

```bash
hugo server -D          # Dev-Server auf localhost:1313 (inkl. Drafts)
hugo --minify --gc      # Production Build → public/
./deploy.sh             # Build + rsync zu Staging (test.maxlamm.de)
./deploy.sh --prod      # Build + rsync zu Production (maxlamm.de) — mit Bestätigung
hugo new projects/xyz.md  # Neues Projekt anlegen (nutzt archetypes/projects.md)
python generate_agb_pdf.py  # AGB als PDF neu generieren (on-demand, kein statisches PDF)
```

## Projektstruktur

```
├── hugo.toml                     # Haupt-Config (Sprachen, Menüs, Params)
├── archetypes/
│   ├── projects.md               # Template für neue Projekte
│   └── default.md                # Hugo-Default-Archetype
├── generate_agb_pdf.py           # Erzeugt AGB-PDF on-demand (kein statisches PDF im Repo)
├── README.md                     # Projekt-Readme
├── docs/                         # superpowers plans/specs (Planungs-/Spec-Dateien)
├── content/
│   ├── de/
│   │   ├── _index.md             # Homepage About-Text (DE)
│   │   ├── projects/             # Projekte (DE) — Permalink: /work/<slug>/
│   │   └── pages/                # Impressum, AGB, Datenschutz, Edit Conform, jaichwill (Hochzeits-Landingpage, nur DE)
│   └── en/                       # Gleiche Struktur für EN (ohne jaichwill)
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # Base-Wrapper (head, body, Klaro Cookie-Banner, scripts)
│   │   ├── single.html           # Statische Seiten (pages/)
│   │   └── list.html             # Kategorie/Tag-Archive
│   ├── 404.html                  # Custom 404-Seite
│   ├── partials/
│   │   ├── footer.html           # Globaler Footer
│   │   ├── nav.html              # Wiederverwendbare Site-Navigation (Header)
│   │   ├── img-url.html          # Bildpfad-Helper (Hugo-Assets vs. static)
│   │   ├── thumb.html            # Thumbnail-Rendering mit Image Processing
│   │   ├── schema-video.html     # Structured Data (VideoObject JSON-LD) für Projekt-Seiten
│   │   ├── schema-breadcrumb.html  # Structured Data (BreadcrumbList JSON-LD)
│   │   └── vimeo-src.html        # Vimeo-URL-Extraktion aus Embed-Links
│   ├── pages/
│   │   ├── edit-conform.html     # Edit Conform Seite (Custom Layout)
│   │   └── jaichwill.html        # Hochzeits-Landingpage (Custom Layout)
│   ├── projects/
│   │   ├── list.html             # /work/ Portfolio-Grid
│   │   └── single.html           # Projekt-Detailseite
│   └── index.html                # Homepage
├── assets/
│   ├── css/style.css             # Gesamtes CSS (kein SCSS!) — via Hugo Pipes minified + fingerprinted
│   └── js/
│       ├── main.js               # Scroll-Verhalten, Lightbox (inkl. Prev/Next, Keyboard, Swipe), Kontaktformular, Kategorie-Filter
│       └── klaro-config.js       # Cookie-Consent Konfiguration (Klaro.js)
├── static/
│   ├── fonts/                    # Lokal gehostete Webfonts (Raleway, Work Sans)
│   ├── contact/                  # Kontaktformular-Backend (PHP, mit Cloudflare Turnstile)
│   ├── email-handler/            # E-Mail-Versand-Backend (PHP)
│   ├── videos/projects/<slug>.webm  # Hover-Preview-Videos (preview-Front-Matter)
│   ├── .htaccess                 # Apache-Regeln (Uberspace)
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
description: "Kurze Beschreibung für SEO (meta description, OG-Tag)"
featured: false           # true = erscheint im Featured-Bereich der Homepage
thumbnail: "/images/projects/<slug>/thumb.jpg"
preview: "/videos/projects/<slug>.webm"  # Optional: hover preview video (short loop, no audio)
orientation: landscape    # landscape (default) | portrait (für Hochformat-Video-Paare)
categories:
  - colorist              # colorist | cinematographer | weitere
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

- **CSS/JS**: Alles in `assets/css/style.css` bzw. `assets/js/` — kein SCSS; Einbindung via Hugo Pipes (`minify | fingerprint`) in `baseof.html`, dadurch Cache-Busting
- **Hero-Video**: wird nur gerendert wenn `heroVideo = true` in `hugo.toml` `[params]` (optional `heroPoster` für Poster-Bild) — sonst `hero--no-video`-Variante ohne Video-Request
- **Bilder**: Immer unter `/images/projects/<slug>/`, Thumbnails 768×432px
- **Permalinks**: Projekte erscheinen unter `/work/<slug>/` (konfiguriert in `hugo.toml`)
- **Sprachen**: DE ist Default (kein `/de/`-Prefix), EN unter `/en/`
- **Credits**: Leere `name`-Felder werden im Template übersprungen — Credits-Einträge ohne Namen einfach weglassen
- **Cookie-Banner**: Klaro.js, Fonts werden lokal eingebunden (kein CDN)
- **Kategorie-Filter**: Aktiver Filter wird via `history.replaceState` in der URL persistiert (`?cat=colorist`) — kein Seitenreload
- **Rechtliche Seiten (SEO)**: `noindex: true` im Front-Matter → `baseof.html` mischt `noindex` in das globale `robots`-Meta. Gesetzt für AGB, Datenschutz, Impressum, Edit Conform. **Ausnahme**: `ki-vorbehalt.md` / `ai-training-opt-out.md` sind bewusst indexierbar, sonst wäre der Nutzungsvorbehalt für Crawler nicht auffindbar.
- **KI-Trainingsvorbehalt**: dreifach abgesichert. Vertraglich in § 15 AGB (DE + EN), maschinenlesbar über `static/.well-known/tdmrep.json` (TDMRep), die `tdm-reservation`/`tdm-policy`-Meta-Tags in `baseof.html` und die AI-Crawler-Blocks in `layouts/robots.txt`. Die Policy-URL kommt pro Sprache aus `tdmPolicyURL` in `hugo.toml`. Öffentliche Klartext-Fassung unter `/ki-vorbehalt/` bzw. `/en/ai-training-opt-out/`. **Bewusste Entscheidung**: reine Trainings-Crawler (GPTBot, ClaudeBot, CCBot, Google-Extended …) sind blockiert, KI-Such- und Retrieval-Bots (OAI-SearchBot, PerplexityBot, ChatGPT-User …) nicht, damit die Site in KI-Antworten auffindbar bleibt. Neue Crawler-Namen dort nachpflegen.
- **`/pages/`-Sektion**: hat via `build.render: never` (in `content/{de,en}/pages/_index.md`) keine eigene Listenseite — die Seiten sind nur direkt erreichbar.
- **DE/EN-Asymmetrie**: `jaichwill` (Hochzeits-Landingpage) existiert nur auf DE, nicht auf EN.
- **Kontaktformular**: Cloudflare Turnstile als Bot-Schutz (Keys/Config im PHP-Backend unter `static/contact/` beachten).

## /new-project — Automatisierter Projekt-Workflow

Neues Projekt per `/new-project` Skill (`.claude/commands/new-project.md`) erstellen. Der Skill deckt Textgenerierung, Front-Matter-Regeln, Credits-Übersetzung und Social-Texte ab. Alle Details stehen im Skill selbst.

**7-Schritte-Ablauf:**
1. `new-project-input.md` + `crew-handles.md` lesen
2. `content/de/projects/<slug>.md` erstellen
3. `content/en/projects/<slug>.md` erstellen
4. Instagram-Caption (EN) → Notion-Unterseite unter „Instagram Posts - @maxlamm"
5. LinkedIn-Post (DE, kurz) → Notion-Unterseite unter „LinkedIn Posts - @maxlamm"
6. Review im Chat inkl. Notion-Links, auf Freigabe warten
7. Nach Bestätigung: `git add` + `commit` + `push` + `./deploy.sh`

**Schreibregeln (gelten für alle generierten Prosatexte — Portfolio DE/EN, `description`, Caption, LinkedIn):** keine Binde-/Gedankenstriche (`—` / `–`) als Satztrenner (stattdessen Komma, Semikolon oder Satz teilen), keine Bindestrich-Wortkonstruktionen als Stilmittel. Ausnahmen: Eigennamen/Technikbezeichnungen (`RED V-Raptor`, `Hair&Make-Up`), URL-Slugs, Hashtags, Instagram-Handles, Front-Matter-Keys.

**Kurzablauf:** `new-project-input.md` ausfüllen → `/new-project` → Review (inkl. Notion-Links) → Commit + Deploy

**Dateien:**
- `new-project-input.md` — Eingabe-Template (wiederverwendbar, per `.gitignore` ausgeschlossen)
- `crew-handles.md` — Name → Instagram-Handle Mapping

## Skills

Projektnahe Skills liegen **user-global** unter `~/.claude/skills/` (= `/Users/maximilianlamm/.claude/skills/`) — sie werden **nicht mit dem Repo versioniert**:

- `maxlamm-copy` — Homepage-Projekttexte + Instagram-Captions in Max' Stimme
- `maxlamm-brand` — Brand-Guidelines für visuelle Artefakte (Farben, Typografie, Design)
- `maxlamm-replymail` — E-Mail-Antworten in Max' Stimme (Trigger u.a. `/replymail`)
- `cost-estimator` — grobe Kostenschätzung / Budgetrahmen für Videoproduktionen
- `packlist-generator` — Equipment-Packlisten für Drehs (Kamera, Licht/Grip, Ton, Sonstiges)

Der repo-eigene `/new-project` (`.claude/commands/new-project.md`) ist getrackt, siehe oben.

## Gotchas

- **Hugo Module Mounts**: `hugo.toml` mountet `static/images` zusätzlich nach `assets/images` — dadurch funktioniert Hugo Image Processing auf statische Bilder. Beim Ändern der Mounts darauf achten, dass beide Pfade konsistent bleiben.
- **`resources/_gen/`**: Enthält gecachte Ergebnisse von Hugo Image Processing. Kann gelöscht werden, wird beim nächsten Build neu generiert.
- **Fonts sind self-hosted**: Raleway + Work Sans liegen in `static/fonts/` — kein CDN, kein externer Request. Neue Font-Weights dort ablegen und in `baseof.html` referenzieren.
- **SEO**: `baseof.html` rendert automatisch OG-Tags, canonical URLs und JSON-LD (VideoObject via `schema-video.html`). Das `description`-Front-Matter-Feld befüllt meta description und og:description — bei neuen Projekten immer ausfüllen.
- **`.gitignore`**: schließt `.claude/`, `.superpowers/`, `.htaccess`, `.hugo_build.lock` und `new-project-input.md` aus. `settings.local.json` und `new-project-input.md` sind also lokal/unversioniert; `.claude/commands/new-project.md` wird dagegen bewusst getrackt.
- **AGB-PDF**: nicht mehr statisch im Repo — wird on-demand via `generate_agb_pdf.py` erzeugt. Bei AGB-Änderung das Skript neu laufen lassen. Das Skript rendert generisch alle `## §`-Headings und `**N.M**`-Absätze aus beiden `agb.md`, neue Paragraphen brauchen also keine Skriptänderung. Paragraphentitel laufen über `multi_cell` und brechen bei Überlänge um.
- **`.well-known/`**: liegt unter `static/` und wird von Hugo nach `public/` kopiert. Nach einem Deploy prüfen, ob `https://maxlamm.de/.well-known/tdmrep.json` wirklich 200 liefert — Apache kann Dotfolder je nach Serverkonfiguration blocken.
- **`static/llms.txt`**: statische Übersicht für AI-Crawler (Leistungen, Portfolio-Links). Bei neuen Leistungsseiten oder geänderten Kontaktdaten manuell mitpflegen.
- **SEO-Landingpages**: `content/{de,en}/pages/color-grading-*` und `kameramann-muenchen.md`/`cinematographer-munich.md` — verlinkt im Footer, mit `serviceType`/`faq`-Front-Matter für Service-/FAQPage-Schema (`layouts/partials/schema-service.html`). Diese Seiten NICHT auf `noindex` setzen.

## Workflow

Commit, Push und Deploy **nur auf explizite Anfrage** — nicht automatisch nach jeder Aufgabe.

- `git add` gezielt (keine Binaries/`public/`)
- `git commit` mit sinnvoller Commit-Message
- `git push origin master`
- `./deploy.sh` für Staging, `./deploy.sh --prod` für Production
