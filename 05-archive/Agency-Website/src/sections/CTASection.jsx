import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sections.css';

const CTASection = () => {
    return (
        <section className="cta-section" style={{ backgroundColor: '#0a0a0a', textAlign: 'center', padding: '10rem 2rem' }}>
            <h2 className="cta-heading" style={{ fontSize: 'var(--text-h1)', marginBottom: '2rem', color: '#fff' }}>
                Ready to Build Your Next <span style={{ color: '#ef4444' }}>SaaS</span>?
            </h2>
            <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.25rem' }}>
                Join the ecosystem of high-performance tools architected for the next generation of engineers.
            </p>

            <Link to="/contact" className="btn-primary" style={{ fontSize: '1.25rem', padding: '1.25rem 3rem' }}>
                Get in Touch
            </Link>
        </section>
    );
};

export default CTASection;
