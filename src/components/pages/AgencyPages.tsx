import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Box, CheckCircle2,
  ChevronDown, Code2, Cpu, ExternalLink, Layers3,
  Mail, MapPin, MessageSquare, Package, Palette, Phone, Search,
  ShieldCheck, Sparkles, Workflow, Zap, Filter
} from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { CREATIVE_SERVICES, DEVELOPMENT_SERVICES, AI_SERVICES } from '../../data/services';
import type { ServiceCategoryGroup, ServiceItem } from '../../data/services';
import { PORTFOLIO_PROJECTS, type PortfolioProject } from '../../data/portfolio';
import { VERIFIED_REVIEW_PLATFORMS } from '../../data/reviews';
import { HOME_FAQS } from '../../data/homepage';
import { getProjectContentSections, getProjectSourceLabel, buildInquiryMailto } from '../../utils/site-content';
import { MinimalHeroVisual } from '../3d/MinimalHeroVisual';

type Navigate = (path: string) => void;

const ALL_GROUPS: ServiceCategoryGroup[] = [
  ...CREATIVE_SERVICES,
  {
    id: 'development',
    title: 'Digital Development',
    subtitle: 'Websites, software and business platforms',
    description: 'Digital products and operational tools built around real business workflows.',
    badge: 'DEVELOPMENT',
    iconName: 'Code2',
    items: DEVELOPMENT_SERVICES,
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Practical intelligence for daily work',
    description: 'Assistants, retrieval systems, agents and connected automations.',
    badge: 'AI & AUTOMATION',
    iconName: 'Cpu',
    items: AI_SERVICES,
  },
];

const ALL_SERVICES = ALL_GROUPS.flatMap((group) => group.items);
const FEATURED_PROJECTS = PORTFOLIO_PROJECTS.filter((project) => project.featured);
const CATEGORY_OPTIONS = ['All', 'Packaging Design', 'Label Design', 'Branding & Identity', 'AI & Machine Learning', 'Web & SaaS Platform', 'Voice & Agents', 'Interactive & Graphics', 'Mobile Applications'];

const pageCopy: Record<string, { kicker: string; title: string; accent: string; intro: string; tags: string[] }> = {
  '/services': {
    kicker: 'FULL-SERVICE CAPABILITIES',
    title: 'Everything your next move needs.',
    accent: 'One connected studio.',
    intro: 'From the first visual impression to the technology behind your operations, bring creative, digital and AI work together with Raphics Digital Solutions.',
    tags: ['Creative', 'Development', 'AI & Automation'],
  },
  '/creative': {
    kicker: 'CREATIVE STUDIO',
    title: 'Make your brand impossible to overlook.',
    accent: 'Built to be remembered.',
    intro: 'Brand identity, packaging, labels, 3D product visuals and print design developed with visual distinction and production detail in mind.',
    tags: ['Brand identity', 'Packaging & labels', '3D mockups', 'Print & digital'],
  },
  '/development': {
    kicker: 'DIGITAL DEVELOPMENT',
    title: 'Build digital experiences that work.',
    accent: 'Made around your workflow.',
    intro: 'Responsive websites, web applications, CRM dashboards and custom software designed around the people and processes using them.',
    tags: ['Websites', 'Web applications', 'CRM & dashboards', 'Business software'],
  },
  '/ai-lab': {
    kicker: 'AI & AUTOMATION LAB',
    title: 'Put intelligent systems to practical work.',
    accent: 'Make room for smarter work.',
    intro: 'AI assistants, document intelligence, voice agents and workflow automation—planned around useful outcomes, connected data and sensible safeguards.',
    tags: ['AI chatbots', 'RAG systems', 'Voice agents', 'Automation'],
  },
  '/about': {
    kicker: 'ABOUT RAPHICS',
    title: 'Creative thinking meets technical delivery.',
    accent: 'One joined-up approach.',
    intro: 'Raphics Digital Solutions brings creative design, digital engineering and emerging AI capabilities into one independent studio.',
    tags: ['Creative direction', 'Digital products', 'Intelligent workflows'],
  },
  '/portfolio': {
    kicker: 'SELECTED WORK',
    title: 'Ideas, explored and brought to life.',
    accent: 'A growing body of work.',
    intro: 'Explore selected packaging and visual design projects alongside software, AI prototypes and digital product experiments. Each listing shows its current source and development status.',
    tags: ['Creative work', 'Software', 'AI & experiments'],
  },
  '/reviews': {
    kicker: 'PROFILES & PROFESSIONAL PRESENCE',
    title: 'See the work at its original source.',
    accent: 'Open profiles. Real attribution.',
    intro: 'We do not manufacture client quotations, review scores or ratings. Visit the original profiles to see the feedback and published work currently displayed on each platform.',
    tags: ['Behance', 'GitHub', 'Fiverr', 'Upwork'],
  },
  '/contact': {
    kicker: 'START A PROJECT',
    title: 'Tell us what you want to make possible.',
    accent: 'Let’s start with the brief.',
    intro: 'Share the project, the outcome you need and any important constraints. We’ll have the context to discuss a useful next step.',
    tags: ['New projects', 'Partnerships', 'General enquiries'],
  },
};

