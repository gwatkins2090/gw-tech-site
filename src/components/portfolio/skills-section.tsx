'use client';

import { motion } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Monitor } from 'lucide-react';
import { skills } from '@/data/portfolio';
import SkillBadge from '@/components/ui/skill-badge';

const SkillsSection = () => {
  const skillCategories = {
    frontend: { icon: Monitor, label: 'Frontend', color: 'text-pink-primary' },
    backend: { icon: Code, label: 'Backend', color: 'text-pink-vibrant' },
    database: { icon: Database, label: 'Database', color: 'text-red-highlight' },
    tools: { icon: Wrench, label: 'Tools', color: 'text-red-secondary' },
    cloud: { icon: Cloud, label: 'Cloud', color: 'text-pink-primary' },
  };

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

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <section id="skills" className="portfolio-section bg-muted/10 backdrop-blur-sm">
      <div className="portfolio-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="portfolio-header">
            <h2 className="heading-secondary mb-4">Skills & Technologies</h2>
            <p className="portfolio-subtitle">
              A comprehensive overview of my technical skills and proficiency levels across different domains.
            </p>
          </motion.div>

          {/* Skills by Category */}
          <div className="space-y-12">
            {Object.entries(skillCategories).map(([categoryKey, categoryInfo]) => {
              const categorySkills = getSkillsByCategory(categoryKey);
              if (categorySkills.length === 0) return null;

              const IconComponent = categoryInfo.icon;

              return (
                <motion.div key={categoryKey} variants={itemVariants}>
                  {/* Category Header */}
                  <div className="flex items-center mb-8">
                    <div className={`p-3 rounded-lg bg-card border border-border mr-4`}>
                      <IconComponent className={`h-6 w-6 ${categoryInfo.color}`} />
                    </div>
                    <h3 className="heading-tertiary">{categoryInfo.label}</h3>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill, index) => (
                      <SkillBadge key={skill.id} delay={index * 0.05}>
                        {skill.name}
                      </SkillBadge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-card/50 border border-pink-primary/20 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="heading-tertiary text-center mb-8">Technical Proficiency Overview</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-primary mb-2">
                    {skills.filter(s => s.proficiency >= 90).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Expert Level</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-pink-vibrant mb-2">
                    {skills.filter(s => s.proficiency >= 75 && s.proficiency < 90).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Advanced</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-red-highlight mb-2">
                    {skills.filter(s => s.proficiency >= 60 && s.proficiency < 75).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Intermediate</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-red-secondary mb-2">
                    {skills.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Skills</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Learning Philosophy */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Continuous Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Technology evolves rapidly, and I believe in staying current with the latest trends and best practices. 
                I regularly invest time in learning new technologies, contributing to open-source projects, and 
                experimenting with emerging tools to enhance my skill set and deliver better solutions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
