import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar" style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', borderBottom: '1px solid #1a1a1a', position: 'relative', zIndex: 1000 }}>
            <div className="logo">
                <Link to="/" onClick={closeMenu}>
                    <img src="/assets/logo-primary.svg" alt="Automate.io" style={{ height: '40px' }} />
                </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
                className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Navigation Links */}
            <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                <Link to="/" className="nav-link" onClick={closeMenu}>Products</Link>
                <Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link>
                <Link to="/blog" className="nav-link" onClick={closeMenu}>Insights</Link>

                {/* Mobile Specific CTA */}
                <div className="mobile-cta-container">
                    <Link to="/contact" className="btn-primary" onClick={closeMenu}>Contact</Link>
                </div>
            </div>

            {/* Desktop CTA */}
            <div className="cta desktop-only">
                <Link to="/contact" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
