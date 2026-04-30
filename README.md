# Homelab

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Compose](https://img.shields.io/badge/Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Proxy-NPM-009639?style=flat-square&logo=nginx&logoColor=white)
![Tailscale](https://img.shields.io/badge/VPN-Tailscale-24292F?style=flat-square&logo=tailscale&logoColor=white)
![Cloudflare](https://img.shields.io/badge/DNS-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/KaremBenChikha/Homelab)

Production-grade Docker Compose infrastructure powering personal cloud services at `*.automate.qzz.io`.

---

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Internet   │────▶│  Cloudflare  │────▶│  Tailscale   │
└─────────────┘     └──────────────┘     └──────┬───────┘
                                                 │
                                        ┌────────▼────────┐
                                        │  NPM (Reverse   │
                                        │   Proxy :81)    │
                                        └────────┬────────┘
                                                 │
                    ┌────────────────────────────┼────────────────────────────┐
                    │                            │                            │
          ┌─────────▼─────────┐       ┌──────────▼──────────┐     ┌──────────▼──────────┐
          │  01-personal/     │       │   02-forge/         │     │   00-core/          │
          │  Immich (Photos)  │       │   n8n (Automation)  │     │   Portainer         │
          │  Samba (Files)    │       │   (paused)          │     │   Cloudflare Tunnel │
          └───────────────────┘       └─────────────────────┘     └─────────────────────┘
```

## Stacks

| Directory | Purpose | Services |
|-----------|---------|----------|
| `00-core/` | Infrastructure | NPM (reverse proxy), Portainer, Tailscale, Cloudflare tunnel |
| `01-personal/` | Personal apps | Immich (photo management), Samba (NAS file share) |
| `02-forge/` | Work/automation | n8n (workflow automation — currently paused) |
| `05-archive/` | Retired projects | Legacy containers (orion, openclaw, infisical, etc.) |

## Quick Start

```bash
# Start all stacks (stops everything first)
./reload_all.sh

# Update and restart active containers
./update-containers.sh
```

Or manage individual stacks:

```bash
docker compose -f 00-core/npm/docker-compose.yml up -d
docker compose -f 01-personal/immich/docker-compose.yml up -d
```

## Networking

- All active services join `proxy_net` (external Docker bridge network).
- Nginx Proxy Manager on port `81` routes `*.automate.qzz.io`.
- Immich uses `db_int_net` for PostgreSQL/Redis internal traffic.
- Tailscale uses `network_mode: host` (subnet router + exit node).

## Security

- Cloudflare tunnel token is configured in `00-core/cloudflare/docker-compose.yml`.
- Environment variables (`.env`) are gitignored — never committed.
- Sensitive data volumes (`**/data/`) are gitignored.
- All secrets should be managed via `.env` files only.

## Requirements

- Docker Engine 24+
- Docker Compose v2
- Tailscale connected node
- Cloudflare-managed domain

## Quick Reference

```bash
# List all active compose files
find . -name "docker-compose.yml" -not -path "*/05-archive/*"

# View logs for a service
docker compose -f 00-core/npm/docker-compose.yml logs -f

# Rebuild a specific stack
docker compose -f 01-personal/immich/docker-compose.yml up -d --build
```
