export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';
  proficiency: number; // 1-100
  icon?: string;
  color?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectTestimonial {
  author: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  challenges?: string[];
  learnings?: string[];
  features?: ProjectFeature[];
  metrics?: ProjectMetric[];
  testimonials?: ProjectTestimonial[];
  problemStatement?: string;
  solution?: string;
  results?: string[];
  videoUrl?: string;
  demoCredentials?: {
    username?: string;
    password?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: number;
  honors?: string[];
  relevantCourses?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  resumeUrl?: string;
  profileImage: string;
  socialMedia: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  availability: 'available' | 'busy' | 'not-looking';
  preferredRoles: string[];
  interests: string[];
}

// Sample data
export const personalInfo: PersonalInfo = {
  name: 'George Watkins',
  title: 'Systems Administrator',
  bio: 'Accomplished systems administrator with 15+ years of progressive experience managing complex IT infrastructures across diverse industries including healthcare, managed services, and construction. Expert in hybrid cloud environments, cybersecurity implementation, and enterprise-level system optimization with proven ability to achieve high availability and performance.',
  location: '5th Dimension, 7.83 Hz',
  email: 'hello@watkinsgeorge.com',
  phone: '+1 (555) 123-4567',
  website: 'https://watkinsgeorge.com',
  resumeUrl: '/assets/George Watkins Resume 2025.pdf',
  profileImage: '/assets/pixel2.png',
  socialMedia: {
    github: 'https://github.com/gwatkins2090',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  availability: 'available',
  preferredRoles: ['Systems Administrator', 'IT Infrastructure Manager', 'Cloud Engineer'],
  interests: ['Cloud Infrastructure', 'Cybersecurity', 'System Optimization', 'IT Innovation']
};

export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'frontend', proficiency: 90, color: '#61DAFB' },
  { id: '2', name: 'Next.js', category: 'frontend', proficiency: 85, color: '#000000' },
  { id: '3', name: 'TypeScript', category: 'frontend', proficiency: 88, color: '#3178C6' },
  { id: '4', name: 'Tailwind CSS', category: 'frontend', proficiency: 92, color: '#06B6D4' },
  { id: '5', name: 'Vue.js', category: 'frontend', proficiency: 75, color: '#4FC08D' },
  
  // Backend
  { id: '6', name: 'Node.js', category: 'backend', proficiency: 85, color: '#339933' },
  { id: '7', name: 'Python', category: 'backend', proficiency: 80, color: '#3776AB' },
  { id: '8', name: 'Express.js', category: 'backend', proficiency: 82, color: '#000000' },
  { id: '9', name: 'FastAPI', category: 'backend', proficiency: 75, color: '#009688' },
  
  // Database
  { id: '10', name: 'PostgreSQL', category: 'database', proficiency: 78, color: '#336791' },
  { id: '11', name: 'MongoDB', category: 'database', proficiency: 80, color: '#47A248' },
  { id: '12', name: 'Redis', category: 'database', proficiency: 70, color: '#DC382D' },
  
  // Tools
  { id: '13', name: 'Git', category: 'tools', proficiency: 90, color: '#F05032' },
  { id: '14', name: 'Docker', category: 'tools', proficiency: 75, color: '#2496ED' },
  { id: '15', name: 'Webpack', category: 'tools', proficiency: 70, color: '#8DD6F9' },
  
  // Cloud
  { id: '16', name: 'AWS', category: 'cloud', proficiency: 72, color: '#FF9900' },
  { id: '17', name: 'Vercel', category: 'cloud', proficiency: 85, color: '#000000' },
  { id: '18', name: 'Netlify', category: 'cloud', proficiency: 80, color: '#00C7B7' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Storybook Component Library',
    slug: 'ecommerce-platform',
    description: 'A comprehensive component library built with Next.js and Storybook',
    longDescription: 'A comprehensive component library built with Next.js and Storybook, featuring interactive documentation, visual regression testing, accessibility auditing, and an advanced design system. This production-ready application enables real-time component development, collaborative design workflows, and provides a seamless developer experience across all team members and environments.',
    image: '/assets/storybook1.png',
    images: ['/assets/storybook1.png', '/assets/storybook2.png', '/assets/storybook3.png'],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Redis', 'AWS S3'],
    category: 'web',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/gwatkins2090/storybook-repo',
    liveUrl: 'https://storybook-library-nu.vercel.app/',
    startDate: '2024-01-15',
    endDate: '2024-03-20',
    challenges: [
      'Implementing secure payment processing with Stripe webhooks',
      'Real-time inventory synchronization across multiple warehouses',
      'Optimizing database queries for product catalog with 10,000+ items',
      'Building a responsive admin dashboard with analytics'
    ],
    learnings: [
      'Advanced React patterns including Server Components and Suspense',
      'Database optimization techniques and indexing strategies',
      'Payment gateway integration and PCI compliance',
      'Implementing Redis caching for improved performance'
    ],
    features: [
      {
        title: 'Product Catalog',
        description: 'Advanced product browsing with filters, search, and sorting. Supports categories, tags, and dynamic pricing.',
        icon: 'ShoppingBag'
      },
      {
        title: 'Shopping Cart',
        description: 'Persistent cart with real-time price updates, quantity management, and saved items for later.',
        icon: 'ShoppingCart'
      },
      {
        title: 'Secure Checkout',
        description: 'Multi-step checkout process with address validation, shipping options, and Stripe payment integration.',
        icon: 'CreditCard'
      },
      {
        title: 'User Authentication',
        description: 'Secure authentication with JWT tokens, password reset, and social login options.',
        icon: 'Lock'
      },
      {
        title: 'Order Management',
        description: 'Complete order tracking, status updates, and email notifications for customers.',
        icon: 'Package'
      },
      {
        title: 'Admin Dashboard',
        description: 'Comprehensive admin panel for managing products, orders, customers, and viewing analytics.',
        icon: 'BarChart'
      },
      {
        title: 'Inventory Management',
        description: 'Real-time inventory tracking with low stock alerts and automated reorder notifications.',
        icon: 'Database'
      },
      {
        title: 'Reviews & Ratings',
        description: 'Customer review system with ratings, photos, and verified purchase badges.',
        icon: 'Star'
      }
    ],
    metrics: [
      {
        label: 'Performance Score',
        value: '98/100',
        icon: 'Zap'
      },
      {
        label: 'Test Coverage',
        value: '95%',
        icon: 'CheckCircle'
      },
      {
        label: 'Load Time',
        value: '<1.2s',
        icon: 'Clock'
      },
      {
        label: 'Concurrent Users',
        value: '1000+',
        icon: 'Users'
      }
    ],
    problemStatement: 'Small to medium-sized businesses struggle with expensive e-commerce platforms that charge high monthly fees and transaction costs. They need an affordable, customizable solution that can scale with their growth.',
    solution: 'Built a modern, full-stack e-commerce platform using Next.js and Node.js that provides enterprise-level features at a fraction of the cost. The platform is fully customizable, easy to deploy, and includes all essential e-commerce features out of the box.',
    results: [
      'Reduced operational costs by 60% compared to traditional platforms',
      'Achieved 98/100 Lighthouse performance score',
      'Successfully handles 1000+ concurrent users with sub-second response times',
      'Implemented automated testing with 95% code coverage',
      'Deployed to production serving real customers'
    ],
    testimonials: [
      {
        author: 'Sarah Johnson',
        role: 'Business Owner',
        content: 'This platform transformed our online business. The admin dashboard is intuitive, and our customers love the smooth checkout experience. Sales increased by 40% in the first month!',
        avatar: '/images/testimonials/sarah.jpg'
      }
    ],
    demoCredentials: {
      username: 'demo@example.com',
      password: 'demo123'
    }
  },
  {
    id: '2',
    title: 'Family Recipe Archive',
    slug: 'task-management-app',
    description: 'A comprehensive family recipe app built with Next.js and Node.js',
    longDescription: 'A comprehensive family recipe app built with Next.js and Node.js, featuring user authentication, recipe sharing, collection management, and an intuitive family admin dashboard. This production-ready application handles real-time recipe updates, secure cloud storage, and provides a seamless cooking and browsing experience across all devices for preserving and sharing cherished family traditions.',
    image: '/assets/recipe1.png',
    images: ['/assets/recipe1.png', '/assets/recipe2.png', '/assets/recipe3.png'],
    technologies: ['React', 'TypeScript', 'Socket.io', 'Express.js', 'MongoDB', 'Material-UI', 'Redux Toolkit', 'Jest'],
    category: 'web',
    featured: true,
    status: 'completed',
    githubUrl: 'https://github.com/gwatkins2090/mawmaws-recipes',
    liveUrl: 'https://mawmaws-recipes.vercel.app/',
    startDate: '2023-10-01',
    endDate: '2023-12-15',
    challenges: [
      'Implementing real-time synchronization across multiple users without conflicts',
      'Managing complex state with nested tasks, subtasks, and dependencies',
      'Building an intuitive drag-and-drop interface that works on mobile',
      'Designing a flexible permission system for team collaboration'
    ],
    learnings: [
      'WebSocket implementation and real-time data synchronization patterns',
      'Advanced React hooks and custom hook patterns for reusability',
      'State management with Redux Toolkit and optimistic updates',
      'Building accessible drag-and-drop interfaces'
    ],
    features: [
      {
        title: 'Task Organization',
        description: 'Create, organize, and manage tasks with categories, tags, and custom fields. Support for subtasks and task dependencies.',
        icon: 'ListTodo'
      },
      {
        title: 'Drag & Drop',
        description: 'Intuitive drag-and-drop interface for reordering tasks, moving between lists, and organizing your workflow.',
        icon: 'Move'
      },
      {
        title: 'Priority Levels',
        description: 'Assign priority levels (Low, Medium, High, Urgent) with color coding and automatic sorting options.',
        icon: 'Flag'
      },
      {
        title: 'Due Dates & Reminders',
        description: 'Set due dates, receive notifications, and get reminders for upcoming deadlines. Calendar view included.',
        icon: 'Calendar'
      },
      {
        title: 'Real-time Collaboration',
        description: 'Work together with your team in real-time. See who&apos;s online, live updates, and instant notifications.',
        icon: 'Users'
      },
      {
        title: 'Categories & Tags',
        description: 'Organize tasks with custom categories and tags. Filter and search across all your tasks instantly.',
        icon: 'Tag'
      },
      {
        title: 'Progress Tracking',
        description: 'Visual progress indicators, completion statistics, and productivity insights with charts and graphs.',
        icon: 'TrendingUp'
      },
      {
        title: 'Team Management',
        description: 'Invite team members, assign tasks, set permissions, and manage workspaces for different projects.',
        icon: 'UserPlus'
      }
    ],
    metrics: [
      {
        label: 'Active Users',
        value: '500+',
        icon: 'Users'
      },
      {
        label: 'Tasks Created',
        value: '10,000+',
        icon: 'CheckSquare'
      },
      {
        label: 'Uptime',
        value: '99.9%',
        icon: 'Activity'
      },
      {
        label: 'Response Time',
        value: '<100ms',
        icon: 'Zap'
      }
    ],
    problemStatement: 'Teams and individuals struggle with fragmented task management tools that either lack essential features or are too complex to use. Many solutions don&apos;t support real-time collaboration or have poor mobile experiences.',
    solution: 'Developed a streamlined task management application that combines simplicity with powerful features. The real-time collaboration engine ensures teams stay synchronized, while the intuitive interface makes it easy for anyone to get started immediately.',
    results: [
      'Achieved 500+ active users within 3 months of launch',
      'Maintained 99.9% uptime with real-time WebSocket connections',
      'Reduced task completion time by 35% for teams using the platform',
      'Received 4.8/5 star rating from users',
      'Successfully processed over 10,000 tasks with zero data loss'
    ],
    testimonials: [
      {
        author: 'Michael Chen',
        role: 'Project Manager',
        content: 'The real-time collaboration feature is a game-changer. Our team can finally see what everyone is working on without constant status meetings. Productivity has increased significantly!',
        avatar: '/images/testimonials/michael.jpg'
      },
      {
        author: 'Emily Rodriguez',
        role: 'Freelance Designer',
        content: 'I&apos;ve tried many task apps, but this one strikes the perfect balance between features and simplicity. The drag-and-drop interface is so intuitive, and I love the priority system.',
        avatar: '/images/testimonials/emily.jpg'
      }
    ],
    demoCredentials: {
      username: 'demo@taskapp.com',
      password: 'demo123'
    }
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    slug: 'weather-dashboard',
    description: 'Beautiful weather app with location-based forecasts',
    longDescription: 'An elegant weather dashboard that provides detailed weather information, forecasts, and beautiful visualizations based on user location.',
    image: '/images/projects/weather-1.jpg',
    images: ['/images/projects/weather-1.jpg'],
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
    category: 'web',
    featured: false,
    status: 'completed',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.vercel.app',
    startDate: '2023-08-01',
    endDate: '2023-09-15',
    challenges: ['API rate limiting', 'Data visualization', 'Responsive design'],
    learnings: ['Vue.js ecosystem', 'Chart.js integration', 'Weather API usage']
  }
];

export const experience: Experience[] = [
  {
    id: '1',
    company: 'Tech Startup Inc.',
    position: 'Senior Full Stack Developer',
    startDate: '2022-06-01',
    description: 'Led development of core platform features and mentored junior developers',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    achievements: [
      'Improved application performance by 40%',
      'Led team of 4 developers',
      'Implemented CI/CD pipeline reducing deployment time by 60%'
    ],
    location: 'San Francisco, CA',
    type: 'full-time'
  },
  {
    id: '2',
    company: 'Digital Agency',
    position: 'Frontend Developer',
    startDate: '2020-03-01',
    endDate: '2022-05-31',
    description: 'Developed responsive web applications for various clients',
    technologies: ['React', 'Vue.js', 'SASS', 'JavaScript', 'Figma'],
    achievements: [
      'Delivered 15+ client projects on time',
      'Improved code quality through testing implementation',
      'Collaborated with design team to improve UX'
    ],
    location: 'Remote',
    type: 'full-time'
  }
];

export const education: Education[] = [
  {
    id: '1',
    institution: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2016-09-01',
    endDate: '2020-05-31',
    gpa: 3.8,
    honors: ['Magna Cum Laude', 'Dean\'s List'],
    relevantCourses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems']
  }
];
