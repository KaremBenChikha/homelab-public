#!/bin/bash

HOMELAB_DIR="$HOME/homelab"

echo "Stopping all running containers..."
containers=$(docker ps -aq)
if [ -n "$containers" ]; then
    docker stop $containers
    echo "Removing old containers..."
    docker rm $containers
else
    echo "No containers found to remove."
fi

echo "Starting all docker-compose stacks in order..."
# 'sort' ensures 00-core starts first. '2>/dev/null' hides permission errors.
for compose_file in $(find "$HOMELAB_DIR" -name "docker-compose.yml" 2>/dev/null | sort); do
    stack_dir=$(dirname "$compose_file")
    echo "---------------------------------------------------"
    echo "Starting stack in: $stack_dir"
    cd "$stack_dir"
    
    if docker compose up -d --remove-orphans; then
        echo "✅ SUCCESS: $stack_dir"
    else
        echo "❌ FAILED: $stack_dir"
    fi
done

echo "---------------------------------------------------"
echo "Update complete!"
