import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ImagePlaceholder from '../components/placeholders/ImagePlaceholder';
import '../styles/pages.css';

const BlogPostPage = () => {
    // In a real app, use slug to fetch data
    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', paddingTop: '80px' }}>
            <article className="blog-post-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: '1rem' }}>Insights / Strategy</div>
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                        The Future of AI in SaaS Development
                    </h1>
                    <div style={{ color: '#888', display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '30px', height: '30px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                        <span>By Karem • Jan 28, 2026 • 5 min read</span>
                    </div>
                </header>

                <div style={{ marginBottom: '3rem' }}>
                    <ImagePlaceholder id="blog-hero" aspectRatio="16/9" label="Blog Cover" />
                </div>

                <div className="post-content" style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.125rem' }}>
                    <p style={{ marginBottom: '2rem' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <h2 style={{ color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>Embracing Automation</h2>
                    <p style={{ marginBottom: '2rem' }}>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <blockquote style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem', margin: '3rem 0', fontStyle: 'italic', fontSize: '1.25rem', color: '#fff' }}>
                        "The goal isn't to replace developers, but to give them superpowers through intelligent orchestration."
                    </blockquote>

                    <h2 style={{ color: '#fff', marginTop: '3rem', marginBottom: '1.5rem' }}>The Road Ahead</h2>
                    <p style={{ marginBottom: '2rem' }}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                    </p>
                </div>

                <div style={{ borderTop: '1px solid #222', marginTop: '4rem', paddingTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: '#888', marginBottom: '1rem' }}>Enjoyed this article?</p>
                    <Link to="/blog" className="btn-primary" style={{ display: 'inline-block' }}>Back to Insights</Link>
                </div>
            </article>
        </main>
    );
};

export default BlogPostPage;
