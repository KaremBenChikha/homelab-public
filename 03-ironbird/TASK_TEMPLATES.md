# 🎯 Orion Project Templates

## Template: Simple API Service

@Orion, create: [service-name]

Stack: Node.js + Express
Port: [3xxx]

Endpoints:
- GET /health
- [your endpoints]

Database: [none/postgres/redis]

Deliver:
1. Source in /workspace/projects/[name]/
2. Dockerfile (Alpine, non-root)
3. docker-compose.yml (health check)
4. README.md
5. Build and test
6. Move to /workspace/deployments/[name]/
