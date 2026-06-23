"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo no es válido";
    }
    if (phone.trim() && !/^[+0-9\s-]{7,15}$/.test(phone.trim())) {
      newErrors.phone = "El número de teléfono no es válido";
    }
    if (!message.trim()) newErrors.message = "El mensaje no puede estar vacío";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        // Hide success alert after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        setErrors({ submit: data.error || "Hubo un error al enviar el mensaje. Inténtalo de nuevo." });
      }
    } catch (err) {
      setErrors({ submit: "No se pudo conectar con el servidor. Revisa tu conexión." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-tag">Contacto</div>
        <h2 id="contact-heading" className="section-title">Hablemos</h2>
        <p className="contact-sub">¿Tienes un proyecto en mente? Estoy disponible para nuevas oportunidades.</p>

        <div className="contact-grid">
          <div className="contact-info">
            <a href="mailto:jhonspillaca12@gmail.com" className="contact-item" id="contactEmail">
              <div className="contact-item-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="contact-label">Email</span>
                <span className="contact-value">jhonspillaca12@gmail.com</span>
              </div>
            </a>
            <a href="https://wa.me/51989313705?text=Hola%20Jhon,%20vi%20tu%20portafolio%20y%20me%20gustaría%20contactarte." target="_blank" rel="noopener noreferrer" className="contact-item" id="contactWhatsapp">
              <div className="contact-item-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <span className="contact-label">WhatsApp</span>
                <span className="contact-value">989 313 705</span>
              </div>
            </a>
            <a href="https://linkedin.com/in/jhonpillaca" target="_blank" rel="noopener noreferrer" className="contact-item" id="contactLinkedin">
              <div className="contact-item-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">linkedin.com/in/jhonpillaca</span>
              </div>
            </a>
          </div>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
            <div className="form-group">
              <label htmlFor="formName" className="form-label">Nombre</label>
              <input
                type="text"
                id="formName"
                name="name"
                className="form-input"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
              {errors.name && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="formEmail" className="form-label">Email</label>
              <input
                type="email"
                id="formEmail"
                name="email"
                className="form-input"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {errors.email && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="formPhone" className="form-label">Teléfono / Celular (opcional)</label>
              <input
                type="tel"
                id="formPhone"
                name="phone"
                className="form-input"
                placeholder="Tu número de celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
              {errors.phone && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="formMessage" className="form-label">Mensaje</label>
              <textarea
                id="formMessage"
                name="message"
                className="form-input form-textarea"
                placeholder="Cuéntame sobre tu proyecto..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              ></textarea>
              {errors.message && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.message}</span>}
            </div>
            {errors.submit && (
              <div className="form-error" id="formSubmitError" role="alert" style={{ display: "flex", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px", gap: "8px", alignItems: "center", fontSize: "0.9rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.submit}
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-full" id="formSubmit" disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {loading ? "Enviando..." : "Enviar Mensaje"}
            </button>
            {success && (
              <div className="form-success" id="formSuccess" role="alert" aria-live="polite" style={{ display: "flex" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                ¡Mensaje enviado! Te responderé pronto.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
