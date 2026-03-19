# maxlamm.de — Hugo Portfolio

Schlanke Portfolio-Website basierend auf Hugo. Ersetzt das WordPress/Elementor-Setup durch eine statische Seite, die aus Markdown-Dateien generiert wird.

## Voraussetzungen

- [Hugo](https://gohugo.io/installation/) (Extended Version, v0.128+)
  ```bash
  # macOS
  brew install hugo
  
  # Linux
  sudo snap install hugo
  ```

## Projektstruktur

```
maxlamm-hugo/
├── hugo.toml                    # Konfiguration (Sprachen, Menüs, Params)
├── deploy.sh                    # Build + Deploy auf Uberspace
├── archetypes/
│   └── projects.md              # Template für neue Projekte
├── content/
│   ├── de/                      # Deutsche Inhalte
│   │   ├── _index.md            # Homepage (About-Text)
│   │   ├── projects/            # Projekt-Markdown-Dateien
│   │   │   ├── _index.md
│   │   │   ├── porsche-roads.md
│   │   │   └── ...
│   │   └── pages/               # Statische Seiten (Impressum, AGB, etc.)
│   └── en/                      # English content (gleiche Struktur)
├── layouts/                     # HTML Templates
│   ├── _default/
│   │   ├── baseof.html          # Base wrapper
│   │   ├── single.html          # Statische Seiten
│   │   └── list.html            # Kategorie/Tag-Archive
│   ├── partials/
│   │   └── footer.html
│   ├── projects/
│   │   └── single.html          # Projekt-Detailseite
│   └── index.html               # Homepage
├── static/
│   ├── css/style.css            # Alles CSS
│   ├── js/main.js               # Interaktivität
│   └── images/                  # Bilder
│       ├── portrait.jpg         # Über-mich Foto
│       └── projects/            # Projektbilder
│           ├── porsche-roads/
│           │   ├── thumb.jpg    # Grid-Thumbnail (768x432)
│           │   ├── 01.jpg       # Galerie
│           │   └── ...
│           └── ...
└── public/                      # Wird generiert (nicht einchecken)
```

## Workflow: Neues Projekt hinzufügen

### 1. Markdown-Datei erstellen

```bash
hugo new projects/mein-neues-projekt.md
```

Das erstellt automatisch eine Datei aus dem Archetype mit allen Feldern:

```yaml
---
title: "Mein Neues Projekt"
date: 2025-06-01
draft: false
featured: true          # Auf der Startseite anzeigen?
thumbnail: "/images/projects/mein-neues-projekt/thumb.jpg"
categories:
  - colorist
tags:
  - automotive
  - bmw
videos:
  - "https://vimeo.com/123456789"
credits:
  Kunde: "BMW"
  Produktion: "Monacoframe"
  Grading: "Maximilian Lamm"
gallery:
  - "/images/projects/mein-neues-projekt/01.jpg"
  - "/images/projects/mein-neues-projekt/02.jpg"
translationKey: "mein-neues-projekt"   # Verknüpft DE ↔ EN Version
---

Hier kommt die Projektbeschreibung als normaler Text.

Absätze werden automatisch zu <p> Tags.
```

### 2. Bilder ablegen

```bash
mkdir -p static/images/projects/mein-neues-projekt/
# Thumbnail (16:9, ideal 768x432) und Galerie-Bilder reinkopieren
```

### 3. Lokal testen

```bash
hugo server -D
# → http://localhost:1313
```

### 4. Deployen

```bash
./deploy.sh
```

## Zweisprachigkeit

Jedes Projekt hat ein `translationKey` Feld. Wenn DE und EN den gleichen Key haben, werden sie automatisch verknüpft.

```
content/de/projects/porsche-roads.md  →  translationKey: "porsche-roads"
content/en/projects/porsche-roads.md  →  translationKey: "porsche-roads"
```

## Kategorien

Die drei Hauptkategorien:
- `colorist` / `colorist` (DE/EN)
- `cinematographer` / `cinematographer` (DE/EN)
- `weitere` / `others` (DE/EN)

Werden automatisch als Archiv-Seiten generiert.

## Featured Projekte

Projekte mit `featured: true` erscheinen auf der Startseite. Wenn kein Projekt als featured markiert ist, werden die 12 neuesten angezeigt.

## Kontaktformular

Das Formular sendet aktuell an `/email-handler/`. Du kannst das durch einen der folgenden Dienste ersetzen:

## Technische Details

- **Build-Zeit:** < 1 Sekunde (vs. WordPress PHP-Rendering bei jedem Request)
- **Output:** Reine statische HTML/CSS/JS Dateien
- **Hosting:** Jeder Webserver (Uberspace, Netlify, GitHub Pages, etc.)
- **Keine Datenbank**, keine PHP, keine Updates, keine Sicherheitslücken
- **SEO:** Sauberes HTML, schnelle Ladezeiten, automatische Sitemaps
