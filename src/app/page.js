"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { ThemeProvider } from "@/context/ThemeContext";

// Model - Site content data
const sections = [
  {
    id: 1,
    title: "Welcome to Summer",
    description: "Feel the heat, bask in the glow of endless days and vibrant energy.",
    celestial: "sun",
    theme: "light",
    position: "left",
    bgColor: "bg-gradient-to-b from-sky-100 to-sky-200"
  },
  {
    id: 2,
    title: "Summer Nights",
    description: "The calm moonlight shimmers over quiet landscapes, bringing cool relief.",
    celestial: "moon",
    theme: "dark",
    position: "right",
    bgColor: "bg-indigo-950"
  },
  {
    id: 3,
    title: "Beach Days",
    description: "Golden sands, blue waters, and the warm embrace of sunshine.",
    celestial: "sun",
    theme: "light",
    position: "left",
    bgColor: "bg-amber-50"
  },
  {
    id: 4,
    title: "Starry Summer",
    description: "As day turns to night, the sky reveals its cosmic wonders.",
    celestial: "moon",
    theme: "dark",
    position: "right",
    bgColor: "bg-slate-900"
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  // Controller - Setup intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6 // When 60% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setActiveSection(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <ThemeProvider initialTheme={sections[0].theme} activeSection={activeSection}>
      <main className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
        {sections.map((section, index) => (
          <Section
            key={section.id}
            ref={el => sectionRefs.current[index] = el}
            index={index}
            title={section.title}
            description={section.description}
            celestial={section.celestial}
            position={section.position}
            theme={section.theme}
            bgColor={section.bgColor}
            isActive={activeSection === index}
          />
        ))}
      </main>
    </ThemeProvider>
  );
}
