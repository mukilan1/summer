"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { ThemeProvider } from "@/context/ThemeContext";

// Model - Site content data
const sections = [
  {
    id: 1,
    title: "Experience Summer 2024",
    description: "Discover vibrant adventures, sunny escapes, and unforgettable memories waiting to be made this season.",
    celestial: "sun",
    theme: "light",
    position: "left",
    bgColor: "bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200"
  },
  {
    id: 2,
    title: "Magical Summer Nights",
    description: "When the sun sets, the summer truly awakens. Explore nighttime festivals, beachside bonfires, and starlit conversations.",
    celestial: "moon",
    theme: "dark",
    position: "right",
    bgColor: "bg-indigo-950"
  },
  {
    id: 3,
    title: "Coastal Retreats & Adventures",
    description: "From serene shorelines to thrilling water sports, our curated beach experiences offer the perfect summer escape for everyone.",
    celestial: "sun",
    theme: "light",
    position: "left",
    bgColor: "bg-amber-50"
  },
  {
    id: 4,
    title: "Summer Under the Stars",
    description: "Join our guided astronomical tours and camping experiences where the night sky becomes your personal planetarium.",
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
