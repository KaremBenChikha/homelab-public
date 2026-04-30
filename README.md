# Homelab

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Compose](https://img.shields.io/badge/Compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Proxy-NPM-009639?style=flat-square&logo=nginx&logoColor=white)
![Tailscale](https://img.shields.io/badge/VPN-Tailscale-24292F?style=flat-square&logo=tailscale&logoColor=white)
![Cloudflare](https://img.shields.io/badge/DNS-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)
[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)](https://github.com/KaremBenChikha/Homelab)

Production-grade Docker Compose infrastructure powering personal cloud services at `*.home.example.com`.

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

## Services

### 00-core — Infrastructure

#### Nginx Proxy Manager (NPM)
- **Image:** `jc21/nginx-proxy-manager:latest`
- **Ports:** `80`, `443`, `81` (admin UI)
- **Network:** `web-network`

Web-facing reverse proxy that routes all `*.home.example.com` subdomains to their respective backend containers. Provides SSL termination via Let's Encrypt (DNS-01 challenge with Cloudflare authenticator, ECDSA `secp384r1` certs). Admin dashboard on port `81` for managing proxy hosts, redirections, streaming endpoints, and certificate renewal. Runs with `restart: unless-stopped` and persists data to `./data` + Let's Encrypt state to `./letsencrypt`.

#### Portainer
- **Image:** `portainer/portainer-ce:lts`
- **Ports:** none (accessed via NPM reverse proxy)
- **Network:** `web-network`

Docker management UI for the entire host. Provides a web dashboard for managing containers, images, volumes, networks, and stacks without SSH. Mounts the Docker socket (`/var/run/docker.sock:ro`) read-only for security and uses `no-new-privileges:true`. LTS track for stability — no surprise breaking changes.

#### Tailscale
- **Image:** `tailscale/tailscale:latest`
- **Network:** `host` mode
- **Capabilities:** `NET_ADMIN`, `SYS_MODULE`
- **Features:** subnet router (`192.168.1.0/24`), exit node

Runs in `network_mode: host` to advertise the local LAN subnet and act as an exit node for the Tailscale mesh VPN. Auth key passed via `TS_AUTH_KEY` in `.env`. Routes `192.168.1.0/24` so remote Tailscale clients can reach local devices without port forwarding. Exit node capability routes all internet traffic through the homelab when enabled.

#### Cloudflare Tunnel (cloudflared)
- **Image:** `cloudflare/cloudflared:latest`
- **Ports:** none (egress tunnel)
- **Network:** `web-network`

Provides the public internet ingress for all `*.home.example.com` services without opening any firewall ports. The tunnel runs as an outbound-only connection to Cloudflare's edge network, which then routes traffic to the tunnel based on DNS records. This eliminates the need for public IP port forwarding and provides DDoS protection, CDN caching, and automatic HTTPS at the edge. Tunnel auth token is hardcoded in the compose file (from Cloudflare Zero Trust dashboard).

---

### 01-personal — Personal Applications

#### Immich
- **Images:** `immich-server`, `immich-machine-learning`, `valkey/valkey:9` (Redis fork), `postgres:14-vectorchord`
- **Ports:** `2283` (server)
- **Network:** `web-network` + `db-network`

Google Photos alternative with full self-hosted photo and video management. The **server** handles the API, web UI, and mobile app sync. **Machine learning** service runs on-device ML for facial recognition, object detection, scene classification, and smart search (disabled by default via `profiles: ["ml"]` slot; enable by removing or setting `IMMICH_MACHINE_LEARNING_WORKERS=1`). **Valkey** (Redis drop-in fork) handles job queues and caching. **PostgreSQL** with pgvector extension stores metadata and powers CLIP-based similarity search. Uploads stored at `/var/data/photos`. Supports automatic phone backup, timeline view, album sharing, and EXIF-aware organization.

#### Samba
- **Image:** `ghcr.io/servercontainers/samba:latest`
- **Ports:** `139`, `445`
- **Network:** `web-network`
- **Resources:** capped at 0.5 CPU, 512 MB RAM

NAS file server that exposes a `Vault` share on the local network. Authenticates via SMB protocol with user `karem` (password from `SMB_PASSWORD` env var). Storage mounted from `/var/data/shares` on the host. Configured with `no-new-privileges:true` and resource limits (`cpus: 0.5`, `memory: 512M`) to prevent resource starvation of other services.

---

### 02-forge — Work & Automation

#### n8n (currently paused)
- **Image:** `n8nio/n8n:latest`
- **Ports:** `5678` (via NPM at `n8n.home.example.com`)
- **Network:** `web-network`
- **State:** `restart: "no"` (manual start only)

Fair-code workflow automation platform connecting APIs and services through a visual node editor. Configured with basic auth (user/pass from `.env`) and encryption key for credentials. Runs as user `1001:1001` for file ownership consistency. Fronted by NPM with SSL at `n8n.home.example.com`. Currently paused (`restart: "no"`) but can be started manually with `docker compose -f 02-forge/n8n/docker-compose.yml up -d`. Historically orchestrated automated trading workflows, Etsy product management, and Telegram alerts.

#### OpenClaw
- **Image:** custom build from `ghcr.io/openclaw/openclaw:latest` + `uv` (Python package manager)
- **Ports:** none (API-only)
- **Network:** `web-network`

AI agent gateway that powers autonomous trading, Etsy store management, and n8n workflow orchestration. Runs as a Node.js service with Python (`uv`-installed) sub-agents for quant/ML tasks. Connected services:
- **DeepSeek** — primary LLM provider (V4 Pro / Flash)
- **Alpaca** — paper trading API for market data and order execution
- **Brave Search** — web search tool for market research
- **Telegram** — command & control interface via bot
- **n8n** — triggers workflows via REST API (`N8N_API_KEY`)
- **Gemini** — fallback/auxiliary AI provider
- **Etsy API** — product listing management

Custom `Dockerfile` adds `uv` on top of the base OpenClaw image for Python dependency management. Configuration lives in `./config/` with workspace files and workflow blueprints in `./workspace/`. All capabilities dropped to `ALL`; `no-new-privileges:true`.

---

### 05-archive — Retired / Legacy

| Service | Description | Status |
|---------|-------------|--------|
| **Orion** | AI software engineer predecessor to OpenClaw. Ran with sysbox runtime for Docker-in-Docker isolation. Had 3 CPU / 4 GB RAM allocation and mounted the old `03-ironbird/` workspace. | Retired |
| **Infisical** | Secret management platform with PostgreSQL backend and Redis cache. Self-hosted alternative to HashiCorp Vault. Was fronted at `secrets.home.example.com`. | Retired |
| **Stripe CLI** | Forwarded Stripe webhook events to the old `pulse-api` backend at `http://pulse-api:3000/api/webhooks/stripe`. Needed for subscription/payment processing in a previous project. | Retired |
| **Rclone** | Cloud storage sync with web GUI on port `5572`. Was used for scheduled backups to cloud providers. Config file with provider credentials was in `./config/`. | Retired |
| **Filestash** | Web-based file management UI on port `8334`. Connected to various backends (S3, FTP, WebDAV). Was a template/experimental setup that never went into production. | Template |

---

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

- All active services join `web-network` (external Docker bridge network).
- Nginx Proxy Manager on port `81` routes `*.home.example.com`.
- Immich uses `db-network` for PostgreSQL/Redis internal traffic.
- Tailscale uses `network_mode: host` (subnet router + exit node).

## Security

- Cloudflare tunnel token is configured via `00-core/cloudflare/.env`.
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
