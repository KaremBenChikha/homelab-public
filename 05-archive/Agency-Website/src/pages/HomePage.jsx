import React from 'react';
import HeroSection from '../sections/HeroSection';
import ExpertiseSection from '../sections/ExpertiseSection';
import ClientsSection from '../sections/ClientsSection';
import CTASection from '../sections/CTASection';
import BlogPreviewSection from '../sections/BlogPreviewSection';

const HomePage = () => {
    return (
        <main>
            <HeroSection />
            <ExpertiseSection />
            <ClientsSection />
            <BlogPreviewSection />
            <CTASection />
        </main>
    );
};

export default HomePage;
