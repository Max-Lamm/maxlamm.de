---
title: "EDIT CONFORM ANLEITUNG"
description: "Anleitung für den Edit Conform Workflow – Schnitt-Export für professionelles Color Grading bei Maximilian Lamm."
url: "/edit-conform/"
layout: "edit-conform"
---

Diese Anleitung hilft dir, deinen Schnitt für die Weiterverarbeitung (Conform) in DaVinci Resolve vorzubereiten.

In den meisten Fällen solltest du den **Source Media Workflow** anstelle des **Flat Quicktime Workflows** verwenden.

 

## SOURCE MEDIA WORKFLOW

- Erstelle eine Kopie deiner Sequenz und füge einen beschreibenden Suffix wie „forColor“ hinzu.
- Grafiken und andere nicht für die Farbkorrektur benötigte Elemente entfernen
Ausnahme: Falls du die finalen Exporte in Resolve erstellen möchtest, lass alle Elemente unverändert.
- Reduziere die Clips und Bearbeitungen auf so wenige Videospuren wie möglich – idealerweise nur 1-2. Nach Abschluss sollten keine Clips oder Clip-Bereiche in der Sequenz vorhanden sein, die im finalen Schnitt nicht sichtbar sind.
- Verbinde alle durchgehenden Edits, es sei denn, sie dienen der Unterteilung von Geschwindigkeitsänderungen oder Reframes.
- Ersetzte alle Multi-Cam-Clips, verschachtelte Sequenzen oder Compound Clips durch ihre Quellclips.
- Tausche alle Proxies oder transkodierten Clips gegen die Original-Quellclips aus.
- Leere Videospuren löschen
- Alle Audiospuren und Clips löschen
- Kopiere alle Originalmedien auf ein Arbeitslaufwerk.
- Exportiere eine XML oder AAF der Sequenz.
- Exportiere ein Quicktime der Sequenz in nativer Auflösung als **ProRes LT** oder **H.264**.
 
 <br>

## FLAT QUICKTIME WORKFLOW

- Erstelle eine Kopie deiner Sequenz und füge einen beschreibenden Suffix wie „forColor“ hinzu.
- Stelle sicher, dass die Sequenzauflösung mit der gewünschten finalen Auslieferungsauflösung übereinstimmt.
- Überprüfe, dass alle Clips das Bild vollständig ausfüllen, ohne schwarze Balken (Pillarboxing oder Letterboxing).
- Entferne alle Überblendungen oder andere Übergänge.
- Schließe Anpassungen an Positionen oder Zooms ab, da diese in die Farbkorrektur gebacken werden.
- Grafiken und andere nicht benötigte Elemente entfernen
- Ausnahme: Wenn du die finalen Exporte in Resolve erstellen möchtest, lass alle Elemente unverändert und exportiere sie als separates Quicktime mit Alpha (ohne Footage!).
- Filter und LUTs entfernen
- Reduziere die Clips und Bearbeitungen auf so wenige Videospuren wie möglich – idealerweise nur 1-2. Nach Abschluss sollten keine Clips oder Clip-Bereiche in der Sequenz vorhanden sein, die im finalen Schnitt nicht sichtbar sind.
- Verbinde alle durchgehenden Edits, es sei denn, sie dienen der Unterteilung von Geschwindigkeitsänderungen oder Reframes.
- Tausche alle Proxies oder transkodierten Clips gegen die Original-Quellclips aus.
- Leere Videospuren löschen
- Alle Audiospuren und Clips löschen
- Exportiere eine EDL, XML oder AAF der Sequenz.
- Exportiere ein Quicktime der Sequenz in nativer Auflösung als **ProRes 4444**.
<br><br> 

### Wichtige Einschränkungen des Flat Quicktime Workflows

- Überblendungen oder andere Übergänge in der Sequenz können nicht übernommen werden.
- Die finale Renderauflösung ist auf die Auflösung des gelieferten Flat-Quicktime beschränkt, unabhängig von der ursprünglichen Footage-Auflösung.
- Alle zusammengesetzten Elemente werden als ein einzelnes flaches Element bearbeitet.