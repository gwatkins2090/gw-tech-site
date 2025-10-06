'use client';

import { motion } from 'framer-motion';
import { Book, Code, FileText, Lightbulb, Settings, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentationPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const documentationSections = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics and get up and running quickly with our comprehensive guides.',
      topics: ['Installation', 'Configuration', 'Quick Start Guide', 'Basic Concepts']
    },
    {
      icon: Code,
      title: 'API Reference',
      description: 'Detailed documentation of all available APIs, methods, and endpoints.',
      topics: ['REST API', 'Authentication', 'Rate Limits', 'Error Handling']
    },
    {
      icon: Terminal,
      title: 'CLI Tools',
      description: 'Command-line interface documentation and usage examples.',
      topics: ['Commands', 'Options', 'Scripts', 'Automation']
    },
    {
      icon: Settings,
      title: 'Configuration',
      description: 'Advanced configuration options and environment setup.',
      topics: ['Environment Variables', 'Config Files', 'Security Settings', 'Performance Tuning']
    },
    {
      icon: Lightbulb,
      title: 'Best Practices',
      description: 'Recommended patterns and practices for optimal results.',
      topics: ['Code Style', 'Architecture', 'Testing', 'Deployment']
    },
    {
      icon: FileText,
      title: 'Tutorials',
      description: 'Step-by-step tutorials for common use cases and scenarios.',
      topics: ['Beginner Tutorials', 'Advanced Topics', 'Use Cases', 'Examples']
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-primary mb-6 bg-gradient-to-r from-pink-primary via-pink-vibrant to-red-highlight bg-clip-text text-transparent">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know to get started and master the platform. 
              Comprehensive guides, API references, and best practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {documentationSections.map((section, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-pink-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <section.icon className="h-6 w-6 text-pink-primary" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-pink-primary rounded-full mr-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-secondary text-center mb-12">Popular Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                  <CardDescription>
                    Get up and running in under 5 minutes with our quick start guide.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>
                    Complete API reference with examples and code snippets.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Troubleshooting</CardTitle>
                  <CardDescription>
                    Common issues and their solutions to help you debug faster.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>
                    Join our community to ask questions and share knowledge.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="heading-secondary mb-6">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-muted-foreground mb-8">
              Search our documentation or reach out to our support team for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                placeholder="Search documentation..."
                className="px-6 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-pink-primary"
              />
              <button className="btn-primary px-8 py-3">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DocumentationPage;

