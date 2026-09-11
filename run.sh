#!/usr/bin/env bash
# Start the portfolio dev server exposed to the network (works from other devices).
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "First run: installing dependencies..."
  npm install
fi

echo "Starting portfolio (stop with Ctrl+C)..."
echo "Open the 'Network' URL it prints (http://<server-ip>:5173) from your browser."
exec npm run dev -- --host
