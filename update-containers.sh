#!/bin/bash

# Define your base directory
BASE_DIR="/home/karem/homelab"

# ---------------------------------------------------------
# LIST OF ACTIVE PROJECTS
# How to add a new container: Just add its folder path below!
# ---------------------------------------------------------
PROJECTS=(
    "00-core/npm"
    "00-core/portainer"
    "00-core/tailscale"
    "01-personal/immich"
    "01-personal/rclone"
    "02-forge/n8n"
    "02-forge/orion"
    "04-production/nexus-core/nexus-core-db"
    "04-production/nexus-core/nexus-landing"
    "04-production/pulse/pulse-api"
    "04-production/pulse/pulse-db"
    "04-production/pulse/pulse-landing"
)

echo "========================================"
echo "Starting Homelab Updates: $(date)"
echo "========================================"

for PROJECT in "${PROJECTS[@]}"; do
    DIR="$BASE_DIR/$PROJECT"
    
    # Check if the directory and docker-compose.yml exist
    if [ -d "$DIR" ] && [ -f "$DIR/docker-compose.yml" ]; then
        echo "----------------------------------------"
        echo "🔄 Updating Project: $PROJECT"
        cd "$DIR" || continue
        
        # 1. Pull the latest external images (e.g., n8n, portainer)
        docker compose pull
        
        # 2. Rebuild local images ensuring base images (like nginx:alpine) are updated
        docker compose build --pull
        
        # 3. Apply changes (Docker automatically knows to only restart containers that actually changed)
        docker compose up -d --remove-orphans
    else
        echo "⚠️ Skipping $PROJECT - Directory or docker-compose.yml not found."
    fi
done

echo "----------------------------------------"
echo "🧹 Cleaning up old images and stopped containers..."
# Remove all stopped containers
docker container prune -f
# Remove all dangling/old images that are no longer being used
docker image prune -a -f

echo "========================================"
echo "✅ Updates and Cleanup Complete: $(date)"
echo "========================================"


### Automate it with a Weekly Cron Job
# We can tell the Linux scheduler (cron) to run this script automatically once a week in the middle of the night (e.g., every Sunday at 3:00 AM) so you never have to think about it again.
# Open your cron editor:
# crontab -e
# (If it asks you to choose an editor, press 1 for nano).
#Use your arrow keys to go to the very bottom of the file, and paste this line:
# 0 3 * * 0 /home/karem/homelab/update-containers.sh >> /home/karem/homelab/update.log 2>&1