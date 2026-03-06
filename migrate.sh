#!/bin/bash
# ============================================================
# WP → HUGO MIGRATION HELPER
# Lädt Projektdaten von maxlamm.de und erstellt Markdown-Dateien
#
# Voraussetzungen: curl, jq (optional), mkdir
# Nutzung: ./migrate.sh
# ============================================================

set -e

CONTENT_DIR="content/de/projects"
IMAGES_DIR="static/images/projects"
BASE_URL="https://maxlamm.de"

# Alle bekannten Projekt-Slugs (DE)
SLUGS=(
  "rasendoktor"
  "bmw-social-media-content"
  "sportec-ferdinand-s"
  "pictures-from-nadira-sereno-de"
  "audi-kieler-woche-de"
  "craft-teamsport-deutschland"
  "mini-aceman-everything-you-need-to-know-de"
  "cambodont-de"
  "porsche-roads-de"
  "wellhub-de"
  "dethleffs-trend-de"
  "john-garner-picture-of-my-mind-de"
  "farmy-de"
  "ansorge-logistik-de"
  "bad-heilbrunner-de"
  "bmw-island"
  "bmw-motorrad-de"
  "bookchatters-de"
  "commercetools-automotive-de"
  "dethleffs-familie-de"
  "deutsche-bahn-konzern-de"
  "generali-ausdauer-de"
  "generali-balance-de"
  "generali-basisrente-de"
  "generali-beweglichkeit-de"
  "generali-idole-de"
  "generali-ueberwintern-de"
  "heischnupfa-de"
  "how-to-draw-a-mini-de"
  "liebherr-de"
  "lienne-fuck-you-very-much-de"
  "mini-resolute-de"
  "pampamida-hoassa-droht-de"
  "pampamida-no-ned-soweit-de"
  "sixt-neuwagen-de"
  "the-heist-de"
  "drk-missingtype-2023-en"
  "generali-nonstop-ausdauer"
)

echo "================================================================"
echo " MAXLAMM.DE — WordPress → Hugo Migration"
echo "================================================================"
echo ""
echo "Dieses Script hilft beim Erstellen der Markdown-Dateien."
echo "Du musst die Inhalte manuell aus WordPress kopieren"
echo "und in die generierten Template-Dateien einfügen."
echo ""
echo "Erstelle ${#SLUGS[@]} Projekt-Templates..."
echo ""

mkdir -p "$CONTENT_DIR"

for slug in "${SLUGS[@]}"; do
  # Clean slug for Hugo (remove -de suffix where applicable)
  hugo_slug=$(echo "$slug" | sed 's/-de$//')
  filepath="$CONTENT_DIR/$hugo_slug.md"
  
  if [ -f "$filepath" ]; then
    echo "  ⏩ $hugo_slug.md existiert bereits, überspringe..."
    continue
  fi
  
  # Create image directory
  img_dir="$IMAGES_DIR/$hugo_slug"
  mkdir -p "$img_dir"
  
  # Generate title from slug
  title=$(echo "$hugo_slug" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
  
  cat > "$filepath" << EOF
---
title: "$title"
date: $(date +%Y-%m-%d)
draft: true
featured: false
thumbnail: "/images/projects/$hugo_slug/thumb.jpg"
categories:
  - colorist
tags: []
videos: []
credits:
  Kunde: ""
  Produktion: "Monacoframe"
  Grading: "Maximilian Lamm"
gallery: []
translationKey: "$hugo_slug"
---

<!-- 
MIGRATION TODO:
  1. Öffne: ${BASE_URL}/${slug}/
  2. Kopiere den Beschreibungstext hierher
  3. Trage Video-URLs, Credits und Tags oben ein
  4. Lade Thumbnail und Galerie-Bilder in: static/images/projects/$hugo_slug/
  5. Setze draft: false wenn fertig
  6. Erstelle ggf. die englische Version in content/en/projects/
-->
EOF

  echo "  ✅ $hugo_slug.md erstellt"
done

echo ""
echo "================================================================"
echo " Fertig! ${#SLUGS[@]} Templates erstellt in $CONTENT_DIR"
echo ""
echo " Nächste Schritte:"
echo " 1. Öffne jede .md Datei und füge die Inhalte ein"
echo " 2. Lade die Bilder in die jeweiligen Ordner"
echo " 3. Setze draft: false für fertige Projekte"
echo " 4. Teste mit: hugo server -D"
echo " 5. Deploye mit: ./deploy.sh"
echo "================================================================"
