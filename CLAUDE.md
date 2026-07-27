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

## Repo-Notizen

Zwei Dinge, die sich nicht aus dem Verzeichnisnamen ergeben:

- `docs/` — superpowers plans/specs (Planungs-/Spec-Dateien)
- `migrate.sh` — erstellt Markdown-Templates aus einer WordPress-Slug-Liste

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

`new-project-input.md` ausfüllen → `/new-project` → Review im Chat → Commit + Deploy.

Der Skill `.claude/commands/new-project.md` erzeugt die DE/EN-Projektseiten und legt Instagram-Caption plus LinkedIn-Post im Obsidian-Vault `~/Code/BRAIN` ab. Ablauf, Front-Matter-Referenz, Schreibregeln und Vault-Mechanik stehen dort; er lädt nur bei Aufruf. Feldnamen ohne Semantik außerdem in `archetypes/projects.md`. Wichtig zu wissen, ohne den Skill zu öffnen: er stoppt vor jedem Vault-Schreibvorgang und wartet auf Freigabe.

## Skills

Projektnahe Skills (`maxlamm-copy`, `maxlamm-brand`, `maxlamm-replymail`) liegen **user-global** unter `~/.claude/skills/` und werden **nicht mit dem Repo versioniert**. Beschreibungen siehe Skill-Listing. Der repo-eigene `/new-project` unter `.claude/commands/` ist dagegen getrackt.

## Gotchas

- **Hugo Module Mounts**: `hugo.toml` mountet `static/images` zusätzlich nach `assets/images` — dadurch funktioniert Hugo Image Processing auf statische Bilder. Beim Ändern der Mounts darauf achten, dass beide Pfade konsistent bleiben.
- **`resources/_gen/`**: Enthält gecachte Ergebnisse von Hugo Image Processing. Kann gelöscht werden, wird beim nächsten Build neu generiert.
- **Fonts sind self-hosted**: Raleway + Work Sans liegen in `static/fonts/` — kein CDN, kein externer Request. Neue Font-Weights dort ablegen und in `baseof.html` referenzieren.
- **SEO**: `baseof.html` rendert automatisch OG-Tags, canonical URLs und JSON-LD (VideoObject via `schema-video.html`). Das `description`-Front-Matter-Feld befüllt meta description und og:description — bei neuen Projekten immer ausfüllen.
- **`.gitignore`**: schließt `.superpowers/`, `.impeccable/`, `.htaccess`, `.hugo_build.lock` und `new-project-input.md` aus. Bei `.claude/` gilt eine Ausnahme: die Regel lautet `.claude/*` plus `!.claude/commands/`, damit `.claude/commands/new-project.md` versioniert ist und `settings.local.json` trotzdem lokal bleibt. Wichtig: ein pauschales `.claude` würde die Ausnahme aushebeln, weil Git dann gar nicht in das Verzeichnis absteigt.
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
