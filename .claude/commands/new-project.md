Erstelle ein neues Projekt aus der Eingabe-Datei `new-project-input.md`.

## Schritte

1. Lies `new-project-input.md` und `~/Code/BRAIN/wiki/wissen/konzepte/crew-handles.md`
2. Erstelle `content/de/projects/<slug>.md`
3. Erstelle `content/en/projects/<slug>.md`
4. Generiere Instagram Caption (EN) und LinkedIn Post (DE) — noch nichts in den Vault schreiben
5. Ermittle die passende Vault-Projekt-Notiz in `~/Code/BRAIN/wiki/projekte/` (siehe „Ziel-Projekt-Notiz finden")
6. Zeige im Chat: beide Projektseiten, beide Social-Texte und den Namen der Ziel-Projekt-Notiz. Warte auf Freigabe oder Änderungswünsche
7. Nach Freigabe in den Vault schreiben: `## Social`-Abschnitt, Aufgabe, `log.md`, Vault-Commit
8. Nach Freigabe ins Repo: `git add` gezielt, `git commit`, `git push origin master`, `./deploy.sh`

Schritt 6 ist ein harter Stopp. In Schritt 7 wird eine bestehende Vault-Datei editiert, das passiert nie ohne Freigabe.

## Vault

Der Obsidian-Vault `BRAIN` ist die Ablage für Social-Texte und Aufgaben.

- Pfad: `~/Code/BRAIN` (Symlink). Fallback, falls der Symlink fehlt: `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/BRAIN`
- Projekt-Notizen liegen flach in `wiki/projekte/`, Aufgaben flach in `wiki/aufgaben/`
- Keine Leerzeile zwischen dem schließenden `---` des Frontmatters und dem ersten Inhalt

## Schreibregeln

Gelten für **alle generierten Prosatexte**: Portfolio-Text DE/EN, `description` DE/EN, Instagram Caption (Hook + Beschreibung) und LinkedIn Post.

- **Keine Binde- oder Gedankenstriche als Satztrenner** (kein `—`, kein `–`). Stattdessen Komma, Semikolon oder den Satz teilen.
- Keine Bindestrich-Wortkonstruktionen als Stilmittel.
- **Ausnahmen (bleiben unverändert):** Eigennamen und Technik-/Produktbezeichnungen (z.B. `RED V-Raptor`, `Hair&Make-Up`), URL-Slugs, Hashtags, Instagram-Handles, Front-Matter-Keys.

## Projekttexte

Aus Beschreibung + technischen Details einen ausführlichen Portfolio-Text bauen (1–3 Absätze):
- **Stil**: Erste Person, persönliche Handschrift, „Für X durfte ich…" (DE) / „For X, I had the opportunity…" (EN)
- **Struktur**: Aufgabe/Rolle → visueller/technischer Ansatz → Ergebnis
- **Technik**: Kamera, Linsen, Look organisch einweben, nicht als Aufzählung
- **Ton**: An bestehenden Texten orientieren, z.B. `content/de/projects/mini-app.md`
- DE und EN inhaltlich gleich, aber natürlich klingend in beiden Sprachen
- Schreibregeln (keine Dashes) beachten

## Front Matter

- `description`: 1–2 Sätze SEO-Text, Rolle + Kunde + Projektkern. DE und EN separat formulieren.
  Format: „[Rolle] für [Kunde/Projekt]. [Projektkern in einem Satz]."
  Beispiel DE: „Kamera und Color Grading für den Mini App Werbefilm. DoP und Colorist Maximilian Lamm. Retro gegen Moderne in fünf Vignetten."
  Das Feld direkt nach `draft: false` platzieren. Falls `description_de`/`description_en` im Input angegeben → diese verwenden, sonst automatisch generieren.
- `thumbnail`: `/images/projects/<slug>/thumb.jpg`
- `gallery`: Dateinamen aus dem Input zu vollständigen Pfaden zusammensetzen
- `video_posters`: Nur wenn explizit angegeben, sonst Feld weglassen
- `translationKey`: = slug, identisch in DE und EN
- Credits-Rollen für EN übersetzen: Kunde→Client, Agentur→Agency, Regie→Director, Licht→Gaffer, Schnitt→Editor, Ausstattung→Production Design, Styling→Styling, DP→DP
- Felder mit leerem Wert weglassen

## Ziel-Projekt-Notiz finden

Website-Slug und Vault-Projektname stimmen oft **nicht** überein (Slug `missingtype-2026` gehört zur Notiz `DRK Blutspende.md`). Die Notiz deshalb nie aus dem Slug ableiten:

1. `~/Code/BRAIN/wiki/projekte/` listen
2. Gegen `name` **und** `client` aus dem Input matchen
3. Eindeutiger Treffer → im Review nennen
4. Kein oder mehrere Treffer → **fragen, nicht raten**: bestehende Notiz auswählen lassen oder anbieten, eine neue aus `~/Code/BRAIN/wiki/system/_Templates/Projekt Template.md` anzulegen (Templater-Platzhalter dabei durch echte Werte ersetzen)

## Social-Texte in den Vault

Beide Texte gehen in **einen** `## Social`-Abschnitt der Ziel-Projekt-Notiz.

**Einfügeposition:** `## Social` vor `## Notizen`. Fehlt `## Notizen`, dann am Ende vor `Linked from [[index]]`. Existiert `## Social` schon, einen weiteren `###`-Block **ergänzen, nie überschreiben** (eine Vault-Notiz kann mehrere Kampagnen halten, etwa missingtype 2022 und 2026).

**Struktur:**

```
## Social
### <Projektname> (DD.MM.YYYY)
Website: https://maxlamm.de/work/<slug>/

**Instagram Caption (EN)**

[Hook, 1–2 Sätze, direkt und spezifisch zum Projekt]

[Kurze Beschreibung + Rolle]

Client: [Handle oder Name]
Director: [Handle oder Name]
DP: [Handle oder Name]
... (alle besetzten Rollen)

[Hashtags falls im Input angegeben]

**LinkedIn Post (DE)**

[Fließtext, 3–6 Sätze, ca. 80–120 Wörter]

#Cinematographer #ColorGrading
```

**Instagram Caption:** Sprache Englisch. Handle-Lookup: Namen aus den Credits gegen `crew-handles.md` im Vault abgleichen. Bekannte Namen → Handle. Unbekannte → Name unverändert.

**LinkedIn Post:** Sprache Deutsch. Tonalität wie die Website (erste Person, persönliche Handschrift), aber **deutlich kürzer** als der Portfolio-Text.
- Kurzer Fließtext zum Projekt + eigene Rolle
- Zentrale Partner namentlich im Text nennen (Kunde, Regie, ggf. Hauptgewerke), **ohne** @-Handles
- Am Ende wenige relevante Hashtags
- **Kein** Call-to-Action

## Aufgabe im Vault

Eine Aufgabe anlegen unter `~/Code/BRAIN/wiki/aufgaben/<Projektname> auf Instagram & LinkedIn.md`:

```
---
erledigt: false
prio: normal
geplant:
fällig:
projekt:
  - "[[<Vault-Projektname>]]"
typ: aufgabe
icon: check-square
angelegt: YYYY-MM-DD
tags:
  - social-media
---
Texte liegen in [[<Vault-Projektname>#Social]].
Website: https://maxlamm.de/work/<slug>/
```

`geplant` und `fällig` bleiben leer, das terminiert Max selbst. Das `social-media`-Tag ist Pflicht, ohne Tag fällt die Aufgabe in der Aufgaben-Base durchs Raster.

## Vault abschließen

1. `~/Code/BRAIN/log.md` um einen Eintrag ergänzen (append, neuestes unten):
   `## [YYYY-MM-DD] ingest | <Projektname>: Portfolio-Eintrag + Social-Texte`
2. `wiki/_hot.md` nur anfassen, wenn sich ein aktiver Thread wirklich verschoben hat. Dort gilt: eine Zeile pro Item, ersetzen statt anhängen, `Stand:` der Sektion auf heute setzen.
3. Committen: `git -C ~/Code/BRAIN add -A && git -C ~/Code/BRAIN commit -m "<kurze Beschreibung>"`

Der Vault-Commit ist Pflicht, das ist die im Vault-`CLAUDE.md` genehmigte Ausnahme zur „nur auf Zuruf committen"-Regel und gilt ausschließlich für den Vault.
