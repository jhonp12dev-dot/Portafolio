import React from "react";

interface JobItem {
  role: string;
  company: string;
  date: string;
  isCurrent: boolean;
  tasks: string[];
  tags: string[];
}

const JOBS: JobItem[] = [
  {
    role: "Desarrollador Full Stack",
    company: "JLH Corredores de Seguros",
    date: "Jun 2024 — May 2026",
    isCurrent: true,
    tasks: [
      "Desarrollo activo de Codex (plataforma enterprise multi-tenant bajo arquitectura de microservicios y microfrontends Angular) y Zentra (sistema clínico y operacional con NestJS, Next.js y agentes de IA).",
      "Diseño y construcción de la librería de componentes gco-ui-library en Angular para la estandarización visual y modular del ecosistema frontend.",
      "Integración de Supabase para autenticación y almacenamiento de datos. Administración avanzada de MongoDB y PostgreSQL.",
      "Desarrollo de agentes de IA con MCP (Model Context Protocol) e integración de modelos IA para automatización de flujos.",
      "Construcción del sistema JLH Corredores Seguros con integración de OCR, RAG, MLL y scripts en Python para el procesamiento de pólizas."
    ],
    tags: ["Angular", "NestJS", "Next.js", "Supabase", "MongoDB", "PostgreSQL", "Python", "OCR", "RAG", "MCP", "IA Agents"]
  },
  {
    role: "Desarrollador Full Stack",
    company: "Lidera Software",
    date: "Jul 2022 — May 2024",
    isCurrent: false,
    tasks: [
      "Desarrollo de software contable multitenant con Angular en el frontend y Spring Boot en el backend.",
      "Construcción de APIs REST y optimización de consultas complejas en MySQL.",
      "Trabajo colaborativo y control de versiones utilizando GitLab."
    ],
    tags: ["Angular", "Spring Boot", "Multitenant", "MySQL", "GitLab"]
  },
  {
    role: "Desarrollador Frontend",
    company: "Grupo TCI",
    date: "May 2021 — Jun 2022",
    isCurrent: false,
    tasks: [
      "Desarrollo de componentes reutilizables en Angular y consumo de APIs REST.",
      "Diseño de interfaces responsivas con HTML5 y CSS."
    ],
    tags: ["Angular", "TypeScript", "HTML5", "CSS3"]
  },
  {
    role: "Programador Frontend",
    company: "Sonder Shop",
    date: "Feb 2021 — May 2021",
    isCurrent: false,
    tasks: [
      "Diseño de interfaces de usuario y desarrollo web con HTML, CSS y JavaScript bajo metodología SCRUM."
    ],
    tags: ["HTML", "CSS", "JavaScript", "SCRUM"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="exp-heading">
      <div className="container">
        <div className="section-tag">Trayectoria</div>
        <h2 id="exp-heading" className="section-title">Experiencia Profesional</h2>

        <div className="timeline">
          {JOBS.map((job, idx) => (
            <article className={`timeline-item ${job.isCurrent ? "current" : ""}`} key={idx} aria-label={job.isCurrent ? "Posición actual" : undefined}>
              <div className="timeline-dot">
                {job.isCurrent && <div className="timeline-pulse"></div>}
              </div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{job.role}</h3>
                    <span className="timeline-company">{job.company}</span>
                  </div>
                  <div className="timeline-meta">
                    {job.isCurrent && <span className="timeline-badge current-badge">Actual</span>}
                    <span className="timeline-date">{job.date}</span>
                  </div>
                </div>
                <ul className="timeline-tasks" role="list">
                  {job.tasks.map((task, taskIdx) => (
                    <li key={taskIdx}>{task}</li>
                  ))}
                </ul>
                <div className="timeline-tags">
                  {job.tags.map((tag, tagIdx) => (
                    <span className="tag" key={tagIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
