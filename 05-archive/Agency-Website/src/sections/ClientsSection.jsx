import React from 'react';
import LogoPlaceholder from '../components/placeholders/LogoPlaceholder';
import '../styles/sections.css';

const ClientsSection = () => {
    return (
        <section className="clients-section" id="clients">
            <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-8">Trusted By</h3>
            <div className="clients-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <LogoPlaceholder key={i} id={`client-logo-${i}`} className="opacity-60 hover:opacity-100 transition-opacity" />
                ))}
            </div>
        </section>
    );
};

export default ClientsSection;
