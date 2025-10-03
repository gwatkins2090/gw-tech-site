'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/portfolio';

const ProjectsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="portfolio-section bg-background/15 backdrop-blur-sm">
      <div className="portfolio-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="portfolio-header">
            <h2 className="heading-secondary mb-4">Featured Projects</h2>
            <p className="portfolio-subtitle">
              A showcase of my recent work, demonstrating my skills in full-stack development, 
              UI/UX design, and problem-solving.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <div className="space-y-24">
            {featuredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Project Image */}
                  <motion.div 
                    className={`relative group ${!isEven ? 'lg:col-start-2' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      
                      {/* Overlay with links */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="secondary"
                            asChild
                            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                          >
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            asChild
                            className="bg-pink-primary hover:bg-pink-primary/90"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className={`absolute -top-4 ${isEven ? '-right-4' : '-left-4'} w-24 h-24 border-2 border-pink-primary/20 rounded-lg -z-10`} />
                    <div className={`absolute -bottom-4 ${isEven ? '-left-4' : '-right-4'} w-16 h-16 bg-pink-vibrant/10 rounded-full -z-10`} />
                  </motion.div>

                  {/* Project Content */}
                  <motion.div 
                    className={`space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    variants={itemVariants}
                  >
                    {/* Project Meta */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.startDate} - {project.endDate || 'Present'}
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-pink-primary/10 text-pink-primary border-pink-primary/20"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Project Title */}
                    <h3 className="heading-tertiary">{project.title}</h3>

                    {/* Project Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-pink-primary" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="border-border hover:border-pink-primary hover:text-pink-primary transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Features or Challenges */}
                    {project.challenges && project.challenges.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Key Challenges</h4>
                        <ul className="space-y-2">
                          {project.challenges.map((challenge, challengeIndex) => (
                            <li key={challengeIndex} className="flex items-start">
                              <div className="w-2 h-2 bg-pink-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      {project.liveUrl && (
                        <Button asChild className="btn-primary">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" asChild className="btn-secondary">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            View Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* All Projects Link */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Want to see more of my work? Check out my GitHub for additional projects and contributions.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="border-pink-primary text-pink-primary hover:bg-pink-primary hover:text-white"
            >
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
