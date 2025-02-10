#!/bin/bash

# Script to clean up and recreate Docker Compose environment with forced build

# Exit immediately if a command exits with a non-zero status
set -e

setup() {
    echo
    echo '  ______      _____ _____  '
    echo ' |  ____/\   |_   _|  __ \ '
    echo ' | |__ /  \    | | | |__) |'
    echo ' |  __/ /\ \   | | |  _  / '
    echo ' | | / ____ \ _| |_| | \ \ '
    echo ' |_|/_/    \_\_____|_|  \_\'
    echo '-------------------------------------------------'
    echo '🚀 Run FAIR-Aware for local testing'
    echo '-------------------------------------------------'
    echo
    echo 'ℹ️  Do not use this script in a production environment!'
    echo

    docker_network="fair-aware-network-auto-setup-local"
    docker_postgres_name="fair-aware-postgres-auto-setup-local"
    docker_api_name="fair-aware-api-auto-setup-local"
    docker_client_name="fair-aware-client-auto-setup-local"
}

docker_prerequisites() {
    echo 'Cleaning and validating docker requirements...'
    # Check if Docker is installed
    if ! command -v docker &>/dev/null; then
        echo "Error: Docker is not installed. Aborting."
        exit 1
    fi

    # Check if the network exists
    if docker network inspect $docker_network &>/dev/null; then
        docker network rm $docker_network
    fi

    # Check if the postgres, api, or client exist.
}

setup_postgres() {
    echo 'Setting up PostgreSQL...'

    docker run --network $docker_network --name $docker_postgres_name -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:13
}

setup_api() {
    echo
}
setup_client() {
    echo
}

setup_tunnel() {
    echo '-------------------------------------------------'
    echo 'ℹ️  Since we use an OAuth we need an domain for it'
    echo 'to function properly for that we use cloudflared.'
    echo
    echo '🚨Since we use an free account the tunnel could be'
    echo 'stopped at any moment for more information look at'
    echo 'https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/'
    echo
    echo 'DO NOTE! that this requires techinical knowledge'
    echo '-------------------------------------------------'
    echo 'Setting up cloudflared tunnel...'

    # docker run --network $docker_network --rm -it cloudflare/cloudflared tunnel --url http://:3000
}

success() {
    echo
    echo '==========================================================='
    echo '🎉 Congrats, FAIR-Aware is installed and running in Docker!'
    echo '==========================================================='
    echo
    echo '🌐 Open your browser at https://somedomain.com'
    echo
    echo '🔑 Your domain is: https://somedomain.com/callback/orcid'
    echo
    echo
    echo 'For more information check the documenation!'
}

main() {
    setup
    docker_prerequisites
    setup_tunnel
    success
}

main
# # Check if .env.example exists
# if [ -f .env.example ]; then
#     echo "Copying .env.example to .env..."
#     cp .env.example .env
# else
#     echo "Error: .env.example file not found. Aborting."
#     exit 1
# fi

# echo "Stopping and removing containers, networks, and volumes..."
# docker compose down --volumes --remove-orphans

# echo "Rebuilding and starting containers..."
# docker compose up --build

# echo "Docker Compose environment setup complete!"
