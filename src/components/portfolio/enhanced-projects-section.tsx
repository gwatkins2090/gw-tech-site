'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Calendar,
  Filter,
  X,
  ChevronRight,
  Play,
  Code2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/portfolio';
import ProjectDetailModal from './project-detail-modal';

const EnhancedProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'featured'>('featured');

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const techMatch = selectedTech === 'all' || project.technologies.includes(selectedTech);
      return categoryMatch && techMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  const selectedProjectData = projects.find(p => p.id === selectedProject);

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
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-pink-primary mr-3" />
              <h2 className="heading-secondary">Featured Projects</h2>
            </div>
            <p className="portfolio-subtitle max-w-3xl mx-auto">
              Explore my portfolio of production-ready applications. Each project showcases 
              modern development practices, clean code, and user-centric design.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-sm font-medium mr-2">Category:</span>
                {categories.map(category => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-pink-primary hover:bg-pink-primary/90' : ''}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium mr-2">Sort:</span>
                <Button
                  size="sm"
                  variant={sortBy === 'featured' ? 'default' : 'outline'}
                  onClick={() => setSortBy('featured')}
                  className={sortBy === 'featured' ? 'bg-pink-primary hover:bg-pink-primary/90' : ''}
                >
                  Featured
                </Button>
                <Button
                  size="sm"
                  variant={sortBy === 'date' ? 'default' : 'outline'}
                  onClick={() => setSortBy('date')}
                  className={sortBy === 'date' ? 'bg-pink-primary hover:bg-pink-primary/90' : ''}
                >
                  Recent
                </Button>
              </div>
            </div>

            {/* Technology Filter */}
            {selectedTech !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">Filtered by:</span>
                <Badge variant="secondary" className="bg-pink-primary/10 text-pink-primary">
                  {selectedTech}
                  <button
                    onClick={() => setSelectedTech('all')}
                    className="ml-2 hover:text-pink-primary/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              </motion.div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-pink-primary/50 transition-all duration-300"
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-pink-primary text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            className="bg-pink-primary hover:bg-pink-primary/90"
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Code2 className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.startDate.split('-')[0]}
                      </div>
                      <Badge variant="outline" className="border-pink-primary/30 text-pink-primary">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold group-hover:text-pink-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTech(tech)}
                          className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-pink-primary/10 hover:text-pink-primary transition-colors cursor-pointer"
                        >
                          {tech}
                        </button>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-1 text-muted-foreground">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Button
                      variant="ghost"
                      className="w-full group/btn hover:bg-pink-primary/10 hover:text-pink-primary"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      View Full Case Study
                      <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No projects found with the selected filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTech('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProjectData && (
        <ProjectDetailModal
          project={selectedProjectData}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default EnhancedProjectsSection;

