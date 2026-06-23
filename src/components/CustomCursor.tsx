"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Check if custom cursor should be enabled (only on hoverable devices)
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setSupported(true);
    }
  }, []);

  useEffect(() => {
    if (!supported) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth animation loop for the ring
    let animationId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      animationId = requestAnimationFrame(animRing);
    };
    animRing();

    // Attach hover listener to interactive items
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const updateHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, .project-card, .stat-card, .contact-item");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    updateHoverListeners();

    // Create an observer to bind listeners to elements loaded dynamically or filtered
    const observer = new MutationObserver(updateHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      observer.disconnect();
      const targets = document.querySelectorAll("a, button, .project-card, .stat-card, .contact-item");
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [supported]);

  if (!supported) return null;

  return (
    <>
      <div className="cursor-dot" id="cursorDot" ref={dotRef}></div>
      <div className={`cursor-ring ${isHovered ? "expanded" : ""}`} id="cursorRing" ref={ringRef}></div>
    </>
  );
}
