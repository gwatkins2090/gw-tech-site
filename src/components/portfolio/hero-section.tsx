'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    if (personalInfo.resumeUrl) {
      window.open(personalInfo.resumeUrl, '_blank');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background/5 backdrop-blur-[2px]">

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto bg-background/8 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl shadow-pink-primary/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="heading-primary mb-6 bg-gradient-to-r from-pink-primary via-pink-vibrant to-red-highlight bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {personalInfo.title}
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button 
              onClick={scrollToAbout}
              className="btn-primary text-lg px-8 py-3"
            >
              View My Work
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={downloadResume}
              className="border-pink-primary text-pink-primary hover:bg-pink-primary hover:text-white text-lg px-8 py-3"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {personalInfo.socialMedia.github && (
              <a
                href={personalInfo.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-primary transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
            )}
            {personalInfo.socialMedia.linkedin && (
              <a
                href={personalInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-primary transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-pink-primary transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="text-muted-foreground hover:text-pink-primary transition-colors duration-200"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
