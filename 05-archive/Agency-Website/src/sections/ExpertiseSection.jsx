import React from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/placeholders/ImagePlaceholder';
import '../styles/sections.css';

const ExpertiseSection = () => {
    const products = [
        {
            title: "Pulse",
            status: "Live",
            statusClass: "live",
            icon: "📈",
            desc: "AI-powered stock analysis delivered daily. Upload your portfolio, get hold/sell recommendations via Telegram.",
            features: ["Daily automated analysis", "Custom risk profiles", "Telegram notifications"]
        },
        {
            title: "Snap",
            status: "Coming Soon",
            statusClass: "beta",
            icon: "📸",
            desc: "Website screenshot and monitoring API. Capture, compare, and alert on webpage changes.",
            features: ["Scheduled screenshots", "Visual diff detection", "Webhook notifications"]
        },
        {
            title: "Forge",
            status: "Internal",
            statusClass: "",
            icon: "⚡",
            desc: "AI-powered development platform. Orion AI Engineer + n8n automation for rapid SaaS deployment.",
            features: ["AI code generation", "Automated workflows", "Docker orchestration"]
        }
    ];

    return (
        <section className="expertise-section" id="products" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="section-header">
                <h2 style={{ color: '#fff' }}>Our Products</h2>
                <p style={{ color: '#888' }}>Simple, powerful tools for modern workflows</p>
            </div>

            <div className="cards-grid">
                {products.map((product, index) => (
                    <div className="service-card" key={index} style={{ backgroundColor: '#111', border: '1px solid #222', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '3rem', padding: '2rem 2rem 0' }}>{product.icon}</div>
                        <div className="service-card-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>{product.title}</h3>
                                <span className={`product-status ${product.statusClass}`} style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    backgroundColor: product.statusClass === 'live' ? 'rgba(239, 68, 68, 0.1)' : product.statusClass === 'beta' ? 'rgba(251, 191, 36, 0.1)' : '#1a1a1a',
                                    color: product.statusClass === 'live' ? '#ef4444' : product.statusClass === 'beta' ? '#fbbf24' : '#888'
                                }}>
                                    {product.status}
                                </span>
                            </div>
                            <p style={{ color: '#888', marginBottom: '1.5rem' }}>{product.desc}</p>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', flex: 1 }}>
                                {product.features.map((feat, i) => (
                                    <li key={i} style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        <span style={{ color: '#ef4444', marginRight: '0.5rem' }}>→</span> {feat}
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/products/${product.title.toLowerCase()}`} style={{ color: '#fff', textDecoration: 'underline', marginTop: 'auto', fontSize: '0.9rem' }}>
                                View Details →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExpertiseSection;
