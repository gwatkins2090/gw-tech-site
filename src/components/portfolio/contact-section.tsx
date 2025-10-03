'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { personalInfo } from '@/data/portfolio';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.socialMedia.github,
      icon: Github,
      color: 'hover:text-gray-600'
    },
    {
      name: 'LinkedIn',
      url: personalInfo.socialMedia.linkedin,
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      url: personalInfo.socialMedia.twitter,
      icon: Twitter,
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="portfolio-section bg-muted/10 backdrop-blur-sm">
      <div className="portfolio-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="portfolio-header">
            <h2 className="heading-secondary mb-4">Get In Touch</h2>
            <p className="portfolio-subtitle">
              I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="heading-tertiary mb-6">Let&apos;s Connect</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you have a project in mind, want to collaborate, or just want to say hello,
                  I&apos;d love to hear from you. Feel free to reach out through any of the channels below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-pink-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-pink-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <a 
                          href={`mailto:${personalInfo.email}`}
                          className="text-muted-foreground hover:text-pink-primary transition-colors"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {personalInfo.phone && (
                  <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-pink-vibrant/10 rounded-lg">
                          <Phone className="h-6 w-6 text-pink-vibrant" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Phone</h4>
                          <a 
                            href={`tel:${personalInfo.phone}`}
                            className="text-muted-foreground hover:text-pink-vibrant transition-colors"
                          >
                            {personalInfo.phone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-red-highlight/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-red-highlight" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Location</h4>
                        <p className="text-muted-foreground">{personalInfo.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    if (!social.url) return null;
                    
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-card border border-border rounded-lg text-muted-foreground ${social.color} transition-all duration-200 hover:scale-105 hover:shadow-md`}
                        aria-label={social.name}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <Card className="bg-gradient-to-r from-pink-primary/10 to-pink-vibrant/10 border-pink-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div>
                      <h4 className="font-semibold">Currently Available</h4>
                      <p className="text-sm text-muted-foreground">
                        Open to new opportunities and interesting projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="h-fit">
                <CardContent className="p-8">
                  <h3 className="heading-tertiary mb-6">Send a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="focus:ring-pink-primary focus:border-pink-primary"
                          placeholder="Your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="focus:ring-pink-primary focus:border-pink-primary"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="focus:ring-pink-primary focus:border-pink-primary"
                        placeholder="What&apos;s this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-primary focus:border-pink-primary bg-background text-foreground resize-none"
                        placeholder="Tell me about your project or just say hello!"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
