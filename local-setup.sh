#!/usr/bin/env bash
#
# local-setup.sh -- one-command FAIR-Aware stack for LOCAL DEVELOPMENT ONLY.
#
# Every run starts from a clean slate: it rewrites .env from .env.example and
# wipes the database volume, then rebuilds the images and starts the stack.
# The only requirement is Docker (with the Compose plugin); Node and pnpm run
# inside the containers, so nothing needs to be installed on the host.
#
# Do NOT use this in production: it ships throwaway credentials and destroys data.

set -euo pipefail

# Run from the repository root regardless of where the script is invoked from.
cd "$(dirname "$0")"

banner() {
    cat <<'EOF'

  ______      _____ _____
 |  ____/\   |_   _|  __ \
 | |__ /  \    | | | |__) |
 |  __/ /\ \   | | |  _  /
 | | / ____ \ _| |_| | \ \
 |_|/_/    \_\_____|_|  \_\
-------------------------------------------------
🚀 FAIR-Aware -- local development setup
-------------------------------------------------
ℹ️  LOCAL DEV ONLY. This wipes data and uses
   throwaway credentials. Never run in production.

EOF
}

require_docker() {
    if ! command -v docker &>/dev/null; then
        echo "Error: Docker is not installed or not on PATH. Aborting." >&2
        exit 1
    fi
    if ! docker compose version &>/dev/null; then
        echo "Error: the Docker Compose plugin is required ('docker compose'). Aborting." >&2
        exit 1
    fi
}

banner
require_docker

if [ ! -f .env.example ]; then
    echo "Error: .env.example not found. Aborting." >&2
    exit 1
fi

echo "Resetting .env from .env.example..."
cp .env.example .env

echo "Stopping the stack and wiping volumes..."
docker compose down --volumes --remove-orphans

echo "Building images and starting the stack (this can take a few minutes the first time)..."
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo "  Press Ctrl-C to stop."
echo
docker compose up --build
