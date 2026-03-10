# Neues Projekt — Eingabe-Template

Dieses Template ausfüllen und dann `/new-project` ausführen.
Claude erstellt daraus automatisch die DE/EN-Projektseiten und die Instagram Caption.

---

## Projektinfos

```yaml
name: "Projekttitel"          # Anzeigename (DE)
name_en: "Project Title"      # Anzeigename (EN) — weglassen wenn gleich
slug: projekt-slug            # URL-freundlich, z.B. "porsche-roads"
date: 2024-01-01              # Datum für Sortierung im Grid (neuere = weiter oben)
client: Kundenname            # Auftraggeber

featured: false               # true = erscheint im Featured-Bereich der Homepage
orientation: landscape        # landscape | portrait (für Hochformat-Video-Paare)
video_size: large             # large (default) | small — nur bei landscape, einzelnem Video
gallery_columns: 3            # Spaltenanzahl im Galerie-Grid

categories:                   # colorist | dop | weitere (mehrere möglich)
  - colorist
types:                        # commercial | documentary | branded-content | social media
  - commercial
```

---

## Videos

```yaml
# Leer lassen wenn noch keine Videos vorhanden → wird als Platzhalter eingetragen
videos:
  - "https://vimeo.com/VIDEOID/hash"
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
gallery: # 01.jpg, 02.jpg, 03.jpg ...
```

---

## Beschreibung

<!-- Stichpunkte oder Fließtext — Claude baut daraus den Portfolio-Text (DE + EN). -->
<!-- Beantworte: Was wurde gedreht? Für wen? Was war deine Aufgabe/Rolle? Was war besonders? -->

Was wurde gedreht:

Deine Rolle:

Besonderheiten / Highlights:

---

## Technische Details

<!-- Werden in den Portfolio-Text eingewoben (keine separate Liste auf der Seite). -->

Kamera:
Linsen:
Licht:
Look / Stil:
Workflow (z.B. RAW-Format → Grading-Software):
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
2nd AC:
Licht:
Ton:
Schnitt:
Grading:
```

---

## Instagram Caption

<!-- Optional: Zusätzliche Hashtags oder spezifische Wünsche für die Caption. -->
<!-- Claude erstellt die Caption auf Englisch mit Credits aus der obigen Liste. -->

Hashtags (optional):
Besondere Wünsche:
