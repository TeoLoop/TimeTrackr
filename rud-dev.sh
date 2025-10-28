#!/usr/bin/env bash
# run-dev.sh — run frontend + backend using npm scripts

set -e

# Opcional: instalar dependencias si faltan
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting dev servers (npm run dev)..."
npm run dev
