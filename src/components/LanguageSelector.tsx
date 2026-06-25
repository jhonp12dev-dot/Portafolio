"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export default function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extraer el locale actual del pathname
  const currentLocale = pathname.split("/")[1] || "es";
  const activeLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    setIsOpen(false);
    const segments = pathname.split("/");
    // Reemplazar o insertar el locale
    segments[1] = code;
    const newPath = segments.join("/");
    
    // Mantener el hash (ej. #projects) si existe en el cliente
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(newPath + hash);
  };

  return (
    <div className="lang-selector-container" ref={dropdownRef}>
      <button
        className="lang-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Seleccionar idioma / Select language"
      >
        <span className="lang-flag">{activeLang.flag}</span>
        <span className="lang-code-text">{activeLang.code.toUpperCase()}</span>
        <svg
          className={`lang-chevron ${isOpen ? "open" : ""}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polyline points="1 1 5 5 9 1" />
        </svg>
      </button>

      {isOpen && (
        <ul className="lang-dropdown-list" role="listbox" aria-label="Idiomas disponibles">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === currentLocale}>
              <button
                className={`lang-option-btn ${lang.code === currentLocale ? "active" : ""}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-label-text">{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
