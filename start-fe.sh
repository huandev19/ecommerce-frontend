#!/bin/bash

kill_port() {
  local port=$1
  local pid=$(lsof -ti :$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo "Killing process(es) $pid on port $port..."
    kill -9 $pid 2>/dev/null
  fi
}

read -p "Start admin or storefront? (ad for admin, fe for storefront, leave empty for both): " choice

if [ "$choice" = "ad" ]; then
  kill_port 3001
  pnpm --filter admin-dashboard dev 2>&1 | tee admin-dashboard.log
elif [ "$choice" = "fe" ]; then
  kill_port 3000
  pnpm --filter storefront dev 2>&1 | tee storefront.log
elif [ -z "$choice" ]; then
  kill_port 3000
  kill_port 3001
  pnpm dev 2>&1 | tee all-apps.log
else
  echo "Invalid choice. Exiting."
  exit 1
fi
