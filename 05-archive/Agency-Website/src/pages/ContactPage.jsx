import React from 'react';
import '../styles/pages.css';

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! We'll get back to you shortly.");
    };

    return (
        <main style={{ backgroundColor: '#0a0a0a' }}>
            <div className="contact-container" style={{ minHeight: '80vh' }}>
                <div className="contact-form-section" style={{ backgroundColor: '#0c0c0c', padding: '8rem 4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Let's Create<br /><span style={{ color: '#ef4444' }}>Together</span></h1>
                    <p style={{ color: '#888', marginBottom: '3rem' }}>Have a project or partnership in mind? Reach out.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label style={{ color: '#fff' }}>Name</label>
                            <input type="text" required style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff' }} />
                        </div>

                        <div className="form-group">
                            <label style={{ color: '#fff' }}>Email</label>
                            <input type="email" required style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff' }} />
                        </div>

                        <div className="form-group">
                            <label style={{ color: '#fff' }}>Project Type</label>
                            <select style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff' }}>
                                <option>SaaS Development</option>
                                <option>AI Automation</option>
                                <option>Docker Infrastructure</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label style={{ color: '#fff' }}>Description</label>
                            <textarea rows="4" style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff' }}></textarea>
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1.25rem' }}>Send Message</button>
                    </form>
                </div>

                <div className="contact-info-section" style={{ backgroundColor: '#0a0a0a', padding: '8rem 4rem', borderLeft: '1px solid #1a1a1a' }}>
                    <div className="contact-info-item">
                        <h4 style={{ color: '#ef4444' }}>Montreal Studio</h4>
                        <p style={{ color: '#888' }}>QC, Canada<br />Architected in MTL</p>
                    </div>

                    <div className="contact-info-item">
                        <h4 style={{ color: '#ef4444' }}>Contact</h4>
                        <p style={{ color: '#888' }}>hello@automate.qzz.io<br />karem@automate.io</p>
                    </div>

                    <div className="contact-info-item">
                        <h4 style={{ color: '#ef4444' }}>Philosophy</h4>
                        <p style={{ color: '#888' }}>Pure engineering craftsmanship.<br />No cloud lock-in.</p>
                    </div>

                    <div className="mt-12 p-8" style={{ backgroundColor: '#111', borderRadius: '12px', border: '1px solid #222' }}>
                        <p style={{ fontStyle: 'italic', color: '#fff' }}>"Every tool is built with Orion – my self-trained AI engineer."</p>
                        <div className="mt-4 flex gap-2">
                            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
                            <span style={{ color: '#888', alignSelf: 'center', marginLeft: '0.5rem' }}>- Karem</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
