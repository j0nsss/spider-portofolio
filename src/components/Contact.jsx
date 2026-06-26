import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: 'GitHub',
    handle: '@j0nsss',
    url: 'https://github.com/j0nsss',
    color: 'hover:border-gray-400 hover:shadow-gray-500/20',
    gradient: 'from-gray-600 to-gray-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    handle: 'Junadhan Alzam',
    url: 'https://www.linkedin.com/in/junadhan-alzam-0789113a7/',
    color: 'hover:border-blue-500 hover:shadow-blue-500/20',
    gradient: 'from-blue-600 to-blue-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    handle: '@j0_nadd',
    url: 'https://www.instagram.com/j0_nadd/',
    color: 'hover:border-pink-500 hover:shadow-pink-500/20',
    gradient: 'from-pink-500 via-purple-500 to-orange-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    )
  },
  {
    name: 'WhatsApp',
    handle: '+62 8xx-xxxx-xxxx',
    url: 'https://wa.me/6285704358406',
    color: 'hover:border-green-500 hover:shadow-green-500/20',
    gradient: 'from-green-600 to-green-400',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  },
  {
    name: 'TikTok',
    handle: '@jonad___',
    url: 'https://www.tiktok.com/@jonad___',
    color: 'hover:border-white hover:shadow-white/10',
    gradient: 'from-black via-gray-800 to-gray-600',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    )
  }
];

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      const elements = sectionRef.current.querySelectorAll('.animate-element');
      tl.fromTo(elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Intense Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[900px] h-[600px] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen opacity-40" />
      </div>

      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center text-center">

        {/* Header Block */}
        <div className="mb-16 animate-element">
          <p className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Reach Out ]
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white font-sans leading-none mb-6 drop-shadow-xl">
            Find Me <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white font-serif italic pr-2">Online</span>
          </h2>
          <p className="text-gray-400 font-light text-lg tracking-wide leading-relaxed max-w-2xl mx-auto">
            Let's connect across the digital universe. Tap any platform below to start a conversation.
          </p>
        </div>

        {/* Social Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {socials.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`animate-element group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm transition-all duration-500 ${social.color} hover:bg-white/[0.06] hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98]`}
            >
              {/* Hover glow beam */}
              <div className={`absolute -inset-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-radial from-white/5 to-transparent pointer-events-none`} />

              {/* Gradient strip on hover */}
              <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Icon container */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-white/10 border border-white/5 group-hover:border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${social.color.replace('hover:border', 'group-hover:border').replace('hover:shadow', 'group-hover:shadow')}`}>
                  {social.icon}
                </div>

                {/* Name */}
                <h3 className="text-white text-xl font-semibold tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                  {social.name}
                </h3>

                {/* Handle */}
                <p className="text-gray-500 text-sm font-mono group-hover:text-gray-300 transition-colors duration-500">
                  {social.handle}
                </p>

                {/* Hover indicator */}
                <span className="inline-flex items-center gap-2 text-xs text-gray-600 group-hover:text-red-400 uppercase tracking-[0.2em] font-medium transition-all duration-500 group-hover:gap-3">
                  Connect
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-16 text-gray-600 text-sm font-mono tracking-wide animate-element">
          [ All links open in a new tab ]
        </p>

      </div>
    </section>
  );
}
