import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

type NavLink = {
  id: string;
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  {
    id: "why-it-matters",
    title: "Why It Matters",
    href: "#why-it-matters",
  },
  {
    id: "the-fix",
    title: "The Fix",
    href: "#the-fix",
  },
  {
    id: "try-detector",
    title: "Try the Detector",
    href: "#try-detector",
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("why-it-matters");
  const [_, setLocation] = useLocation();

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find the current active section based on scroll position
      const sections = navLinks.map(link => ({
        id: link.id,
        offset: document.getElementById(link.id)?.offsetTop || 0,
      }));
      
      // Sort sections by their distance from the top
      sections.sort((a, b) => a.offset - b.offset);
      
      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offset - 100) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav 
      className="glass sticky top-0 z-50 px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-3">
            <span className="material-icons text-2xl">speed</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Fix<span className="text-accent">Ahead</span></h1>
        </div>
        
        <div className="flex space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={cn(
                "nav-link py-2 font-medium",
                activeSection === link.id ? "active" : ""
              )}
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
