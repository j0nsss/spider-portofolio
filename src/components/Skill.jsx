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
      className="relative w-full overflow-hidden bg-[#050505] px-6 py-28 md:px-12 lg:px-24"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />
      <div className="absolute left-1/2 top-0 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[90rem]">
        <div className="skill-reveal mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.32em] text-red-400">
              Skills / Technology Stack
            </p>
            <h2 className="max-w-4xl text-4xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl lg:text-[4.75rem]">
              Languages, frameworks, and tools I use to ship real products.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-gray-400 md:text-right md:text-lg">
            From frontend interfaces to backend logic and low-level fundamentals, I work across the stack with a practical engineering mindset.
          </p>
        </div>

        <div className="skill-reveal mb-8 flex items-center justify-between gap-4">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-gray-500">
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
                className={`group relative min-h-64 w-[82vw] shrink-0 snap-center overflow-hidden rounded-lg border p-6 text-left transition duration-300 sm:w-[22rem] lg:w-[24rem] ${
                  activeSkill.name === skill.name
                    ? 'border-red-500/50 bg-red-500/[0.06]'
                    : 'border-white/10 bg-white/[0.035] hover:border-white/30 hover:bg-white/[0.055]'
                }`}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 opacity-20 blur-2xl transition duration-300 group-hover:opacity-35" />
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className="absolute -bottom-8 -right-6 h-32 w-32 opacity-[0.08] grayscale transition duration-500 group-hover:scale-110 group-hover:opacity-[0.14]"
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

          <aside className="skill-reveal h-fit rounded-lg border border-white/10 bg-black/40 p-6 backdrop-blur-xl lg:sticky lg:top-28">
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
