import React from "react";

interface ExperienceProps {
  dict: {
    tag: string;
    title: string;
    currentBadge: string;
    positions: Array<{
      role: string;
      company: string;
      date: string;
      isCurrent: boolean;
      tasks: string[];
    }>;
  };
}

const JOB_TAGS = [
  ["Angular", "NestJS", "Next.js", "Supabase", "MongoDB", "PostgreSQL", "Python", "OCR", "RAG", "MCP", "AI Agents"],
  ["Angular", "Spring Boot", "Multitenant", "MySQL", "GitLab"],
  ["Angular", "TypeScript", "HTML5", "CSS3"],
  ["HTML", "CSS", "JavaScript", "SCRUM"]
];

export default function Experience({ dict }: ExperienceProps) {
  return (
    <section id="experience" className="section experience" aria-labelledby="exp-heading">
      <div className="container">
        <div className="section-tag">{dict.tag}</div>
        <h2 id="exp-heading" className="section-title">{dict.title}</h2>

        <div className="timeline">
          {dict.positions.map((job, idx) => (
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
                    {job.isCurrent && <span className="timeline-badge current-badge">{dict.currentBadge}</span>}
                    <span className="timeline-date">{job.date}</span>
                  </div>
                </div>
                <ul className="timeline-tasks" role="list">
                  {job.tasks.map((task, taskIdx) => (
                    <li key={taskIdx}>{task}</li>
                  ))}
                </ul>
                <div className="timeline-tags">
                  {(JOB_TAGS[idx] || []).map((tag, tagIdx) => (
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
