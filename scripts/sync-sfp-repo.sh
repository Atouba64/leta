#!/bin/bash
set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="$(dirname "$SOURCE_DIR")/SFP-Leta"

echo "================================================="
echo " Creating Safe For Public (SFP) Leta Repository  "
echo "================================================="
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"

# 1. Create fresh target directory
if [ -d "$TARGET_DIR" ]; then
  echo "=> Removing existing SFP-Leta directory to ensure a clean slate..."
  rm -rf "$TARGET_DIR"
fi

mkdir -p "$TARGET_DIR"

# 2. Copy files excluding git history and node_modules
echo "=> Copying files (excluding .git and node_modules)..."
rsync -a --exclude='.git' --exclude='node_modules' --exclude='functions/node_modules' "$SOURCE_DIR/" "$TARGET_DIR/"

# 3. Sanitize Private Information
echo "=> Sanitizing repository..."

# Remove partner accounts directory
if [ -d "$TARGET_DIR/07-partner-accounts" ]; then
  echo "  -> Removing 07-partner-accounts..."
  rm -rf "$TARGET_DIR/07-partner-accounts"
fi

# Remove environment variable files
echo "  -> Removing .env files..."
find "$TARGET_DIR" -type f -name ".env*" -delete

# Remove service account keys or sensitive json files
echo "  -> Removing potential JSON secret keys..."
find "$TARGET_DIR" -type f -name "*service-account*.json" -delete

# Strip specific secrets from source code if necessary (Optional placeholder)
# sed -i '' 's/AIza[a-zA-Z0-9_-]*/REDACTED_API_KEY/g' "$TARGET_DIR/website/auth.js"

# 4. Initialize clean git repository
echo "=> Initializing clean Git repository..."
cd "$TARGET_DIR"
git init
git add .
git commit -m "chore: initial commit of Safe For Public (SFP) Leta repository"

echo "================================================="
echo " SFP Leta Repo created successfully!"
echo " Location: $TARGET_DIR"
echo " You can now push this repo to a public GitHub."
echo " Note: Run this script bi-weekly to sync the latest public changes."
echo "================================================="
