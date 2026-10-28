import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { name: 'JavaScript', level: 94, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', level: 92, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Flutter', level: 88, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'HTML', level: 96, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', level: 93, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Python', level: 87, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Go', level: 82, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'PHP', level: 84, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Java', level: 83, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', level: 79, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C', level: 78, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
];

const STACK_LINES = [
  'REST API',
  'GSAP',
  'Three.js',
  'Tailwind CSS',
  'Node.js',
  'Database Design',
  'Clean Architecture',
  'Responsive UI',
  'Performance',
  'Git Workflow',
];

export default function Skill() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeSkillName, setActiveSkillName] = useState(SKILLS[0].name);

  const activeSkill = useMemo(() => {
    return SKILLS.find((skill) => skill.name === activeSkillName) ?? SKILLS[0];
  }, [activeSkillName]);

  const moveSlide = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * Math.min(sliderRef.current.clientWidth * 0.88, 420),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      timeline
        .fromTo(
          '.skill-reveal',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out', force3D: true },
        )
        .fromTo(
          '.skill-meter',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, stagger: 0.05, ease: 'power3.out' },
          '-=0.5',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black px-6 py-28 md:px-12 lg:px-24"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="absolute left-1/2 top-0 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-red-500/8 blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[90rem]">
        <div className="skill-reveal mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
           <div>
            <p className="mb-4 font-mono-custom text-xs font-bold uppercase tracking-[0.36em] text-red-500">
              Skills / Technology Stack
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tighter text-white max-w-4xl">
              Languages, frameworks, and tools I use to <span className="text-gradient-primary">ship real products</span>.
            </h2>
          </div>
          <p className="max-w-md text-body-lg text-gray-400 md:text-right">
            From <span className="font-semibold text-white">frontend interfaces</span> to <span className="font-semibold text-white">backend logic</span> and <span className="font-semibold text-white">low-level fundamentals</span>, I work across the stack with a practical engineering mindset.
          </p>
        </div>

           <div className="skill-reveal mb-8 flex items-center justify-between gap-4">
          <p className="font-mono-custom text-xs font-bold uppercase tracking-[0.32em] text-gray-500">
            Drag or slide through the stack
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => moveSlide(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white transition duration-300 hover:border-red-500/50 hover:bg-red-500/10"
              aria-label="Previous skill"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => moveSlide(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white transition duration-300 hover:border-red-500/50 hover:bg-red-500/10"
              aria-label="Next skill"
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div
            ref={sliderRef}
            className="skill-reveal flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
          >
            {SKILLS.map((skill) => (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => setActiveSkillName(skill.name)}
                onFocus={() => setActiveSkillName(skill.name)}
                onClick={() => setActiveSkillName(skill.name)}
                className={`group relative min-h-72 w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl border p-7 text-left transition-all duration-500 sm:w-[22rem] lg:w-[24rem] ${
                  activeSkill.name === skill.name
                    ? 'border-red-500/60 bg-gradient-to-br from-red-500/[0.08] to-red-500/[0.03] shadow-[0_20px_60px_rgba(239,68,68,0.25)]'
                    : 'border-white/15 bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-white/35 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 opacity-20 blur-2xl transition duration-300 group-hover:opacity-35" />
                 <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="absolute -bottom-8 -right-6 h-32 w-32 opacity-[0.06] grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.16] group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-gray-500">
                        Programming skill
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="grid h-16 w-16 place-items-center rounded-lg border border-white/10 bg-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
                      <img
                        src={skill.logo}
                        alt=""
                        className="h-11 w-11 object-contain"
                        loading="lazy"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em]">
                      <span className="text-gray-500">Mastery</span>
                      <span className="text-gray-300">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="skill-meter h-full origin-left rounded-full bg-gradient-to-r from-red-500 via-white to-gray-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <aside className="skill-reveal h-fit rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-7 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] lg:sticky lg:top-28">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-red-300">
              Selected Skill
            </p>
            <div className="mt-8">
              <div className="mb-6 grid h-20 w-20 place-items-center rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                <img
                  src={activeSkill.logo}
                  alt={`${activeSkill.name} logo`}
                  className="h-12 w-12 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-4xl font-bold tracking-tight text-white">
                {activeSkill.name}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-gray-400">
                Comfortable using {activeSkill.name} as part of a production workflow, from implementation details to integration, debugging, and maintainable delivery.
              </p>
            </div>
          </aside>
        </div>

        <div className="skill-reveal mt-14 overflow-hidden border-y border-white/10 py-5">
          <div className="flex w-max animate-[skillMarquee_28s_linear_infinite] gap-4">
            {[...STACK_LINES, ...STACK_LINES].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes skillMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      ` }} />
    </section>
  );
}
