import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LegalPage = () => {
    const { pathname } = useLocation();
    const type = pathname.includes('privacy') ? 'Privacy Policy' : 'Terms of Service';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem', color: '#ccc' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
                <h1 style={{ color: '#fff', marginBottom: '2rem' }}>{type}</h1>
                <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>1. Overview</h2>
                    <p>
                        Welcome to Automate.io. We are committed to protecting your personal information and your right to privacy.
                        If you have any questions or concerns about our policy, or our practices with regards to your personal information,
                        please contact us.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>2. Information Collection</h2>
                    <p>
                        We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information
                        about us or our products and services, when participating in activities on the Website or otherwise contacting us.
                    </p>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>3. Use of Information</h2>
                    <p>
                        We use the information we collect or receive:
                    </p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send you marketing and promotional communications.</li>
                        <li>To send administrative information to you.</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>4. Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, you may email us at privacy@automate.qzz.io.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default LegalPage;
