#!/bin/bash
# ============================================================
# DEPLOY SCRIPT — maxlamm.de Hugo Site
# Builds the site and deploys to Uberspace via rsync
# ============================================================

set -e

# Config — passe diese Werte an dein Setup an
REMOTE_USER="maxlamm"                    # Dein Uberspace-Username
REMOTE_HOST="hernmann.uberspace.de"      # Dein Uberspace-Host
REMOTE_PATH="/var/www/virtual/${REMOTE_USER}/test.maxlamm.de/"  # DocumentRoot

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}▸ Building site...${NC}"
hugo --minify --gc

echo ""
echo -e "${GREEN}▸ Deploying to ${REMOTE_HOST}...${NC}"
rsync -avz --delete public/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

echo ""
echo -e "${GREEN}✓ Done! Site is live at https://maxlamm.de${NC}"
