#!/bin/bash

# Script to clean up and recreate Docker Compose environment with forced build

# Exit immediately if a command exits with a non-zero status
set -e

# Check if .env.example exists
if [ -f .env.example ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
else
    echo "Error: .env.example file not found. Aborting."
    exit 1
fi

echo "Stopping and removing containers, networks, and volumes..."
docker compose down --volumes --remove-orphans

echo "Rebuilding and starting containers..."
docker compose up --build

echo "Docker Compose environment setup complete!"
