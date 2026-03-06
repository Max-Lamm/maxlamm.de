├── hugo.toml                     # Haupt-Config (Sprachen, Menüs, Params)
├── archetypes/projects.md        # Template für `hugo new projects/xyz.md`
├── content/
│   ├── de/
│   │   ├── _index.md             # Homepage About-Text (DE)
│   │   ├── projects/             # Projekte (DE)
│   │   └── pages/                # Impressum, AGB, etc.
│   └── en/                       # Gleiche Struktur für EN
├── layouts/
│   ├── _default/
│   │   ├── baseof.html           # Base-Wrapper (head, body, lightbox, scripts)
│   │   ├── single.html           # Statische Seiten
│   │   └── list.html             # Kategorie/Tag-Archive
│   ├── partials/
│   │   └── footer.html           # Globaler Footer
│   ├── projects/
│   │   └── single.html           # Projekt-Detailseite
│   └── index.html                # Homepage
├── static/
│   ├── css/style.css             # Gesamtes CSS (kein SCSS!)
│   ├── js/main.js                # Scroll-Verhalten, Lightbox, Kontaktformular
│   └── images/                   # Alle Bilder
│       ├── portrait.jpg          # About-Foto
│       ├── favicon.svg
│       └── projects/             # Pro Projekt ein Unterordner
│           └── porsche-roads/
│               ├── thumb.jpg     # Grid-Thumbnail (768×432)
│               ├── 01.jpg        # Galerie-Bilder
│               └── ...
├── deploy.sh                     # Build + rsync zu Uberspace
└── migrate.sh                    # Erstellt Markdown-Templates aus WP-Slug-Liste