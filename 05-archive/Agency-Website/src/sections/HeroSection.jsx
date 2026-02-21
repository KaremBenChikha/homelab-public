import React from 'react';
import ImagePlaceholder from '../components/placeholders/ImagePlaceholder';
import DecorativePlaceholder from '../components/placeholders/DecorativePlaceholder';
import '../styles/hero.css';

const HeroSection = () => {
    return (
        <section className="hero-section" style={{ padding: '8rem 0 6rem', textAlign: 'center' }}>
            {/* Decorative Elements */}
            <DecorativePlaceholder type="star" id="star-1" position={{ top: "15%", left: "30%" }} size="md" color="lime" />
            <DecorativePlaceholder type="star" id="star-2" position={{ bottom: "10%", left: "15%" }} size="sm" color="lime" />
            <DecorativePlaceholder type="star" id="star-3" position={{ bottom: "15%", right: "40%" }} size="lg" color="red" />

            {/* Main Content */}
            <div className="hero-content">
                <h1 className="hero-headline" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
                    Build. Automate.<br />Scale.
                </h1>

                <p className="hero-description" style={{ fontSize: '1.25rem', color: '#888', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    AI-powered SaaS tools built by developers, for developers. From stock analysis to workflow automation.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="#products" className="btn-primary">Explore Products</a>
                    <button className="btn-secondary" style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #222', padding: '1rem 2rem', borderRadius: '50px' }}>Documentation</button>
                </div>
            </div>

            {/* Stats Preview (derived from dummy) */}
            <div style={{ marginTop: '6rem', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '3rem 0', backgroundColor: '#0f0f0f' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444' }}>3</div>
                        <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Products</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444' }}>24/7</div>
                        <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Uptime</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444' }}>100%</div>
                        <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Self-Hosted</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
