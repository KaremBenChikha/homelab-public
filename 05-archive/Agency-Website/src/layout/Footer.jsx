import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert("Thanks for subscribing! We'll be in touch.");
    };

    return (
        <footer className="footer" style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="footer-grid">
                <div className="footer-section">
                    <h3>Automate.io</h3>
                    <p style={{ color: 'var(--color-gray)' }}>Built by Karem in Montreal. Powered by AI.</p>
                </div>

                <div className="footer-section">
                    <h4>Products</h4>
                    <ul className="footer-links">
                        <li><Link to="/products/pulse">Pulse</Link></li>
                        <li><Link to="/products/snap">Snap</Link></li>
                        <li><Link to="/products/forge">Forge</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Connect</h4>
                    <ul className="social-links">
                        <li><a href="mailto:karem@automate.qzz.io">Email</a></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Newsletter</h4>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input type="email" placeholder="Email address" style={{ backgroundColor: '#1a1a1a' }} required />
                        <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>→</button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Automate.qzz.io. All rights reserved.</p>
                <p style={{ marginTop: '0.5rem' }}>Architected and deployed using Orion AI Engineering.</p>
            </div>
        </footer>
    );
};

export default Footer;
