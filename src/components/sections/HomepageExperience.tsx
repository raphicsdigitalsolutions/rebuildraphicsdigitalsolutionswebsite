import React, { useState } from 'react';
import {
  ArrowUpRight, Brush, Code2, Cpu, ChevronDown,
  Layers3, MoveUpRight, Package, Sparkles, Workflow, Globe2,
  MessageSquare, ShieldCheck, Zap
} from 'lucide-react';
import { useRouter } from '../../router/AgencyRouter';
import { BRAND_CONFIG } from '../../config/brand';
import { CREATIVE_SERVICES, DEVELOPMENT_SERVICES, AI_SERVICES } from '../../data/services';
import { getHomepageProjects, HOME_FAQS } from '../../data/homepage';
import type { PortfolioProject } from '../../data/portfolio';

const capabilityCards = [
  {
    number: '01',
    title: 'Creative studio',
    intro: 'Make your brand recognisable, consistent and ready for the shelf or the screen.',
    icon: Brush,
    path: '/creative',
    link: 'Explore creative services',
    accent: 'from-[#d51f16]/25',
    services: CREATIVE_SERVICES.flatMap((group) => group.items).slice(0, 7),
    tags: ['Brand identity', 'Packaging & labels', '3D product visuals', 'Print & social'],
  },
  {
    number: '02',
    title: 'Digital development',
    intro: 'Build useful websites, products and business systems around the way people work.',
    icon: Code2,
    path: '/development',
    link: 'Explore development',
    accent: 'from-white/10',
    services: DEVELOPMENT_SERVICES,
    tags: ['Websites & web apps', 'CRM & dashboards', 'Business software', 'E-commerce'],
  },
  {
    number: '03',
    title: 'AI & automation',
    intro: 'Connect knowledge, conversations and repetitive tasks to make daily work smarter.',
    icon: Cpu,
    path: '/ai-lab',
    link: 'Explore AI solutions',
    accent: 'from-[#d51f16]/20',
    services: AI_SERVICES,
    tags: ['AI chatbots & RAG', 'Voice agents', 'Custom AI agents', 'Workflow automation'],
  },
];

const processSteps = [
  { number: '01', title: 'Discover', text: 'Understand the business, audience, problem and constraints before choosing a direction.', icon: Globe2 },
  { number: '02', title: 'Plan', text: 'Define the creative direction, project scope, technical approach and delivery milestones.', icon: Layers3 },
  { number: '03', title: 'Create & build', text: 'Design, develop, review and refine the work with clear checkpoints along the way.', icon: Code2 },
  { number: '04', title: 'Launch & support', text: 'Prepare the handover, release the deliverables and agree what support comes next.', icon: Zap },
];

const reasons = [
  { title: 'One connected team', text: 'Creative, software and AI work can be planned together instead of passed between disconnected suppliers.', icon: Workflow },
  { title: 'Built around your brief', text: 'The solution starts with your audience, workflow, product and constraints — not a pre-filled template.', icon: ShieldCheck },
  { title: 'Design with purpose', text: 'Visual polish supports clarity, usability and the job each page, package or product needs to do.', icon: Sparkles },
  { title: 'Straightforward delivery', text: 'Scope, deliverables and project stages are discussed up front, with practical review points.', icon: MoveUpRight },
];

