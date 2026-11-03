/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Centralized Services Architecture for Raphics Digital Solutions.
 * Covers Creative Studio, Digital Development Studio, and AI & Automation Lab.
 */

export interface ServiceItem {
  id: string;
  name: string;
  category: 'branding' | 'packaging' | 'print' | 'digital-design' | 'development' | 'ai-automation';
  summary: string;
  deliverables: string[];
  toolsAndTech?: string[];
  featured?: boolean;
}

export interface ServiceCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: string;
  items: ServiceItem[];
}

export const CREATIVE_SERVICES: ServiceCategoryGroup[] = [
  {
    id: 'branding',
    title: 'Brand Identity & Strategy',
    subtitle: 'Distinctive visual foundations that command authority',
    badge: 'BRANDING',
    iconName: 'Sparkles',
    description:
      'We craft iconic visual identities, logo architecture, and unified design guidelines that differentiate your business in competitive global markets.',
    items: [
      {
        id: 'brand-identity',
        name: 'Brand Identity Systems',
        category: 'branding',
        summary: 'Comprehensive brand systems with typography, color mathematics, and visual geometry.',
        deliverables: ['Full Brand Book', 'Color Palettes & Hierarchy', 'Typography Systems', 'Asset Libraries'],
        toolsAndTech: ['Adobe Illustrator', 'Photoshop', 'Vector Standards'],
        featured: true,
      },
      {
        id: 'logo-design',
        name: 'Iconic Logo Design',
        category: 'branding',
        summary: 'Memorable, mathematically balanced logomarks, monograms, and custom type emblems.',
        deliverables: ['Primary & Secondary Marks', 'Vector SVG/EPS/PDF', 'Horizontal & Stacked Lockups', 'Favicons & App Icons'],
      },
      {
        id: 'brand-guidelines',
        name: 'Corporate Brand Guidelines',
        category: 'branding',
        summary: 'Strict execution manuals ensuring consistent brand application across physical and digital touchpoints.',
        deliverables: ['Digital Brand Manual', 'Clearspace & Scaling Rules', 'Misuse Standards', 'Partner Asset Kits'],
      },
      {
        id: 'rebranding',
        name: 'Strategic Rebranding',
        category: 'branding',
        summary: 'Repositioning legacy businesses to capture modern customer segments and digital ecosystems.',
        deliverables: ['Brand Audit', 'Transition Roadmap', 'Asset Overhaul', 'Rollout Strategy'],
      },
    ],
  },
  {
    id: 'packaging',
    title: 'Product Packaging & 3D Visualization',
    subtitle: 'Shelf-stopping product packaging engineered for retail & e-commerce',
    badge: 'PACKAGING',
    iconName: 'Box',
    description:
      'From nutraceutical gummies and pharmaceutical boxes to luxury skincare serums and specialty coffee pouches, we engineer dielines and photorealistic 3D product renders.',
    items: [
      {
        id: 'product-packaging',
        name: 'Product Packaging Design',
        category: 'packaging',
        summary: 'Custom retail boxes, pouches, shrink sleeves, and structural carton designs with precise dielines.',
        deliverables: ['Die-Cut Vectors', 'CMYK Print Ready Files', 'Material Finishes Specification', 'Embossing/Foil Layers'],
        featured: true,
      },
      {
        id: 'label-design',
        name: 'Bottles & Label Design',
        category: 'packaging',
        summary: 'Label layouts for tinctures, serums, vitamins, and beverages using ingredient, nutrition, warning, and regulatory copy supplied or approved by the client.',
        deliverables: ['Front & Back Label Artwork', 'Nutrition / Supplement Panels', 'Barcode / QR Zones', 'Regulatory Legals'],
      },
      {
        id: 'pharma-packaging',
        name: 'Pharmaceutical Packaging',
        category: 'packaging',
        summary: 'Artwork and dieline design for medical cartons, blister packs, and tamper-evident packaging, prepared against client-supplied specifications. Regulatory review and approval remain with the client and qualified compliance professionals.',
        deliverables: ['Client-Supplied Regulatory Copy', 'Braille Artwork Layer (when specified and validated)', 'Dosage Information Layout', 'Security Seal Artwork'],
      },
      {
        id: 'supplements-food',
        name: 'Supplement & Food Packaging',
        category: 'packaging',
        summary: 'High-energy nutraceutical tubs, gummy jars, protein stand-up pouches, and gourmet food wraps.',
        deliverables: ['Standup Pouch Dielines', 'Client-Supplied Food and Supplement Information Layouts', 'Print Finishes', 'Variant Colorways'],
      },
      {
        id: 'cosmetics-skincare',
        name: 'Cosmetics & Skincare Packaging',
        category: 'packaging',
        summary: 'Minimalist luxury aesthetic for dropper bottles, cream jars, and serum pumps with metallic touches.',
        deliverables: ['Glass & Dropper Artwork', 'Outer Carton Boxes', 'Hot-Stamping Foil Maps', 'Soft-Touch Finishes'],
      },
      {
        id: '3d-product-visualization',
        name: '3D Product Mockups & Renders',
        category: 'packaging',
        summary: 'Cinematic studio 3D renders for pre-launch crowdfunding, Amazon storefronts, and marketing campaigns.',
        deliverables: ['4K Studio Renders', 'Transparent PNG Cutouts', 'Lighting & Shadow Layers', '360 Turntables'],
        toolsAndTech: ['Blender', 'Three.js', 'Cinema 4D', 'Photoshop'],
        featured: true,
      },
    ],
  },
  {
    id: 'print',
    title: 'Print & Collateral Engineering',
    subtitle: 'Tactile, high-impact physical marketing materials',
    badge: 'PRINT',
    iconName: 'Printer',
    description:
      'High-resolution press-ready corporate literature, premium foil-stamped business cards, trade show exhibition banners, and point-of-sale graphics.',
    items: [
      {
        id: 'brochures-flyers',
        name: 'Brochures & Catalogs',
        category: 'print',
        summary: 'Tri-folds, multi-page product catalogues, and corporate pitch booklets with editorial precision.',
        deliverables: ['Press PDF with Bleed', 'Digital Flipbook Files', 'Color-Calibrated Assets'],
      },
      {
        id: 'business-cards',
        name: 'Luxury Business Cards',
        category: 'print',
        summary: 'Spot UV, foil-stamped, debossed, and ultra-heavy cardstock stationery design.',
        deliverables: ['Double-Sided Vector Art', 'Specialty Finish Plates', 'Print Production Specs'],
      },
      {
        id: 'banners-pos',
        name: 'Banners & Event Graphics',
        category: 'print',
        summary: 'Large-scale rollups, backdrop banners, trade-show booth displays, and retail POP stands.',
        deliverables: ['Large Format Vector Art', 'Grommet & Hem Guides', 'High-Res Raster Composites'],
      },
    ],
  },
  {
    id: 'digital-design',
    title: 'Digital Marketing & Social Creatives',
    subtitle: 'High-conversion visual assets across digital distribution channels',
    badge: 'DIGITAL DESIGN',
    iconName: 'Monitor',
    description:
      'Attention-commanding social media campaigns, animated banners, conversion ads, and launch graphics crafted for peak algorithmic engagement.',
    items: [
      {
        id: 'social-creatives',
        name: 'Social Media Creatives',
        category: 'digital-design',
        summary: 'Cohesive Instagram, LinkedIn, and X post templates, carousels, and story sequences.',
        deliverables: ['Editable Figma Kits', 'Optimized WebP/PNG', 'Carousel Narratives'],
      },
      {
        id: 'campaign-design',
        name: 'Digital Advertising Creatives',
        category: 'digital-design',
        summary: 'Performance marketing ad creatives engineered for high CTR across Meta, Google Ads, and TikTok.',
        deliverables: ['Ad Aspect Ratios (1:1, 9:16, 16:9)', 'A/B Testing Variants', 'Hook Visuals'],
      },
    ],
  },
];

