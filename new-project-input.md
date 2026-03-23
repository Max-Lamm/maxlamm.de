# Neues Projekt — Eingabe-Template

Dieses Template ausfüllen und dann `/new-project` ausführen.
Claude erstellt daraus automatisch die DE/EN-Projektseiten und die Instagram Caption.

---

## Projektinfos

```yaml
name: "Sparda Bank - Aber"          # Anzeigename (DE)
name_en: "Sparda Bank"      # Anzeigename (EN) — weglassen wenn gleich
slug: sparda-bank           # URL-freundlich, z.B. "porsche-roads"
date: 2025-10-16              # Datum für Sortierung im Grid (neuere = weiter oben)
client: Sparda Bank München           # Auftraggeber
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
```

---

## Videos

```yaml
# Leer lassen wenn noch keine Videos vorhanden → wird als Platzhalter eingetragen
videos:
  # - "https://vimeo.com/VIDEOID/hash"
 - "https://www.youtube.com/watch?v=b6epp5Of8UE"

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

Ein kurzer witziger Spot für die Sparda Bank München. In einem alltäglichen Moment stolpert ein junges Paar uber eine Immobilienanzeige. Doch der Traum hält nur kurz uns schon kommen Zweifel auf. Hier tritt plötzlich der Aber-Chor in erscheinung. Er gibt den Zweifeln eine Stimme, die wir alle kennen. Am Ende bleibt der entscheidende Gedanke: Man muss nicht auf sein Aber hören.
Denn die Sparda Bank lädt ein, den ersten Schritt zu machen und ins Gespräch zu
gehen.
Eine Besondere Challenge war, dass die Musik vorab produziert werden musste, damit die Schauspieler am Set Lipsync spielen konnten. Trotz kurzer Vorbereitungszeit und einem engen Zeitplan haben wir es geschafft unterschiedliche versionen des Spots ideal in szene zu setzen. 

Deine Rolle: Dop & Colorist

Besonderheiten / Highlights: Kleine crew, Tribe7 T-Tuned Linsen für einen ganz eigenen Charakter

---

## Technische Details

<!-- Werden in den Portfolio-Text eingewoben (keine separate Liste auf der Seite). -->

Kamera: Red V-Raptor
Linsen: Tribe7 T-Tuned
Licht: Die Location hatte eine große Fenterfront mit wandernder Sonne im Verlauf des Tages. Daher musste hier viel angepasst werden im Verlauf des Tages. 
Look / Stil: Der Film bewegt sich in einer hellen, freundlichen und authentischen
Bildsprache. Wir strarten mit ruhiger Kameraarbeit. Im Kontrast dazu wird das  Auftreten des Chors mit Reißschwenks etabliert. Diese WHip-Pans nutzen wir auch als transitions zwischen den Chor-Szenen.
# Workflow (z.B. RAW-Format → Grading-Software):
Drehorte: München
Drehtage: 1

---

## Credits

<!-- Format: "Rolle: Name" — eine Zeile pro Person. -->
<!-- Nur Rollen aufführen die auch wirklich besetzt sind. -->

```
Kunde: Sparda Bank München
Agentur: territory 
Produktion: Monacoframe
Regie: Michael Baumberger
DP: Maximilian Lamm
1st AC: Alexander Mitzler
Grip: Pascal Theisen
Oberbeleuchter: Hannes Schindler
Beleuchter: Flo Reith
Ton: Anton Schlichter
Styling: Julia Brumm
Hair&Make-Up: Fritzi Feldmann
PA: Tamara Görl
Schnitt: Gero LangHeinrich
Grading: Maximilian Lamm
Music: Stefan Krause
Talents: Martin Thiel, Zenzi Pfisterer, Christine Garbe, Felix Cremerius, Ronny Schuster
```

---

## Instagram Caption

<!-- Optional: Zusätzliche Hashtags oder spezifische Wünsche für die Caption. -->
<!-- Claude erstellt die Caption auf Englisch mit Credits aus der obigen Liste. -->

Hashtags (optional):
Besondere Wünsche:
