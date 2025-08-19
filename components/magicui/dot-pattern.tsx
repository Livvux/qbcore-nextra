"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useId, useRef } from "react";

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 8,
  cy = 8,
  cr = 1.5,
  className,
  glow = false,
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);

  return (
    <motion.svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle
            cx={cx}
            cy={cy}
            r={cr}
            fill={glow ? "#DB123E" : "#374151"}
            opacity={glow ? "0.8" : "0.5"}
          />
        </pattern>
        {glow && (
          <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        {glow && (
          <radialGradient id={`gradient-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DB123E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF4B6E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#DB123E" stopOpacity="0.1" />
          </radialGradient>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      {glow && (
        <rect
          width="100%"
          height="100%"
          fill={`url(#gradient-${id})`}
          style={{
            filter: `url(#glow-${id})`,
            opacity: 0.3,
          }}
          className="animate-pulse"
        />
      )}
    </motion.svg>
  );
}