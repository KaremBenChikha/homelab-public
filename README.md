# homelab-public

Sanitized Docker Compose template for a small self-hosted home server. Placeholders only: no real hostnames, addresses or credentials.

## Layout

```
00-core/       reverse proxy, container UI, VPN, tunnel
01-personal/   photos, file share
02-forge/      workflow automation
```

## Stacks

- **Reverse proxy:** Nginx Proxy Manager, TLS via DNS challenge
- **VPN:** Tailscale (subnet router)
- **Tunnel:** Cloudflare Tunnel (outbound only)
- **Container UI:** Portainer, Docker socket mounted read-only
- **Photos:** Immich
- **Files:** Samba
- **Automation:** n8n

## Usage

Copy each `.env.example` to `.env`, fill in the values, then:

```bash
docker compose -f 00-core/npm/docker-compose.yml up -d
```

Set `LAN_SUBNET` in `00-core/tailscale/.env` before starting Tailscale.

## Security

`.env` files and data volumes are gitignored. Secrets live in `.env` only, never in compose files.

## License

MIT
