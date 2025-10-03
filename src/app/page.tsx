import { Suspense } from 'react';
import HeroSection from '@/components/portfolio/hero-section';
import AboutSection from '@/components/portfolio/about-section';
import SkillsSection from '@/components/portfolio/skills-section';
import ProjectsSection from '@/components/portfolio/projects-section';
import ContactSection from '@/components/portfolio/contact-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Suspense fallback={<div className="min-h-screen bg-muted animate-pulse" />}>
        <div id="home">
          <HeroSection />
        </div>
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <AboutSection />
      </Suspense>

      {/* Skills Section */}
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <SkillsSection />
      </Suspense>

      {/* Projects Section */}
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <ProjectsSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <ContactSection />
      </Suspense>
    </div>
  );
}
