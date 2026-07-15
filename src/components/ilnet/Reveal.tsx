"use client";

import React from "react";
import { useInView } from "@/hooks/useInView";

export default function Reveal({
  children,
  delai = 0,
  className = "",
}: {
  children: React.ReactNode;
  delai?: number;
  className?: string;
}) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delai}ms` }}
    >
      {children}
    </div>
  );
}
