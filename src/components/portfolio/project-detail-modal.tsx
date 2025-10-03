'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  Github,
  Calendar,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Quote,
  Key,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/data/portfolio';
import * as Icons from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const getIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                  {/* Hero Image */}
                  <div className="relative h-80 bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-pink-primary text-white">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white">
                          <Calendar className="h-3 w-3 mr-1" />
                          {project.startDate} - {project.endDate || 'Present'}
                        </Badge>
                      </div>
                      <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
                      <p className="text-white/80 text-lg max-w-3xl">{project.description}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-8">
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <Button size="lg" className="btn-primary" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="h-5 w-5 mr-2" />
                            View Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="lg" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5 mr-2" />
                            View Source Code
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Demo Credentials */}
                    {project.demoCredentials && (
                      <div className="bg-muted/50 border border-border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Key className="h-4 w-4 text-pink-primary" />
                          <span className="font-semibold">Demo Credentials</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {project.demoCredentials.username && (
                            <div>
                              <span className="text-muted-foreground">Username: </span>
                              <code className="bg-background px-2 py-1 rounded">
                                {project.demoCredentials.username}
                              </code>
                            </div>
                          )}
                          {project.demoCredentials.password && (
                            <div>
                              <span className="text-muted-foreground">Password: </span>
                              <code className="bg-background px-2 py-1 rounded">
                                {project.demoCredentials.password}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="bg-card border border-border rounded-lg p-4 text-center hover:border-pink-primary/50 transition-colors"
                          >
                            <div className="flex justify-center mb-2">
                              {metric.icon && getIcon(metric.icon)}
                            </div>
                            <div className="text-2xl font-bold text-pink-primary mb-1">
                              {metric.value}
                            </div>
                            <div className="text-sm text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Overview */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    {/* Problem, Solution, Results */}
                    {(project.problemStatement || project.solution || project.results) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.problemStatement && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-pink-primary">
                              <Target className="h-5 w-5" />
                              <h4 className="font-semibold">Problem</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {project.problemStatement}
                            </p>
                          </div>
                        )}
                        {project.solution && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-pink-primary">
                              <Lightbulb className="h-5 w-5" />
                              <h4 className="font-semibold">Solution</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        )}
                        {project.results && project.results.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-pink-primary">
                              <TrendingUp className="h-5 w-5" />
                              <h4 className="font-semibold">Results</h4>
                            </div>
                            <ul className="space-y-2">
                              {project.results.slice(0, 3).map((result, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="bg-card border border-border rounded-lg p-4 hover:border-pink-primary/50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-pink-primary/10 rounded-lg text-pink-primary flex-shrink-0">
                                  {feature.icon && getIcon(feature.icon)}
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="px-4 py-2 text-sm border-pink-primary/30 hover:bg-pink-primary/10 hover:border-pink-primary transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Challenges & Learnings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.challenges && project.challenges.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="h-5 w-5 text-pink-primary" />
                            <h3 className="text-xl font-bold">Challenges</h3>
                          </div>
                          <ul className="space-y-2">
                            {project.challenges.map((challenge, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-pink-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {project.learnings && project.learnings.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="h-5 w-5 text-pink-primary" />
                            <h3 className="text-xl font-bold">Key Learnings</h3>
                          </div>
                          <ul className="space-y-2">
                            {project.learnings.map((learning, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{learning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Testimonials */}
                    {project.testimonials && project.testimonials.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-6">What People Say</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {project.testimonials.map((testimonial, idx) => (
                            <div
                              key={idx}
                              className="bg-card border border-border rounded-lg p-6 relative"
                            >
                              <Quote className="h-8 w-8 text-pink-primary/20 absolute top-4 right-4" />
                              <p className="text-muted-foreground italic mb-4 relative z-10">
                                &quot;{testimonial.content}&quot;
                              </p>
                              <div className="flex items-center gap-3">
                                {testimonial.avatar && (
                                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                                    <Image
                                      src={testimonial.avatar}
                                      alt={testimonial.author}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold">{testimonial.author}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {testimonial.role}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;

