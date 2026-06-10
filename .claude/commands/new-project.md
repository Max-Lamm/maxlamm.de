Erstelle ein neues Projekt aus der Eingabe-Datei `new-project-input.md`.

## Schritte

1. Lies `new-project-input.md` und `crew-handles.md`
2. Erstelle `content/de/projects/<slug>.md`
3. Erstelle `content/en/projects/<slug>.md`
4. Lege die Instagram Caption (EN) als neue Notion-Unterseite unter „Instagram Posts - @maxlamm" an (siehe Abschnitt „Instagram Caption")
5. Lege den LinkedIn Post (DE, kurz) als neue Notion-Unterseite unter „LinkedIn Posts - @maxlamm" an (siehe Abschnitt „LinkedIn Post")
6. Zeige die Projektseiten im Chat zum Review, nenne die beiden Notion-Links und warte auf Freigabe oder Änderungswünsche
7. Nach Bestätigung: Standard-Workflow (git add + commit + push + deploy)

## Schreibregeln

Gelten für **alle generierten Prosatexte**: Portfolio-Text DE/EN, `description` DE/EN, Instagram Caption (Hook + Beschreibung) und LinkedIn Post.

- **Keine Binde- oder Gedankenstriche als Satztrenner** (kein `—`, kein `–`). Stattdessen Komma, Semikolon oder den Satz teilen.
- Keine Bindestrich-Wortkonstruktionen als Stilmittel.
- **Ausnahmen (bleiben unverändert):** Eigennamen und Technik-/Produktbezeichnungen (z.B. `RED V-Raptor`, `Hair&Make-Up`), URL-Slugs, Hashtags, Instagram-Handles, Front-Matter-Keys, Notion-Divider.

## Projekttexte

Aus Beschreibung + technischen Details einen ausführlichen Portfolio-Text bauen (1–3 Absätze):
- **Stil**: Erste Person, persönliche Handschrift, „Für X durfte ich…" (DE) / „For X, I had the opportunity…" (EN)
- **Struktur**: Aufgabe/Rolle → visueller/technischer Ansatz → Ergebnis
- **Technik**: Kamera, Linsen, Look organisch einweben, nicht als Aufzählung
- **Ton**: An bestehenden Texten orientieren, z.B. `content/de/projects/porsche-roads.md`
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

## Instagram Caption

Sprache: **Englisch**. Handle-Lookup: Namen aus Credits gegen `crew-handles.md` abgleichen. Bekannte Namen → Handle. Unbekannte → Name unverändert.

**Ablage in Notion (nicht im Chat ausgeben):** per `notion-create-pages` eine neue Unterseite anlegen.
- `parent`: `{ "type": "page_id", "page_id": "37b56115-2307-8065-b27a-d10032aa773d" }`
- `properties.title`: `<Projektname> (DD.MM.YYYY)` (Datum aus dem Input)
- `content` (Notion-Markdown):

```
[Hook, 1–2 Sätze, direkt und spezifisch zum Projekt]

[Kurze Beschreibung + Rolle]

---

Client: [Handle oder Name]
Director: [Handle oder Name]
DP: [Handle oder Name]
... (alle besetzten Rollen)

[Hashtags falls im Input angegeben]
```

Der `---` ist ein Notion-Divider zwischen Caption-Text und Credits. Schreibregeln (keine Dashes im Prosatext) beachten.

## LinkedIn Post

Sprache: **Deutsch**. Tonalität wie die Website (erste Person, persönliche Handschrift), aber **deutlich kürzer** als der Portfolio-Text (Richtwert 3–6 Sätze, ca. 80–120 Wörter).

Inhalt:
- Kurzer Fließtext zum Projekt + eigene Rolle
- Zentrale Partner namentlich im Text nennen (Kunde, Regie, ggf. Hauptgewerke), **ohne** @-Handles
- Am Ende wenige relevante Hashtags (z.B. `#Cinematographer #ColorGrading`)
- **Kein** Call-to-Action
- Schreibregeln (keine Dashes) beachten

**Ablage in Notion (nicht im Chat ausgeben):** per `notion-create-pages` eine neue Unterseite anlegen.
- `parent`: `{ "type": "page_id", "page_id": "37b56115-2307-80df-a3b3-c2c9b24fdb2a" }`
- `properties.title`: `<Projektname> (DD.MM.YYYY)` (Datum aus dem Input)
- `content`: der LinkedIn-Post als Notion-Markdown
