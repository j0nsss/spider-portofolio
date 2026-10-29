import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    name: 'Nexus Protocol',
    type: 'Realtime Platform',
    year: '2026',
    description: 'A realtime collaboration platform designed for fast communication, resilient state updates, and smooth multi-user workflows.',
    impact: 'Realtime messaging, presence, and scalable interface architecture.',
    tech: ['React', 'WebSockets', 'Node.js', 'Tailwind'],
    image: imgSpiderman,
    link: '#contact',
    featured: true,
  },
  {
    id: '02',
    name: 'Aether Commerce',
    type: 'Digital Storefront',
    year: '2025',
    description: 'A conversion-focused storefront with clean product browsing, secure checkout flow, and polished motion design.',
    impact: 'Performance-first shopping experience with clean UI patterns.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'GSAP'],
    image: imgMan,
    link: '#contact',
  },
  {
    id: '03',
    name: 'Aegis Dashboard',
    type: 'Analytics System',
    year: '2025',
    description: 'A dense operational dashboard for monitoring data, surfacing critical metrics, and helping teams make faster decisions.',
    impact: 'Structured data views, chart-ready layouts, and reliable workflows.',
    tech: ['React', 'Python', 'GraphQL', 'AWS'],
    image: imgSpiderman,
    link: '#contact',
  },
  {
    id: '04',
    name: 'Orbit Mobile',
    type: 'Mobile App',
    year: '2024',
    description: 'A cross-platform mobile experience with clear navigation, responsive layouts, and production-minded component structure.',
    impact: 'Reusable mobile UI system with consistent user flows.',
    tech: ['Flutter', 'Firebase', 'REST API', 'Dart'],
    image: imgMan,
    link: '#contact',
  },
];

const ProjectCard = ({ project, active, onActivate }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current || !imageRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 7,
      rotateX: -y * 7,
      transformPerspective: 1200,
      duration: 0.35,
      ease: 'power2.out',
    });

    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      x: -x * 14,
      y: -y * 14,
      scale: 1.07,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  return (
               <article
                ref={cardRef}
                onMouseEnter={() => onActivate(project)}
                onFocus={() => onActivate(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`project-card group relative min-h-[32rem] overflow-hidden rounded-xl border bg-black text-left transition-all duration-400 ${
                  active ? 'border-white/25 shadow-[0_16px_48px_rgba(0,0,0,0.8)]' : 'border-white/10 hover:border-white/20'
                } ${project.featured ? 'lg:col-span-2' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                 <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-zinc-950 to-black">
        <img
          ref={imageRef}
          src={project.image}
          alt={`${project.name} project preview`}
          className="absolute inset-0 h-full w-full object-cover object-center grayscale brightness-[0.62] contrast-125 transition duration-700 group-hover:grayscale-0 group-hover:brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/72 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
      </div>

                 <div
                    ref={glowRef}
                    className="absolute z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-500/20 to-red-500/8 opacity-0 blur-[100px] pointer-events-none mix-blend-screen"
                  />

      <div className="absolute left-0 top-0 z-20 h-full w-px bg-gradient-to-b from-red-500/70 via-white/10 to-transparent" />
      <div className="absolute inset-0 z-20 rounded-lg border border-red-500/0 transition duration-500 group-hover:border-red-500/35 pointer-events-none" />

      <div className="relative z-30 flex min-h-[36rem] flex-col justify-between p-7 md:p-8" style={{ transform: 'translateZ(32px)' }}>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono-custom text-[10px] font-medium uppercase tracking-[0.28em] text-red-400">
              Case {project.id}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-gray-500">
              {project.type}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold tracking-[0.18em] text-gray-300">
            {project.year}
          </span>
        </div>

        <div>
          <h3 className="font-display max-w-2xl text-3xl md:text-4xl font-bold leading-tight tracking-tighter text-white">
            {project.name}
          </h3>

          <p className="mt-5 max-w-2xl text-body-md text-gray-300">
            {project.description}
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
            {project.impact}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300"
              >
                {tool}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition duration-300 hover:text-red-300"
          >
            Discuss Project
            <span className="transition duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      const heading = sectionRef.current.querySelector('.projects-heading');
      if (heading) {
        const headingText = heading.textContent;
        heading.innerHTML = headingText.split('').map(char => 
          `<span class="char" style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
      }

      const chars = sectionRef.current.querySelectorAll('.char');

      tl.fromTo(
        '.projects-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power2.out', force3D: true },
      )
      .fromTo(
        chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.015, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        '.project-card',
        { opacity: 0, y: 60, rotationX: 10 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.15, ease: 'power3.out', force3D: true },
        '-=0.3',
      );

      // Add hover magnetic effect on project cards
      const cards = sectionRef.current.querySelectorAll('.project-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            z: 20,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            z: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black px-6 py-32 md:px-12 lg:px-24"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute right-[-8rem] top-32 h-96 w-96 rounded-full bg-red-600/12 blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem]">
        <div className="projects-reveal mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-red-500 projects-reveal">
              Projects
            </p>
            <h2 className="projects-heading font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.9] tracking-wider text-white max-w-4xl">
              Projects I've Spun
            </h2>
          </div>
          <div className="max-w-md md:text-right">
            <p className="text-body-lg text-gray-300 mb-5">
              Web applications built with precision and power. Each project tells a story.
            </p>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Active: <span className="text-red-500">{activeProject.name}</span>
            </p>
          </div>
        </div>

        <div className="projects-reveal mb-8 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(project)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition duration-300 ${
                activeProject.id === project.id
                  ? 'border-red-500 bg-red-500 text-white shadow-[0_0_28px_rgba(239,68,68,0.28)]'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/35 hover:text-white'
              }`}
            >
              {project.id} / {project.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              active={activeProject.id === project.id}
              onActivate={setActiveProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
