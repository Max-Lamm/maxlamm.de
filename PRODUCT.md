# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primäre Zielgruppe sind Produktionsfirmen, Werbeagenturen und Regisseure bzw.
Kreative, die eine:n DoP und/oder Colorist für ein konkretes Projekt suchen. Sie
kommen mit einem laufenden oder anstehenden Vorhaben (Werbefilm, Imagefilm,
Musikvideo, Social Media Content) und prüfen anhand des Portfolios, ob Handschrift,
Qualität und Erfahrung passen, bevor sie anfragen oder ins Team holen.

## Product Purpose

maxlamm.de ist die zweisprachige (DE/EN) Portfolio-Website von Maximilian Lamm,
Cinematographer (DoP) und Colorist aus München. Sie zeigt sein Werk als Kameramann
und Colorist und macht seine Arbeitsweise nachvollziehbar. Erfolg heißt hier vor
allem Glaubwürdigkeit: Die Seite dient als seriöser Vertrauens- und Referenzanker,
auf den bei Empfehlungen, Direktnachrichten und Pitches verwiesen wird. Anfragen
über das Kontaktformular sind willkommen, aber nicht der alleinige Erfolgsmaßstab.

## Positioning

Maximilian Lamm vereint Kamera und Color Grading in einer Person, von der ersten
Vision bis zum letzten Farbton. Wer beides aus einer Hand bucht, spart Abstimmung
und gewinnt einen konsistenten Look über Dreh und Post. Diese Doppelrolle (DoP und
Colorist zugleich, auf professionellem Niveau in beiden Disziplinen) ist die
Kombination, die ein rein auf eine Disziplin spezialisiertes Angebot nicht
wahrheitsgemäß behaupten kann.

## Operating Context

- Standort München, Projekte deutschlandweit und international (z. B. Social-Media-
  Produktionen auf Island, Kampagnendrehs an der Ostsee).
- Am Set Verantwortung für das Bild von der Lichtsetzung bis zum Datenhandling.
- Color Grading in DaVinci Resolve, remote oder vor Ort.
- Kamera-Setups von RED und Sony.
- Edit-Conform-Workflow als dokumentierte Anlieferungsanleitung für Schnitte, die
  zum Grading kommen.
- Leistungsschwerpunkte: Werbefilm, Imagefilm, Musikvideo, Social Media Content;
  als Colorist auch für fremdgedrehtes Material.

## Capabilities and Constraints

- Statische Website mit Hugo (Extended), zweisprachig DE/EN; DE ist Default ohne
  Prefix, EN unter `/en/`. Sprachversionen sind über `translationKey` verbunden.
- Deployment auf Uberspace via rsync (`deploy.sh` Staging, `deploy.sh --prod`
  Production).
- Projekte liegen als Markdown unter `content/{de,en}/projects/` und erscheinen
  unter `/work/<slug>/`; Homepage-Grid, Kategorie-Filter (colorist / cinematographer)
  per URL persistiert.
- Video-privacyfreundlich: Poster statt Autoload, Klick lädt das Video;
  YouTube via `youtube-nocookie.com`. Hover-Preview-Videos optional (`.webm`).
- Self-hosted Webfonts (Raleway, Work Sans), kein CDN. Cookie-Consent via Klaro.js.
- Kontaktformular mit PHP-Backend und Cloudflare Turnstile als Bot-Schutz.
- SEO: automatische OG-Tags, canonical URLs, JSON-LD (VideoObject, Breadcrumb,
  Service/FAQ auf den Leistungs-Landingpages). Rechtliche Seiten auf `noindex`.
- Terminologie: DoP / Kameramann, Colorist, Color Grading, Edit Conform, Grading.

## Brand Commitments

- Name und Wortmarke: „maxlamm" (Logo-Text), Person: Maximilian Lamm.
- Akzentfarbe `#E8554E` (kanonisch, wie in `assets/css/style.css`).
- Schriften Raleway und Work Sans (self-hosted).
- Stimme persönlich und nahbar („Hey, ich bin Max"), selbstbewusst, ohne Floskeln.
- Verbindliche Schreibregel: keine Binde- oder Gedankenstriche (`—` / `–`) als
  Satztrenner und keine Bindestrich-Wortkonstruktionen als Stilmittel. Ausnahmen:
  Eigennamen und Technikbezeichnungen (z. B. `RED V-Raptor`, `Hair&Make-Up`),
  URL-Slugs, Hashtags, Instagram-Handles, Front-Matter-Keys.
- Persönlichkeitsdetail (auf der Seite genutzt): Sauerteigbrot-Backen als Parallele
  zur Filmarbeit (Geduld, Präzision, Freude am Ergebnis).
- Bestehende Stimm- und Design-Referenzen: die user-globalen Skills `maxlamm-copy`
  (Texte in Max' Stimme) und `maxlamm-brand` (Farben, Typografie, Design).

## Evidence on Hand

- Echte Kundenreferenzen: als DoP gedreht u. a. für BMW, Audi, Generali und
  Sparda-Bank; als Colorist gegradet u. a. für MINI, Porsche und Deutsche Bahn.
- Rund 42 reale Portfolio-Projekte mit Bildern und teils Videos unter
  `content/{de,en}/projects/` und `static/images/projects/<slug>/`.
- Kanäle: Instagram (@maxlamm), LinkedIn (in/maxlamm), Telefon +49 176 69262318,
  Kontaktformular.
- KEINE Testimonials/Kundenzitate, KEINE Presse-/Medien-Nennungen, KEINE Awards
  oder Nominierungen vorhanden. Diese dürfen in künftiger Arbeit nicht erfunden
  oder impliziert werden.

## Product Principles

- Kamera und Farbe gehören zusammen: die Doppelrolle DoP + Colorist ist der Kern
  des Angebots und muss in jeder Darstellung sicht- und glaubhaft bleiben.
- Das Werk trägt: Bewegtbild und echte Projekte stehen im Vordergrund, das
  Interface tritt dahinter zurück.
- Ehrlicher Proof: nur reale Kunden und reale Projekte als Beleg; nichts erfinden,
  nichts übertreiben.
- Zweisprachig gleichwertig: DE und EN sind gepflegte, gleichrangige Versionen.
- Privacy- und Performance-bewusst: keine unnötigen externen Requests, Videos und
  Fonts datenschutzfreundlich eingebunden.
