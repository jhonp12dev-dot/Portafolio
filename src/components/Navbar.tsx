"use client";

import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";

interface NavbarProps {
  dict: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
  };
}

export default function Navbar({ dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const NAV_LINKS = [
    { label: dict.about, href: "#about" },
    { label: dict.experience, href: "#experience" },
    { label: dict.projects, href: "#projects" },
    { label: dict.skills, href: "#skills" },
    { label: dict.education, href: "#education" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section using IntersectionObserver
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = "";
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="mainNav" role="navigation" aria-label="Navegación principal">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" onClick={(e) => handleLinkClick(e, "#hero")} aria-label="Inicio">
            <span className="logo-bracket">&lt;</span>JP<span className="logo-bracket">/&gt;</span>
          </a>
          <ul className="nav-links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{ color: activeSection === link.href.slice(1) ? "var(--green)" : "" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="nav-link nav-cta"
                onClick={(e) => handleLinkClick(e, "#contact")}
                style={{ color: activeSection === "contact" ? "var(--green)" : "" }}
              >
                {dict.contact}
              </a>
            </li>
            <li className="nav-lang-item" style={{ display: "flex", alignItems: "center", marginLeft: "12px" }}>
              <LanguageSelector />
            </li>
          </ul>
          <button
            className={`hamburger ${isOpen ? "open" : ""}`}
            id="hamburger"
            onClick={toggleMenu}
            aria-label="Menú"
            aria-expanded={isOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`} id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menú móvil" aria-hidden={!isOpen}>
        <ul role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="mobile-link" onClick={(e) => handleLinkClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="mobile-link" onClick={(e) => handleLinkClick(e, "#contact")}>
              {dict.contact}
            </a>
          </li>
          <li style={{ marginTop: "24px" }}>
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </>
  );
}

