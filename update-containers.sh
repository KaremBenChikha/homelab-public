dont forget to updaet
#!/bin/bash

echo "=== Updating Immich ==="
cd ~/homelab/00-core/immich
docker compose pull
docker compose up -d

echo "=== Updating Portainer ==="
docker stop portainer
docker rm portainer
docker pull portainer/portainer-ce:lts
docker run -d --name=portainer --restart=unless-stopped \
  -p 8000:8000 -p 9000:9000 -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_/data \
  portainer/portainer-ce:lts

echo "=== Cleaning up old images ==="
docker image prune -f

echo "=== Done! ==="

chmod +x ~/update-containers.sh
