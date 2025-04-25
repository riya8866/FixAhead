import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import WhyItMatters from "./WhyItMatters";
import TheFix from "./TheFix";
import TryDetector from "./TryDetector";
import { useLocation } from "wouter";

export default function Home() {
  const [_, setLocation] = useLocation();

  // Handle URL fragment navigation on initial load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <WhyItMatters />
      <TheFix />
      <TryDetector />
    </div>
  );
}
