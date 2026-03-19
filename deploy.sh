#!/bin/bash
# ============================================================
# DEPLOY SCRIPT — maxlamm.de Hugo Site
# Builds the site and deploys to Uberspace via rsync
#
# Usage:
#   ./deploy.sh          → Deploy to STAGING (test.maxlamm.de)
#   ./deploy.sh --prod   → Deploy to PRODUCTION (maxlamm.de)
# ============================================================

set -e

# Config
REMOTE_USER="maxlamm"
REMOTE_HOST="hernmann.uberspace.de"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Default: Staging
TARGET_DOMAIN="test.maxlamm.de"
REMOTE_PATH="/var/www/virtual/${REMOTE_USER}/test.maxlamm.de/"

# Parse arguments
if [[ "$1" == "--prod" ]]; then
    TARGET_DOMAIN="maxlamm.de"
    REMOTE_PATH="/var/www/virtual/${REMOTE_USER}/maxlamm.de/"

    echo -e "${YELLOW}⚠  You are about to deploy to PRODUCTION (${TARGET_DOMAIN})${NC}"
    read -p "Continue? [y/N] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}✗ Aborted.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}▸ Building site...${NC}"
/opt/homebrew/bin/hugo --minify --gc

echo ""
echo -e "${GREEN}▸ Deploying to ${TARGET_DOMAIN}...${NC}"
rsync -avz --delete --progress \
-e "ssh -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes" \
public/ ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

echo ""
echo -e "${GREEN}✓ Done! Site is live at https://${TARGET_DOMAIN}${NC}"
