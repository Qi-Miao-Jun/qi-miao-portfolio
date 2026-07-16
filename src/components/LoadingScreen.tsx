import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const words = ['Design', 'Create', 'Inspire']

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const DURATION = 2700

  useEffect(() => {
    startTimeRef.current = performance.now()

    const tick = (now: number) => {
      if (!startTimeRef.current) return
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      setCount(Math.floor(progress * 100))

      // Word cycling every 900ms
      setWordIndex(Math.floor(elapsed / 900) % words.length)

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(onComplete, 400)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10">
      {/* Top-left label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em]">Portfolio</span>
      </motion.div>

      {/* Center rotating word */}
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.8 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter + progress */}
      <div className="flex flex-col items-end gap-4">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
        {/* Progress bar */}
        <div className="w-full max-w-xs h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <div
            className="h-full accent-gradient rounded-full progress-glow transition-transform duration-75"
            style={{ transform: `scaleX(${count / 100})`, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  )
}
