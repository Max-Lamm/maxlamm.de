# Neues Projekt — Eingabe-Template

Dieses Template ausfüllen und dann `/new-project` ausführen.
Claude erstellt daraus automatisch die DE/EN-Projektseiten und die Instagram Caption.

---

## Projektinfos

```yaml
name: ""                         # Anzeigename (DE)
name_en: ""                      # Anzeigename (EN) — weglassen wenn gleich
slug:                            # URL-freundlich, z.B. "porsche-roads"
date:                            # Datum für Sortierung im Grid (neuere = weiter oben)
client:                          # Auftraggeber
description_de: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle
description_en: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle

preview: false               # true = Preview-Video vorhanden unter /videos/projects/<slug>.webm
featured: false              # true = erscheint im Featured-Bereich der Homepage
orientation: landscape       # landscape | portrait (für Hochformat-Video-Paare)
video_size: large            # large (default) | small — nur bei landscape, einzelnem Video
gallery_columns: 3           # Spaltenanzahl im Galerie-Grid

categories:
  -                          # colorist | dop | weitere (mehrere möglich)
types:                       # commercial | documentary | branded-content | social media
  -
```

---

## Videos

```yaml
# Leer lassen wenn noch keine Videos vorhanden → wird als Platzhalter eingetragen
videos:
  # - "https://vimeo.com/VIDEOID/hash"
  # - "https://www.youtube.com/watch?v=VIDEOID"

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



Deine Rolle:

Besonderheiten / Highlights:

---

## Technische Details

<!-- Werden in den Portfolio-Text eingewoben (keine separate Liste auf der Seite). -->

Kamera:
Linsen:
Licht:
Look / Stil:
# Workflow (z.B. RAW-Format → Grading-Software):
Drehorte:
Drehtage:

---

## Credits

<!-- Format: "Rolle: Name" — eine Zeile pro Person. -->
<!-- Nur Rollen aufführen die auch wirklich besetzt sind. -->

```
Kunde:
Agentur:
Produktion:
Regie:
DP:
1st AC:
Grip:
Oberbeleuchter:
Beleuchter:
Ton:
Styling:
Hair&Make-Up:
PA:
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
