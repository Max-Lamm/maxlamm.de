Erstelle ein neues Projekt aus der Eingabe-Datei `new-project-input.md`.

## Schritte

1. Lies `new-project-input.md` und `crew-handles.md`
2. Erstelle `content/de/projects/<slug>.md`
3. Erstelle `content/en/projects/<slug>.md`
4. Gib die Instagram Caption (EN) direkt im Chat aus
5. Bitte den Nutzer um Review und warte auf Freigabe oder Änderungswünsche
6. Nach Bestätigung: Standard-Workflow (git add + commit + push + deploy)

## Projekttexte

Aus Beschreibung + technischen Details einen ausführlichen Portfolio-Text bauen (1–3 Absätze):
- **Stil**: Erste Person, persönliche Handschrift — "Für X durfte ich…" (DE) / "For X, I had the opportunity…" (EN)
- **Struktur**: Aufgabe/Rolle → visueller/technischer Ansatz → Ergebnis
- **Technik**: Kamera, Linsen, Look organisch einweben, nicht als Aufzählung
- **Ton**: An bestehenden Texten orientieren, z.B. `content/de/projects/porsche-roads.md`
- DE und EN inhaltlich gleich, aber natürlich klingend in beiden Sprachen

## Front Matter

- `description`: 1–2 Sätze SEO-Text — Rolle + Kunde + Projektkern. DE und EN separat formulieren.
  Format: "[Rolle] für [Kunde/Projekt] – [Projektkern in einem Satz]."
  Beispiel DE: "Kamera und Color Grading für Mini App Werbefilm – DoP & Colorist Maximilian Lamm. Retro vs. Moderne in fünf Vignetten."
  Das Feld direkt nach `draft: false` platzieren. Falls `description_de`/`description_en` im Input angegeben → diese verwenden, sonst automatisch generieren.
- `thumbnail`: `/images/projects/<slug>/thumb.jpg`
- `gallery`: Dateinamen aus dem Input zu vollständigen Pfaden zusammensetzen
- `video_posters`: Nur wenn explizit angegeben — sonst Feld weglassen
- `translationKey`: = slug, identisch in DE und EN
- Credits-Rollen für EN übersetzen: Kunde→Client, Agentur→Agency, Regie→Director, Licht→Gaffer, Schnitt→Editor, Ausstattung→Production Design, Styling→Styling, DP→DP
- Felder mit leerem Wert weglassen

## Instagram Caption

Format:
```
[Hook — 1–2 Sätze, direkt und spezifisch zum Projekt]

[Kurze Beschreibung + Rolle]

—
Client: [Handle oder Name]
Director: [Handle oder Name]
DP: [Handle oder Name]
... (alle besetzten Rollen)

[Hashtags falls im Input angegeben]
```

Handle-Lookup: Namen aus Credits gegen `crew-handles.md` abgleichen. Bekannte Namen → Handle. Unbekannte → Name unverändert.
