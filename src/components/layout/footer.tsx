import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg bg-gradient-to-r from-pink-primary to-pink-vibrant bg-clip-text text-transparent">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {personalInfo.title} passionate about creating efficient, scalable solutions and learning new technologies.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {personalInfo.socialMedia.github && (
                <Link
                  href={personalInfo.socialMedia.github}
                  className="text-muted-foreground hover:text-pink-primary transition-colors"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {personalInfo.socialMedia.linkedin && (
                <Link
                  href={personalInfo.socialMedia.linkedin}
                  className="text-muted-foreground hover:text-pink-primary transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {personalInfo.socialMedia.twitter && (
                <Link
                  href={personalInfo.socialMedia.twitter}
                  className="text-muted-foreground hover:text-pink-primary transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#about" className="hover:text-pink-primary transition-colors">
                About
              </a>
              <a href="#skills" className="hover:text-pink-primary transition-colors">
                Skills
              </a>
              <a href="#projects" className="hover:text-pink-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="hover:text-pink-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Information</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/documentation" className="hover:text-pink-primary transition-colors">
                Documentation
              </Link>
              <Link href="/shipping" className="hover:text-pink-primary transition-colors">
                Shipping Info
              </Link>
              <Link href="/terms" className="hover:text-pink-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-pink-primary transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-medium">Connect</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 {personalInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
