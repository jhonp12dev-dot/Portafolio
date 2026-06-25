"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectsProps {
  dict: {
    tag: string;
    title: string;
    wipBadge: string;
    wipLink: string;
    imgAltPrefix: string;
    filters: {
      all: string;
      active: string;
      web: string;
      ai: string;
      backend: string;
    };
    list: Array<{
      title: string;
      desc: string;
    }>;
  };
}

const PROJECT_METADATA = [
  {
    category: "active web backend",
    img: "/codex.jpg",
    tech: ["Angular", "gco-ui-library", "Spring Boot", "Microservices", "Microfrontends", "PostgreSQL", "MongoDB", "Docker"],
    wip: true,
  },
  {
    category: "active web ai",
    img: "/zentra.jpg",
    tech: ["NestJS", "Next.js", "Microservices", "AI Agents", "PostgreSQL", "TypeScript"],
    wip: true,
  },
  {
    category: "web",
    img: "/gco_ui.jpg",
    tech: ["Angular", "TypeScript", "SCSS", "Storybook", "NPM Package"],
  },
  {
    category: "web ai",
    img: "/jlhbroker.jpg",
    tech: ["NestJS", "Angular", "Supabase", "PostgreSQL", "MongoDB", "AI Agents", "MCP", "OCR", "RAG", "MLL", "Python"],
  },
  {
    category: "ai",
    img: "/ai_agents.jpg",
    tech: ["MCP", "OpenAI API", "RAG", "Node.js", "Python"],
  },
  {
    category: "web backend",
    img: "/accounting.jpg",
    tech: ["Angular", "Spring Boot", "Multitenant", "MySQL", "Java"],
  },
];

export default function Projects({ dict }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const FILTERS = [
    { label: dict.filters.all, filter: "all" },
    { label: dict.filters.active, filter: "active" },
    { label: dict.filters.web, filter: "web" },
    { label: dict.filters.ai, filter: "ai" },
    { label: dict.filters.backend, filter: "backend" },
  ];

  const projects = dict.list.map((proj, idx) => ({
    ...proj,
    ...PROJECT_METADATA[idx],
  }));

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category.split(" ").includes(activeFilter);
  });

  return (
    <section id="projects" className="section projects" aria-labelledby="proj-heading">
      <div className="container">
        <div className="section-tag">{dict.tag}</div>
        <h2 id="proj-heading" className="section-title">{dict.title}</h2>

        <div className="projects-filter" aria-label="Filtrar proyectos">
          {FILTERS.map((f) => (
            <button
              key={f.filter}
              className={`filter-btn ${activeFilter === f.filter ? "active" : ""}`}
              onClick={() => setActiveFilter(f.filter)}
              aria-pressed={activeFilter === f.filter}
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
                  <span className="pulse-dot"></span> {dict.wipBadge}
                </div>
              )}
              <div className="project-visual">
                <Image
                  src={p.img}
                  alt={`${dict.imgAltPrefix} ${p.title}`}
                  className="project-img"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
                      {dict.wipLink}
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
