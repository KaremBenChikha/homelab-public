# 🦞 OpenClaw Homelab Setup

**Status:** Operational  
**URL:** https://claw.automate.qzz.io (or your domain)  
**Infrastructure:** Docker Compose + Nginx Proxy Manager (NPM)  

## 📂 Directory Structure
This directory contains only the runtime configuration. The source code is baked into the docker image `openclaw:local`.

- `docker-compose.yml` - Service definition.
- `openclaw-config/` - **DO NOT DELETE**. Contains identity, auth tokens, and database.
- `openclaw-workspace/` - The sandbox where the agent writes files/code.

## 🚀 Quick Start

### Start the Service
```bash
docker compose up -d

### View Logs

docker compose logs -f openclaw-gateway

### Stop Service

Stop Service

🔐 Authentication & Security
	•	Token: Hardcoded in  docker-compose.yml  under  OPENCLAW_GATEWAY_TOKEN .
	•	Proxy: Nginx Proxy Manager is trusted via  OPENCLAW_GATEWAY_TRUSTED_PROXIES: "0.0.0.0/0" .
	•	User: Runs as  node  (UID 1000) for security. Cannot access host filesystem outside of mounts.
🛠️ Management Commands
1. Connect a New Browser (If “Pairing Required”)
If the browser asks to pair and the password isn’t enough:

# List pending requests
docker exec -it openclaw node dist/index.js devices list

# Approve a request
docker exec -it openclaw node dist/index.js devices approve <REQUEST_ID>


2. Run the Setup Wizard (Reconfigure LLMs)
To change API keys or agent settings interactively:

docker exec -it openclaw node dist/index.js setup

3. Generate a New Admin Token
If you need a CLI token for scripts:

docker exec -it openclaw node dist/index.js api-tokens create --name "script-access"


⚠️ Troubleshooting
Browser says “Disconnected (1008)”?
	1.	Check  docker-compose.yml  to ensure  OPENCLAW_GATEWAY_TOKEN  matches what you typed.
	2.	Ensure Websockets are enabled in Nginx Proxy Manager.
Container crashing with 502?Check YAML indentation in  docker-compose.yml , specifically around environment variables.
Last Updated: February 2026


### Final Check of your `docker-compose.yml`
The file you pasted looks perfect.
*   **Security:** `user: "1000:1000"` is excellent.
*   **Networking:** `network_mode` or external network is handled correctly.
*   **Fixes:** `--bind lan` and `--allow-unconfigured` are exactly what fixed your issues.

You are good to go. Enjoy your AI agent!

