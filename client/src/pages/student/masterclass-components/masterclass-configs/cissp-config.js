export const cisspConfig = {
  id: 'cissp',
  slug: 'cissp-certification',
  title: 'Ace Your CISSP in 3 Months: Step-by-Step Strategy',
  shortTitle: 'Ace Your CISSP in 3 Months: Step-by-Step Strategy',
  description: 'Get a complete breakdown of what to study, how to structure your 12-week plan, and how to navigate the latest CISSP exam patterns with confidence.',
  heroSubtitle: 'Get a complete breakdown of what to study, how to structure your 12-week plan, and how to navigate the latest CISSP exam patterns with confidence.',
  image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop',
  eventDate: '2025-11-25T21:00:00+05:30',
  displayDate: '📅 25 November, Monday',
  displayTime: '⏰ 9:00 PM IST | 10:30 AM EST | 6:30 PM UAE',
  cardTime: '9:00 PM IST | 10:30 AM EST | 6:30 PM UAE',
  instructor: {
    name: 'Shiva Kumar',
    title: 'CISSP Mentor | Cybersecurity Architect | 12+ Years in InfoSec',
    organization: 'The Edu Ocean',
    experience: [
      'Access Control, Security Governance',
      'Risk Management Strategies',
      'SOC, Cloud Security & Modern Threat Defense',
      'CISSP Domain Mapping & Exam Coaching'
    ],
    achievement: 'Mentored hundreds of CISSP and CCSP aspirants',
    description: 'Shiva has mentored hundreds of CISSP and CCSP aspirants, helping professionals from IT, Cybersecurity, and Cloud backgrounds confidently clear their global certifications with structured, exam-focused coaching.'
  },
  isPast: false,
  
  // Content Sections
  about: {
    title: 'About the Masterclass',
    description: 'The CISSP is evolving—new question formats, updated domains, deeper scenario-based testing. This session is your shortcut to understanding what\'s changed, what to prioritize, how to study strategically, and how to stay on track for a 12-week pass. Walk away with clarity, confidence, and a proven roadmap designed to fit even the busiest professional\'s schedule.'
  },
  
  learningItems: [
    { id: 1, text: 'Updated CISSP domain-wise weightage & exam structure', color: 'black' },
    { id: 2, text: '3-Month CISSP Study Plan (weekly breakdown)', color: 'yellow' },
    { id: 3, text: 'How to tackle tricky scenario-based questions', color: 'yellow' },
    { id: 4, text: 'Study resources: official, recommended, and optional', color: 'black' },
    { id: 5, text: 'Daily/weekly habits that accelerate CISSP retention', color: 'black' },
    { id: 6, text: 'Exam-day mindset + what NOT to do in the final week', color: 'yellow' }
  ],
  
  whoIsThisFor: {
    left: [
      'Working professionals preparing for CISSP',
      'Cybersecurity, Cloud & IT Infra engineers',
      'Candidates who failed earlier attempts'
    ],
    right: [
      'CISSP aspirants confused with wide syllabus',
      'Security teams planning certification pathways',
      'Students using outdated CISSP resources'
    ]
  },
  
  testimonials: [
    {
      quote: 'EduOcean\'s structure helped me clear CISSP in 8 weeks vs the 3–4 months I had planned.',
      author: 'Arjun M.',
      role: 'Cybersecurity Analyst'
    },
    {
      quote: 'The coach explained the tricky new question patterns so clearly—I walked into the exam calm and ready.',
      author: 'Neha S.',
      role: 'Information Security Engineer'
    }
  ],
  
  faqs: [
    {
      q: '1. Who is this masterclass for?',
      a: 'Anyone preparing for CISSP or planning to start their 3-month study journey.'
    },
    {
      q: '2. Will there be a Q&A session?',
      a: 'Yes — a live Q&A with the trainer at the end.'
    },
    {
      q: '3. What\'s the duration of this masterclass?',
      a: '60–75 minutes.'
    },
    {
      q: '4. Will this session help me build a study plan?',
      a: 'Yes — you\'ll get a complete 12-week roadmap.'
    },
    {
      q: '5. Is this session live or recorded?',
      a: 'This is a LIVE session with the trainer'
    }
  ],
  
  cta: {
    title: 'Ready to Ace Your CISSP Exam?',
    subtitle: 'Join our FREE live masterclass and learn the proven 3-month strategy to clear your CISSP certification with confidence.'
  },
  
  // Zoho Form Configuration
  zohoForm: {
    action: 'https://webinar.zoho.in/meeting/WebForm',
    formName: 'WebForm1333977000000008179',
    fields: {
      xnQsjsdp: '7cfdfbb9b9ff5ec15e3910cc9fd1574df1b3ac428a0d8a235be2df20c1887b07',
      xmIwtLD: '5e726363adf29639531fc515895338a7d5f068c3276e61d8279ac93af68f6248faa81b3edc5f81b18d575d911248fc12',
      actionType: 'UmVnaXN0cmF0aW9ucw==',
      returnURL: 'https://webinar.zoho.in/postregister',
      sysId: '1333977000000008164'
    },
    mandatoryFields: ['NAME', 'REGISTRATIONCF1', 'EMAIL'],
    fieldLabels: ['First name', 'Last name', 'E-mail']
  }
};
