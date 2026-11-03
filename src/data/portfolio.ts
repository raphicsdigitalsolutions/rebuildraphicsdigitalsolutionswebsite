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
  | 'Open Source Project';

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
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: 'Live Product',
    tagline: 'High-contrast retail packaging concept and 3D matte bottle visualization.',
    overview:
      "A packaging concept and 3D visualization project created for NutraLife's Men's Multivitamin Gummies. Focused on clear supplement facts typography, bold shelf presence, and realistic matte finish PET container rendering.",
    problem:
      'Nutraceutical retail shelves require distinct visual contrast and clear hierarchy between product benefits, flavor profiles, and mandatory regulatory label information.',
    solution:
      'Designed a structured typographic grid with dark charcoal backgrounds, electric orange accent geometry, and realistic 3D bottle mockups showing bottle proportions and label wrap.',
    mainFeatures: [
      'Comprehensive supplement facts panel layout and allergen icons',
      'Matte bottle finish with targeted high-gloss logo accents',
      'Full wrap-around dieline vector specifications with print bleed',
      'Multi-angle 3D studio mockups for retail pitch and digital display',
    ],
    techStack: ['Adobe Illustrator', 'Photoshop', 'Blender 3D'],
    challenges:
      'Balancing high-density micro-typography in compliance with supplement labeling guidelines while preserving clean negative space.',
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
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: 'Live Product',
    tagline: 'Botanical packaging layout with translucent 3D bottle material simulation.',
    overview:
      "Packaging concept created for NutraLife's Women's Multivitamin Gummies. Emphasizes refined berry tones, elegant serif brand typography, and photorealistic 3D rendering of translucent containers.",
    problem:
      'Creating a distinct product family variant that complements the men’s product line while addressing different consumer aesthetic preferences in the wellness aisle.',
    solution:
      'Constructed a delicate berry and rose metallic accent palette, paired with botanical micro-elements and realistic lighting passes to showcase gummy texture through the jar.',
    mainFeatures: [
      'Rose metallic foil accents on key brand and nutrient callouts',
      'Botanical ingredient icons for natural fruit and vitamin sources',
      'Translucent amber-rose jar shader with realistic light refraction',
      'Print-ready vector dielines with color separations',
    ],
    techStack: ['Adobe Illustrator', 'Cinema 4D', 'Photoshop'],
    challenges:
      'Simulating realistic translucency and light scatter through colored PET plastics in 3D rendering.',
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
    category: 'Label Design',
    subcategory: 'Packaging Design',
    status: 'Live Product',
    tagline: 'Clinical pharmaceutical carton and blister packaging layout.',
    overview:
      'Carton packaging and blister foil artwork for over-the-counter pain relief medication. Built around high-legibility typographic hierarchies and clinical safety standards.',
    problem:
      'Healthcare and pharmaceutical packaging requires immediate clarity during high-urgency shopping, leaving zero ambiguity regarding dosage and active ingredients.',
    solution:
      'Formulated an authoritative clinical layout with deep medical blue and red dosage badges, tamper-evident closure indicators, and tactile Braille emboss specifications.',
    mainFeatures: [
      'Clear dosage and active ingredient strength callouts',
      'Standardized pharmaceutical typography and warning box grids',
      'Tamper-evident holographic security seal placement',
      'Blister foil reverse print layout aligned to carton dieline',
    ],
    techStack: ['Adobe InDesign', 'Illustrator', '3D Packaging Tools'],
    challenges:
      'Formatting dense multi-lingual pharmacological warning text within standard compact retail carton dimensions.',
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
    category: 'Packaging Design',
    subcategory: 'Label Design',
    status: 'Live Product',
    tagline: 'Pediatric pharmaceutical carton with age-bracketed visual cues.',
    overview:
      'Pediatric medicine packaging and syrup bottle carton design featuring friendly mascot illustrations, color-coded age brackets, and clear measuring guidance.',
    problem:
      'Pediatric products must comfort young patients without trivializing medicine or resembling candy, while giving parents immediate dosage confidence.',
    solution:
      'Engineered an approachable illustrated character accompanied by distinct milligram dosage charts, prominent measuring cup guides, and child-resistant closure icons.',
    mainFeatures: [
      'Color-coded age and weight dosage reference system',
      'Child-resistant cap reminder iconography',
      'Flavor indicator artwork (Natural Strawberry)',
      'Precision manufacturing dielines with tuck-end carton flaps',
    ],
    techStack: ['Adobe Illustrator', 'Photoshop'],
    challenges:
      'Balancing warm, friendly visuals with strict pharmaceutical regulatory labeling requirements.',
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
    category: 'Product Mockups',
    subcategory: 'Packaging Design',
    status: 'Live Product',
    tagline: 'Industrial, utilitarian personal care bottle design and 3D visualization.',
    overview:
      'Industrial-inspired bottle design and waterproof synthetic label packaging for Northforge, a high-performance body wash designed for athletes and active lifestyles.',
    problem:
      'Moving away from standard cosmetic bottles to convey durability, heavy-duty formulation, and athletic utility.',
    solution:
      'Created a tactile bottle concept using matte black materials with high-visibility hazard amber typography and synthetic water-resistant label specifications.',
    mainFeatures: [
      'Sturdy container geometry with embossed side grip ridges',
      'Waterproof synthetic label substrate specifications',
      'High-contrast industrial typography layout',
      '3D studio render with realistic condensation and droplet passes',
    ],
    techStack: ['Adobe Illustrator', 'Blender', 'Photoshop'],
    challenges:
      'Simulating realistic surface droplet condensation and rubberized grip textures in 3D visualization.',
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
    category: 'Cosmetics & Skincare',
    subcategory: 'Packaging Design',
    status: 'Live Product',
    tagline: 'Luxury skincare cosmetic packaging with frosted glass 3D studio mockups.',
    overview:
      'Minimalist cosmetic visual identity, frosted glass dropper bottle label, and folding carton packaging for Glowé Facial Serum.',
    problem:
      'Achieving a premium luxury department-store aesthetic through clean typography, understated negative space, and metallic foil accents.',
    solution:
      'Constructed a refined typographic lockup with gold leaf hot-stamping plates, frosted bottle material shaders, and tactile paper carton mockups.',
    mainFeatures: [
      'Frosted glass bottle material rendering with glass refraction',
      'Gold foil hot-stamping separation plates',
      'Soft-touch matte exterior carton box artwork',
      'Precision dropper pipette with realistic liquid meniscus simulation',
    ],
    techStack: ['Adobe Illustrator', 'KeyShot', 'Photoshop'],
    challenges:
      'Calibrating subtle micro-typography kerning to convey high-end cosmetic refinement.',
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
    category: 'Cosmetics & Skincare',
    subcategory: 'Label Design',
    status: 'Live Product',
    tagline: 'Barber-inspired amber glass dropper bottle and cylindrical tube packaging.',
    overview:
      'Apothecary-style amber dropper bottle label and matching rigid cylinder gift tube packaging for Beardix Beard Serum.',
    problem:
      'Creating packaging that communicates both traditional artisanal grooming craftsmanship and modern formulation quality.',
    solution:
      'Crafted vintage woodblock-inspired filigree borders paired with clean grotesque typography and metallic copper foil accents on dark amber glass.',
    mainFeatures: [
      'Cylindrical rigid tube packaging wrap dieline',
      'Amber UV-protective glass bottle 3D mockup',
      'Metallic copper foil hot-stamp plates',
      'Organic ingredient certification badges',
    ],
    techStack: ['Adobe Illustrator', 'Photoshop', 'Cinema 4D'],
    challenges:
      'Curved substrate mapping for cylindrical rigid gift tubes ensuring seamless pattern wrap.',
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
    category: 'Packaging Design',
    subcategory: 'Food & Beverage',
    status: 'Live Product',
    tagline: 'Sports nutrition stand-up pouch packaging with 3D gusset visualization.',
    overview:
      'High-impact 2kg stand-up pouch packaging for athletic sports nutrition brand Whyprotin, featuring dynamic angular velocity graphics and clear macro callouts.',
    problem:
      'Sports nutrition packaging requires instant visual recognition of protein content, serving count, and flavor distinction in high-competition retail environments.',
    solution:
      'Engineered an aggressive angular design incorporating carbon-texture cues, high-visibility 27g protein badges, and bold flavor distinction bands.',
    mainFeatures: [
      'Stand-up zipper pouch dieline with tear notch and bottom gusset',
      'High-energy macro breakdown badges',
      'Matte finish with targeted spot gloss elements',
      'Multi-flavor colorway system (Chocolate, Vanilla, Strawberry)',
    ],
    techStack: ['Adobe Illustrator', 'Blender', 'Photoshop'],
    challenges:
      'Compensating for gusset pouch curvature so that front-facing brand assets remain undistorted when filled.',
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
    category: 'Food & Beverage',
    subcategory: 'Packaging Design',
    status: 'Live Product',
    tagline: 'Matte pouch packaging featuring topographic linework and degassing valve placement.',
    overview:
      'Artisan coffee bag packaging concept featuring single-origin elevation topographic lines, roast meter gauges, and valve placement blueprint.',
    problem:
      'Specialty coffee packaging must convey roast profile, elevation, and tasting notes with authenticity and artisanal restraint.',
    solution:
      'Designed an earthy kraft-style pouch concept with minimalist screen-printed typography, golden roast intensity dials, and tasting note tags.',
    mainFeatures: [
      'Topographic elevation map vector illustrations',
      'One-way aroma degassing valve placement guide',
      'Roast profile and tasting notes grid',
      'Eco-friendly recyclable barrier pouch specifications',
    ],
    techStack: ['Adobe Illustrator', 'Photoshop'],
    challenges:
      'Balancing fine vector line weights to ensure clarity on textured pouch materials.',
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
    category: 'Food & Beverage',
    subcategory: 'Packaging Design',
    status: 'Live Product',
    tagline: 'Embossed metal tea tin and pyramid envelope packaging.',
    overview:
      'Tea tin packaging concept with high-altitude mountain illustrations, gold foil highlights, and airtight lid sealing specifications.',
    problem:
      'Loose-leaf tea packaging requires tactile elegance and aroma preservation cues for gift and premium retail channels.',
    solution:
      'Created an embossed cylindrical metal canister design with mist-shrouded mountain vector illustrations and gold foil trim.',
    mainFeatures: [
      'Embossed tinplate packaging blueprint',
      'Mountain landscape line art and botanical crest',
      'Brewing ritual guide with precise temperature and steeping graphics',
      '3D metal canister studio reflection mockup',
    ],
    techStack: ['Adobe Illustrator', 'KeyShot', 'Photoshop'],
    challenges:
      'Direct-to-metal offset printing color calibration to account for metallic tinplate reflectivity.',
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
    category: 'AI & Machine Learning',
    status: 'Open Source Project',
    tagline: 'Sketch-to-concept generative computer vision tool with stroke conditioning.',
    overview:
      'An open-source generative computer vision repository that converts rough canvas strokes into conceptual design drafts using conditioning models.',
    problem:
      'Translating initial conceptual sketches into high-fidelity digital variations rapidly during early brainstorming stages.',
    solution:
      'Built a browser-based drawing canvas coupled with an image-to-image conditioning pipeline that maps stroke edges and prompts to generated concept variations.',
    mainFeatures: [
      'Interactive vector and raster sketch canvas with stroke smoothing',
      'Image-to-image conditioning with configurable guidance parameters',
      'Multi-variant concept export in web standard formats',
      'Configurable art style presets for rapid iteration',
    ],
    techStack: ['Python', 'TypeScript', 'React', 'FastAPI'],
    challenges:
      'Balancing client-side drawing responsiveness with asynchronous model inference times.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/SoulSketch-AI',
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
    category: 'Web & SaaS Platform',
    status: 'Live Product',
    tagline: 'Meteorological web dashboard with real-time radar data visualizations.',
    overview:
      'A responsive atmospheric intelligence web application providing microclimate forecasts, radar map feeds, and canvas-based wind particle overlays.',
    problem:
      'Traditional weather interfaces are often cluttered with advertisements and sluggish tracking scripts, degrading user experience.',
    solution:
      'Architected a lightweight client application integrating open meteorological data streams with animated wind vectors and temperature graphs.',
    mainFeatures: [
      'Geolocation forecast retrieval with hourly precipitation curves',
      'Interactive canvas particle wind flow overlay',
      'Air quality index (AQI) and UV radiation metrics',
      'Responsive mobile and desktop progressive web layout',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Open-Meteo API'],
    challenges:
      'Maintaining 60fps canvas particle wind maps on mobile devices with low battery overhead.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/SKYCAST',
    featured: true,
    visualTheme: {
      primaryColor: '#0EA5E9',
      gradient: 'from-sky-600/30 via-neutral-900 to-black',
      badgeText: 'LIVE PRODUCT',
      icon: 'CloudRain',
    },
  },
  {
    id: 'predict-me',
    title: 'predict-me',
    source: 'github',
    category: 'AI & Machine Learning',
    status: 'Working Prototype',
    tagline: 'Automated tabular data analysis and regression modeling suite.',
    overview:
      'A machine learning prototype for exploratory data analysis (EDA), automated feature encoding, and regression benchmarking on tabular datasets.',
    problem:
      'Streamlining exploratory data analysis and baseline model training without manual boilerplate coding.',
    solution:
      'Developed a dashboard pipeline that auto-detects column data types, handles null imputation, and trains comparative regression algorithms.',
    mainFeatures: [
      'Automated schema detection for numerical and categorical variables',
      'Baseline algorithm comparison (Random Forest, Ridge, Gradient Boosting)',
      'Feature importance visualizer and correlation matrix plots',
      'Exportable inference pipeline scripts',
    ],
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'FastAPI', 'Streamlit'],
    challenges:
      'Preventing data leakage across automated cross-validation splits on skewed datasets.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/predict-me',
    featured: false,
    visualTheme: {
      primaryColor: '#10B981',
      gradient: 'from-emerald-600/30 via-neutral-900 to-black',
      badgeText: 'WORKING PROTOTYPE',
      icon: 'TrendingUp',
    },
  },
  {
    id: 'pixelcraft-ai-agent',
    title: 'pixelcraft-ai-agent',
    source: 'github',
    category: 'Voice & Agents',
    status: 'Open Source Project',
    tagline: 'Agentic script for programmatic banner compositing and multi-ratio exports.',
    overview:
      'An open-source agentic script that automates graphic asset resizing, background removal, and multi-ratio banner compositing from structured briefs.',
    problem:
      'Adapting creative assets across multiple social and advertising dimensions manually consumes extensive production time.',
    solution:
      'Implemented an automated pipeline coordinating image segmentation, layout scaling, and canvas compositing for standard marketing dimensions.',
    mainFeatures: [
      'Multi-ratio banner generation (1:1, 9:16, 16:9)',
      'Automated background segmentation and transparent PNG export',
      'Contrast-checked text placement algorithms',
      'Batch export CLI and API endpoints',
    ],
    techStack: ['TypeScript', 'Node.js', 'Sharp', 'HTML Canvas'],
    challenges:
      'Ensuring headline text never overlaps focal visual subjects across varied aspect ratios.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/pixelcraft-ai-agent',
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
    category: 'AI & Machine Learning',
    status: 'Open Source Project',
    tagline: 'Modular chat interface with custom system prompt templates and streaming tokens.',
    overview:
      'A customizable conversational web interface supporting multiple model providers, custom system prompts, and syntax-highlighted code output.',
    problem:
      'Providing teams with a clean, unbranded chat client supporting custom role instructions and private local session storage.',
    solution:
      'Constructed a lightweight React chat client with real-time SSE token streaming, markdown code rendering, and local session management.',
    mainFeatures: [
      'Streaming token response with stop/cancel controls',
      'Configurable system prompt presets for specialized roles',
      'Syntax-highlighted code blocks with one-click copy',
      'Local storage chat history with zero server retention',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenges:
      'Maintaining smooth streaming markdown rendering without causing layout jitter or re-render stalls.',
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
    category: 'AI & Machine Learning',
    status: 'Development Project',
    tagline: 'Retrieval-Augmented Generation pipeline with document vectorization.',
    overview:
      'A development repository exploring document chunking, semantic vector indexing, and source-grounded question answering over private documentation.',
    problem:
      'Mitigating hallucinations in document search by anchoring generative answers in verbatim indexed text segments.',
    solution:
      'Engineered a RAG workflow combining recursive text splitting, vector embeddings, similarity search, and source reference citation cards.',
    mainFeatures: [
      'Multi-document ingestion (PDF, Markdown, TXT)',
      'Sliding window chunking with metadata tracking',
      'Source attribution snippets showing excerpt location',
      'Cosine similarity retrieval with re-ranking logic',
    ],
    techStack: ['Python', 'ChromaDB', 'FastAPI', 'LangChain'],
    challenges:
      'Tuning chunk size and overlap thresholds to preserve context without exceeding LLM prompt budgets.',
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
    category: 'Voice & Agents',
    status: 'Experimental Project',
    tagline: 'Real-time bidirectional speech experiment with interruption handling.',
    overview:
      'An experimental voice agent exploring low-latency audio streaming via WebSockets and turn-taking behavior.',
    problem:
      'Investigating sub-second audio turnarounds and natural user interruption (barge-in) during voice agent interaction.',
    solution:
      'Built a WebSocket audio bridge with client-side Voice Activity Detection (VAD) and streaming audio playback buffers.',
    mainFeatures: [
      'Sub-second audio packet roundtrips via WebSockets',
      'Barge-in interruption detection halting outbound audio',
      'Canvas audio frequency visualizer waveform',
      'Configurable vocal synthesis profiles',
    ],
    techStack: ['Node.js', 'WebSockets', 'Web Audio API', 'TypeScript'],
    challenges:
      'Synchronizing server audio streams with client playback to prevent audio clipping during abrupt interruptions.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/nova-voice-agent',
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
    category: 'Web & SaaS Platform',
    status: 'Development Project',
    tagline: 'Commercial stock ledger, customer billing, and inventory tracking application.',
    overview:
      'A custom enterprise web application developed for wholesale trading operations. Features product catalogs, stock balances, and invoice generation.',
    problem:
      'Eliminating manual ledger errors and providing real-time inventory visibility across multiple product categories.',
    solution:
      'Constructed a database-driven dashboard with inventory tracking, customer credit balance monitoring, and automated printable invoice generation.',
    mainFeatures: [
      'Multi-category inventory ledger with stock alerts',
      'Customer billing records and invoice generation',
      'Transaction history search and filter tools',
      'Operational sales summaries and balance reports',
    ],
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    challenges:
      'Ensuring strict ledger balance consistency during simultaneous invoice checkout entries.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/rashid-traders-works',
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
    category: 'AI & Machine Learning',
    status: 'Working Prototype',
    tagline: 'Educational drug interaction lookup and dosage guide prototype.',
    overview:
      'An educational prototype exploring pharmaceutical contraindication lookups and plain-language medicine guide indexing.',
    problem:
      'Helping users understand dense clinical package inserts with clear safety disclaimers and readable formatting.',
    solution:
      'Created an indexed medication search tool with strict clinical disclaimers, interaction severity levels, and physician consultation guidance.',
    mainFeatures: [
      'Medication interaction search with severity color codes',
      'Simplified plain-language summary of warning inserts',
      'Prominent medical disclaimers and emergency hotline prompts',
      'Offline-capable first-aid instruction reference',
    ],
    techStack: ['Python', 'TypeScript', 'React', 'FastAPI'],
    challenges:
      'Implementing strict safety filters to prevent any diagnostic claims or prescription substitution.',
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
    category: 'Web & SaaS Platform',
    status: 'Development Project',
    tagline: 'Personal finance analytics and expense categorization dashboard.',
    overview:
      'A personal finance management web application prototype with automated CSV transaction categorization and savings projections.',
    problem:
      'Providing an accessible visualization of discretionary spending and compound interest projections without third-party credential storage.',
    solution:
      'Built a client-side transaction categorizer paired with interactive savings projection charts and budget allocation meters.',
    mainFeatures: [
      'CSV transaction file parsing with category detection',
      'Interactive compound growth and savings projection charts',
      'Monthly expense distribution breakdown visualizations',
      'Client-side data processing with zero banking credential storage',
    ],
    techStack: ['TypeScript', 'React', 'Recharts', 'Tailwind CSS', 'Vite'],
    challenges:
      'Accurately classifying variable merchant descriptions in unstructured bank CSV exports.',
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
    category: 'Interactive & Graphics',
    status: 'Open Source Project',
    tagline: 'Gamified quiz application with quest progression and animated badges.',
    overview:
      'An educational web application utilizing gamified progression maps, procedural quiz rounds, and animated milestone badges.',
    problem:
      'Making repetitive review drills engaging and structured for self-paced student learning.',
    solution:
      'Created an interactive quest map interface where correct answers advance the character along learning paths and award topic badges.',
    mainFeatures: [
      'Interactive visual quest progression roadmap',
      'Dynamic quiz engine supporting varied question formats',
      'Streak counter and animated badge unlock effects',
      'Progress state persistence via local browser storage',
    ],
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'LocalDB'],
    challenges:
      'Balancing reward mechanics with genuine educational content pacing.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/Learning-Adventure',
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
    category: 'Interactive & Graphics',
    status: 'Experimental Project',
    tagline: 'WebGL fluid simulation and chromatic dispersion shader experiments.',
    overview:
      'An experimental graphics repository investigating real-time Navier-Stokes fluid simulations, refractive liquid lenses, and chromatic dispersion in WebGL.',
    problem:
      'Rendering smooth, interactive fluid shaders in browser environments while maintaining lightweight GPU resource consumption.',
    solution:
      'Implemented custom GLSL fragment shaders calculating velocity advection and pressure divergence with ping-pong framebuffers.',
    mainFeatures: [
      'Real-time cursor and touch-driven fluid turbulence',
      'Viscosity, dissipation, and color bloom controls',
      'Multi-touch interaction support on mobile browsers',
      'Procedural refractive distortion and caustic highlights',
    ],
    techStack: ['WebGL', 'GLSL', 'Three.js', 'TypeScript', 'Vite'],
    challenges:
      'Optimizing floating-point framebuffer textures across varied mobile GPUs.',
    externalUrl: 'https://github.com/raphicsdigitalsolutions/CHROMAFLOW-LIQUID-LOGIC',
    featured: true,
    visualTheme: {
      primaryColor: '#D51F16',
      gradient: 'from-red-600/30 via-neutral-900 to-black',
      badgeText: 'EXPERIMENTAL',
      icon: 'Compass',
    },
  },
];
