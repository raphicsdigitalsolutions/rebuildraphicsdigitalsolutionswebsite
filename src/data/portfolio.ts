/**
 * Curated portfolio entries linked to their original public source.
 * Behance entries use published artwork; technical entries link to repositories
 * or verified demos. Private and unpublished work is clearly labelled.
 */

export type ProjectSource = 'behance' | 'github';
export type ProjectStatus =
  | 'Published Portfolio Work'
  | 'Public Prototype'
  | 'Public Repository'
  | 'Pre-delivery'
  | 'In Progress'
  | 'In Development';

export type ProjectVisibility = 'public' | 'private' | 'profile' | 'unpublished';
export type ProjectCategory =
  | 'Packaging Design'
  | 'Label Design'
  | 'Cosmetics & Skincare'
  | 'AI & Machine Learning'
  | 'Web & SaaS Platform'
  | 'Voice & Agents'
  | 'Interactive & Graphics';

export interface PortfolioProject {
  id: string;
  title: string;
  source: ProjectSource;
  sourceVisibility: ProjectVisibility;
  category: ProjectCategory;
  status: ProjectStatus;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  mainFeatures: string[];
  techStack: string[];
  challenges: string;
  externalUrl: string;
  liveDemoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  featured: boolean;
  visualTheme: {
    primaryColor: string;
    gradient: string;
    badgeText: string;
    icon: string;
  };
}

