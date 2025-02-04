"use client";
import { useEffect, useRef } from "react";

interface ScrollToTopProps {
  trigger: unknown; // Value that triggers scroll effect (page or search change)
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ trigger }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [trigger]); // Runs when trigger value changes

  return <div ref={scrollRef} />; // Empty div to scroll to
};

export default ScrollToTop;