const statusLabel = (project: PortfolioProject) => {
  if (project.sourceVisibility === 'private') return project.status === 'Development Project' ? 'In development · private' : 'Private repository';
  if (project.status === 'Public Prototype') return 'Public prototype';
  if (project.status === 'Public Repository') return 'Public repository';
  if (project.status === 'Experimental Project') return 'Experimental';
  return project.status;
};

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="agency-kicker"><i />{children}</div>;
}

function SectionHeading({ index, kicker, title, body }: { index: string; kicker: string; title: React.ReactNode; body?: string }) {
  return (
    <div className="agency-section-heading" data-reveal>
      <div>
        <Kicker>{index} / {kicker}</Kicker>
        <h2>{title}</h2>
      </div>
      {body && <p>{body}</p>}
    </div>
  );
}

function PageHero({ path, navigate, home = false }: { path: string; navigate: Navigate; home?: boolean }) {
  const copy = pageCopy[path] ?? pageCopy['/services'];
  return (
    <section className={home ? 'agency-hero agency-hero--home' : 'agency-hero agency-hero--page'}>
      <div className="agency-hero__glow" />
      <div className="agency-hero__grid" />
      <div className="agency-wrap agency-hero__inner">
        <div className="agency-hero__copy" data-reveal>
          <Kicker>{home ? 'CREATIVE STUDIO · DIGITAL DEVELOPMENT · AI' : copy.kicker}</Kicker>
          <h1>
            {home ? <>Ideas deserve<br /><span>more than</span><br /><em>ordinary.</em></> : <>{copy.title}<br /><em>{copy.accent}</em></>}
          </h1>
          <p>{home ? BRAND_CONFIG.heroDescription : copy.intro}</p>
          <div className="agency-hero__actions">
            <button className="agency-button agency-button--primary" onClick={() => navigate('/contact')}>Start a project <ArrowUpRight /></button>
            <button className="agency-button agency-button--quiet" onClick={() => navigate('/portfolio')}>Explore our work <ArrowRight /></button>
          </div>
          <div className="agency-hero__tags">{(home ? ['Design', 'Build', 'Automate'] : copy.tags).map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="agency-hero__visual" aria-label="Abstract 3D red brand sculpture">
          {home ? <MinimalHeroVisual /> : <div className="agency-hero-sculpture"><div className="agency-hero-sculpture__core" /><div className="agency-hero-sculpture__ring agency-hero-sculpture__ring--one" /><div className="agency-hero-sculpture__ring agency-hero-sculpture__ring--two" /><div className="agency-hero-sculpture__dot" /></div>}
          <div className="agency-hero__visual-label">RDS / DESIGN · DEVELOPMENT · INTELLIGENCE</div>
        </div>
      </div>
      <div className="agency-wrap agency-hero__bottom"><span>RAPHICS DIGITAL SOLUTIONS</span><span>DIGITAL MAGIC FOR REAL SUCCESS.</span><span>INDEPENDENT CREATIVE TECHNOLOGY STUDIO</span></div>
    </section>
  );
}

function CapabilityCard({ group, number, navigate }: { group: ServiceCategoryGroup; number: string; navigate: Navigate }) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    branding: Palette, packaging: Package, print: Layers3, 'digital-design': Brush, development: Code2, 'ai-automation': Cpu,
  };
  const Icon = iconMap[group.id] ?? Sparkles;
  return (
    <article className="agency-capability-card" data-reveal>
      <div className="agency-capability-card__top"><span>{number} / {group.badge}</span><Icon /></div>
      <div className={'agency-capability-card__visual agency-capability-card__visual--' + group.id}>
        <div className="agency-capability-card__object"><Icon /></div>
        <div className="agency-capability-card__orbit" />
        <span>RAPHICS / STUDIO SERIES</span>
      </div>
      <div className="agency-capability-card__body">
        <h3>{group.title}</h3>
        <p>{group.description}</p>
        <div className="agency-chip-row">{group.items.slice(0, 4).map((service) => <span key={service.id}>{service.name}</span>)}</div>
        <button className="agency-text-link" onClick={() => navigate(group.id === 'development' ? '/development' : group.id === 'ai-automation' ? '/ai-lab' : '/creative')}>Explore capability <ArrowUpRight /></button>
      </div>
    </article>
  );
}

