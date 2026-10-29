import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { vertexShader, fragmentShader } from './HeroShaders';

gsap.registerPlugin(ScrollTrigger);

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/1775519899126.png';

const HERO_METRICS = [
  { value: 'Full-stack', label: 'Web development' },
  { value: 'Motion', label: 'Interaction design' },
  { value: 'Scale', label: 'Performance systems' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const contentRef = useRef(null);
  const sizeRef = useRef({ width: 1, height: 1 });
  const hoverRef = useRef(false);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!heroRef.current || !containerRef.current) return;

    const hero = heroRef.current;
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const updateRendererSize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      sizeRef.current = { width, height };
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      return { width, height };
    };

    const { width, height } = updateRendererSize();
    container.appendChild(renderer.domElement);

    const uniforms = {
      uTexture1: { value: null },
      uTexture2: { value: null },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHovered: { value: 0.0 },
      uRadius: { value: 0.24 },
      uSoftness: { value: 0.16 },
      uScale: { value: 0.035 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1920, 1080) },
    };

    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = [];
    let isTexturesLoaded = false;

    Promise.all([
      textureLoader.loadAsync(imgSpiderman),
      textureLoader.loadAsync(imgMan),
    ]).then(([tex1, tex2]) => {
      [tex1, tex2].forEach((texture) => {
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        loadedTextures.push(texture);
      });

      uniforms.uTexture1.value = tex1;
      uniforms.uTexture2.value = tex2;

      if (tex1.image) {
        uniforms.uImageResolution.value.set(tex1.image.width, tex1.image.height);
      }

      isTexturesLoaded = true;
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    scene.add(new THREE.Mesh(geometry, material));

    const renderTick = () => {
      if (!isTexturesLoaded) return;

      const { width: currentWidth, height: currentHeight } = sizeRef.current;
      mouseCurrent.current.x = gsap.utils.interpolate(mouseCurrent.current.x, mouseTarget.current.x, 0.1);
      mouseCurrent.current.y = gsap.utils.interpolate(mouseCurrent.current.y, mouseTarget.current.y, 0.1);

      uniforms.uMouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: mouseCurrent.current.x * currentWidth,
          y: (1 - mouseCurrent.current.y) * currentHeight,
        });
      }

      renderer.render(scene, camera);
    };

    gsap.ticker.add(renderTick);

    const revealIdentity = () => {
      hoverRef.current = true;
      setIsHovered(true);
      gsap.to(uniforms.uHovered, {
        value: 1,
        duration: 1.1,
        ease: 'power3.out',
      });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    const concealIdentity = () => {
      hoverRef.current = false;
      setIsHovered(false);
      gsap.to(uniforms.uHovered, {
        value: 0,
        duration: 1.1,
        ease: 'power3.out',
      });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      }
    };

    const syncPointer = (clientX, clientY) => {
      const rect = hero.getBoundingClientRect();
      const { width: currentWidth, height: currentHeight } = sizeRef.current;

      mouseTarget.current.x = (clientX - rect.left) / currentWidth;
      mouseTarget.current.y = 1 - (clientY - rect.top) / currentHeight;
    };

    const onMouseMove = (e) => {
      syncPointer(e.clientX, e.clientY);
    };

    const onTouch = (e) => {
      if (e.touches.length === 0) return;

      syncPointer(e.touches[0].clientX, e.touches[0].clientY);

      if (!hoverRef.current) {
        revealIdentity();
      }
    };

    const onResize = () => {
      const nextSize = updateRendererSize();
      uniforms.uResolution.value.set(nextSize.width, nextSize.height);
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseenter', revealIdentity);
    hero.addEventListener('mouseleave', concealIdentity);
    hero.addEventListener('touchstart', onTouch);
    hero.addEventListener('touchmove', onTouch);
    window.addEventListener('resize', onResize);

     // Text reveal animation with character splitting
     const splitText = (element) => {
       if (!element) return '';
       const text = element.textContent;
       element.innerHTML = text.split('').map(char => 
         `<span class="char" style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`
       ).join('');
       return element.querySelectorAll('.char');
     };

     const mainHeading = contentRef.current?.querySelector('h1');
     if (mainHeading) {
       const chars = splitText(mainHeading);
       
       const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
       
       entrance
         .fromTo(container, 
           { opacity: 0, scale: 1.04 }, 
           { opacity: 1, scale: 1, duration: 1.8, ease: 'power4.out' })
         .fromTo(chars,
           { opacity: 0, y: 40, rotationX: 90 },
           { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.03 },
           '-=1.2')
         .fromTo(contentRef.current?.querySelector('.hero-availability'),
           { opacity: 0, scale: 0.8, y: 20 },
           { opacity: 1, scale: 1, y: 0, duration: 0.9 },
           '-=0.8')
         .fromTo(contentRef.current?.querySelector('.hero-description'),
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 1.1 },
           '-=0.6')
         .fromTo(contentRef.current?.querySelectorAll('.hero-button'),
           { opacity: 0, y: 25 },
           { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
           '-=0.4');
     }

    return () => {
      entrance.kill();
      gsap.ticker.remove(renderTick);
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseenter', revealIdentity);
      hero.removeEventListener('mouseleave', concealIdentity);
      hero.removeEventListener('touchstart', onTouch);
      hero.removeEventListener('touchmove', onTouch);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      loadedTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-screen w-screen items-center overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black">
      <div ref={containerRef} className="absolute inset-0 z-0 select-none" />

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_68%_46%,transparent_0%,rgba(239,68,68,0.08)_28%,rgba(0,0,0,0.5)_72%,#000_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_35%,rgba(0,0,0,0.1)_65%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      
      {/* Subtle animated grid */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      
      {/* Animated accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent z-[3] pointer-events-none" />

      <div
        ref={cursorRef}
        className="fixed left-0 top-0 z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.25) 0%, rgba(239,68,68,0.12) 40%, rgba(255,255,255,0) 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div ref={contentRef} className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-col justify-center px-6 pb-14 pt-32 md:px-12 lg:px-16">
        <div className="grid min-h-[calc(100vh-11rem)] grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.55fr)]">
          <div
            className="max-w-5xl transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? 'translateY(-14px)' : 'translateY(0)' }}
          >
            <div className="hero-reveal mb-10 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 backdrop-blur-lg hero-availability">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-gray-300">
                Available for work
              </span>
            </div>

            <h1 className="hero-reveal font-display text-6xl md:text-7xl lg:text-[8rem] leading-[0.85] tracking-wide text-white max-w-6xl mb-6">
              WEB DESIGN<br />
              <span className="text-spider-red">POWER & PRECISION</span>
            </h1>

            <p className="hero-reveal max-w-2xl text-body-lg text-gray-300 mb-12">
              I spin sophisticated interfaces and robust systems — elegant solutions woven with engineering precision.
            </p>

            <div className="hero-reveal flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="hero-button btn-magnetic inline-flex min-h-14 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-black transition-all duration-300 hover:bg-red-500 hover:text-white active:scale-95 relative overflow-hidden"
              >
                <span className="btn-content">Get in touch</span>
                <span className="btn-magnetic-bg"></span>
              </a>
              <a
                href="#projects"
                className="hero-button btn-magnetic inline-flex min-h-14 items-center justify-center rounded-lg border border-white/20 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5 active:scale-95 relative overflow-hidden"
              >
                <span className="btn-content">View my work</span>
                <span className="btn-magnetic-bg"></span>
              </a>
            </div>
          </div>

          <aside className="hero-reveal pointer-events-auto w-full rounded-xl border border-white/20 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] md:p-7 lg:self-end">
            <div className="mb-6 flex items-center justify-between border-b border-white/15 pb-5">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.26em] text-red-400">
                Current Focus
              </p>
              <span className="rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/[0.1] to-emerald-400/[0.08] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
                Available
              </span>
            </div>

            <div className="space-y-5">
              {HERO_METRICS.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-5 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-lg font-semibold tracking-tight text-white md:text-xl">
                    {item.value}
                  </p>
                  <p className="max-w-36 text-right text-xs uppercase tracking-[0.16em] text-gray-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
    </section>
  );
}
