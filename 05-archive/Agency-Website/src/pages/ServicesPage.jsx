import React from 'react';
import ImagePlaceholder from '../components/placeholders/ImagePlaceholder';
import CTASection from '../sections/CTASection';
import '../styles/pages.css';

const ServicesPage = () => {
    const capabilities = [
        {
            title: "AI Engineering",
            desc: "Every tool is architected using Orion—a self-trained AI Master Engineer. We build robust systems that handle complex data and automate workflows with precision.",
            list: ["Custom LLM integration", "Automated code generation", "Predictive analysis pipelines"]
        },
        {
            title: "Homelab Orchestration",
            desc: "No cloud lock-in. We specialize in Docker-based deployments on bare-metal infrastructure. Pure engineering craftsmanship meets modern DevOps.",
            list: ["Docker & Traefik management", "Self-hosted CI/CD", "High-availability clusters"]
        },
        {
            title: "Automation (n8n)",
            desc: "Connecting the dots between AI and production. We build complex workflows that sync data across Telegram, APIs, and databases effortlessly.",
            list: ["Custom n8n nodes", "API bridging", "Automated alert systems"]
        }
    ];

    return (
        <main style={{ backgroundColor: '#0a0a0a' }}>
            <div className="page-header" style={{ padding: '8rem 2rem 4rem', backgroundColor: '#0a0a0a' }}>
                <h1 style={{ color: '#ef4444' }}>Our Capabilities</h1>
                <p style={{ color: '#888' }}>The engineering stack behind Automate.io products</p>
            </div>

            <div className="services-list">
                {capabilities.map((cap, index) => (
                    <div className="service-item" key={index} style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '6rem' }}>
                        <div className="service-image">
                            <ImagePlaceholder id={`cap-${index}`} aspectRatio="4/3" label={cap.title} style={{ borderColor: '#ef4444' }} />
                        </div>
                        <div className="service-text">
                            <h2 style={{ color: '#fff' }}>{cap.title}</h2>
                            <p style={{ color: '#888' }}>{cap.desc}</p>
                            <ul className="service-deliverables" style={{ borderColor: '#ef4444' }}>
                                {cap.list.map((item, i) => (
                                    <li key={i} style={{ color: '#666' }}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <CTASection />
        </main>
    );
};

export default ServicesPage;
