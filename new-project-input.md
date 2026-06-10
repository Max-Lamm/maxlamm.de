# Neues Projekt — Eingabe-Template

Dieses Template ausfüllen und dann `/new-project` ausführen.
Claude erstellt daraus automatisch die DE/EN-Projektseiten und die Instagram Caption.

---

## Projektinfos

```yaml
name: "#missingtype 2026"                         # Anzeigename (DE)
name_en: ""                      # Anzeigename (EN) — weglassen wenn gleich
slug: missingtype-2026                            # URL-freundlich, z.B. "porsche-roads"
date: 10.06.2026                           # Datum für Sortierung im Grid (neuere = weiter oben)
client: DRK-Blutspendedienste                         # Auftraggeber
description_de: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle
description_en: ""   # Leer lassen → Claude generiert automatisch aus Beschreibung + Rolle

preview: true               # true = Preview-Video vorhanden unter /videos/projects/<slug>.webm
featured: true              # true = erscheint im Featured-Bereich der Homepage
orientation: landscape       # landscape | portrait (für Hochformat-Video-Paare)
video_size: medium            # large (default) | small — nur bei landscape, einzelnem Video
gallery_columns: 5           # Spaltenanzahl im Galerie-Grid

categories:
  - cinematographer
  - colorist                         # colorist | cinematographer | weitere (mehrere möglich)
types:                    # commercial | documentary | branded-content | social media
  - tvc
  - social media  
```

---

## Videos

```yaml
# Leer lassen wenn noch keine Videos vorhanden → wird als Platzhalter eingetragen
videos:
  # - "https://vimeo.com/VIDEOID/hash"
  # - "https://www.youtube.com/watch?v=VIDEOID"
    - https://www.youtube.com/watch?v=VoP0crLL-Ag


# Individuelle Poster-Bilder pro Video (weglassen → thumb.jpg wird als Fallback genutzt)
video_posters:
 - "/images/projects/SLUG/poster.jpg"
```

---

## Stills

```
# Welche Bild-Dateien liegen in static/images/projects/<slug>/?
# thumb.jpg ist Pflicht. Weitere Dateien (Galerie, Poster) kommagetrennt auflisten.

thumb: thumb.jpg
poster: # poster-01.jpg, poster-02.jpg
gallery: BTS-1.jpg, ..., BTS-25.jpg
```

---

## Beschreibung

<!-- Stichpunkte oder Fließtext — Claude baut daraus den Portfolio-Text (DE + EN). -->
<!-- Beantworte: Was wurde gedreht? Für wen? Was war deine Aufgabe/Rolle? Was war besonders? -->
Youtube Text des DRK Blutspendedienstes:
"Täglich werden in Deutschland rund 15.000 Blutspenden benötigt. Doch nur etwa 3 % der Bevölkerung spendet Blut – viel zu wenig.

Mit unserer Kampagne #missingtype machen wir sichtbar, was oft übersehen wird: der ständige Bedarf an Blutspenden. Deshalb fehlen in unserer Kampagne bewusst die Buchstaben der Blutgruppen A, B, AB und 0. Ein kleines Zeichen mit einer großen Botschaft: Blutspenden sind unersetzlich.

In diesem Jahr unterstützen uns Jana Wosnitza, Thore Schölermann, Loris Karius und Stefano Zarrella. Vier Persönlichkeiten aus ganz unterschiedlichen Bereichen, die gemeinsam auf die Bedeutung der Blutspende aufmerksam machen.

Mach auch du mit und reservier dir deinen Termin!

JETZT MITMACHEN. JETZT BLUT SPENDEN!
http://www.missingtype.de/social"

Wir haben einen Tag inkl. Aufbau in Köln im Cinegate Studio gedreht. Insgesamt 3 Sets (TVC, Social & Photo) mit den 4 Talents. Dadurch straffer Zeitplan. 

Deine Rolle: Cinematographer und Colorist

Besonderheiten / Highlights:

---

## Technische Details

<!-- Werden in den Portfolio-Text eingewoben (keine separate Liste auf der Seite). -->

Kamera: RED V-Raptor & Komodo (B-Cam)
Linsen: Angenieux EZ Zooms
Licht: gr. Overhead Fläche, Farbiger Hintergrund (rot) in der Hohlkehle der sich im Take zu weiß ändert.
Look / Stil: modern, dynamisch, handheld 
Drehorte: 1
Drehtage: 1
# Workflow (z.B. RAW-Format → Grading-Software):

---

## Credits

<!-- Format: "Rolle: Name" — eine Zeile pro Person. -->
<!-- Nur Rollen aufführen die auch wirklich besetzt sind. -->

```
Kunde: DRK Blutspendedienste
Agentur: We Play Forward
Produktion: Monacoframe
Regie: Michael Baumberger
DP: Maximilian Rödl
B-Cam: Maximilian Lamm
Producer: Benedikt Höll
1st AC: Rafael Quesada 
Grip: 
Oberbeleuchter: Dennis Fischer
Best Boy: Jasper Claussen
Beleuchter: Ruxi Ioana
Ton: Jonathan Schorr
Styling: 
Hair&Make-Up: Maria Schenker, Asal Sahin
Set Design: Esra Tamkoc 
PA:
Foto: Matthias Fend
BTS: Ben Schlemper
Schnitt: 
Grading: Maximilian Lamm
Music:
Talents: Stefano Zarrella, Jana Wosnitza, Thore Schölermann, 
```

---

## Instagram Caption

<!-- Optional: Zusätzliche Hashtags oder spezifische Wünsche für die Caption. -->
<!-- Claude erstellt die Caption auf Englisch mit Credits aus der obigen Liste. -->

Hashtags (optional):
Besondere Wünsche:
