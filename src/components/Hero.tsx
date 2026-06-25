"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroProps {
  dict: {
    greeting: string;
    name: string;
    lastName: string;
    roles: string[];
    roleStatic: string;
    status: string;
    statusLabel: string;
    bio: string;
    ctaProjects: string;
    ctaContact: string;
    scroll: string;
    avatarAlt: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    // Reset index when language changes
    setRoleIdx(0);
  }, [dict.roles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIdx((prev) => (prev + 1) % dict.roles.length);
        setFade(true);
      }, 300);
    }, 2600);

    return () => clearInterval(interval);
  }, [dict.roles]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="hero" aria-label="Presentación">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-1" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-2" aria-hidden="true"></div>
      <div className="hero-orb hero-orb-3" aria-hidden="true"></div>

      <div className="hero-content">
        <div className="hero-avatar-wrap">
          <div className="hero-avatar-ring" aria-hidden="true"></div>
          <Image 
            src="/avatar.jpg" 
            alt={dict.avatarAlt} 
            className="hero-avatar" 
            width={160} 
            height={160} 
            priority
          />
          <div className="hero-status" aria-label={dict.statusLabel}>
            <span className="status-dot"></span>
            {dict.status}
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-greeting reveal-up">{dict.greeting}</p>
          <h1 className="hero-name reveal-up" style={{ "--delay": ".1s" } as React.CSSProperties}>
            {dict.name}<br /><span className="name-accent">{dict.lastName}</span>
          </h1>
          <div className="hero-roles reveal-up" style={{ "--delay": ".2s" } as React.CSSProperties} aria-live="polite">
            <span className="role-static">{dict.roleStatic}</span>
            <span 
              className="role-cycle" 
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.3s, transform 0.3s",
                display: "inline-block"
              }}
            >
              {dict.roles[roleIdx] || dict.roles[0]}
            </span>
          </div>
          <p className="hero-bio reveal-up" style={{ "--delay": ".3s" } as React.CSSProperties}>
            {dict.bio}
          </p>
          <div className="hero-actions reveal-up" style={{ "--delay": ".4s" } as React.CSSProperties}>
            <a href="#projects" className="btn btn-primary" onClick={(e) => handleSmoothScroll(e, "#projects")} id="heroProjectsBtn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              {dict.ctaProjects}
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => handleSmoothScroll(e, "#contact")} id="heroContactBtn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {dict.ctaContact}
            </a>
          </div>
          <div className="hero-socials reveal-up" style={{ "--delay": ".5s" } as React.CSSProperties}>
            <a href="https://linkedin.com/in/jhonpillaca" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:jhonspillaca12@gmail.com" className="social-link" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="https://github.com/jhonpillaca" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true" onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector("#about");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }} style={{ cursor: "pointer" }}>
        <span>{dict.scroll}</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
