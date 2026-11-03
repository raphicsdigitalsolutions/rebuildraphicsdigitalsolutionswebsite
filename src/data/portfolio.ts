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
  | 'Interactive & Graphics'
  | 'Mobile Applications';

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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Label Design',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Label Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Product Mockups',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Cosmetics & Skincare',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Cosmetics & Skincare',
    subcategory: 'Label Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Food & Beverage',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'behance',
    sourceVisibility: "profile",
    category: 'Food & Beverage',
    subcategory: 'Packaging Design',
    status: "Published Portfolio Work",
    tagline: "Selected packaging and visual design work from the founder’s Behance portfolio.",
    overview: "This selected design entry is listed on the founder’s Behance profile. Open the profile to inspect the available original artwork and any project context published there.",
    problem: "",
    solution: "",
    mainFeatures: [

    ],
    techStack: [

    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'AI & Machine Learning',
    status: "Private Repository",
    tagline: "Android and Flutter app concept for soulmate portraits and compatibility experiences.",
    overview: "The repository README describes a mobile application with a soulmate portrait experience, compatibility analysis and a guided questionnaire. The source repository is private, so implementation details are not linked publicly.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Soulmate portrait generation experience",
      "Compatibility and astrology-themed analysis",
      "Seven-step guided questionnaire",
      "Android native and Flutter app projects described in the repository"
    ],
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Flutter",
      "Dart"
    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'Mobile Applications',
    status: "Private Repository",
    tagline: "Flutter weather forecast app created as an internship task.",
    overview: "The repository README describes a Flutter weather application created for Task 3 of the Auspify Technologies Flutter Development Internship. It uses Open-Meteo weather and geocoding APIs.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Current weather and hourly forecast",
      "Seven-day weather forecast",
      "City search and GPS-based weather lookup",
      "Offline cache and saved favorite cities",
      "Light, dark and system theme options"
    ],
    techStack: [
      "Flutter",
      "Dart 3",
      "Material Design 3",
      "Provider",
      "Open-Meteo API"
    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'AI & Machine Learning',
    status: "Private Repository",
    tagline: "Knowledge-based AI customer representative prototype.",
    overview: "The repository README describes a Python and Streamlit customer-support assistant for a print packaging and brand identity agency. It uses a structured JSON knowledge base and OpenAI function calling. The source repository is private.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Knowledge-base answers for services and FAQs",
      "Lead capture after customer intent is established",
      "English, Roman Urdu and Urdu language support",
      "Password-gated lead review panel"
    ],
    techStack: [
      "Python",
      "Streamlit",
      "OpenAI API"
    ],
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
    source: 'github',
    sourceVisibility: "public",
    category: 'AI & Machine Learning',
    status: "Public Repository",
    tagline: "NEXORA AI — Streamlit AI workspace with optional web search.",
    overview: "NEXORA AI is a Streamlit-based AI workspace with day and night themes, session-level chat history, model selection and optional OpenAI Responses API web search. The README documents a public Streamlit demo and explains that this is a session-oriented app, not a full account system.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Session-based AI chat workspace",
      "Day and night appearance modes",
      "Optional live web search with source links",
      "Configurable assistant instructions and response style",
      "Public Streamlit demonstration"
    ],
    techStack: [
      "Python",
      "Streamlit",
      "OpenAI API"
    ],
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
    source: 'github',
    sourceVisibility: "public",
    category: 'AI & Machine Learning',
    status: "Public Prototype",
    tagline: "NEXORA Knowledge Studio — document research with source passages.",
    overview: "A public Streamlit document-research prototype. Users can upload PDF, DOCX, CSV, JSON, TXT and Markdown files, then ask questions with relevant source passages attached to answers.",
    problem: "",
    solution: "",
    mainFeatures: [
      "PDF, DOCX, CSV, JSON, TXT and Markdown ingestion",
      "Document question answering",
      "Source passages attached to responses",
      "Streamlit interface with session-based API-key entry"
    ],
    techStack: [
      "Python",
      "Streamlit",
      "OpenAI API"
    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'Voice & Agents',
    status: "Private Repository",
    tagline: "Nova — 3D realtime voice studio built as a Streamlit application.",
    overview: "The repository README describes a single-file Streamlit voice agent with a Three.js animated orb, browser-side WebRTC connection and live transcript. Each browser user supplies an API key; the repository is private.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Animated 3D shader orb with audio-reactive movement",
      "WebRTC voice connection and live transcript",
      "Listening, thinking and speaking states",
      "Language preference and responsive layout",
      "Microphone and audio error messaging"
    ],
    techStack: [
      "Python",
      "Streamlit",
      "Three.js",
      "WebRTC",
      "OpenAI Realtime API"
    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'Web & SaaS Platform',
    status: "Private Repository",
    tagline: "Wholesale mobile-spare-parts billing, inventory and repair system — test / pre-delivery.",
    overview: "The repository README documents a cloud edition with a Vercel frontend, Cloudflare Workers API and Cloudflare D1 database. Its stated status is TEST / PRE-DELIVERY: basic dashboard connectivity has been observed, while backup/restore, security, end-to-end regression, PDF and device checks remain release gates.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Wholesale spare-parts billing and inventory workflows",
      "Mobile-repair workflow support",
      "Vercel frontend deployment",
      "Cloudflare Workers API",
      "Cloudflare D1 database",
      "Manual WhatsApp sharing; automated delivery is not documented"
    ],
    techStack: [
      "Vercel",
      "Cloudflare Workers",
      "Cloudflare D1"
    ],
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
    source: 'github',
    sourceVisibility: "public",
    category: 'AI & Machine Learning',
    status: "Public Prototype",
    tagline: "Educational Streamlit prototype for medical-information guidance — not a medical device.",
    overview: "MediGuide AI is an educational course prototype. Its README explicitly states that it does not provide diagnosis or treatment and must not be used for healthcare decisions. Demonstrations should use fictional data only.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Streamlit-based educational prototype",
      "Structured response parsing and streamed explanation",
      "English and Urdu language options",
      "Visible medical disclaimer and emergency guidance",
      "Not intended for diagnosis, treatment or clinical decisions"
    ],
    techStack: [
      "Python",
      "Streamlit",
      "LangChain",
      "OpenAI API",
      "SQLite"
    ],
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
    source: 'github',
    sourceVisibility: "public",
    category: 'Web & SaaS Platform',
    status: "Public Prototype",
    tagline: "Educational Streamlit prototype for personal budget analysis.",
    overview: "FinWise AI is an educational project for personal financial analysis and budgeting. Its README states that it is not financial, investment, tax or legal advice and does not connect to bank accounts or execute transactions.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Income and expense breakdown",
      "Deterministic budget calculations and ratios",
      "Structured educational AI explanations",
      "Streaming responses",
      "In-memory and SQLite cache options"
    ],
    techStack: [
      "Python",
      "Streamlit",
      "LangChain",
      "OpenAI API",
      "SQLite"
    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'Interactive & Graphics',
    status: "Private Repository",
    tagline: "Early-learning and school-readiness Android app for children aged 1–5.",
    overview: "The repository README describes an early-learning Android app with age-banded activities, a parent area and a gentle reward system. The source repository is private.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Early-learning activities for ages 1–5",
      "Letter, number, shape, matching and tracing play zones",
      "Positive reinforcement without penalties",
      "Parent area and local progress persistence"
    ],
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Android Room",
      "Coroutines and Flow"
    ],
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
    source: 'github',
    sourceVisibility: "private",
    category: 'Interactive & Graphics',
    status: "Private Repository",
    tagline: "CHROMAFLOW: LIQUID LOGIC — Unity 3D Android liquid-sorting game.",
    overview: "The Unity project README describes a 3D flask-based liquid-sorting game with procedural flask visuals, campaign progression and local save/settings. The current documented phase is source implementation; Unity Editor compilation, Android APK packaging and physical-device testing remain pending.",
    problem: "",
    solution: "",
    mainFeatures: [
      "Procedural 3D glass flasks and liquid-pour animation",
      "Liquid-sort rules and legal-move validation",
      "Undo, restart, hint and solved-state handling",
      "50 seeded campaign boards with source-verified solution witnesses",
      "Five environment palettes and local progression"
    ],
    techStack: [
      "Unity 6.3",
      "C#",
      "Android"
    ],
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
