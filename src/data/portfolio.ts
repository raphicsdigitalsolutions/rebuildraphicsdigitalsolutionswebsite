/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Verified Portfolio Data for Raphics Digital Solutions.
 * Source Materials:
 * - Behance Creative Archive: https://www.behance.net/artisticatta
 * - GitHub Organization Repositories: https://github.com/raphicsdigitalsolutions
 * 
 * Integrity Guidelines:
 * - Exact, direct repository URLs (not generic profile links).
 * - Honest project statuses: Live Product, Working Prototype, Development Project, Experimental Project, Open Source Project.
 * - No manufactured business metrics or exaggerated commercial claims.
 */

export type ProjectSource = 'behance' | 'github';
export type ProjectStatus = 
  | 'Live Product' 
  | 'Working Prototype' 
  | 'Development Project' 
  | 'Experimental Project' 
  | 'Open Source Project'
  | 'Published Portfolio Work'
  | 'Public Repository'
  | 'Public Prototype'
  | 'Private Repository';

export type BehanceCategory = 
  | 'Branding & Identity'
  | 'Packaging Design'
  | 'Label Design'
  | 'Food & Beverage'
  | 'Cosmetics & Skincare'
  | 'Product Mockups'
  | 'Print Design'
  | 'Social Media Design';

export type GitHubCategory = 
  | 'AI & Machine Learning'
  | 'Web & SaaS Platform'
  | 'Voice & Agents'
  | 'Interactive & Graphics';

export type ProjectCategory = BehanceCategory | GitHubCategory;