function ProjectVisual({ project }: { project: PortfolioProject }) {
  const isCreative = project.source === 'behance';
  const isVoice = project.id === 'nova-voice-agent';
  const isStore = project.id === 'rashid-traders-works';
  const isRag = project.id === 'customraggpt';

  if (isCreative) {
    return (
      <div className="portfolio-visual portfolio-visual--creative">
        <div className="portfolio-grid-lines" />
        <div className="packaging-art" aria-hidden="true">
          <div className="packaging-art__side" />
          <div className="packaging-art__front">
            <span className="packaging-art__brand">SELECTED DESIGN</span>
            <span className="packaging-art__title">{project.title}</span>
            <span className="packaging-art__rule" />
            <span className="packaging-art__category">{project.category}</span>
          </div>
          <div className="packaging-art__shadow" />
        </div>
        <span className="portfolio-visual__note">Conceptual packaging illustration · Source: Behance</span>
      </div>
    );
  }

  return (
    <div className={`portfolio-visual portfolio-visual--software ${isVoice ? 'portfolio-visual--voice' : ''}`}>
      <div className="software-preview">
        <div className="software-preview__top">
          <span /><span /><span />
          <small>RAPHICS / PROJECT STUDY</small>
        </div>
        <div className="software-preview__body">
          <div className="software-preview__nav">
            <b>{isStore ? 'RT' : isVoice ? 'VA' : isRag ? 'KS' : 'AI'}</b>
            <i /><i /><i /><i />
          </div>
          <div className="software-preview__main">
            <div className="software-preview__heading">{project.title}</div>
            <div className="software-preview__sub">{isVoice ? 'Voice interaction system' : isStore ? 'Business operations workspace' : isRag ? 'Document intelligence workspace' : 'AI assistant workspace'}</div>
            <div className="software-preview__stat-row"><span /><span /><span /></div>
            <div className="software-preview__panel"><i /><i /><i /></div>
            <div className="software-preview__line" /><div className="software-preview__line software-preview__line--short" />
          </div>
        </div>
      </div>
      <span className="portfolio-visual__note">Illustrative interface preview · Not a product screenshot</span>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: PortfolioProject; onOpen: (id: string) => void }) {
  const status = project.status === 'Development Project' ? 'In development'
    : project.status === 'Public Prototype' ? 'Public prototype'
      : project.status === 'Private Repository' ? 'Private project'
        : project.status === 'Public Repository' ? 'Public repository'
          : 'Published portfolio';

  return (
    <article className="portfolio-card group" data-reveal>
      <button type="button" onClick={() => onOpen(project.id)} className="block w-full text-left">
        <ProjectVisual project={project} />
        <div className="portfolio-card__body">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="portfolio-card__category">{project.category}</span>
            <span className="portfolio-card__status">{status}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3>{project.title}</h3>
              <p>{project.tagline}</p>
            </div>
            <span className="portfolio-card__arrow"><ArrowUpRight className="h-4 w-4" /></span>
          </div>
        </div>
      </button>
    </article>
  );
}

