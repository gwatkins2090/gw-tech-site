'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Award, Users } from 'lucide-react';
import { personalInfo, experience, education } from '@/data/portfolio';

const AboutSection = () => {
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

  return (
    <section id="about" className="portfolio-section">
      <div className="portfolio-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="portfolio-header">
            <h2 className="heading-secondary mb-4">About Me</h2>
            <p className="portfolio-subtitle">
              Get to know more about my background, experience, and what drives me as a developer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image and Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="relative">
                <div className="relative w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-primary/10 to-pink-vibrant/10">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 320px, 320px"
                    priority
                  />
                </div>
                {/* Decorative elements - TEMPORARILY REMOVED TO DEBUG GREEN BOX */}
                {/* <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-pink-primary/30 rounded-lg -z-10 bg-transparent" /> */}
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <MapPin className="h-6 w-6 text-pink-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{personalInfo.location}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Users className="h-6 w-6 text-pink-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold capitalize">{personalInfo.availability}</p>
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="heading-tertiary mb-4">My Journey</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I&apos;m a passionate full-stack developer with over 4 years of experience creating
                  digital solutions that make a difference. My journey started with a curiosity
                  about how websites work, and it has evolved into a deep love for crafting
                  efficient, scalable, and user-friendly applications.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in modern web technologies and enjoy working on projects that
                  challenge me to learn and grow. When I&apos;m not coding, you can find me
                  contributing to open-source projects, writing technical articles, or
                  exploring the latest trends in technology.
                </p>
              </div>

              {/* Interests */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Interests & Passions</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-primary/10 text-pink-primary rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Roles */}
              <div>
                <h4 className="text-lg font-semibold mb-3">Looking For</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.preferredRoles.map((role, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-highlight/10 text-red-highlight rounded-full text-sm font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="heading-tertiary text-center mb-12">Professional Experience</h3>
            <div className="space-y-8">
              {experience.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">{exp.position}</h4>
                      <p className="text-pink-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Technologies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="heading-tertiary text-center mb-12">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-pink-primary/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-pink-primary font-medium">{edu.field}</p>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <Award className="h-6 w-6 text-pink-primary" />
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {edu.startDate} - {edu.endDate}
                  </div>
                  
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mb-3">GPA: {edu.gpa}/4.0</p>
                  )}
                  
                  {edu.honors && edu.honors.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-medium text-sm mb-1">Honors:</h5>
                      <div className="flex flex-wrap gap-1">
                        {edu.honors.map((honor, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-pink-primary/10 text-pink-primary rounded text-xs"
                          >
                            {honor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
