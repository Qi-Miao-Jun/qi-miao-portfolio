import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const items = [
  {
    title: 'Abstract 01',
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80',
    rotation: -3,
  },
  {
    title: 'Abstract 02',
    img: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80',
    rotation: 2,
  },
  {
    title: '黑白',
    img: '/黑白.jpg',
    rotation: -1,
  },
  {
    title: 'Abstract 04',
    img: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80',
    rotation: 4,
  },
  {
    title: 'Abstract 05',
    img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    rotation: -2,
  },
  {
    title: 'Abstract 06',
    img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80',
    rotation: 3,
  },
]

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const col1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const col2Y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg"
    >
      {/* Pinned content */}
      <div className="h-screen flex items-center justify-center sticky top-0 z-10 overflow-hidden">
        <div className="text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs text-muted uppercase tracking-[0.3em] mb-6"
          >
            Explorations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary mb-6"
          >
            Visual <span className="not-italic">playground</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted text-sm md:text-base max-w-md mx-auto mb-8"
          >
            A collection of experiments, illustrations, and visual ideas.
          </motion.p>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm text-muted hover:text-text-primary hover:border-white/20 transition-all duration-300 hover-pill"
          >
            View on Dribbble ↗
          </motion.a>
        </div>
      </div>

      {/* Parallax columns */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-2 gap-12 md:gap-40 -mt-48 md:-mt-80">
        {/* Column 1 */}
        <motion.div style={{ y: col1Y }} className="flex flex-col gap-8 md:gap-16 items-end">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.title}
              className="w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-stroke cursor-pointer hover:border-white/20 transition-all duration-300 hover:scale-105 group"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: col2Y }} className="flex flex-col gap-8 md:gap-16 items-start mt-16 md:mt-32">
          {items.slice(3, 6).map((item) => (
            <div
              key={item.title}
              className="w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-stroke cursor-pointer hover:border-white/20 transition-all duration-300 hover:scale-105 group"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
