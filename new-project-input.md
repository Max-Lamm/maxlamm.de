# Neues Projekt — Eingabe-Template

Dieses Template ausfüllen und dann `/new-project` ausführen.
Claude erstellt daraus automatisch die DE/EN-Projektseiten und die Instagram Caption.

---

## Projektinfos

```yaml
name: "Mini App"          # Anzeigename (DE)
name_en: "Mini App"      # Anzeigename (EN) — weglassen wenn gleich
slug: mini-app           # URL-freundlich, z.B. "porsche-roads"
date: 2026-03-10              # Datum für Sortierung im Grid (neuere = weiter oben)
client: Mini            # Auftraggeber
description_de: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle
description_en: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle

featured: true               # true = erscheint im Featured-Bereich der Homepage
orientation: landscape        # landscape | portrait (für Hochformat-Video-Paare)
video_size: large             # large (default) | small — nur bei landscape, einzelnem Video
gallery_columns: 3            # Spaltenanzahl im Galerie-Grid

categories:
  - dop                   # colorist | dop | weitere (mehrere möglich)
  - colorist
types:                        # commercial | documentary | branded-content | social media
  - commercial
  - social media
```

---

## Videos

```yaml
# Leer lassen wenn noch keine Videos vorhanden → wird als Platzhalter eingetragen
videos:
  # - "https://vimeo.com/VIDEOID/hash"
 - "https://www.youtube.com/watch?v=VIDEOID"

# Individuelle Poster-Bilder pro Video (weglassen → thumb.jpg wird als Fallback genutzt)
video_posters:
  # - "/images/projects/SLUG/poster-01.jpg"
```

---


## Stills

```
# Welche Bild-Dateien liegen in static/images/projects/<slug>/?
# thumb.jpg ist Pflicht. Weitere Dateien (Galerie, Poster) kommagetrennt auflisten.

thumb: thumb.jpg
poster: # poster-01.jpg, poster-02.jpg ...
gallery: 01.jpg, 02.jpg, 03.jpg, 04.jpg, 05.jpg, 06.jpg, 07.jpg, 08.jpg, 09.jpg
```

---

## Beschreibung

<!-- Stichpunkte oder Fließtext — Claude baut daraus den Portfolio-Text (DE + EN). -->
<!-- Beantworte: Was wurde gedreht? Für wen? Was war deine Aufgabe/Rolle? Was war besonders? -->

Was wurde gedreht: 5 kurze Vignetten für die Mini Mobile App, Zeigt features der App in alltäglichen situation (Auto wiederfinden, Route planen, servicetermin buchen, personalisierung und how-to)  anhand einmal der Vergangenheit (70er Jahre, classic Mini) und der heutigen Zeit. Nach dem Motto früher viel aufwand, anstrengend heute einfach app aufmachen und Problem gelöst. 

Deine Rolle: Dop & Colorist

Besonderheiten / Highlights: Dreh im Dezember, daher wenig tageslicht / kurze Drehzeit

---

## Technische Details

<!-- Werden in den Portfolio-Text eingewoben (keine separate Liste auf der Seite). -->

Kamera: Red V-Raptor
Linsen: Canon FD & Tokina Cinema ATX
Licht: 
Look / Stil: für vergangenheit: filmlook, statische einstellungen, vintage objektive (canon FD) und starker look (film print emulation), gegenwart: moderne objektive, handheld, dynamisch, klarer look, fast kühl dagegen. 
# Workflow (z.B. RAW-Format → Grading-Software):
Drehorte: München
Drehtage: 2

---

## Credits

<!-- Format: "Rolle: Name" — eine Zeile pro Person. -->
<!-- Nur Rollen aufführen die auch wirklich besetzt sind. -->

```
Kunde: Mini
Agentur:
Produktion: Monacoframe
Regie: Michael Baumberger
DP: Maximilian Lamm
1st AC: Alex Fink
2nd AC:
Licht: Armin Kottek
Ton:
Styling: Tamara Görl
Hair&Make-Up: Luna Elisa Federowicz
Ausstattung: Sophia Sommer
Schnitt: Leslie Miller
Grading: Maximilian Lamm
Talents: Lars Henning Hansen, Anna Bauer, Lisa-Charleen Loss
```

---

## Instagram Caption

<!-- Optional: Zusätzliche Hashtags oder spezifische Wünsche für die Caption. -->
<!-- Claude erstellt die Caption auf Englisch mit Credits aus der obigen Liste. -->

Hashtags (optional):
Besondere Wünsche:
