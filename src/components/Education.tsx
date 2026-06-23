import React from "react";

interface EduItem {
  title: string;
  institution: string;
  year: string;
  icon: React.ReactNode;
}

const EDUCATION: EduItem[] = [
  {
    title: "Máster en Desarrollo Web Full-Stack",
    institution: "Escuela Internacional de Post Grado",
    year: "2021 — 2023",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Técnico en Computación e Informática",
    institution: "IESTP \"María Rosario Araoz Pinto\" — Diseño Web, POO, Bases de Datos, Metodologías Ágiles",
    year: "2019",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Curso Angular 8+ (Nivel Básico — Intermedio)",
    institution: "Udemy",
    year: "2020",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

export default function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="edu-heading">
      <div className="container">
        <div className="section-tag">Formación</div>
        <h2 id="edu-heading" className="section-title">Educación</h2>

        <div className="edu-grid">
          {EDUCATION.map((edu, idx) => (
            <article className="edu-card" key={idx}>
              <div className="edu-icon">{edu.icon}</div>
              <div className="edu-content">
                <h3 className="edu-title">{edu.title}</h3>
                <span className="edu-institution">{edu.institution}</span>
                <span className="edu-year">{edu.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