export interface PortfolioProject {
  id: string;
  title: string;
  source: ProjectSource;
  /** Whether the linked source is public, private, or a public profile page. */
  sourceVisibility?: 'public' | 'private' | 'profile';
  category: ProjectCategory;
  subcategory?: string;
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
  featured: boolean;
  visualTheme: {
    primaryColor: string;
    gradient: string;
    badgeText: string;
    icon: string;
  };
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // ==================== BEHANCE CREATIVE PROJECTS ====================
  {
    id: 'nutralife-mens-gummies',
    title: "NutraLife Men's Multivitamin Gummies",
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: true,
    visualTheme: {
      primaryColor: '#F97316',
      gradient: 'from-orange-600/30 via-neutral-900 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Box',
    },
  },
  {
    id: 'nutralife-womens-gummies',
    title: "NutraLife Women's Multivitamin Gummies",
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: true,
    visualTheme: {
      primaryColor: '#EC4899',
      gradient: 'from-pink-600/30 via-neutral-900 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Sparkles',
    },
  },
  {
    id: 'vitarelief-plus',
    title: 'VitaRelief Plus Pain Relief Tablets',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Label Design',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: false,
    visualTheme: {
      primaryColor: '#3B82F6',
      gradient: 'from-blue-600/30 via-neutral-900 to-black',
      badgeText: 'LABEL DESIGN',
      icon: 'Shield',
    },
  },
  {
    id: 'kidocare-paracetamol',
    title: 'KidoCare Paracetamol Chewable Tablets',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Label Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: false,
    visualTheme: {
      primaryColor: '#10B981',
      gradient: 'from-emerald-600/30 via-neutral-900 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Heart',
    },
  },
  {
    id: 'northforge-body-wash',
    title: 'Northforge Heavy Duty Body Wash',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Product Mockups',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: true,
    visualTheme: {
      primaryColor: '#F59E0B',
      gradient: 'from-amber-600/30 via-neutral-900 to-black',
      badgeText: 'PRODUCT MOCKUP',
      icon: 'Layers',
    },
  },
  {
    id: 'glowe-skincare-serum',
    title: 'Glowé Skincare Serum & Radiant Glow',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Cosmetics & Skincare',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: true,
    visualTheme: {
      primaryColor: '#D4AF37',
      gradient: 'from-yellow-600/30 via-neutral-900 to-black',
      badgeText: 'COSMETICS & SKINCARE',
      icon: 'Sparkles',
    },
  },
  {
    id: 'beardix-serum',
    title: 'Beardix Beard Growth Serum',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Cosmetics & Skincare',
    subcategory: 'Label Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: false,
    visualTheme: {
      primaryColor: '#B45309',
      gradient: 'from-amber-700/30 via-neutral-900 to-black',
      badgeText: 'COSMETICS & SKINCARE',
      icon: 'Sparkles',
    },
  },
  {
    id: 'whyprotin-whey-protein',
    title: 'Whyprotin 100% Whey Isolate Packaging',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-red-600/30 via-neutral-900 to-black',
      badgeText: 'PACKAGING DESIGN',
      icon: 'Zap',
    },
  },
  {
    id: 'dark-roast-coffee',
    title: 'Artisan Dark Roast Coffee Pouches',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Food & Beverage',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: false,
    visualTheme: {
      primaryColor: '#78350F',
      gradient: 'from-stone-700/30 via-neutral-900 to-black',
      badgeText: 'FOOD & BEVERAGE',
      icon: 'Coffee',
    },
  },
  {
    id: 'himalayan-brew-tea',
    title: 'Himalayan Brew Premium Green Tea',
    source: 'behance',\n    sourceVisibility: "profile",
    category: 'Food & Beverage',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [\n\n    ],
    techStack: [\n\n    ],
    challenges: "",
    externalUrl: 'https://www.behance.net/artisticatta',
    featured: false,
    visualTheme: {
      primaryColor: '#059669',
      gradient: 'from-emerald-700/30 via-neutral-900 to-black',
      badgeText: 'FOOD & BEVERAGE',
      icon: 'Feather',
    },
  },

  // ==================== GITHUB REPOSITORIES (EXACT REPOSITORY URLS) ====================
  {
    id: 'soulsketch-ai',
    title: 'SoulSketch-AI',
    source: 'github',\n    sourceVisibility: "private",
    category: 'AI & Machine Learning',
    status: "Private Repository",
    tagline: "Android and Flutter app concept for soulmate portraits and compatibility experiences.",
    overview: "The repository README describes a mobile application with a soulmate portrait experience, compatibility analysis and a guided questionnaire. The source repository is private, so implementation details are not linked publicly.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Soulmate portrait generation experience",\n      "Compatibility and astrology-themed analysis",\n      "Seven-step guided questionnaire",\n      "Android native and Flutter app projects described in the repository"\n    ],
    techStack: [\n      "Kotlin",\n      "Jetpack Compose",\n      "Flutter",\n      "Dart"\n    ],
    challenges: "",
    externalUrl: "",
    featured: true,
    visualTheme: {
      primaryColor: '#8B5CF6',
      gradient: 'from-purple-600/30 via-neutral-900 to-black',
      badgeText: 'OPEN SOURCE',
      icon: 'Cpu',
    },
  },
  {
    id: 'skycast',
    title: 'SKYCAST',
    source: 'github',\n    sourceVisibility: "private",
    category: 'Web & SaaS Platform',
    status: "Private Repository",
    tagline: "Flutter weather forecast app created as an internship task.",
    overview: "The repository README describes a Flutter weather application created for Task 3 of the Auspify Technologies Flutter Development Internship. It uses Open-Meteo weather and geocoding APIs.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Current weather and hourly forecast",\n      "Seven-day weather forecast",\n      "City search and GPS-based weather lookup",\n      "Offline cache and saved favorite cities",\n      "Light, dark and system theme options"\n    ],
    techStack: [\n      "Flutter",\n      "Dart 3",\n      "Material Design 3",\n      "Provider",\n      "Open-Meteo API"\n    ],
    challenges: "",
    externalUrl: "",
    featured: true,
    visualTheme: {
      primaryColor: '#0EA5E9',
      gradient: 'from-sky-600/30 via-neutral-900 to-black',
      badgeText: 'LIVE PRODUCT',
      icon: 'CloudRain',
    },
  },

  {
    id: 'pixelcraft-ai-agent',
    title: 'pixelcraft-ai-agent',
    source: 'github',\n    sourceVisibility: "private",
    category: 'Voice & Agents',
    status: "Private Repository",
    tagline: "Knowledge-based AI customer representative prototype.",
    overview: "The repository README describes a Python and Streamlit customer-support assistant for a print packaging and brand identity agency. It uses a structured JSON knowledge base and OpenAI function calling. The source repository is private.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Knowledge-base answers for services and FAQs",\n      "Lead capture after customer intent is established",\n      "English, Roman Urdu and Urdu language support",\n      "Password-gated lead review panel"\n    ],
    techStack: [\n      "Python",\n      "Streamlit",\n      "OpenAI API"\n    ],
    challenges: "",
    externalUrl: "",
    featured: true,
    visualTheme: {
      primaryColor: '#F43F5E',
      gradient: 'from-rose-600/30 via-neutral-900 to-black',
      badgeText: 'OPEN SOURCE',
      icon: 'Layers',
    },
  },
  {
    id: 'customchatgpt',
    title: 'customchatgpt',
    source: 'github',\n    sourceVisibility: "public",
    category: 'AI & Machine Learning',
    status: "Public Repository",
    tagline: "NEXORA AI — Streamlit AI workspace with optional web search.",
    overview: "NEXORA AI is a Streamlit-based AI workspace with day and night themes, session-level chat history, model selection and optional OpenAI Responses API web search. The README documents a public Streamlit demo and explains that this is a session-oriented app, not a full account system.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Session-based AI chat workspace",\n      "Day and night appearance modes",\n      "Optional live web search with source links",\n      "Configurable assistant instructions and response style",\n      "Public Streamlit demonstration"\n    ],
    techStack: [\n      "Python",\n      "Streamlit",\n      "OpenAI API"\n    ],
    challenges: "",
    externalUrl: 'https://github.com/raphicsdigitalsolutions/customchatgpt',
    featured: false,
    visualTheme: {
      primaryColor: '#06B6D4',
      gradient: 'from-cyan-600/30 via-neutral-900 to-black',
      badgeText: 'OPEN SOURCE',
      icon: 'MessageSquare',
    },
  },
  {
    id: 'customraggpt',
    title: 'customraggpt',
    source: 'github',\n    sourceVisibility: "public",
    category: 'AI & Machine Learning',
    status: "Public Prototype",
    tagline: "NEXORA Knowledge Studio — document research with source passages.",
    overview: "A public Streamlit document-research prototype. Users can upload PDF, DOCX, CSV, JSON, TXT and Markdown files, then ask questions with relevant source passages attached to answers.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "PDF, DOCX, CSV, JSON, TXT and Markdown ingestion",\n      "Document question answering",\n      "Source passages attached to responses",\n      "Streamlit interface with session-based API-key entry"\n    ],
    techStack: [\n      "Python",\n      "Streamlit",\n      "OpenAI API"\n    ],
    challenges: "",
    externalUrl: 'https://github.com/raphicsdigitalsolutions/customraggpt',
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-red-600/30 via-neutral-900 to-black',
      badgeText: 'DEVELOPMENT PROJECT',
      icon: 'Database',
    },
  },
  {
    id: 'nova-voice-agent',
    title: 'nova-voice-agent',
    source: 'github',\n    sourceVisibility: "private",
    category: 'Voice & Agents',
    status: "Private Repository",
    tagline: "Nova — 3D realtime voice studio built as a Streamlit application.",
    overview: "The repository README describes a single-file Streamlit voice agent with a Three.js animated orb, browser-side WebRTC connection and live transcript. Each browser user supplies an API key; the repository is private.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Animated 3D shader orb with audio-reactive movement",\n      "WebRTC voice connection and live transcript",\n      "Listening, thinking and speaking states",\n      "Language preference and responsive layout",\n      "Microphone and audio error messaging"\n    ],
    techStack: [\n      "Python",\n      "Streamlit",\n      "Three.js",\n      "WebRTC",\n      "OpenAI Realtime API"\n    ],
    challenges: "",
    externalUrl: "",
    featured: true,
    visualTheme: {
      primaryColor: '#A855F7',
      gradient: 'from-purple-600/30 via-neutral-900 to-black',
      badgeText: 'EXPERIMENTAL',
      icon: 'Mic',
    },
  },
  {
    id: 'rashid-traders-works',
    title: 'rashid-traders-works',
    source: 'github',\n    sourceVisibility: "private",
    category: 'Web & SaaS Platform',
    status: "Private Repository",
    tagline: "Wholesale mobile-spare-parts billing, inventory and repair system — test / pre-delivery.",
    overview: "The repository README documents a cloud edition with a Vercel frontend, Cloudflare Workers API and Cloudflare D1 database. Its stated status is TEST / PRE-DELIVERY: basic dashboard connectivity has been observed, while backup/restore, security, end-to-end regression, PDF and device checks remain release gates.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Wholesale spare-parts billing and inventory workflows",\n      "Mobile-repair workflow support",\n      "Vercel frontend deployment",\n      "Cloudflare Workers API",\n      "Cloudflare D1 database",\n      "Manual WhatsApp sharing; automated delivery is not documented"\n    ],
    techStack: [\n      "Vercel",\n      "Cloudflare Workers",\n      "Cloudflare D1"\n    ],
    challenges: "The repository’s release-readiness notes list backup/restore, security configuration, end-to-end regression, PDF review and hardware/printer checks as outstanding.",
    externalUrl: "",
    featured: true,
    visualTheme: {
      primaryColor: '#2563EB',
      gradient: 'from-blue-600/30 via-neutral-900 to-black',
      badgeText: 'DEVELOPMENT PROJECT',
      icon: 'Briefcase',
    },
  },
  {
    id: 'mediguide-ai',
    title: 'MediGuide-AI',
    source: 'github',\n    sourceVisibility: "public",
    category: 'AI & Machine Learning',
    status: "Public Prototype",
    tagline: "Educational Streamlit prototype for medical-information guidance — not a medical device.",
    overview: "MediGuide AI is an educational course prototype. Its README explicitly states that it does not provide diagnosis or treatment and must not be used for healthcare decisions. Demonstrations should use fictional data only.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Streamlit-based educational prototype",\n      "Structured response parsing and streamed explanation",\n      "English and Urdu language options",\n      "Visible medical disclaimer and emergency guidance",\n      "Not intended for diagnosis, treatment or clinical decisions"\n    ],
    techStack: [\n      "Python",\n      "Streamlit",\n      "LangChain",\n      "OpenAI API",\n      "SQLite"\n    ],
    challenges: "The repository README warns that its emergency keyword check is not exhaustive and local SQLite caching is unencrypted. It must not be used with real patient data.",
    externalUrl: 'https://github.com/raphicsdigitalsolutions/MediGuide-AI',
    featured: false,
    visualTheme: {
      primaryColor: '#14B8A6',
      gradient: 'from-teal-600/30 via-neutral-900 to-black',
      badgeText: 'WORKING PROTOTYPE',
      icon: 'Shield',
    },
  },
  {
    id: 'finwise-ai',
    title: 'FinWise-AI',
    source: 'github',\n    sourceVisibility: "public",
    category: 'Web & SaaS Platform',
    status: "Public Prototype",
    tagline: "Educational Streamlit prototype for personal budget analysis.",
    overview: "FinWise AI is an educational project for personal financial analysis and budgeting. Its README states that it is not financial, investment, tax or legal advice and does not connect to bank accounts or execute transactions.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Income and expense breakdown",\n      "Deterministic budget calculations and ratios",\n      "Structured educational AI explanations",\n      "Streaming responses",\n      "In-memory and SQLite cache options"\n    ],
    techStack: [\n      "Python",\n      "Streamlit",\n      "LangChain",\n      "OpenAI API",\n      "SQLite"\n    ],
    challenges: "The README warns that SQLite caching stores prompts and responses in plaintext. Use fictional demonstration data only; never enter bank credentials or account numbers.",
    externalUrl: 'https://github.com/raphicsdigitalsolutions/FinWise-AI',
    featured: false,
    visualTheme: {
      primaryColor: '#6366F1',
      gradient: 'from-indigo-600/30 via-neutral-900 to-black',
      badgeText: 'DEVELOPMENT PROJECT',
      icon: 'DollarSign',
    },
  },
  {
    id: 'learning-adventure',
    title: 'Learning-Adventure',
    source: 'github',\n    sourceVisibility: "private",
    category: 'Interactive & Graphics',
    status: "Private Repository",
    tagline: "Early-learning and school-readiness Android app for children aged 1–5.",
    overview: "The repository README describes an early-learning Android app with age-banded activities, a parent area and a gentle reward system. The source repository is private.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Early-learning activities for ages 1–5",\n      "Letter, number, shape, matching and tracing play zones",\n      "Positive reinforcement without penalties",\n      "Parent area and local progress persistence"\n    ],
    techStack: [\n      "Kotlin",\n      "Jetpack Compose",\n      "Android Room",\n      "Coroutines and Flow"\n    ],
    challenges: "",
    externalUrl: "",
    featured: false,
    visualTheme: {
      primaryColor: '#EAB308',
      gradient: 'from-yellow-600/30 via-neutral-900 to-black',
      badgeText: 'OPEN SOURCE',
      icon: 'Award',
    },
  },
  {
    id: 'chromaflow-liquid-logic',
    title: 'CHROMAFLOW-LIQUID-LOGIC',
    source: 'github',\n    sourceVisibility: "private",
    category: 'Interactive & Graphics',
    status: "Private Repository",
    tagline: "CHROMAFLOW: LIQUID LOGIC — Unity 3D Android liquid-sorting game.",
    overview: "The Unity project README describes a 3D flask-based liquid-sorting game with procedural flask visuals, campaign progression and local save/settings. The current documented phase is source implementation; Unity Editor compilation, Android APK packaging and physical-device testing remain pending.",
    problem: "",
    solution: "",
    mainFeatures: [\n      "Procedural 3D glass flasks and liquid-pour animation",\n      "Liquid-sort rules and legal-move validation",\n      "Undo, restart, hint and solved-state handling",\n      "50 seeded campaign boards with source-verified solution witnesses",\n      "Five environment palettes and local progression"\n    ],
    techStack: [\n      "Unity 6.3",\n      "C#",\n      "Android"\n    ],
    challenges: "The repository notes that the campaign still needs manual difficulty curation and playtesting. Source-level verification is not proof of a completed Android APK.",
    externalUrl: "",
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-red-600/30 via-neutral-900 to-black',
      badgeText: 'EXPERIMENTAL',
      icon: 'Compass',
    },
  },
];
