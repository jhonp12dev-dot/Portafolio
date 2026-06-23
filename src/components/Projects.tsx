"use client";

import { useState } from "react";

interface Project {
  title: string;
  desc: string;
  category: string; // space separated classes, e.g. "active web backend"
  img: string;
  tech: string[];
  wip?: boolean;
}

const FILTERS = [
  { label: "Todos", filter: "all" },
  { label: "En Progreso", filter: "active" },
  { label: "Web", filter: "web" },
  { label: "IA & Automatización", filter: "ai" },
  { label: "Backend", filter: "backend" },
];

const PROJECTS: Project[] = [
  {
    title: "Codex",
    desc: "Plataforma enterprise multi-tenant e infraestructura basada en microservicios y microfrontends, incluyendo la integración de la librería de componentes gco-ui-library y shell de administración modular en Angular.",
    category: "active web backend",
    img: "codex.png",
    tech: ["Angular", "gco-ui-library", "Spring Boot", "Microservices", "Microfrontends", "PostgreSQL", "MongoDB", "Docker"],
    wip: true,
  },
  {
    title: "Zentra",
    desc: "Sistema clínico y operacional moderno con módulos de onboarding, gestión de pacientes, facturación interactiva y automatizaciones inteligentes con agentes de IA. Arquitectura de microservicios desarrollada con NestJS y frontend con Next.js.",
    category: "active web ai",
    img: "zentra.png",
    tech: ["NestJS", "Next.js", "Microservices", "AI Agents", "PostgreSQL", "TypeScript"],
    wip: true,
  },
  {
    title: "GCO UI Library",
    desc: "Librería de componentes Angular enterprise (gco-ui-library) basada en front/gco-ui-library con documentación interactiva (gco-ui-docs). Incluye botones, tablas, formularios reactivos con validaciones, modales y theming personalizable.",
    category: "web",
    img: "gco_ui.png",
    tech: ["Angular", "TypeScript", "SCSS", "Storybook", "NPM Package"],
  },
  {
    title: "JLH Corredores Seguros",
    desc: "Plataforma integral de seguros con base de datos robusta y capacidades avanzadas de Inteligencia Artificial para análisis OCR de pólizas, RAG con documentación de planes, agentes IA automatizados y modelos de lenguaje multimodal (MLL).",
    category: "web ai",
    img: "jlhbroker.png",
    tech: ["NestJS", "Angular", "Supabase", "PostgreSQL", "MongoDB", "AI Agents", "MCP", "OCR", "RAG", "MLL", "Python"],
  },
  {
    title: "Agentes IA con MCP",
    desc: "Desarrollo de agentes de inteligencia artificial usando Model Context Protocol (MCP) para automatización de procesos empresariales. Integración con OpenAI APIs y sistemas RAG.",
    category: "ai",
    img: "ai_agents.png",
    tech: ["MCP", "OpenAI API", "RAG", "Node.js", "Python"],
  },
  {
    title: "Lidera Software",
    desc: "Software contable multi-tenant para control financiero empresarial. Frontend en Angular y backend en Spring Boot con arquitectura escalable de base de datos multitenant en MySQL para aislamiento seguro de datos.",
    category: "web backend",
    img: "accounting.png",
    tech: ["Angular", "Spring Boot", "Multitenant", "MySQL", "Java"],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category.split(" ").includes(activeFilter);
  });

  return (
    <section id="projects" className="section projects" aria-labelledby="proj-heading">
      <div className="container">
        <div className="section-tag">Trabajo</div>
        <h2 id="proj-heading" className="section-title">Proyectos Destacados</h2>

        <div className="projects-filter" role="tablist" aria-label="Filtrar proyectos">
          {FILTERS.map((f) => (
            <button
              key={f.filter}
              className={`filter-btn ${activeFilter === f.filter ? "active" : ""}`}
              onClick={() => setActiveFilter(f.filter)}
              role="tab"
              aria-selected={activeFilter === f.filter}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid" id="projectsGrid">
          {filteredProjects.map((p, idx) => (
            <article className="project-card animate-fade-in" key={p.title} aria-label={`Proyecto ${p.title}`}>
              {p.wip && (
                <div className="project-status active-status">
                  <span className="pulse-dot"></span> En Progreso
                </div>
              )}
              <div className="project-visual">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={`Vista previa de ${p.title}`} className="project-img" loading="lazy" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span className="tech-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                {p.wip && (
                  <div className="project-links">
                    <span className="project-wip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Desarrollo activo
                    </span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
