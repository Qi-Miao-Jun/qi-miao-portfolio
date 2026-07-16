import { motion } from 'framer-motion'

const entries = [
  {
    title: 'On Video Rhythm and Texture',
    tag: 'Design',
    readTime: '5 min read',
    date: 'Jul 12, 2026',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80',
  },
  {
    title: 'Why I switched to vibe coding',
    tag: 'Dev',
    readTime: '8 min read',
    date: 'Jun 28, 2026',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80',
  },
  {
    title: 'Building a personal brand at 23',
    tag: 'Career',
    readTime: '6 min read',
    date: 'Jun 15, 2026',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80',
  },
  {
    title: 'The future of AI in creative work',
    tag: 'AI',
    readTime: '10 min read',
    date: 'May 30, 2026',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&q=80',
  },
]

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary">
              Recent <span className="not-italic">thoughts</span>
            </h2>
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary hover:border-white/20 transition-all duration-300 hover-pill w-fit"
            >
              View all
              <span>→</span>
            </a>
          </div>
          <p className="text-sm text-muted mt-4 max-w-lg">
            Notes on design, development, and everything in between.
          </p>
        </motion.div>

        {/* Journal entries */}
        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className="journal-entry flex items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-surface/30 border border-stroke rounded-[40px] sm:rounded-full cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={entry.img} alt={entry.title} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[#89AACC] uppercase tracking-wide">{entry.tag}</span>
                  <span className="text-stroke">·</span>
                  <span className="text-xs text-muted">{entry.readTime}</span>
                </div>
                <h3 className="text-sm sm:text-base text-text-primary font-medium truncate pr-4">
                  {entry.title}
                </h3>
              </div>

              {/* Date */}
              <span className="hidden sm:block text-xs text-muted flex-shrink-0">{entry.date}</span>

              {/* Arrow */}
              <span className="text-muted text-sm flex-shrink-0 mr-2">→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