const behanceImage = (asset: string) =>
  `https://mir-s3-cdn-cf.behance.net/projects/404/${asset}`;

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'nutralife-mens-gummies',
    title: "NutraLife Men's Multivitamin Gummies",
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Packaging Design',
    status: 'Published Portfolio Work',
    tagline: 'Product packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255380865/NutraLife-Mens-Multivitamin-Gummies-Packaging',
    imageUrl: behanceImage('680c01255380865.Y3JvcCwxMTM0LDg4NywyNjYsMA.png'),
    imageAlt: "NutraLife Men's Multivitamin Gummies packaging artwork by Atta ur Rehman Siddiqui",
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Box',
    },
  },
  {
    id: 'nutralife-womens-gummies',
    title: "NutraLife Women's Multivitamin Gummies",
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Packaging Design',
    status: 'Published Portfolio Work',
    tagline: 'Product packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255379779/NutraLife-Womens-Multivitamin-Gummies-Packaging',
    imageUrl: behanceImage('663f6d255379779.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png'),
    imageAlt: "NutraLife Women's Multivitamin Gummies packaging artwork by Atta ur Rehman Siddiqui",
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Box',
    },
  },
  {
    id: 'vitarelief-plus',
    title: 'VitaRelief Plus Pain Relief Tablets',
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Label Design',
    status: 'Published Portfolio Work',
    tagline: 'Packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255378695/VitaRelief-Plus-Pain-Relief-Tablets-Packaging',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'LABEL DESIGN',
      icon: 'Layers',
    },
  },
  {
    id: 'kidocare-paracetamol',
    title: 'KidoCare Paracetamol Chewable Tablets',
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Packaging Design',
    status: 'Published Portfolio Work',
    tagline: 'Product packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255378253/KidoCare-Paracetamol-120-mg-Chewable-Tablets-Packaging',
    imageUrl: behanceImage('208762255378253.Y3JvcCwxMzA5LDEwMjQsMjEwLDA.png'),
    imageAlt: 'KidoCare Paracetamol Chewable Tablets packaging artwork by Atta ur Rehman Siddiqui',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Box',
    },
  },
  {
    id: 'northforge-body-wash',
    title: 'Northforge Heavy Duty Body Wash',
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Packaging Design',
    status: 'Published Portfolio Work',
    tagline: 'Product packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255377929/Northforge-Heavy-Duty-Body-Wash-Packaging',
    imageUrl: behanceImage('fd3ed3255377929.Y3JvcCwxNDAyLDEwOTYsMCwxMw.png'),
    imageAlt: 'Northforge Heavy Duty Body Wash packaging artwork by Atta ur Rehman Siddiqui',
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Layers',
    },
  },
  {
    id: 'glowe-skincare-serum',
    title: 'Glowé Skincare — Radiant Glow Serum',
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Cosmetics & Skincare',
    status: 'Published Portfolio Work',
    tagline: 'Skincare packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255374499/Glow-Skincare-Radiant-Glow-Serum-Packaging',
    imageUrl: behanceImage('5a903e255374499.Y3JvcCwxMzA5LDEwMjQsNTgsMA.png'),
    imageAlt: 'Glowé Skincare Radiant Glow Serum packaging artwork by Atta ur Rehman Siddiqui',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'SKINCARE PACKAGING',
      icon: 'Sparkles',
    },
  },
  {
    id: 'whyprotin-whey-protein',
    title: 'Whyprotin Whey Protein Packaging',
    source: 'behance',
    sourceVisibility: 'profile',
    category: 'Packaging Design',
    status: 'Published Portfolio Work',
    tagline: 'Product packaging artwork published on Behance.',
    overview: 'View the original packaging artwork and project context on Behance.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: 'https://www.behance.net/gallery/255373467/Whyprotin-Whey-Protein-packaging',
    imageUrl: behanceImage('72a495255373467.Y3JvcCwxMzA5LDEwMjQsMTM2LDA.png'),
    imageAlt: 'Whyprotin Whey Protein packaging artwork by Atta ur Rehman Siddiqui',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Box',
    },
  },
  {
    id: 'customchatgpt',
    title: 'NEXORA AI — Custom ChatGPT',
    source: 'github',
    sourceVisibility: 'public',
    category: 'AI & Machine Learning',
    status: 'Public Prototype',
    tagline: 'Streamlit AI workspace with optional web search and source links.',
    overview: 'A session-based AI workspace with model selection, conversation history, assistant settings, and optional OpenAI Responses API web search. The repository describes it as a single-user/session app rather than a multi-user account service.',
    problem: 'Bring chat, session history, assistant settings, and optional web research into one focused workspace.',
    solution: 'A Streamlit prototype that keeps conversations in the active session and displays source links when web search returns them.',
    mainFeatures: [
      'Model selection and configurable assistant instructions',
      'Session-level conversation history',
      'Optional web search with source links',
      'Day and night appearance modes',
    ],
    techStack: ['Python', 'Streamlit', 'OpenAI Responses API'],
    challenges: '',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/customchatgpt',
    liveDemoUrl: 'https://attanexora-ai.streamlit.app/',
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'AI WORKSPACE',
      icon: 'MessageSquare',
    },
  },
  {
    id: 'customraggpt',
    title: 'NEXORA Knowledge Studio',
    source: 'github',
    sourceVisibility: 'public',
    category: 'AI & Machine Learning',
    status: 'Public Prototype',
    tagline: 'Document research with answers linked to source passages.',
    overview: 'A Streamlit document-research prototype. It accepts PDF, DOCX, CSV, JSON, TXT, and Markdown files, then returns answers with relevant source passages.',
    problem: 'Make it easier to ask questions across a set of uploaded documents and inspect the passages used in an answer.',
    solution: 'A document upload and question-answering workflow with source passages attached to responses.',
    mainFeatures: [
      'PDF, DOCX, CSV, JSON, TXT, and Markdown file support',
      'Question answering across uploaded documents',
      'Source passages shown with answers',
      'Session-based API key entry',
    ],
    techStack: ['Python', 'Streamlit', 'OpenAI API'],
    challenges: '',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/customraggpt',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'DOCUMENT RESEARCH',
      icon: 'FileText',
    },
  },
  {
    id: 'finwise-ai',
    title: 'FinWise AI',
    source: 'github',
    sourceVisibility: 'public',
    category: 'AI & Machine Learning',
    status: 'Public Prototype',
    tagline: 'Educational prototype for personal budgeting and financial analysis.',
    overview: 'A Streamlit educational prototype that combines deterministic budget calculations with a separately labelled AI explanation. It is not financial, investment, tax, or legal advice and does not connect to bank accounts or execute transactions.',
    problem: 'Show how budget calculations and AI-generated educational commentary can appear together while remaining distinct.',
    solution: 'The prototype calculates totals and ratios in Python, then presents an AI narrative as a separate educational layer.',
    mainFeatures: [
      'Income and expense categories',
      'Deterministic budget calculations and ratios',
      'Separate rule-based indicators and AI commentary',
      'Visible financial education disclaimer',
    ],
    techStack: ['Python', 'Streamlit', 'LangChain', 'OpenAI API'],
    challenges: 'The README warns that optional SQLite caching stores prompts and responses in plaintext. Use fictional demonstration data only.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/FinWise-AI',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'EDUCATIONAL PROTOTYPE',
      icon: 'Wallet',
    },
  },
  {
    id: 'mediguide-ai',
    title: 'MediGuide AI',
    source: 'github',
    sourceVisibility: 'public',
    category: 'AI & Machine Learning',
    status: 'Public Prototype',
    tagline: 'Safety-focused educational prototype for patient guidance.',
    overview: 'A Streamlit course prototype demonstrating structured and streamed AI responses. The repository states that it is not a medical device, does not provide diagnosis or treatment, and must not be used for healthcare decisions. Demonstrations should use fictional data only.',
    problem: 'Demonstrate a structured AI guidance flow while making its educational scope and limits visible.',
    solution: 'A prototype with a visible disclaimer, emergency guidance, response parsing, and English or Urdu output options.',
    mainFeatures: [
      'Structured response parsing and streamed explanation',
      'English and Urdu answer options',
      'Visible medical disclaimer and emergency guidance',
      'Not for diagnosis, treatment, or clinical decisions',
    ],
    techStack: ['Python', 'Streamlit', 'LangChain', 'OpenAI API'],
    challenges: 'The repository warns that its emergency phrase check is not exhaustive and must not be treated as a way to rule out an emergency.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/MediGuide-AI',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'EDUCATIONAL PROTOTYPE',
      icon: 'HeartPulse',
    },
  },
  {
    id: 'rashid-traders-works',
    title: 'Rashid Traders Works',
    source: 'github',
    sourceVisibility: 'private',
    category: 'Web & SaaS Platform',
    status: 'Pre-delivery',
    tagline: 'Wholesale billing, inventory, and mobile-repair system in pre-delivery testing.',
    overview: 'The project README describes a cloud edition for mobile-spare-parts wholesale, billing, inventory, and repair workflows. The source repository is private. Its release notes list further checks before it can be treated as production-ready.',
    problem: 'Bring billing, inventory, and repair workflows for a wholesale business into one connected system.',
    solution: 'A deployed web front end backed by a Cloudflare Workers API and Cloudflare D1 database. The project remains in pre-delivery testing.',
    mainFeatures: [
      'Billing and inventory workflows',
      'Mobile-repair workflow support',
      'Web front end, API, and database deployed as separate services',
      'Manual WhatsApp sharing',
    ],
    techStack: ['Vercel', 'Cloudflare Workers', 'Cloudflare D1'],
    challenges: 'The project README identifies backup and restore, security configuration, end-to-end regression, PDF review, and target-device checks as remaining release gates.',
    externalUrl: '',
    liveDemoUrl: 'https://rashid-traders-works-frontend.vercel.app/',
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'PRE-DELIVERY',
      icon: 'Briefcase',
    },
  },
  {
    id: 'echoes-of-the-lost-realm',
    title: 'Echoes of the Lost Realm',
    source: 'github',
    sourceVisibility: 'private',
    category: 'Interactive & Graphics',
    status: 'In Progress',
    tagline: '3D adventure game currently in development.',
    overview: 'This project is still in progress. A public preview and source link are not available yet.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: '',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'IN PROGRESS',
      icon: 'Compass',
    },
  },
  {
    id: 'voice-ai-agent',
    title: 'Voice AI Agent',
    source: 'github',
    sourceVisibility: 'unpublished',
    category: 'Voice & Agents',
    status: 'In Development',
    tagline: 'Voice agent project in progress; public source and demo are not published yet.',
    overview: 'This work is in development. A public repository and demo will be linked when they are ready.',
    problem: '',
    solution: '',
    mainFeatures: [],
    techStack: [],
    challenges: '',
    externalUrl: '',
    featured: false,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-neutral-800 via-neutral-950 to-black',
      badgeText: 'IN DEVELOPMENT',
      icon: 'Mic',
    },
  },
];
