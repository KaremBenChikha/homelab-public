import React from 'react';
import ImagePlaceholder from '../components/placeholders/ImagePlaceholder';
import { Link } from 'react-router-dom';
import '../styles/sections.css';

const BlogPreviewSection = () => {
    return (
        <section className="blog-preview-section">
            <div className="section-header">
                <h2>Latest Insights</h2>
                <Link to="/blog" className="text-purple-600 hover:underline">View all posts →</Link>
            </div>

            <div className="blog-grid">
                {[1, 2, 3].map(i => (
                    <div className="blog-card" key={i}>
                        <ImagePlaceholder id={`blog-thumb-${i}`} aspectRatio="16/9" />
                        <div className="blog-content">
                            <div className="blog-meta">Category • 5 min read</div>
                            <h3 className="blog-title">The Psychology of Color in Brand Design</h3>
                            <p className="text-gray-500 text-sm">Color isn't just aesthetic—it's emotional. Discover how strategic choices...</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogPreviewSection;
