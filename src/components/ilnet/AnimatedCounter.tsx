"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

export default function AnimatedCounter({
  cible,
  suffixe = "",
  decimales = 0,
  duree = 1500,
}: {
  cible: number;
  suffixe?: string;
  decimales?: number;
  duree?: number;
}) {
  const { ref, isVisible } = useInView<HTMLSpanElement>(0.5);
  const [valeur, setValeur] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const debut = performance.now();

    const anime = (maintenant: number) => {
      const progression = Math.min((maintenant - debut) / duree, 1);
      const progressionAdoucie = 1 - Math.pow(1 - progression, 3);
      setValeur(progressionAdoucie * cible);

      if (progression < 1) {
        requestAnimationFrame(anime);
      } else {
        setValeur(cible);
      }
    };

    requestAnimationFrame(anime);
  }, [isVisible, cible, duree]);

  return (
    <span ref={ref}>
      {valeur.toLocaleString("fr-FR", {
        minimumFractionDigits: decimales,
        maximumFractionDigits: decimales,
      })}
      {suffixe}
    </span>
  );
}