export const DEVELOPMENT_SERVICES: ServiceItem[] = [
  {
    id: 'website-development',
    name: 'Website Design & Development',
    category: 'development',
    summary: 'High-speed, SEO-optimized, interactive websites with micro-interactions and cinematic presence.',
    deliverables: ['Responsive Web Experience', 'Core Web Vitals Optimization', 'SEO Architecture', 'CMS Integration'],
    toolsAndTech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion'],
    featured: true,
  },
  {
    id: 'web-application-development',
    name: 'Web Application Development',
    category: 'development',
    summary: 'Full-stack software applications featuring robust authentication, API orchestration, and real-time state.',
    deliverables: ['Scalable Frontend & Backend', 'REST / GraphQL APIs', 'Role-Based Access Control', 'Cloud Deployment'],
    toolsAndTech: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
    featured: true,
  },
  {
    id: 'ai-website-development',
    name: 'AI Website Development',
    category: 'development',
    summary: 'Next-generation web applications infused with intelligent assistants, dynamic personalization, and generative features.',
    deliverables: ['Server-Side AI Integration', 'Streaming Responses', 'Multimodal Interfaces', 'Context Memory'],
    toolsAndTech: ['Gemini API', 'OpenAI', 'LangChain', 'FastAPI', 'Next.js'],
  },
  {
    id: 'custom-crm-dashboards',
    name: 'Custom CRM & Admin Dashboards',
    category: 'development',
    summary: 'Data-rich operational interfaces, real-time analytics dashboards, customer pipeline trackers, and custom ERPs.',
    deliverables: ['Live Charting & Metrics', 'Data Export / Import', 'Audit Logs', 'Granular Permissions'],
    toolsAndTech: ['Tailwind CSS', 'Recharts', 'Express', 'SQL Databases'],
    featured: true,
  },
  {
    id: 'custom-business-software',
    name: 'Custom Business Software & Portals',
    category: 'development',
    summary: 'Bespoke inventory management, invoicing, order tracking, and client self-service portals.',
    deliverables: ['Tailored Workflow Automations', 'Invoice Generation', 'Payment Gateway Integration', 'Document Management'],
    toolsAndTech: ['TypeScript', 'Express', 'Stripe', 'Node.js'],
  },
  {
    id: 'database-driven-apps',
    name: 'Database-Driven Applications',
    category: 'development',
    summary: 'High-volume data processing systems, indexed querying, automated backups, and resilient schemas.',
    deliverables: ['Database Schema Architecture', 'Optimized Query Pipelines', 'Migration Scripts', 'Security Hardening'],
    toolsAndTech: ['PostgreSQL', 'SQLite', 'Prisma', 'Drizzle ORM'],
  },
  {
    id: 'ecommerce-solutions',
    name: 'E-Commerce Solutions',
    category: 'development',
    summary: 'Frictionless checkout funnels, dynamic product catalogues, inventory syncing, and custom cart logic.',
    deliverables: ['Checkout Flow', 'Inventory Management', 'Stripe / PayPal Gateways', 'Customer Accounts'],
    toolsAndTech: ['React', 'Shopify Storefront API', 'Stripe', 'Node.js'],
  },
];