export const HomepageExperience: React.FC = () => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const projects = getHomepageProjects();

  return (
    <>
      <section className="home-proof-strip" aria-label="Raphics capabilities">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
          <span>CREATIVE THINKING</span><i />
          <span>DIGITAL ENGINEERING</span><i />
          <span>INTELLIGENT TECHNOLOGY</span><i />
          <span>ONE CONNECTED STUDIO</span>
        </div>
      </section>

      <section id="capabilities" className="home-section home-services">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="home-section__heading" data-reveal>
            <div>
              <span className="section-kicker"><b>01</b> / WHAT WE DO</span>
              <h2>One studio. <em>Three ways to move forward.</em></h2>
            </div>
            <p>From the way your brand looks to the systems behind your business, bring the important pieces together with one creative technology partner.</p>
          </div>
          <div className="capability-grid">
            {capabilityCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.number} className="capability-card" data-reveal>
                  <div className="capability-card__top">
                    <span>{card.number} / CAPABILITY</span>
                    <span className="capability-card__icon"><Icon className="h-5 w-5" /></span>
                  </div>
                  <div className={`capability-card__art bg-gradient-to-br ${card.accent} to-transparent`}>
                    {card.number === '01' && <div className="capability-object capability-object--pack"><Package /></div>}
                    {card.number === '02' && <div className="capability-object capability-object--screen"><Code2 /></div>}
                    {card.number === '03' && <div className="capability-object capability-object--ai"><Cpu /></div>}
                    <span className="capability-card__art-label">RAPHICS DIGITAL SOLUTIONS</span>
                  </div>
                  <div className="capability-card__content">
                    <h3>{card.title}</h3>
                    <p>{card.intro}</p>
                    <div className="capability-tags">{card.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <ul className="capability-service-list">
                      {card.services.slice(0, 3).map((service) => <li key={service.id}>{service.name}</li>)}
                    </ul>
                    <button onClick={() => navigate(card.path)} className="text-link">
                      {card.link}<ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="service-detail-band">
            <div><span className="section-kicker"><b>BUILT AROUND YOUR NEEDS</b></span><p>Brand identity, packaging, print, websites, web applications, CRM dashboards, custom software, AI assistants and automation.</p></div>
            <button onClick={() => navigate('/services')} className="text-link">View all services<ArrowUpRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      <section id="portfolio" className="home-section home-work">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="home-section__heading" data-reveal>
            <div>
              <span className="section-kicker"><b>02</b> / SELECTED WORK</span>
              <h2>Ideas, made <em>tangible.</em></h2>
            </div>
            <p>A selection of published creative work and software projects. Project status and source visibility are shown honestly.</p>
          </div>
          <div className="portfolio-grid">
            {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={(id) => navigate(`/portfolio/${id}`)} />)}
          </div>
          <div className="work-foot">
            <span>CREATIVE WORK VIA BEHANCE · PUBLIC CODE VIA GITHUB</span>
            <button onClick={() => navigate('/portfolio')} className="text-link">Explore all projects<ArrowUpRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      <section id="process" className="home-section home-process">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="home-section__heading" data-reveal>
            <div>
              <span className="section-kicker"><b>03</b> / HOW WE WORK</span>
              <h2>A clear route from <em>brief to delivery.</em></h2>
            </div>
            <p>Good work needs more than a strong first idea. It needs a clear plan, useful feedback and a considered handover.</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return <article key={step.number} className="process-card" data-reveal>
                <div className="process-card__top"><span>{step.number}</span><Icon className="h-5 w-5" /></div>
                <h3>{step.title}</h3><p>{step.text}</p>
                <div className="process-card__line" />
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="why-raphics" className="home-section home-why">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="why-layout">
            <div data-reveal>
              <span className="section-kicker"><b>04</b> / WHY RAPHICS</span>
              <h2>Different disciplines.<br /><em>One joined-up result.</em></h2>
              <p>Creative direction, product thinking and technology should support the same business goal. We bring them into one conversation from the start.</p>
              <button onClick={() => navigate('/about')} className="text-link">Meet the studio<ArrowUpRight className="h-4 w-4" /></button>
            </div>
            <div className="reasons-grid">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return <article key={reason.title} data-reveal>
                  <span className="reason-number">0{index + 1}</span><Icon className="h-5 w-5" />
                  <h3>{reason.title}</h3><p>{reason.text}</p>
                </article>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-trust">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="trust-card" data-reveal>
            <div>
              <span className="section-kicker"><b>05</b> / SEE THE WORK FOR YOURSELF</span>
              <h2>Real projects.<br /><em>Original sources.</em></h2>
              <p>Explore the creative archive and public code repositories. We link to the original platforms so you can inspect the published work and project status for yourself.</p>
            </div>
            <div className="trust-links">
              <a href={BRAND_CONFIG.profiles.behance.url} target="_blank" rel="noopener noreferrer"><span>CREATIVE PORTFOLIO</span><b>Behance</b><ArrowUpRight /></a>
              <a href={BRAND_CONFIG.profiles.github.url} target="_blank" rel="noopener noreferrer"><span>CODE & PROJECTS</span><b>GitHub</b><ArrowUpRight /></a>
              <a href={BRAND_CONFIG.profiles.upwork.url} target="_blank" rel="noopener noreferrer"><span>FOUNDER PROFILE</span><b>Upwork</b><ArrowUpRight /></a>
              <a href={BRAND_CONFIG.profiles.fiverr.url} target="_blank" rel="noopener noreferrer"><span>FOUNDER PROFILE</span><b>Fiverr</b><ArrowUpRight /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="home-section home-faq">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <div data-reveal>
            <span className="section-kicker"><b>06</b> / GOOD TO KNOW</span>
            <h2>Questions, <em>answered.</em></h2>
            <p>Not sure which service fits the brief? Start here, then tell us what you are trying to achieve.</p>
            <button onClick={() => navigate('/contact')} className="text-link">Ask us directly<ArrowUpRight className="h-4 w-4" /></button>
          </div>
          <div className="faq-list">
            {HOME_FAQS.map((item,index) => <article key={item.question} className={openFaq===index?'faq-item is-open':'faq-item'}>
              <button type="button" aria-expanded={openFaq===index} onClick={()=>setOpenFaq(openFaq===index?null:index)}>
                <span>{item.question}</span><ChevronDown className="h-4 w-4" />
              </button>
              {openFaq===index && <p>{item.answer}</p>}
            </article>)}
          </div>
        </div>
      </section>

      <section id="home-contact" className="home-contact">
        <div className="home-contact__orb" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="home-contact__inner" data-reveal>
            <span className="section-kicker"><b>07</b> / HAVE A PROJECT IN MIND?</span>
            <h2>Let's make something<br /><em>worth remembering.</em></h2>
            <p>Tell us what you want to design, build or improve. We’ll help shape the next step.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/contact')} className="button-primary">Start a project<ArrowUpRight className="h-4 w-4" /></button>
              <a href={BRAND_CONFIG.contact.whatsapp.whatsappUrl} target="_blank" rel="noopener noreferrer" className="button-secondary"><MessageSquare className="h-4 w-4" />WhatsApp message</a>
            </div>
            <div className="home-contact__email">{BRAND_CONFIG.contact.email} <span>·</span> {BRAND_CONFIG.contact.address}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomepageExperience;