function ServiceCard({ service, navigate }: { service: ServiceItem; navigate: Navigate }) {
  return (
    <button key={service.id} className="agency-service-card" onClick={() => navigate('/services/' + service.id)} data-reveal>
      <span className="agency-service-card__number">{String(ALL_SERVICES.findIndex((item) => item.id === service.id) + 1).padStart(2, '0')}</span>
      <div className="agency-service-card__content">
        <h3>{service.name}</h3><p>{service.summary}</p>
        {service.toolsAndTech && <div className="agency-tech-tags">{service.toolsAndTech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>}
      </div>
      <span className="agency-round-arrow"><ArrowUpRight /></span>
    </button>
  );
}

function ProjectVisual({ project }: { project: PortfolioProject }) {
  const code = project.source === 'github';
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Box, Sparkles, Package, Cpu, Code2, Layers3, Workflow, Zap, ShieldCheck, Database, MessageSquare, Mic, Gamepad2, DollarSign, Briefcase, Compass, Award,
  };
  const Icon = iconMap[project.visualTheme.icon] ?? (code ? Code2 : Package);
  return (
    <div className="agency-project-visual" style={{ '--project-accent': project.visualTheme.primaryColor } as React.CSSProperties}>
      <div className="agency-project-visual__mesh" />
      {code ? (
        <div className="agency-code-window">
          <div className="agency-code-window__bar"><i /><i /><i /><span>RAPHICS / PROJECT PREVIEW</span></div>
          <div className="agency-code-window__body"><aside><b>{project.title.slice(0, 2).toUpperCase()}</b><i /><i /><i /><i /></aside><div className="agency-code-window__content"><small>{project.category}</small><h4>{project.title}</h4><p>{project.tagline}</p><div className="agency-code-bars"><i /><i /><i /></div><div className="agency-code-bars agency-code-bars--wide"><i /><i /><i /><i /></div></div></div>
        </div>
      ) : (
        <div className="agency-product-render"><div className="agency-product-render__side" /><div className="agency-product-render__front"><small>SELECTED CREATIVE WORK</small><Icon /><b>{project.title}</b><span>{project.category}</span></div><div className="agency-product-render__shadow" /></div>
      )}
      <span className="agency-project-visual__note">{code ? 'Illustrative interface preview' : 'Conceptual project artwork'}</span>
    </div>
  );
}

function ProjectCard({ project, navigate }: { project: PortfolioProject; navigate: Navigate }) {
  return (
    <article className="agency-project-card" data-reveal>
      <button className="agency-project-card__click" onClick={() => navigate('/portfolio/' + project.id)} aria-label={'View ' + project.title}>
        <ProjectVisual project={project} />
        <div className="agency-project-card__body">
          <div className="agency-project-card__meta"><span>{project.category}</span><span>{statusLabel(project)}</span></div>
          <div className="agency-project-card__title"><div><h3>{project.title}</h3><p>{project.tagline}</p></div><span className="agency-round-arrow"><ArrowUpRight /></span></div>
        </div>
      </button>
    </article>
  );
}

