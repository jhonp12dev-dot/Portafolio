"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBar {
  name: string;
  pct: number;
  color: string;
}

const SKILL_BARS: SkillBar[] = [
  { name: "Angular / TypeScript", pct: 92, color: "#22C55E" },
  { name: "NestJS / Node.js", pct: 63, color: "#22C55E" },
  { name: "Next.js", pct: 43, color: "#3B82F6" },
  { name: "Java / Spring Boot", pct: 69, color: "#F59E0B" },
  { name: "Bases de Datos (SQL/NoSQL)", pct: 85, color: "#8B5CF6" },
  { name: "IA & Automatización", pct: 56, color: "#EC4899" },
];

export default function Skills() {
  const [widths, setWidths] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any pending timeouts
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];

            // Trigger animation for skill bars
            SKILL_BARS.forEach((bar) => {
              const timeout = setTimeout(() => {
                setWidths((prev) => ({
                  ...prev,
                  [bar.name]: bar.pct,
                }));
              }, 150);
              timeoutsRef.current.push(timeout);
            });
          } else {
            // Clear timeouts and reset widths when leaving viewport
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            setWidths({});
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-heading" ref={sectionRef}>
      <div className="container">
        <div className="section-tag">Tecnología</div>
        <h2 id="skills-heading" className="section-title">Stack Técnico</h2>

        <div className="skills-grid">
          <div className="skill-group">
            <div className="skill-group-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <h3>Frontend</h3>
            </div>
            <div className="skill-pills">
              <span className="skill-pill level-expert">Angular</span>
              <span className="skill-pill level-expert">TypeScript</span>
              <span className="skill-pill level-expert">Next.js</span>
              <span className="skill-pill level-high">RxJS</span>
              <span className="skill-pill level-high">JavaScript</span>
              <span className="skill-pill level-high">HTML5</span>
              <span className="skill-pill level-high">CSS3 / SCSS</span>
              <span className="skill-pill level-mid">Bootstrap</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <h3>Backend</h3>
            </div>
            <div className="skill-pills">
              <span className="skill-pill level-expert">NestJS</span>
              <span className="skill-pill level-expert">Node.js</span>
              <span className="skill-pill level-high">Spring Boot</span>
              <span className="skill-pill level-high">Java</span>
              <span className="skill-pill level-mid">PHP</span>
              <span className="skill-pill level-mid">Laravel</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
              <h3>Bases de Datos</h3>
            </div>
            <div className="skill-pills">
              <span className="skill-pill level-expert">PostgreSQL</span>
              <span className="skill-pill level-expert">MongoDB</span>
              <span className="skill-pill level-high">MySQL</span>
              <span className="skill-pill level-high">Supabase</span>
              <span className="skill-pill level-mid">SQL Server</span>
              <span className="skill-pill level-mid">Firebase</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
              </svg>
              <h3>IA & Automatización</h3>
            </div>
            <div className="skill-pills">
              <span className="skill-pill level-expert">OpenAI APIs</span>
              <span className="skill-pill level-expert">MCP</span>
              <span className="skill-pill level-high">Agentes IA</span>
              <span className="skill-pill level-high">RAG</span>
              <span className="skill-pill level-mid">Automatización</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <h3>Herramientas</h3>
            </div>
            <div className="skill-pills">
              <span className="skill-pill level-expert">Git</span>
              <span className="skill-pill level-expert">GitLab</span>
              <span className="skill-pill level-high">GitHub</span>
              <span className="skill-pill level-high">Docker</span>
              <span className="skill-pill level-high">Swagger</span>
              <span className="skill-pill level-mid">Jira</span>
              <span className="skill-pill level-mid">Postman</span>
              <span className="skill-pill level-mid">Bitbucket</span>
            </div>
          </div>

          <div className="skill-group">
            <div className="skill-group-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <h3>Metodologías & Arquitectura</h3>
            </div>
            <div className="skill-pills">
              <span className="skill-pill level-expert">SCRUM</span>
              <span className="skill-pill level-expert">Agile</span>
              <span className="skill-pill level-high">REST APIs</span>
              <span className="skill-pill level-high">Microservicios</span>
              <span className="skill-pill level-mid">CI/CD</span>
            </div>
          </div>
        </div>

        {/* Skill Bars */}
        <div className="skill-bars">
          <h3 className="skill-bars-title">Nivel de dominio</h3>
          <div className="skill-bar-list">
            {SKILL_BARS.map((bar) => (
              <div className="skill-bar-item" key={bar.name}>
                <div className="skill-bar-label">
                  <span>{bar.name}</span>
                  <span className="skill-bar-pct">{bar.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: `${widths[bar.name] || 0}%`,
                      "--bar-color": bar.color,
                      boxShadow: `0 0 8px ${bar.color}`,
                    } as React.CSSProperties}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
