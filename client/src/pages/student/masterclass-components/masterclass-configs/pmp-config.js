export const pmpConfig = {
  id: 'pmp',
  slug: 'pmp-certification',
  title: 'Pass Your PMP in 10 Days : Learn the Exact Strategy LIVE',
  shortTitle: 'PMP Certification Masterclass',
  description: 'Intensive workshop covering PMP exam strategies and project management best practices',
  heroSubtitle: 'A fast, proven, exam-ready method to help you confidently clear PMP® - even if you\'re starting late or feeling stuck.',
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
  eventDate: '2025-11-22T10:30:00-05:00',
  displayDate: '📅 22nd November, Saturday',
  displayTime: '⏰ 10:30 AM EST | 6:30 PM UAE',
  cardTime: '10:30 AM - 11:30 AM EST',
  instructor: {
    name: 'By The Edu Ocean Expert',
    title: 'PMI Approved Instructor for PMP & CAPM',
    organization: 'The Edu Ocean',
    experience: [
      'Ex Bell Labs',
      'Ex Cap Gemini',
      'Ex HCL Technologies',
      'Ex Satyam'
    ],
    achievement: 'Trained 25,000+ professionals across the globe',
    description: 'Our expert brings decades of real-world project leadership and is known for simplifying complex PMP concepts into easy, exam-focused instruction.'
  },
  isPast: false,
  
  // Content Sections
  about: {
    title: 'About the Masterclass',
    description: 'This session cuts through confusion and gives you a clear, current, and practical understanding of the PMP exam - whether you\'re starting fresh or restarting your prep, you\'ll get the right direction, strategy, and tools with real techniques you can apply immediately.'
  },
  
  learningItems: [
    { id: 1, text: 'Key changes in the 2025-2026 PMP exam structure', color: 'black' },
    { id: 2, text: 'The 10-Day PMP Sprint Strategy for fast prep', color: 'yellow' },
    { id: 3, text: 'How to tackle new scenario-based agile + hybrid questions', color: 'yellow' },
    { id: 4, text: 'Updated question distribution, exam blueprint & domain shifts', color: 'black' },
    { id: 5, text: 'High-efficiency study techniques + what to skip', color: 'black' },
    { id: 6, text: 'Mock test benchmarks & revision flow that actually works', color: 'yellow' }
  ],
  
  whoIsThisFor: {
    left: [
      'PMP aspirants planning to take the exam soon',
      'Working professionals needing a fast-track approach',
      'Candidates confused by the new exam structure'
    ],
    right: [
      'Students using old or outdated study materials',
      'CAPM holders upgrading to PMP',
      'Trainers who want to stay updated on exam changes'
    ]
  },
  
  testimonials: [
    {
      quote: 'EduOcean\'s structure helped me pass PMP in just eight weeks.',
      author: 'Sarah Mitchell',
      role: 'Project Analyst (USA)'
    },
    {
      quote: 'The coach made the new exam question patterns easy to understand. I walked into the exam confident.',
      author: 'David Reynolds',
      role: 'Program Manager (UAE)'
    },
    {
      quote: 'The 10-day sprint plan finally gave me clear direction and momentum.',
      author: 'Linda Parker',
      role: 'IT Delivery Lead (USA)'
    }
  ],
  
  faqs: [
    {
      q: '1. Who is this masterclass for?',
      a: 'Anyone preparing for PMP or restarting their study plan.'
    },
    {
      q: '2. Will there be a Q&A session?',
      a: 'Yes - a dedicated segment at the end of the class.'
    },
    {
      q: '3. What is the duration of this session?',
      a: 'A focused 60-75 minute live session.'
    },
    {
      q: '4. Will this session help me build a study plan?',
      a: 'Yes - you\'ll leave with a complete 10-day roadmap.'
    },
    {
      q: '5. Is the session live or recorded?',
      a: 'Live only. Recording will not be shared.'
    }
  ],
  
  cta: {
    title: 'Ready to Pass Your PMP Exam?',
    subtitle: 'Join our FREE live masterclass and learn the proven 10-day strategy to clear your PMP certification with confidence.'
  },
  
  // Zoho Form Configuration
  zohoForm: {
    action: 'https://webinar.zoho.in/meeting/WebForm',
    formName: 'WebForm1280205000000017061',
    fields: {
      xnQsjsdp: 'e182a1d09903d28df099b94f155de74ac4c02ebf0fbea5b7483fa4994235cb1d',
      xmIwtLD: '578a3193d684d1b5ef5f93115fc742e4d19f1c559d8b88e14f2908d0eaf73fe007addc57f94bdba80f1d161bc87dd43d',
      actionType: 'UmVnaXN0cmF0aW9ucw==',
      returnURL: 'https://webinar.zoho.in/postregister',
      sysId: '1280205000000017046'
    },
    mandatoryFields: ['NAME', 'EMAIL', 'REGISTRATIONCF4', 'REGISTRATIONCF7'],
    fieldLabels: ['Full Name', 'E-mail', 'Country/Region', 'Phone']
  }
};
