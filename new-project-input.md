# Neues Projekt — Eingabe-Template

Dieses Template ausfüllen und dann `/new-project` ausführen.
Claude erstellt daraus automatisch die DE/EN-Projektseiten und die Instagram Caption.

---

## Projektinfos

```yaml
name: "freil!ch"                         # Anzeigename (DE)
name_en: ""                      # Anzeigename (EN) — weglassen wenn gleich
slug: freilich                            # URL-freundlich, z.B. "porsche-roads"
date: 04.05.2026                           # Datum für Sortierung im Grid (neuere = weiter oben)
client: Lagfa Bayern                         # Auftraggeber
description_de: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle
description_en: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle

preview: false               # true = Preview-Video vorhanden unter /videos/projects/<slug>.webm
featured: true              # true = erscheint im Featured-Bereich der Homepage
orientation: landscape       # landscape | portrait (für Hochformat-Video-Paare)
video_size: medium            # large (default) | small — nur bei landscape, einzelnem Video
gallery_columns: 3           # Spaltenanzahl im Galerie-Grid

categories:
  - dop                         # colorist | cinematographer | weitere (mehrere möglich)
types:                    # commercial | documentary | branded-content | social media
  - social media  
```

---

## Videos

```yaml
# Leer lassen wenn noch keine Videos vorhanden → wird als Platzhalter eingetragen
videos:
  # - "https://vimeo.com/VIDEOID/hash"
  # - "https://www.youtube.com/watch?v=VIDEOID"
    - https://www.youtube.com/watch?v=UQV6Hw6knbg
    - https://www.youtube.com/watch?v=weQzuM8xmFQ
    - https://www.youtube.com/watch?v=yxJkZOIEPbc

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
gallery:
```

---

## Beschreibung

<!-- Stichpunkte oder Fließtext — Claude baut daraus den Portfolio-Text (DE + EN). -->
<!-- Beantworte: Was wurde gedreht? Für wen? Was war deine Aufgabe/Rolle? Was war besonders? -->
Freies Projekt für die freiwilligen-plattform freilich bayern (https://freilich-bayern.de)
Gedreht an 4 Drehtagen in Augsburg. Insgesamt 4 vignetten und ein Hauptfilm der alle vier beinhaltet. 


Deine Rolle: Cinematographer

Besonderheiten / Highlights:

---

## Technische Details

<!-- Werden in den Portfolio-Text eingewoben (keine separate Liste auf der Seite). -->

Kamera: Sony Venice
Linsen: DZO Vespid
Licht: Kleine Crew, schlankes Budget
Look / Stil: modern, dynamisch, handheld 
# Workflow (z.B. RAW-Format → Grading-Software):
Drehorte: 
Drehtage: 4

---

## Credits

<!-- Format: "Rolle: Name" — eine Zeile pro Person. -->
<!-- Nur Rollen aufführen die auch wirklich besetzt sind. -->

```
Kunde: Lagfa Bayern
Agentur: 
Produktion: Brain & Heart
Regie: Maritn Wazlawczyk
1st AD: Michael Baumberger
DP: Maximilian Lamm
Producer: Fabian Franz
1st AC: Sebastian Mögele
Grip: 
Oberbeleuchter: Dominik Haberstock
Beleuchter: Dominik Spoo
Ton: 
Styling: Lisa Löhr
Hair&Make-Up: 
PA:
Foto: Julia Blöchl
BTS. Julian Gramm
Schnitt: 
Grading:
Music:
Talents:
```

---

## Instagram Caption

<!-- Optional: Zusätzliche Hashtags oder spezifische Wünsche für die Caption. -->
<!-- Claude erstellt die Caption auf Englisch mit Credits aus der obigen Liste. -->

Hashtags (optional):
Besondere Wünsche:
