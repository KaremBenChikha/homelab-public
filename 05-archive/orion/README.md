# 🌌 Orion - AI Software Engineer

**Status:** 🟢 Operational  
**URL:** https://orion.home.example.com  
**Mode:** Code Generation (Secure, No Docker-in-Docker)  
**Role:** AI-powered SaaS development agent for homelab  

---

## 📂 Directory Structure

~/homelab/02-forge/orion/
├── docker-compose.yml        # Service definition
├── orion-config/             # ⚠️ DO NOT DELETE - Identity, auth, sessions
├── orion-docker-cache/       # Docker build cache (managed by Sysbox)
└── README.md                 # This file
~/homelab/03-ironbird/        # Orion’s sandbox workspace
├── projects/                 # Active development projects
├── deployments/              # Production-ready compose files
├── builds/                   # Build artifacts
├── logs/                     # Build and deployment logs
├── SYSTEM_IDENTITY.md        # Orion’s instructions
└── TASK_TEMPLATES.md         # Project templates

## 🚀 Quick Start

### Start Orion
cd ~/homelab/02-forge/orion
docker compose up -d

## View Logs
docker logs orion -f --tail 100

## Stop Orion
docker compose down

## Restart Orion
docker compose restart

### 🔐 Authentication & Device Pairing
First-Time Browser Setup
	1.	Access Orion: Open https://orion.home.example.com
	2.	Enter Token: Use  OPENCLAW_GATEWAY_TOKEN  from  .env  file
	3.	If “Device pairing required”:

# List pending pairing requests
docker exec -it orion node dist/index.js devices list

# Approve your browser (copy REQUEST_ID from pending table)
docker exec -it orion node dist/index.js devices approve <REQUEST_ID>

# Refresh browser - connection should establish

# Manage Devices
# List all devices
docker exec -it orion node dist/index.js devices list

# Unpair old/unused devices
docker exec -it orion node dist/index.js devices unpair <DEVICE_ID>

### 🛠️ Management Commands
Configuration
# Reconfigure LLM API keys and settings
docker exec -it orion node dist/index.js setup

# Generate API token for automation
docker exec -it orion node dist/index.js api-tokens create --name "n8n-integration"

# List API tokens
docker exec -it orion node dist/index.js api-tokens list

## Monitoring 
# Check resource usage
docker stats orion --no-stream

# Check workspace contents
docker exec -it orion ls -la /workspace/

# View active projects
ls -la ~/homelab/03-ironbird/projects/

## workspace management 
# Access workspace from host
cd ~/homelab/03-ironbird/

# View current projects
ls -la projects/

# View services ready for deployment
ls -la deployments/

# Check build logs
tail -f logs/*.log

🐳 Architecture: Code Generation Mode
What Orion CAN Do
	•	✅ Generate complete project code (Node.js, Python, Go, etc.)
	•	✅ Write Dockerfiles and docker-compose.yml
	•	✅ Create API endpoints and business logic
	•	✅ Generate tests and documentation
	•	✅ Access internet for package research
	•	✅ Read/write files in  /workspace/ 
	•	✅ Debug and fix code based on error messages
What Orion CANNOT Do (By Design)
	•	❌ Build Docker images (you do this on host for security)
	•	❌ Run containers (you control testing)
	•	❌ Deploy to production (you maintain control)

Why This Architecture is Better
	•	Simple: No complex Docker-in-Docker setup
	•	Secure: Clear separation of concerns
	•	Fast: Orion generates code in seconds
	•	Reliable: No nested container complexity
	•	Maintainable: Standard Docker workflow
📈 Development Workflow
Step 1: Give Orion a Task
Access https://orion.home.example.com and describe your project:


### Step 2: Orion Generates Code
Orion writes complete project to `/workspace/projects/service-name/`:
- Source code
- Dockerfile
- docker-compose.yml
- README.md
- Tests
- Documentation

### Step 3: Review Code
cd ~/homelab/03-ironbird/projects/service-name/
cat README.md
cat Dockerfile

### Step4 : Build and Test

### Step 2: Orion Generates Code
Orion writes complete project to `/workspace/projects/service-name/`:
- Source code
- Dockerfile
- docker-compose.yml
- README.md
- Tests
- Documentation

### Step 3: Review Code
cd ~/homelab/03-ironbird/projects/service-name/
cat README.md
cat Dockerfile

### Step 5: Debug (If Needed)
If errors occur:
	1.	Copy error message
	2.	Paste to Orion: “I got this error: paste”
	3.	Orion fixes code
	4.	Rebuild:  docker compose down && docker compose up -d --build 

### Step 6 : Deploy to Production
# Copy to production
cp -r ~/homelab/03-ironbird/deployments/service-name/ \
      ~/homelab/04-production/service-name/

cd ~/homelab/04-production/service-name/

# Deploy
docker compose up -d

# Configure NPM subdomain: service-name.home.example.com → service-name:PORT


### 🔧 Troubleshooting
Browser Shows “Disconnected (1008)”
Cause: Token mismatch or WebSocket issue
Fix:
	1.	Verify token in  docker-compose.yml  matches browser input
	2.	Check NPM has “WebSockets Support” enabled
	3.	Restart:  docker compose restart 
Container Won’t Start (502 Error)
Cause: YAML indentation or port conflict
Fix:
# Check compose file syntax
docker compose config

# Check port availability
sudo netstat -tulpn | grep 18789

# View startup errors
docker logs orion --tail 50

Can’t Access Workspace Files
Cause: Permission mismatch
Fix:

# Check ownership
ls -la ~/homelab/03-ironbird/

# Fix permissions
sudo chown -R 1001:1001 ~/homelab/03-ironbird/

# Verify inside container
docker exec -it orion ls -la /workspace/

High Memory Usage (> 90%)
Cause: Too many projects or large files
Fix:
# Check memory
docker stats orion --no-stream

# Clean old projects
cd ~/homelab/03-ironbird/projects/
rm -rf old-project-name/

# Restart
docker compose restart


📊 Resource Limits
Current Allocation:
	•	CPU: 3.0 cores max, 1.5 cores reserved
	•	Memory: 4GB max, 2GB reserved
	•	Disk: Limited by host /home partition
Adjust in  docker-compose.yml  if needed:

deploy:
  resources:
    limits:
      cpus: '3.0'
      memory: 4G

🔒 Security
	•	User: Runs as  node  (UID 1000) - cannot access host as root
	•	Networks: Connected to  web-network  only
	•	Mounts: Limited to  /workspace/  (read-write),  /production/  (read-only)
	•	Firewall: No direct ports exposed (access via NPM only)
	•	Secrets: Stored in  orion-config/credentials/  (never commit to git)
	•	Runtime: Sysbox provides VM-like isolation
🆘 Emergency Commands
Force Restart

docker restart orion


Reset Orion (Keep Config)

docker compose down
docker compose up -d --force-recreate

Full Reset (⚠️ DELETES ALL DATA)

docker compose down -v
rm -rf orion-docker-cache/*
# Config and workspace preserved
docker compose up -d


📝 Helper Scripts
Orion Status Dashboard
~/homelab/orion-status.sh


Deploy Service to Production

~/homelab/orion-deploy.sh <service-name>

🔗 Related Services
	•	Nginx Proxy Manager: https://npm.home.example.com
	•	Portainer: https://portainer.home.example.com
	•	n8n Automation: https://n8n.home.example.com
📅 System Info
Last Updated: February 14, 2026
Version: Orion v1.0 (OpenClaw 2026.2.6)
Runtime: Sysbox-runc (secure isolation)
Base Image: openclaw:local
Mode: Code Generation
🌌 Orion is Ready to Build!

Your AI software engineer is operational and ready to generate SaaS projects.
First Task: Access https://orion.home.example.com and try the “hello-orion” test project!