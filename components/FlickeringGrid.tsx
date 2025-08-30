'use client'

import React, { useEffect, useRef } from 'react'

type FlickeringGridProps = {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

// A lightweight canvas-based flickering grid background
// Defaults mirror the props provided by magicui's example
export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0, 0, 0)',
  width,
  height,
  className,
  maxOpacity = 0.2,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const parentRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = parentRef.current

    const setCanvasSize = (w: number, h: number) => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    if (typeof width === 'number' && typeof height === 'number') {
      setCanvasSize(width, height)
    } else if (parent) {
      // Auto-size to parent with ResizeObserver
      const resize = () => {
        const rect = parent.getBoundingClientRect()
        setCanvasSize(rect.width, rect.height)
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(parent)
      resizeObserverRef.current = ro
    }

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return

      ctx.clearRect(0, 0, w, h)

      const step = squareSize + gridGap
      const cols = Math.ceil(w / step)
      const rows = Math.ceil(h / step)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (Math.random() < flickerChance) {
            const opacity = Math.random() * maxOpacity
            ctx.fillStyle = colorWithAlpha(color, opacity)
            const px = x * step
            const py = y * step
            ctx.fillRect(px, py, squareSize, squareSize)
          }
        }
      }
    }

    const loop = () => {
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (resizeObserverRef.current && parent) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [squareSize, gridGap, flickerChance, color, width, height, maxOpacity])

  return (
    <div ref={parentRef} className={className}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

function colorWithAlpha(base: string, alpha: number) {
  // Support rgb/rgba or hex; fall back to base as-is
  if (base.startsWith('#')) {
    const { r, g, b } = hexToRgb(base)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  if (base.startsWith('rgb(')) {
    const inside = base.slice(4, -1)
    return `rgba(${inside}, ${alpha})`
  }
  if (base.startsWith('rgba(')) {
    return base.replace(/rgba\(([^)]+),\s*([\d.]+)\)/, `rgba($1, ${alpha})`)
  }
  return base
}

function hexToRgb(hex: string) {
  let c = hex.replace('#', '')
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('')
  }
  const num = parseInt(c, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