export const AI_SERVICES: ServiceItem[] = [
  {
    id: 'custom-ai-chatbots',
    name: 'Custom AI Chatbots & Customer Agents',
    category: 'ai-automation',
    summary: 'Trained on company documentation to handle customer inquiries, onboard leads, and troubleshoot 24/7.',
    deliverables: ['Domain Knowledge Ingestion', 'Brand-Voice Alignment', 'Escalation to Human Logic', 'Web Embed Widget'],
    toolsAndTech: ['Gemini 2.5/3.0', 'Vector Embeddings', 'Express', 'Webhooks'],
    featured: true,
  },
  {
    id: 'rag-systems',
    name: 'Retrieval-Augmented Generation (RAG)',
    category: 'ai-automation',
    summary: 'Semantic search systems that query enterprise PDFs, databases, and codebases with zero hallucinations.',
    deliverables: ['Document Chunking Pipeline', 'Vector Database Indexing', 'Citations & Verification', 'Hybrid Search'],
    toolsAndTech: ['ChromaDB', 'Pinecone', 'LangChain', 'Python / TypeScript'],
    featured: true,
  },
  {
    id: 'ai-voice-agents',
    name: 'AI Voice Agents & Telephony',
    category: 'ai-automation',
    summary: 'Ultra-low latency conversational voice agents capable of inbound phone triage, booking appointments, and audio interaction.',
    deliverables: ['Real-Time Audio Pipelines', 'Sub-500ms Latency', 'Voice Synthesis Tuning', 'CRM Call Sync'],
    toolsAndTech: ['WebRTC', 'Gemini Live API', 'Whisper', 'Twilio'],
    featured: true,
  },
  {
    id: 'autonomous-ai-agents',
    name: 'Autonomous Task Agents',
    category: 'ai-automation',
    summary: 'Self-directed AI agents executing multi-step research, report generation, code review, and data collection.',
    deliverables: ['Goal-Driven Execution Loop', 'Tool Calling Integrations', 'Safety Guardrails', 'Execution Logs'],
    toolsAndTech: ['Function Calling', 'Agentic Workflows', 'Python', 'Node.js'],
  },
  {
    id: 'business-automation-workflows',
    name: 'Business Automation & Integration',
    category: 'ai-automation',
    summary: 'Connecting disparate SaaS tools, automating email triage, document parsing, and financial notifications.',
    deliverables: ['Custom Webhook Hubs', 'Zapier / Make / n8n Pipelines', 'Error Alerting', 'Data Transformation Scripts'],
    toolsAndTech: ['n8n', 'Zapier', 'Node.js Webhooks', 'REST APIs'],
  },
  {
    id: 'intelligent-business-assistants',
    name: 'Intelligent Internal Assistants',
    category: 'ai-automation',
    summary: 'Slack / Teams integrated assistants that query company metrics, draft client proposals, and summarize meetings.',
    deliverables: ['Bot Integration', 'Enterprise Security Compliance', 'Role-Based Prompts', 'Usage Analytics'],
    toolsAndTech: ['Slack Bolt SDK', 'Gemini Models', 'OAuth 2.0'],
  },
];
