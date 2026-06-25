"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Run observer logic
    const fadeEls = document.querySelectorAll(
      ".timeline-item, .project-card, .stat-card, .skill-group, .edu-card, .contact-item, .section-title, .section-tag"
    );
    fadeEls.forEach((el) => el.classList.add("fade-in"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    fadeEls.forEach((el) => observer.observe(el));

    return () => {
      fadeEls.forEach((el) => observer.unobserve(el));
    };
  }, [pathname]); // Re-run when locale/page path changes

  return null;
}
