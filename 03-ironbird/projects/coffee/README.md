# Coffee SaaS Landing Page

This project was bootstrapped using the ORION SaaS Protocol with strict Docker standards.

## 🚀 Deployment

1.  **Navigate:** Change directory into the project folder:
    \`cd coffee-saas\`
2.  **Environment:** The \`.env.example\` sets the default port to \`8080\`. Copy it to \`.env\` if you need custom settings:
    \`cp .env.example .env\`
3.  **Run:** Start the container using Docker Compose:
    \`docker-compose up -d\`

## 🌐 Access

The landing page will be accessible at: \`http://localhost:8080\` (or the port specified in your .env file).

## 🛠️ Stack

-   **Web Server:** Nginx (alpine)
-   **Frontend:** Pure HTML with Tailwind CSS (CDN for rapid prototyping)
-   **Configuration:** \`./config/nginx.conf\`
-   **Source:** \`./src/index.html\`
