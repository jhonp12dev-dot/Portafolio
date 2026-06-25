"use client";

import { useEffect, useState, useRef } from "react";

interface AboutProps {
  dict: {
    tag: string;
    title: string;
    lead: string;
    body: string;
    languages: {
      spanish: string;
      quechua: string;
      english: string;
      native: string;
      basic: string;
    };
    stats: {
      years: string;
      projects: string;
      tech: string;
      companies: string;
    };
  };
}

export default function About({ dict }: AboutProps) {
  const [counts, setCounts] = useState<Record<string, number>>({
    statYears: 0,
    statProjects: 0,
    statTech: 0,
    statCompanies: 0,
  });

  const STATS = [
    { id: "statYears", target: 5, label: dict.stats.years },
    { id: "statProjects", target: 12, label: dict.stats.projects },
    { id: "statTech", target: 20, label: dict.stats.tech },
    { id: "statCompanies", target: 4, label: dict.stats.companies },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any running intervals first
            intervalsRef.current.forEach(clearInterval);
            intervalsRef.current = [];

            // Animate counters
            STATS.forEach((stat) => {
              let current = 0;
              const step = stat.target / 40; // 40 steps total
              const interval = setInterval(() => {
                current = Math.min(current + step, stat.target);
                setCounts((prev) => ({
                  ...prev,
                  [stat.id]: Math.floor(current),
                }));
                if (current >= stat.target) {
                  clearInterval(interval);
                }
              }, 40);
              intervalsRef.current.push(interval);
            });
          } else {
            // Clear intervals and reset counts when leaving viewport
            intervalsRef.current.forEach(clearInterval);
            intervalsRef.current = [];
            setCounts({
              statYears: 0,
              statProjects: 0,
              statTech: 0,
              statCompanies: 0,
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      intervalsRef.current.forEach(clearInterval);
    };
  }, [dict]); // Re-run when dictionary changes

  return (
    <section id="about" className="section about" aria-labelledby="about-heading" ref={sectionRef}>
      <div className="container">
        <div className="section-tag">{dict.tag}</div>
        <h2 id="about-heading" className="section-title">{dict.title}</h2>

        <div className="about-grid">
          <div className="about-text">
            <p className="about-lead">
              {dict.lead}
            </p>
            <p className="about-body">
              {dict.body}
            </p>
            <div className="about-langs">
              <div className="lang-item">
                <span className="lang-name">{dict.languages.spanish}</span>
                <span className="lang-level lang-native">{dict.languages.native}</span>
              </div>
              <div className="lang-item">
                <span className="lang-name">{dict.languages.quechua}</span>
                <span className="lang-level lang-native">{dict.languages.native}</span>
              </div>
              <div className="lang-item">
                <span className="lang-name">{dict.languages.english}</span>
                <span className="lang-level lang-basic">{dict.languages.basic}</span>
              </div>
            </div>
          </div>

          <div className="about-stats">
            {STATS.map((stat) => (
              <div className="stat-card" key={stat.id} id={stat.id}>
                <span className="stat-num">{counts[stat.id]}</span>
                <span className="stat-plus">+</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
