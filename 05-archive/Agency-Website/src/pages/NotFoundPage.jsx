import React from 'react';
import { Link } from 'react-router-dom';
import DecorativePlaceholder from '../components/placeholders/DecorativePlaceholder';

const NotFoundPage = () => {
    return (
        <main style={{
            backgroundColor: '#0a0a0a',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <DecorativePlaceholder type="star" id="404-star-1" position={{ top: "20%", left: "10%" }} size="lg" color="red" />
                <DecorativePlaceholder type="star" id="404-star-2" position={{ bottom: "20%", right: "10%" }} size="md" color="lime" />
            </div>

            <h1 style={{
                fontSize: 'clamp(8rem, 20vw, 15rem)',
                fontWeight: 900,
                lineHeight: 1,
                color: '#1a1a1a',
                marginBottom: '0',
                position: 'relative',
                zIndex: 1
            }}>
                404
            </h1>

            <div style={{ position: 'relative', zIndex: 2, marginTop: '-2rem' }}>
                <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '400px' }}>
                    The page you are looking for has been moved, removed, or never existed.
                </p>
                <Link to="/" className="btn-primary">Back to Home</Link>
            </div>
        </main>
    );
};

export default NotFoundPage;
