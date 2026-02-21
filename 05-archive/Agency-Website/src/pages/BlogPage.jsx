import React from 'react';
import ImagePlaceholder from '../components/placeholders/ImagePlaceholder';
import '../styles/sections.css'; // Reusing blog card styles
import '../styles/pages.css';

const BlogPage = () => {
    const posts = [
        { title: "The Psychology of Color", category: "Branding", date: "Jan 28, 2026" },
        { title: "Why Your Startup Needs Strategy", category: "Strategy", date: "Jan 22, 2026" },
        { title: "Behind the Scenes: Rebranding", category: "Case Study", date: "Jan 15, 2026" },
        { title: "Design Trends 2026", category: "Trends", date: "Jan 8, 2026" },
        { title: "The Art of the Creative Brief", category: "Process", date: "Dec 29, 2025" },
        { title: "Building a Brand That Scales", category: "Strategy", date: "Dec 18, 2025" },
    ];

    return (
        <main>
            <div className="page-header">
                <h1>Insights & Ideas</h1>
                <p>Thoughts on branding, design, and building remarkable brands</p>
            </div>

            <div className="blog-page-grid">
                <div className="main-feed blog-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {posts.map((post, i) => (
                        <div className="blog-card" key={i}>
                            <ImagePlaceholder id={`blog-post-${i}`} aspectRatio="16/9" />
                            <div className="blog-content">
                                <div className="blog-meta">{post.category} • {post.date}</div>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="sidebar">
                    <h3 className="font-bold mb-4">Categories</h3>
                    <ul className="space-y-2 mb-8 text-gray-600">
                        <li>Branding (12)</li>
                        <li>Strategy (8)</li>
                        <li>Design (15)</li>
                        <li>Process (4)</li>
                    </ul>

                    <h3 className="font-bold mb-4">Newsletter</h3>
                    <p className="text-sm text-gray-500 mb-4">Get the latest insights delivered to your inbox.</p>
                    <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" />
                    <button className="btn-primary w-full">Subscribe</button>
                </aside>
            </div>
        </main>
    );
};

export default BlogPage;
