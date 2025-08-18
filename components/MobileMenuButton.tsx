'use client'

import { motion } from 'framer-motion'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 right-6 z-50 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 md:hidden"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-0.5 w-6 bg-white origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mt-1.5 block h-0.5 w-6 bg-white"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mt-1.5 block h-0.5 w-6 bg-white origin-center"
      />
    </button>
  )
}

export default MobileMenuButton