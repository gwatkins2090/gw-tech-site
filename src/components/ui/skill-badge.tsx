'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  children: React.ReactNode;
  delay?: number;
}

const SkillBadge = ({ children, delay = 0 }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 20px rgba(255, 23, 68, 0.4)',
      }}
      whileTap={{ scale: 0.98 }}
      className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300 cursor-default"
      style={{
        backgroundColor: '#1e3a5f',
        border: '1px solid rgba(236, 72, 153, 0.4)',
        color: '#ec4899',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.borderColor = '#FF1744';
        target.style.backgroundColor = '#2a4a6f';
        target.style.color = '#FF1744';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.borderColor = 'rgba(236, 72, 153, 0.4)';
        target.style.backgroundColor = '#1e3a5f';
        target.style.color = '#ec4899';
      }}
    >
      {children}
    </motion.div>
  );
};

export default SkillBadge;