function ProcessSection() {
  const steps = [
    ['01', 'Discover', 'Understand the business, audience, goals and constraints before choosing a direction.'],
    ['02', 'Plan', 'Agree the creative route, project scope, technical approach and delivery milestones.'],
    ['03', 'Create & build', 'Design, develop, test and refine the work through clear review points.'],
    ['04', 'Launch & support', 'Prepare final files, deploy the product and hand over the working solution.'],
  ];
  return <section className="agency-section agency-section--process"><div className="agency-wrap"><SectionHeading index="03" kicker="HOW WE WORK" title={<>From the first brief <em>to the finished thing.</em></>} body="A clear process keeps the work focused, feedback useful and delivery predictable."/><div className="agency-process-grid">{steps.map(([number,title,text]) => <article className="agency-process-card" key={number} data-reveal><span>{number}</span><div className="agency-process-card__line" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function WhySection({ navigate }: { navigate: Navigate }) {
  const items = [
    ['One connected team', 'Creative design, software development and AI can be planned around the same business goal.'],
    ['Built around your brief', 'The work starts with your audience, product, workflow and constraints—not a generic template.'],
    ['Thoughtful execution', 'Visual decisions support clarity, usability, production needs and the real job to be done.'],
    ['Transparent project status', 'Published, prototype, private and in-development work are labelled honestly.'],
  ];
  return <section className="agency-section agency-section--why"><div className="agency-wrap agency-why-layout"><div data-reveal><Kicker>04 / WHY RAPHICS</Kicker><h2>Different disciplines.<br /><em>One joined-up result.</em></h2><p>Bring the look, the digital experience and the systems behind your business into one conversation from the start.</p><button className="agency-text-link" onClick={() => navigate('/about')}>Meet the studio <ArrowUpRight /></button></div><div className="agency-why-grid">{items.map(([title,text],index)=><article key={title} data-reveal><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function TrustBand({ navigate }: { navigate: Navigate }) {
  const profiles = [
    { name: 'Behance', detail: 'Creative portfolio', url: BRAND_CONFIG.profiles.behance.url },
    { name: 'GitHub', detail: 'Public code & projects', url: BRAND_CONFIG.profiles.github.url },
    { name: 'LinkedIn', detail: 'Company profile', url: BRAND_CONFIG.profiles.linkedin.url },
    { name: 'Instagram', detail: 'Agency social presence', url: BRAND_CONFIG.profiles.instagram.url },
  ];
  return <section className="agency-section agency-section--trust"><div className="agency-wrap agency-trust-card"><div><Kicker>05 / ORIGINAL SOURCES</Kicker><h2>See the work <em>for yourself.</em></h2><p>Visit our original creative and professional profiles to explore published work, public repositories and current agency updates.</p><button className="agency-text-link" onClick={() => navigate('/reviews')}>All professional profiles <ArrowUpRight /></button></div><div className="agency-profile-grid">{profiles.map((profile)=><a href={profile.url} target="_blank" rel="noopener noreferrer" key={profile.name}><span>{profile.detail}</span><b>{profile.name}</b><ArrowUpRight /></a>)}</div></div></section>;
}

function FaqSection() {
  const [opened,setOpened]=useState<number|null>(0);
  return <section className="agency-section agency-section--faq"><div className="agency-wrap agency-faq-layout"><div><Kicker>06 / GOOD TO KNOW</Kicker><h2>Questions, <em>answered.</em></h2><p>Need help deciding where to begin? These answers cover the usual first questions.</p></div><div className="agency-faq-list">{HOME_FAQS.map((faq,index)=><article key={faq.question} className={opened===index?'is-open':''}><button onClick={()=>setOpened(opened===index?null:index)} aria-expanded={opened===index}>{faq.question}<ChevronDown /></button>{opened===index&&<p>{faq.answer}</p>}</article>)}</div></div></section>;
}

function ContactStrip({ navigate }: { navigate: Navigate }) {
  return <section className="agency-contact-strip"><div className="agency-contact-strip__orb" /><div className="agency-wrap" data-reveal><Kicker>HAVE A PROJECT IN MIND?</Kicker><h2>Let's make something <em>worth remembering.</em></h2><p>Tell us what you want to design, build or improve. We’ll help shape the next step.</p><div className="agency-hero__actions"><button className="agency-button agency-button--primary" onClick={()=>navigate('/contact')}>Start a project <ArrowUpRight /></button><a className="agency-button agency-button--quiet" href={BRAND_CONFIG.contact.whatsapp.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageSquare /> WhatsApp message</a></div><span className="agency-contact-strip__email">{BRAND_CONFIG.contact.email} · {BRAND_CONFIG.contact.address}</span></div></section>;
}

function HomePage({ navigate }: { navigate: Navigate }) {
  return <>
    <PageHero path="/" navigate={navigate} home />
    <section className="agency-proof-strip"><div className="agency-wrap"><span>CREATIVE THINKING</span><i /><span>DIGITAL ENGINEERING</span><i /><span>INTELLIGENT TECHNOLOGY</span><i /><span>ONE CONNECTED STUDIO</span></div></section>
    <section className="agency-section"><div className="agency-wrap"><SectionHeading index="01" kicker="WHAT WE BRING TOGETHER" title={<>One studio. <em>Three ways to move forward.</em></>} body="From a distinctive first impression to the systems that keep a business moving, connect your important work with one creative technology partner."/><div className="agency-capability-grid">{[
        { id: 'creative-studio', title: 'Creative Studio', subtitle: 'Brand, packaging and visuals', description: 'Distinctive identities, product packaging, label systems, 3D product visuals and print collateral for brands that need to stand apart.', badge: 'CREATIVE', iconName: 'Palette', items: CREATIVE_SERVICES.flatMap((group)=>group.items) },
        { id: 'development', title: 'Digital Development', subtitle: 'Websites, software and platforms', description: 'Responsive websites, web applications, CRM dashboards, custom business software and e-commerce experiences.', badge: 'DEVELOPMENT', iconName: 'Code2', items: DEVELOPMENT_SERVICES },
        { id: 'ai-automation', title: 'AI & Automation', subtitle: 'Assistants, agents and workflows', description: 'Knowledge-based chatbots, RAG systems, voice-agent experiences and business automation built around practical use cases.', badge: 'AI & AUTOMATION', iconName: 'Cpu', items: AI_SERVICES },
      ].map((group,index)=><CapabilityCard key={group.id} group={group} number={'0'+(index+1)} navigate={navigate}/>)}</div><div className="agency-all-services"><div><Kicker>FULL SERVICE CAPABILITIES</Kicker><p>Brand identity, packaging, labels, print, web design, custom software, CRM dashboards, AI assistants and business automation.</p></div><button className="agency-text-link" onClick={()=>navigate('/services')}>View all services <ArrowUpRight /></button></div></div></section>
    <section className="agency-section agency-section--services"><div className="agency-wrap"><SectionHeading index="02" kicker="SELECTED SERVICES" title={<>What we can <em>help you make.</em></>} body="A practical overview of our most requested creative and technical services."/><div className="agency-service-grid">{[...CREATIVE_SERVICES.flatMap((g)=>g.items).slice(0,4),...DEVELOPMENT_SERVICES.slice(0,2),...AI_SERVICES.slice(0,2)].map((service)=><ServiceCard key={service.id} service={service} navigate={navigate}/>)}</div></div></section>
    <section className="agency-section agency-section--portfolio"><div className="agency-wrap"><SectionHeading index="03" kicker="SELECTED WORK" title={<>Ideas, <em>made tangible.</em></>} body="Explore real project records, creative portfolio work and software experiments. Preview artwork is clearly labelled where source screenshots are not available."/><div className="agency-project-grid">{FEATURED_PROJECTS.slice(0,8).map((project)=><ProjectCard key={project.id} project={project} navigate={navigate}/>)}</div><div className="agency-section-end"><span>CREATIVE WORK VIA BEHANCE · PUBLIC CODE VIA GITHUB</span><button className="agency-text-link" onClick={()=>navigate('/portfolio')}>Explore all projects <ArrowUpRight /></button></div></div></section>
    <ProcessSection /><WhySection navigate={navigate}/><TrustBand navigate={navigate}/><FaqSection/><ContactStrip navigate={navigate}/>
  </>;
}

function ServicesPage({ path, navigate }: { path: string; navigate: Navigate }) {
  const group = path === '/creative' ? CREATIVE_SERVICES : path === '/development' ? [{ id:'development',title:'Digital Development',subtitle:'Websites, software and business platforms',description:'Digital products engineered around your workflows.',badge:'DEVELOPMENT',iconName:'Code2',items:DEVELOPMENT_SERVICES }] : path === '/ai-lab' ? [{ id:'ai-automation',title:'AI & Automation',subtitle:'Practical intelligence for daily work',description:'AI assistants, retrieval systems, agents and connected automations.',badge:'AI & AUTOMATION',iconName:'Cpu',items:AI_SERVICES }] : ALL_GROUPS;
  const relatedProjects = path === '/creative'
    ? PORTFOLIO_PROJECTS.filter((project) => project.source === 'behance')
    : path === '/development'
      ? PORTFOLIO_PROJECTS.filter((project) => project.category === 'Web & SaaS Platform' || project.category === 'Mobile Applications')
      : path === '/ai-lab'
        ? PORTFOLIO_PROJECTS.filter((project) => project.category === 'AI & Machine Learning' || project.category === 'Voice & Agents')
        : FEATURED_PROJECTS;
  return <>
    <PageHero path={path} navigate={navigate}/>
    <section className="agency-section"><div className="agency-wrap"><SectionHeading index="01" kicker="CAPABILITY OVERVIEW" title={<>The work behind <em>the outcome.</em></>} body="Explore each service, the practical deliverables and the tools that may support the work."/>
      {group.map((category,index)=><div className="agency-service-category" key={category.id}><div className="agency-service-category__head"><span>0{index+1} / {category.badge}</span><div><h2>{category.title}</h2><p>{category.description}</p></div></div><div className="agency-service-grid">{category.items.map((service)=><ServiceCard key={service.id} service={service} navigate={navigate}/>)}</div></div>)}
      <div className="agency-service-note"><ShieldCheck/><div><b>Scope is confirmed before work begins.</b><p>Deliverables, technical choices, production requirements and timelines are agreed against the specific project brief.</p></div></div>
    </div></section>
    <section className="agency-section agency-section--portfolio"><div className="agency-wrap"><SectionHeading index="02" kicker="RELATED WORK" title={<>See how the capability <em>takes shape.</em></>} body="Browse related entries from the creative archive and software portfolio. Availability and source status are labelled on every project."/><div className="agency-project-grid">{relatedProjects.slice(0,6).map((project)=><ProjectCard key={project.id} project={project} navigate={navigate}/>)}</div></div></section>
    <ProcessSection/><ContactStrip navigate={navigate}/>
  </>;
}

function PortfolioPage({ navigate }: { navigate: Navigate }) {
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  const [source,setSource]=useState('All');
  const filtered=useMemo(()=>PORTFOLIO_PROJECTS.filter((p)=>{
    const q=query.trim().toLowerCase();
    const matchesQuery=!q||[p.title,p.tagline,p.category,p.overview,...p.techStack].join(' ').toLowerCase().includes(q);
    const matchesCategory=category==='All'||p.category===category;
    const matchesSource=source==='All'||p.source===source;
    return matchesQuery&&matchesCategory&&matchesSource;
  }),[query,category,source]);
  return <>
    <PageHero path="/portfolio" navigate={navigate}/>
    <section className="agency-section"><div className="agency-wrap"><SectionHeading index="01" kicker="PROJECT ARCHIVE" title={<>Selected work and <em>experiments.</em></>} body="Search and filter the archive by discipline. Each project page includes status, source links and available project details."/>
      <div className="agency-portfolio-toolbar"><label><Search/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search projects, technologies or categories"/></label><label><Filter/><select value={source} onChange={(e)=>setSource(e.target.value)}><option>All</option><option value="behance">Creative</option><option value="github">Software & AI</option></select></label><label><Layers3/><select value={category} onChange={(e)=>setCategory(e.target.value)}>{CATEGORY_OPTIONS.map((item)=><option key={item}>{item}</option>)}</select></label></div>
      <div className="agency-portfolio-count"><span>{filtered.length} PROJECTS</span><span>FILTERED FROM {PORTFOLIO_PROJECTS.length} LISTINGS</span></div>
      {filtered.length>0?<div className="agency-project-grid">{filtered.map((project)=><ProjectCard key={project.id} project={project} navigate={navigate}/>)}</div>:<div className="agency-empty-state"><Search/><h3>No matching projects</h3><p>Try another keyword or reset the filters.</p><button className="agency-button agency-button--primary" onClick={()=>{setQuery('');setCategory('All');setSource('All')}}>Reset filters</button></div>}
    </div></section><ContactStrip navigate={navigate}/>
  </>;
}

function AboutPage({ navigate }: { navigate: Navigate }) {
  const pillars=[['Creative direction','Brand identity, packaging and visual systems designed to make products and businesses recognisable.'],['Digital engineering','Websites, web apps and custom business tools structured around real user and team workflows.'],['Intelligent technology','AI assistants, knowledge retrieval and automation planned with practical safeguards and clear boundaries.']];
  return <>
    <PageHero path="/about" navigate={navigate}/>
    <section className="agency-section"><div className="agency-wrap"><SectionHeading index="01" kicker="THE STUDIO" title={<>Design thinking. <em>Technical curiosity.</em></>} body="Raphics Digital Solutions is an independent creative and technology studio connecting visual craft with practical digital delivery."/><div className="agency-about-intro"><p>We work across creative design, packaging, web development, custom software and AI solutions. The aim is to make each part of a business experience feel connected—from the brand a customer first sees to the systems a team uses every day.</p><p>Our work is shaped around the project brief, the people using the result and the requirements that matter in production. That includes print dimensions and supplied regulatory copy for packaging, or data structure and integration needs for digital products.</p></div><div className="agency-about-pillars">{pillars.map(([title,text],index)=><article key={title} data-reveal><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="agency-section agency-section--dark"><div className="agency-wrap"><SectionHeading index="02" kicker="OUR APPROACH" title={<>One partner across <em>the whole picture.</em></>} body="Instead of treating design, software and automation as unrelated tasks, we bring them into one project conversation."/><ProcessSection/></div></section>
    <TrustBand navigate={navigate}/><ContactStrip navigate={navigate}/>
  </>;
}

function ReviewsPage({ navigate }: { navigate: Navigate }) {
  return <>
    <PageHero path="/reviews" navigate={navigate}/>
    <section className="agency-section"><div className="agency-wrap"><SectionHeading index="01" kicker="ORIGINAL PROFILES" title={<>Review the work <em>at its source.</em></>} body="Open each professional profile to view the projects, client feedback and platform information currently published there. The site does not create its own ratings or testimonials."/><div className="agency-review-grid">{VERIFIED_REVIEW_PLATFORMS.map((platform,index)=><a key={platform.platform} href={platform.profileUrl} target="_blank" rel="noopener noreferrer" className="agency-review-card" data-reveal><span>0{index+1} / {platform.platform.toUpperCase()}</span><h3>{platform.title}</h3><p>{platform.scope}</p><small>{platform.verificationNote}</small><b>Open original profile <ArrowUpRight/></b></a>)}</div><div className="agency-service-note"><ShieldCheck/><div><b>Review integrity matters.</b><p>Only individually verified client reviews are displayed as testimonials. No client names, ratings or quotations have been invented for this page.</p></div></div></div></section><TrustBand navigate={navigate}/><ContactStrip navigate={navigate}/>
  </>;
}

function ContactPage({ navigate }: { navigate: Navigate }) {
  const [form,setForm]=useState({name:'',email:'',company:'',service:'Brand identity & packaging',budget:'',description:'',preferred:'Email'});
  const [error,setError]=useState('');
  const [prepared,setPrepared]=useState(false);
  const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();setError('');setPrepared(false);
    if(form.name.trim().length<2){setError('Please enter your name.');return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())){setError('Please enter a valid email address.');return;}
    if(form.description.trim().length<15){setError('Please add a little more detail about the project (at least 15 characters).');return;}
    const url=buildInquiryMailto({fullName:form.name,email:form.email,company:form.company,service:form.service,budget:form.budget,description:form.description,preferredContact:form.preferred},BRAND_CONFIG.contact.email);
    window.location.href=url;setPrepared(true);
  };
  return <>
    <PageHero path="/contact" navigate={navigate}/>
    <section className="agency-section"><div className="agency-wrap"><SectionHeading index="01" kicker="CONTACT & PROJECT INQUIRIES" title={<>Let's talk about <em>what comes next.</em></>} body="Use the project brief to give us context, or contact the studio directly through the channels below."/><div className="agency-contact-layout"><div className="agency-contact-details">
      <a href={'mailto:'+BRAND_CONFIG.contact.email}><Mail/><span><small>EMAIL</small><b>{BRAND_CONFIG.contact.email}</b></span><ArrowUpRight/></a>
      <a href={BRAND_CONFIG.contact.whatsapp.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageSquare/><span><small>UK WHATSAPP · MESSAGES ONLY</small><b>{BRAND_CONFIG.contact.whatsapp.display}</b></span><ArrowUpRight/></a>
      <a href={BRAND_CONFIG.contact.localPhone.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageSquare/><span><small>PAKISTAN WHATSAPP</small><b>{BRAND_CONFIG.contact.localPhone.display}</b></span><ArrowUpRight/></a>
      <a href={BRAND_CONFIG.contact.localPhone.telUrl}><Phone/><span><small>PAKISTAN CALLS</small><b>{BRAND_CONFIG.contact.localPhone.display}</b></span><ArrowUpRight/></a>
      <div className="agency-contact-address"><MapPin/><span><small>BUSINESS LOCATION</small><b>{BRAND_CONFIG.contact.address}</b></span></div>
      <div className="agency-contact-response"><ShieldCheck/><div><b>What happens next?</b><p>Your brief opens as a prepared email. Review it, attach any relevant files and send it using your email app.</p></div></div>
    </div><form className="agency-contact-form" onSubmit={handleSubmit}>
      <div className="agency-form-heading"><Kicker>PROJECT BRIEF</Kicker><h3>Tell us a little about it.</h3><p>Required fields are marked with an asterisk.</p></div>
      <div className="agency-form-grid"><label>Full name *<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>Business email *<input required type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@company.com"/></label><label>Company / brand<input value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} placeholder="Optional"/></label><label>Service required<select value={form.service} onChange={(e)=>setForm({...form,service:e.target.value})}><option>Brand identity & packaging</option><option>Graphic & print design</option><option>Website design & development</option><option>Web application / custom software</option><option>CRM / business dashboard</option><option>AI chatbot / RAG</option><option>AI voice agent / automation</option><option>Other / not sure yet</option></select></label><label>Estimated budget<select value={form.budget} onChange={(e)=>setForm({...form,budget:e.target.value})}><option value="">Not specified</option><option>Under £500</option><option>£500–£1,000</option><option>£1,000–£2,500</option><option>£2,500–£5,000</option><option>£5,000+</option><option>Discuss first</option></select></label><label>Preferred contact<select value={form.preferred} onChange={(e)=>setForm({...form,preferred:e.target.value})}><option>Email</option><option>UK WhatsApp</option><option>Pakistan WhatsApp / Call</option></select></label><label className="agency-form-grid__full">Project details *<textarea required minLength={15} rows={6} value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="What are you looking to create, improve or solve? Add any important requirements or deadlines."/></label></div>
      {error&&<p className="agency-form-error" role="alert">{error}</p>}
      {prepared&&<p className="agency-form-success" role="status">Your email draft should now be open. Please review it, add attachments if needed, and press Send in your email application.</p>}
      <button className="agency-button agency-button--primary agency-form-submit" type="submit">Prepare project email <ArrowUpRight/></button>
      <p className="agency-form-note">This static website prepares an email draft. It does not silently upload or store your information.</p>
    </form></div></div></section>
  </>;
}

function ServiceDetail({ id, navigate }: { id?: string; navigate: Navigate }) {
  const service=ALL_SERVICES.find((item)=>item.id===id);
  if(!service)return <NotFound navigate={navigate}/>;
  return <><section className="agency-detail-hero"><div className="agency-wrap"><button className="agency-back-link" onClick={()=>navigate('/services')}><ArrowLeft/> All services</button><Kicker>SERVICE / {service.category.toUpperCase()}</Kicker><h1>{service.name}</h1><p>{service.summary}</p><div className="agency-hero__actions"><button className="agency-button agency-button--primary" onClick={()=>navigate('/contact')}>Discuss this service <ArrowUpRight/></button><button className="agency-button agency-button--quiet" onClick={()=>navigate('/portfolio')}>Explore related work <ArrowRight/></button></div></div></section><section className="agency-section"><div className="agency-wrap agency-detail-grid"><div><SectionHeading index="01" kicker="DELIVERABLES" title={<>What the work <em>can include.</em></>}/><div className="agency-deliverable-list">{service.deliverables.map((item)=><div key={item}><CheckCircle2/>{item}</div>)}</div></div><div className="agency-detail-aside"><Kicker>TOOLS & TECHNOLOGY</Kicker><h3>Selected to fit the brief.</h3><p>Technology and production choices are confirmed after the requirements are understood. The list below represents tools that may be relevant to this service.</p><div className="agency-chip-row">{service.toolsAndTech?.map((tool)=><span key={tool}>{tool}</span>)}</div></div></div></section><ContactStrip navigate={navigate}/></>;
}

function ProjectDetail({ id, navigate }: { id?: string; navigate: Navigate }) {
  const project=PORTFOLIO_PROJECTS.find((item)=>item.id===id);
  if(!project)return <NotFound navigate={navigate}/>;
  const sections=getProjectContentSections(project);
  const canOpen=Boolean(project.externalUrl.trim())&&project.sourceVisibility!=='private';
  return <>
    <section className="agency-detail-hero agency-detail-hero--project"><div className="agency-wrap"><button className="agency-back-link" onClick={()=>navigate('/portfolio')}><ArrowLeft/> Selected work</button><div className="agency-detail-project-meta"><span>{project.category}</span><span>{statusLabel(project)}</span></div><h1>{project.title}</h1><p>{project.tagline}</p><div className="agency-hero__actions">{canOpen&&<a className="agency-button agency-button--primary" href={project.externalUrl} target="_blank" rel="noopener noreferrer">{getProjectSourceLabel(project)} <ExternalLink/></a>}{project.liveDemoUrl&&<a className="agency-button agency-button--quiet" href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">View live demo <ArrowUpRight/></a>}<button className="agency-button agency-button--quiet" onClick={()=>navigate('/contact')}>Discuss a similar project <ArrowRight/></button></div></div></section>
    <section className="agency-section"><div className="agency-wrap agency-project-detail-layout"><div className="agency-project-detail-main">
      {sections.overview&&<article className="agency-detail-panel"><Kicker>01 / PROJECT OVERVIEW</Kicker><p>{sections.overview}</p></article>}
      {sections.challenge&&<article className="agency-detail-panel"><Kicker>02 / CHALLENGE</Kicker><p>{sections.challenge}</p></article>}
      {sections.solution&&<article className="agency-detail-panel"><Kicker>03 / APPROACH</Kicker><p>{sections.solution}</p></article>}
      {sections.features.length>0&&<article className="agency-detail-panel"><Kicker>KEY FEATURES / DELIVERABLES</Kicker><div className="agency-deliverable-list">{sections.features.map((item)=><div key={item}><CheckCircle2/>{item}</div>)}</div></article>}
      {sections.developmentNotes&&<article className="agency-detail-panel agency-detail-panel--note"><Kicker>PROJECT NOTES & STATUS</Kicker><p>{sections.developmentNotes}</p></article>}
    </div><aside className="agency-project-detail-aside"><div><Kicker>PROJECT STATUS</Kicker><b>{statusLabel(project)}</b><p>{project.sourceVisibility==='private'?'This project is not available as a public source repository. Contact Raphics to discuss similar work.':'Open the original source for published details and current project information.'}</p></div>{sections.technologies.length>0&&<div><Kicker>TOOLS & TECHNOLOGY</Kicker><div className="agency-chip-row">{sections.technologies.map((item)=><span key={item}>{item}</span>)}</div></div>}<div><Kicker>SOURCE</Kicker><b>{project.source==='behance'?'Behance creative portfolio':'GitHub project'}</b>{canOpen?<a href={project.externalUrl} target="_blank" rel="noopener noreferrer">Open original source <ArrowUpRight/></a>:<span>Private or in-development source</span>}</div></aside></div></section><ContactStrip navigate={navigate}/>
  </>;
}

function NotFound({ navigate }: { navigate: Navigate }) {
  return <section className="agency-detail-hero"><div className="agency-wrap"><Kicker>PAGE NOT FOUND</Kicker><h1>This page isn't in the studio archive.</h1><p>Use the main site navigation to find services, projects or contact details.</p><button className="agency-button agency-button--primary" onClick={()=>navigate('/')}>Return home <ArrowUpRight/></button></div></section>;
}

export function AgencyPages({ path, projectId, serviceId, navigate }: { path: string; projectId?: string; serviceId?: string; navigate: Navigate }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('agency-motion-on');
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return () => root.classList.remove('agency-motion-on');
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove('agency-motion-on');
    };
  }, [path, projectId, serviceId]);

  if(path==='/')return <HomePage navigate={navigate}/>;
  if(path==='/services/:id')return <ServiceDetail id={serviceId} navigate={navigate}/>;
  if(path==='/portfolio/:id')return <ProjectDetail id={projectId} navigate={navigate}/>;
  if(path==='/contact')return <ContactPage navigate={navigate}/>;
  if(path==='/about')return <AboutPage navigate={navigate}/>;
  if(path==='/reviews')return <ReviewsPage navigate={navigate}/>;
  if(path==='/portfolio')return <PortfolioPage navigate={navigate}/>;
  if(['/services','/creative','/development','/ai-lab'].includes(path))return <ServicesPage path={path} navigate={navigate}/>;
  return <NotFound navigate={navigate}/>;
}

export default AgencyPages;
