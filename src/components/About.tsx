"use client";

import { useEffect, useState, useRef } from "react";

interface StatItem {
  id: string;
  target: number;
  label: string;
}

const STATS: StatItem[] = [
  { id: "statYears", target: 5, label: "Años de experiencia" },
  { id: "statProjects", target: 12, label: "Proyectos entregados" },
  { id: "statTech", target: 20, label: "Tecnologías dominadas" },
  { id: "statCompanies", target: 4, label: "Empresas" },
];

export default function About() {
  const [counts, setCounts] = useState<Record<string, number>>({
    statYears: 0,
    statProjects: 0,
    statTech: 0,
    statCompanies: 0,
  });

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
  }, []);

  return (
    <section id="about" className="section about" aria-labelledby="about-heading" ref={sectionRef}>
      <div className="container">
        <div className="section-tag">Sobre mí</div>
        <h2 id="about-heading" className="section-title">Perfil Profesional</h2>

        <div className="about-grid">
          <div className="about-text">
            <p className="about-lead">
              Desarrollador Full Stack con más de 5 años de experiencia, especializado en Angular, NestJS, Spring Boot y soluciones basadas en Inteligencia Artificial.
            </p>
            <p className="about-body">
              Proactivo, autodidacta y motivado por construir proyectos con impacto real. Me apasiona la automatización de procesos, el desarrollo de agentes IA y la creación de arquitecturas escalables que resuelvan problemas complejos.
            </p>
            <div className="about-langs">
              <div className="lang-item">
                <span className="lang-name">Español</span>
                <span className="lang-level lang-native">Nativo</span>
              </div>
              <div className="lang-item">
                <span className="lang-name">Quechua</span>
                <span className="lang-level lang-native">Nativo</span>
              </div>
              <div className="lang-item">
                <span className="lang-name">Inglés</span>
                <span className="lang-level lang-basic">Básico</span>
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
