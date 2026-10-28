import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.png';

gsap.registerPlugin(ScrollTrigger);

const STACK_LINES = [
  'JUNADHAN ALZAM TINIZA PUTRA',
  'JUNADHAN ALZAM TINIZA PUTRA',
  'JUNADHAN ALZAM TINIZA PUTRA',
  'JUNADHAN ALZAM TINIZA PUTRA',
];

const HIGHLIGHTS = [
  { value: '5+', label: 'Years building interfaces' },
  { value: '18', label: 'Production projects shipped' },
  { value: '3', label: 'Core stacks mastered' },
];

const CAPABILITIES = [
  'Product-minded frontend systems',
  'API-driven web applications',
  'Motion design that supports usability',
  'Performance-focused implementation',
];

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const maskRef = useRef(null);

   useEffect(() => {
     const ctx = gsap.context(() => {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 80%',
           toggleActions: 'play none none reverse',
           markers: false,
         },
       });

       const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');
       const headingElement = textContainerRef.current.querySelector('h2');
       
       // Split heading text for character animation
       if (headingElement) {
         const headingText = headingElement.textContent;
         headingElement.innerHTML = headingText.split('').map(char => 
           `<span class="char" style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`
         ).join('');
       }

       const chars = textContainerRef.current.querySelectorAll('.char');

       tl.fromTo(
         imageContainerRef.current,
         { opacity: 0, scale: 0.95, x: -30 },
         { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: 'power3.out', force3D: true },
       )
       .fromTo(
         chars,
         { opacity: 0, y: 20, rotationX: 20 },
         { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.02, ease: 'power2.out' },
         '-=1.0'
       )
       .fromTo(
         textElements,
         { opacity: 0, y: 30 },
         { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
         '-=0.5'
       );

       // Parallax effect on scroll
       ScrollTrigger.create({
         trigger: imageContainerRef.current,
         start: 'top bottom',
         end: 'bottom top',
         onUpdate: (self) => {
           gsap.to(imageContainerRef.current, {
             y: self.progress * 50,
             duration: 0.3,
             ease: 'none'
           });
         }
       });

       // Stats counter animation
       const stats = textContainerRef.current.querySelectorAll('.stat-value');
       stats.forEach((stat) => {
         const value = stat.textContent;
         const isNumber = !isNaN(value);
         
         if (isNumber) {
           stat.textContent = '0';
           ScrollTrigger.create({
             trigger: stat,
             start: 'top 90%',
             once: true,
             onEnter: () => {
               gsap.to(stat, {
                 innerText: value,
                 duration: 2,
                 snap: { innerText: 1 },
                 ease: 'power2.out'
               });
             }
           });
         }
       });

     }, sectionRef);

     return () => ctx.revert();
   }, []);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !maskRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(maskRef.current, {
      '--x': `${x}%`,
      '--y': `${y}%`,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!maskRef.current) return;

    gsap.to(maskRef.current, {
      '--x': '50%',
      '--y': '50%',
      duration: 0.8,
      ease: 'power3.out',
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black px-6 py-28 md:px-12 lg:px-24"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
      
      {/* Floating gradient orb */}
      <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div ref={textContainerRef} className="relative z-10 w-full max-w-[90rem]">
        <div className="stagger-reveal mb-12 overflow-hidden border-y border-white/10 py-5">
          <div className="flex w-max animate-[aboutStackMarquee_30s_linear_infinite] gap-4">
            {[...STACK_LINES, ...STACK_LINES].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400 transition-colors duration-300 hover:border-red-500/40 hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-14 flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="stagger-reveal mb-5 font-mono text-xs font-medium uppercase tracking-[0.25em] text-red-500">
                About
              </p>
              <h2 className="stagger-reveal font-display text-4xl md:text-5xl lg:text-[4.5rem] font-black leading-[0.9] tracking-tighter text-white max-w-4xl">
                Building digital products with intention.
              </h2>
            </div>

            <p className="stagger-reveal max-w-md text-body-lg text-gray-400 md:text-right">
              I connect design and engineering to create <span className="text-white font-medium">fast, maintainable</span> web experiences.
            </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div
            ref={imageContainerRef}
            className="group relative mx-auto aspect-[4/5] w-full max-w-[32rem] overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 shadow-[0_32px_96px_rgba(0,0,0,0.6)] lg:mx-0 hover:border-red-500/30 transition-all duration-500"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: 'translateZ(0)' }}
          >
            <img
              src={imgMan}
              alt="Jonad developer portrait"
              className="absolute inset-0 h-full w-full object-cover object-center grayscale brightness-[0.72] contrast-110 transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div
              ref={maskRef}
              className="absolute inset-0"
              style={{
                '--x': '50%',
                '--y': '50%',
                clipPath: 'circle(17% at var(--x) var(--y))',
                transition: 'clip-path 0.12s ease-out',
              }}
            >
              <img
                src={imgSpiderman}
                alt="Creative alternate persona"
                className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center saturate-125 transition-transform duration-[2s] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),transparent_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.72)_100%)]" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-red-500/70 via-red-400/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.32em] text-red-400 mb-2">
                Full-stack Developer
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-gray-200">
                <span className="font-medium text-white">Calm systems thinking</span>, <span className="font-medium text-white">expressive interaction design</span>, and <span className="font-medium text-white">implementation discipline</span> in one workflow.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="stagger-reveal grid grid-cols-3 border-y border-white/10">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item.label}
                  className="border-white/10 py-6 pr-4 [&:not(:last-child)]:border-r md:py-8 md:pr-6"
                >
                  <p className="stat-value font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    {item.value}
                  </p>
                  <p className="mt-3 max-w-[9rem] text-label text-gray-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="stagger-reveal mt-12 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                Philosophy
              </p>
              <div className="space-y-6">
                <p className="font-display text-2xl md:text-3xl font-semibold leading-snug text-white">
                  Every interface should feel effortless. Every system should adapt gracefully.
                </p>
                <p className="text-body-md text-gray-400">
                  I focus on clarity, performance, and long-term maintainability — building products that work well today and scale smoothly tomorrow.
                </p>
              </div>
            </div>

            <div className="stagger-reveal mt-10 grid gap-3 sm:grid-cols-2">
              {CAPABILITIES.map((skill) => (
                <div
                  key={skill}
                  className="flex min-h-16 items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors duration-300 hover:border-red-500/40 hover:bg-red-500/[0.04]"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.65)]" />
                  <span className="text-sm font-medium uppercase tracking-[0.12em] text-gray-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <blockquote className="stagger-reveal mt-10 border-l-2 border-red-500/70 pl-6">
              <p className="font-display text-xl md:text-2xl font-medium italic leading-relaxed text-gray-200">
                "Logic gives the product structure. Taste gives it momentum."
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aboutStackMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      ` }} />
    </section>
  );
}
